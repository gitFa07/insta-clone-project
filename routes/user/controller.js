// routes/user/controller.js
const model = require('./model');
const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = {
    login: (req, res) => {
        model.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.status(401).send({ msg: 'Invalid email or password' });
                }

                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ msg: 'Internal server error' });
                    }

                    if (isMatch) {
                        let token = jwt.sign({ _id: user._id }, config.secret, { expiresIn: 86400 });
                        return res.status(200).send({ msg: 'Login Successful', token });
                    } else {
                        return res.status(401).send({ msg: 'Passwords did not match' });
                    }
                });
            })
            .catch(err => {
                console.error('DB error:', err);
                res.status(500).send({ msg: 'Internal server error' });
            });
    },

    register: (req, res) => {
        let newUser = new model({
            forename: req.body.forename,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        });

        newUser.save()
            .then(result => {
                console.log(result);
                res.status(201).send({ msg: 'Register Successful', user_id: result._id });
            })
            .catch(err => {
                console.error(err);
                // handle duplicate email more gracefully
                if (err.code === 11000) {
                    return res.status(409).send({ msg: 'Email already registered' });
                }
                res.status(500).send({ msg: 'Register Unsuccessful' });
            });

    }
};
