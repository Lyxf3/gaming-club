const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Call = require('../models/call')
const router = Router()

// /api/contacts
router.post(
    '/contacts',
    [
        check('name', 'Заполните Имя').exists(),
        check('phone', 'Некорректный номер').isMobilePhone('uk-UA', undefined),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные брони звонка'
                })
            }

            const {name, phone} = req.body

            const call = new Call({name, phone})

            await call.save()

            res.status(201).json({ message: 'Мы вам перезвоним' })
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    })

module.exports = router