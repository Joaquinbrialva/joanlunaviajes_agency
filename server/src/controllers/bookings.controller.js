const BookingService = require('../services/booking.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new BookingService();

const getAllBookings = async (req, res, next) => {
	try {
		const bookings = await service.findAll();
		return success(res, SUCCESS_MESSAGES.BOOKINGS_FETCHED, bookings);
	} catch (error) {
		next(error);
	}
};

const getBookingById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const booking = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.BOOKING_FETCHED, booking);
	} catch (error) {
		next(error);
	}
};

const createBooking = async (req, res, next) => {
	try {
		const booking = await service.create(req.body, req.user);
		return created(res, SUCCESS_MESSAGES.BOOKING_CREATED, booking);
	} catch (error) {
		next(error);
	}
};

const updateBooking = async (req, res, next) => {
	try {
		const { id } = req.params;
		const updated = await service.update(id, req.body, req.user);
		return success(res, SUCCESS_MESSAGES.BOOKING_UPDATED, updated);
	} catch (error) {
		next(error);
	}
};

const deleteBooking = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id, req.user);
		return success(res, SUCCESS_MESSAGES.BOOKING_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllBookings,
	getBookingById,
	createBooking,
	updateBooking,
	deleteBooking,
};
