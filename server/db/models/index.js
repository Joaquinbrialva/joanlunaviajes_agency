const { User, userSchema } = require('./user.model');
const { Offer, offerSchema } = require('./offer.model');
const { Destination, destinationSchema } = require('./destination.model');
const { Benefit, benefitSchema } = require('./benefit.model');
const { Review, reviewSchema } = require('./review.model');
const { Booking, bookingSchema } = require('./booking.model');
const { Category, categorySchema } = require('./category.model');

function setupModels(sequelize) {
	User.init(userSchema, User.config(sequelize));
	Category.init(categorySchema, Category.config(sequelize));
	Destination.init(destinationSchema, Destination.config(sequelize));
	Offer.init(offerSchema, Offer.config(sequelize));
	Benefit.init(benefitSchema, Benefit.config(sequelize));
	Review.init(reviewSchema, Review.config(sequelize));
	Booking.init(bookingSchema, Booking.config(sequelize));

	User.associate(sequelize.models);
	Category.associate(sequelize.models);
	Destination.associate(sequelize.models);
	Offer.associate(sequelize.models);
	Benefit.associate(sequelize.models);
	Review.associate(sequelize.models);
	Booking.associate(sequelize.models);
}

module.exports = { setupModels };
