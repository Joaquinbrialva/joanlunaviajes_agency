import { faker } from '@faker-js/faker';

export function generateTrips(amount = 10) {
	return Array.from({ length: amount }).map((_, i) => ({
		id: i + 1,
		title: faker.location.city() + ' Experience',
		location: faker.location.country(),
		days: faker.number.int({ min: 3, max: 15 }),
		rating: (
			Math.round(faker.number.float({ min: 4, max: 5, precision: 0.1 }) * 2) / 2
		).toFixed(1),
		price: faker.number.int({ min: 300, max: 3000 }),
		image: faker.image.urlPicsumPhotos({ width: 600, height: 400 }),
		discount: faker.datatype.boolean()
			? `-${faker.number.int({ min: 10, max: 40 })}% OFF`
			: null,
		category: faker.helpers.arrayElements(
			[
				{ name: 'Internacionales', slug: 'internacionales' },
				{ name: 'Nacionales', slug: 'nacionales' },
			],
			{ min: 0, max: 5 }
		),
	}));
}
