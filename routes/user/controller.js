const model = require('./model');

module.exports = {
    login: (req, res) => {
        res.status(200).send({msg: 'Login Successful'})
    },
    register: (req, res) => {
        res.status(200).send({msg: 'Register Successful'})
    }
}