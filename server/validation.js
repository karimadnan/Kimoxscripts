const jwToken = require('./Jwt');
const Joi = require('joi');

const signup = Joi.object({
	Name: Joi.string().min(3).max(15).required(),
	Password: Joi.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,21}$/, 'must contain uppercase lowercase and number').required(),
	Email: Joi.string().email().required(),
})

let Validator = {
	// signUpcheck: function (req, res) {
	// 	const validation = signup.validate(req.body);
	// 	console.log(req.body)
	// 	res.send(validation);
	// },
	checkJWT: function (req, res, next) {
		var token;
		if (req.headers && req.headers.authorization) {
			token = req.headers.authorization;
		} else if (req.query.token) {
			token = req.query.token;
		} else {
			return res.status(401).send({ message: 'No Authorization found' });
		}
		jwToken.verify(token, function (err, payload) {
			if (err) {
				console.log(err);
				return res.status(401).send({ message: 'Token Invalid' });
			};
			req.token = payload;
			next();
		});
	},
	isAdmin: function (req, res, next) {
		if (req.token.access == 5) {
			return next();
		}
		return res.status(401).send({ message: 'unAuthorized Action' });
	},
}

module.exports = Validator;