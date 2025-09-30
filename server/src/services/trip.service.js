const { models } = require('../../db/connection/connection');
const boom = require('@hapi/boom');
const { ERROR_MESSAGES, SUCCESS_MESSAGES } = require('../utils/messages');
const { Op } = require('sequelize');

class TripService {
	async create(data) {
		const trip = await models.Trip.create(data);
		return trip;
	}

	async findAll() {
		const trips = await models.Trip.findAll();
		if (trips.length === 0) throw boom.notFound(ERROR_MESSAGES.NO_TRIPS_FOUND);
		return trips;
	}

	async findById(id) {
		const trip = await models.Trip.findByPk(id);
		if (trip === null) throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return trip;
	}

	async findByRoute(origin, destination) {
		const trips = await models.Trip.findAll({
			where: {
				origin,
				destination,
			},
		});
		if (trips.length === 0)
			throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		return trips;
	}

	async findByDate(departureDate, returnDate) {
		const trips = await models.Trip.findAll({
			where: {
				departureDate: { [Op.gte]: departureDate },
				returnDate: { [Op.lte]: returnDate },
			},
		});
		if (trips.length === 0) {
			throw boom.notFound(ERROR_MESSAGES.RESOURCE_NOT_FOUND);
		}
		return trips;
	}

	async update(id, data) {
		const trip = await this.findById(id);
		const tripUpdated = await trip.update(data);
		return tripUpdated;
	}

	async delete(id) {
		const trip = await this.findById(id);
		await trip.destroy();
		return { id };
	}
}

module.exports = TripService;
