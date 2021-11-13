const bcrypt = require('bcrypt');

function encrypt() {

    var length = 256,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(retVal, salt, function (err, hash) {

            password = hash;
            console.log(password);
            return password;
        });
    });
};

key_session = encrypt();

module.exports = key_session;