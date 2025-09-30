const passport = require('passport');
const JwtStrategy = require('./jwt.strategy');

passport.use(JwtStrategy)

module.exports = passport;