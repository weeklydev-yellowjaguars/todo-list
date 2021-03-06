var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String,
	provider: String,
	providerId: String,
	providerData: {},
	todos: {}
});

UserSchema.pre('save',
	function(next) {
		if (this.password) {
			var md5 = crypto.createHash('md5');
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

UserSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	return this.password === md5;
};

module.exports = mongoose.model('User', UserSchema);