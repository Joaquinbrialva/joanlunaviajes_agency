const { saveImage, saveImageBuffer } = require('../middlewares/multer');
const fs = require('fs');
const TripService = require('../services/trip.service');
const { SUCCESS_MESSAGES } = require('../utils/messages');
const { success, created } = require('../utils/response');
const service = new TripService();

const getAllTrips = async (req, res, next) => {
	try {
		const { page = 1, limit = 10, includeUser } = req.query;

		// Definir campos que pueden ser filtros
		const filterFields = ['title', 'origin', 'destination'];

		// Construir filtros dinámicamente
		const filters = filterFields.reduce((acc, field) => {
			if (req.query[field]) {
				acc[field] = req.query[field];
			}
			return acc;
		}, {});

		const options = {
			page,
			limit,
			includeUser: includeUser !== 'false',
			filters,
		};

		const result = await service.findAll(options);
		return success(
			res,
			SUCCESS_MESSAGES.DATA_FETCHED,
			result.data,
			result.total,
			{
				...result,
			}
		);
	} catch (error) {
		next(error);
	}
};

const getTripById = async (req, res, next) => {
	try {
		const { tripId } = req.params;
		const { includeUser = true } = req.query;
		const trip = await service.findById(tripId, includeUser === 'true');
		return success(res, SUCCESS_MESSAGES.DATA_FETCHED, trip);
	} catch (error) {
		next(error);
	}
};

const createTrip = async (req, res, next) => {
	try {
		const {
			title,
			description,
			origin,
			destination,
			departureDate,
			returnDate,
			isRoundTrip,
			passengers,
			price,
			notes,
			userId,
		} = req.body;

		const newTrip = await service.create({
			title,
			description,
			origin,
			destination,
			departureDate,
			returnDate,
			isRoundTrip,
			passengers,
			price,
			photos: [],
			notes,
			userId,
		});

		const imagePaths = [];
		if (req.files?.length) {
			for (const file of req.files) {
				const path = saveImageBuffer(file);
				imagePaths.push(path);
			}

			// 🔄 Actualizamos el trip con las rutas de las imágenes
			await newTrip.update({ photos: imagePaths });
		}
		return created(res, SUCCESS_MESSAGES.RESOURCE_CREATED, newTrip);
	} catch (error) {
		next(error);
	}
};

const updateTrip = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Cambio: pasar el objeto user completo en lugar de solo userId
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
		const updatedTrip = await service.update(id, newData, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_UPDATED, updatedTrip);
	} catch (error) {
		next(error);
	}
};

const deleteTrip = async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = req.user; // Cambio: pasar el objeto user completo en lugar de solo userId
		await service.delete(id, user);
		return success(res, SUCCESS_MESSAGES.RESOURCE_DELETED, { id });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllTrips,
	getTripById,
	createTrip,
	updateTrip,
	deleteTrip,
};
