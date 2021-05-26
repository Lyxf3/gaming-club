const config = require('config')

module.exports = function (email) {
    return {
        to: email,
        from: config.get('emailFrom'),
        subject: 'Аккаунт создан',
        html: `
            <h1>Добро пожаловать в наш клуб</h1>
            <p>Вы успешно создали аккаунт</p>
            <a href="${config.get('baseUrl')}">gaming club</a>
        `
    }
}