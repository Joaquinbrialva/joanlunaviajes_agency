const TripService = require('../services/trip.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success } = require('../utils/response');
const service = new TripService();

const getAllTrips = async (req, res, next) => {
	try {
		const trips = await service.findAll();
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, trips);
	} catch (error) {
		next(error);
	}
};

const getTripById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const trip = await service.findById(id);
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, trip);
	} catch (error) {
		next(error);
	}
};

const createTrip = async (req, res, next) => {
	try {
		const { body } = req;
		const newTrip = await service.create(body);
		return success(res, SUCCESS_MESSAGES.RESOURCE_CREATED, newTrip);
	} catch (error) {
		next(error);
	}
};

const updateTrip = async (req, res, next) => {
	try {
		const { id } = req.params;
		const {
			title,
			origin,
			destination,
			departureDate,
			returnDate,
			photos,
			notes,
		} = req.body;
		const newData = {
			title,
			origin,
			destination,
			departureDate,
			returnDate,
			photos,
			notes,
		};
		const updatedTrip = await service.update(id, newData);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updatedTrip);
	} catch (error) {
		next(error);
	}
};

const deleteTrip = async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, id);
	} catch (error) {
		next(error);
	}
};

module.exports = { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip };
