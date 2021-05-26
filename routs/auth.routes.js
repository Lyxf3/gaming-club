const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const regEmail = require('../emails/registration')
const resetEmail = require('../emails/reset')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {api_key: config.get('sendgridApiKey')}
}))

// /api/auth/register
router.post(
    '/register',
    [
        check('login', 'Некорректный login').exists(),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при регистрации'
                })
            }

            const {login, email, password} = req.body

            const findOneEmail = await User.findOne({ email })
            const findOneLogin = await User.findOne({ login })

            if (findOneEmail || findOneLogin) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({login, email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })
            res.redirect("/api/auth/login")

            await transporter.sendMail(regEmail(email, login, password))
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный login').exists(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const {login, password} = req.body
            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
            console.log(e.message)
        }
    })


// /api/auth/sendEmail
router.post(
    '/sendEmail',
    [
        check('email', 'Некорректный email').isEmail()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const { login, email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Email не найден' })
            }
            await transporter.sendMail(resetEmail(email, login, password))

            res.status(201).json({ message: 'Письмо отправлено' })

            res.redirect("/api/auth/login")
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
            console.log(e.message)
        }
    })



module.exports = router