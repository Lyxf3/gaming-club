const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const router = Router()
const config = require('config')
const User = require('../models/user')
router.post(
    '/register',
    [
        check('login', 'Некоррекстный login').exists(),
        check('email', 'Некоррекстный email').isEmail(),
        check('password', 'Минимальная длина паролья 6 символов').isLength({min: 6})
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

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({login, email, password: hashedPassword })

            await user.save()

            res.status(201).json({ message: 'Пользователь создан' })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })


router.post(
    '/login',
    [
        check('login', 'Введите корректный login').exists(),
        check('password', "Введите пароль").exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некорректные данные при входе в систему"
                })
            }

            const {login, password} = req.body
            const user = await User.findOne({ login })

            if(!user) {
                return res.status(500).json({message: "Пользователь не найден"})
            }
            const isMatch = await bcrypt.compare(password)
            if (!isMatch) {
                return req.status(400).json({ message: "Невверный пароль, попробуйте снова"})
            }
            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        }catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    })

module.exports = router