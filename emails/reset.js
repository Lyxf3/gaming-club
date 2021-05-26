const config = require('config')

module.exports = function (email, login, password) {
    return {
        to: email,
        from: config.get('emailFrom'),
        subject: 'Забыли Логин',
        html: `
            <h1>Данные от вашего аккаунта</h1>
            <p>login: ${login}</p>
            <p>email: ${email}</p>
            <p>password: ${password}</p>
            <a href="${config.get('baseUrl')}/login">gaming club</a>
        `
    }
}