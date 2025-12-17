const router = require('express').Router();
const {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
} = require('../controllers/categories.controller');

const { validatorHandler } = require('../middlewares/validator.handler');
const {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
} = require('../schemas/category.schema');
const { checkJwt } = require('../middlewares/auth'); // si lo usás

// Public
router.get('/', getAllCategories);
router.get(
	'/:id',
	validatorHandler(getCategorySchema, 'params'),
	getCategoryById
);

// Protected (creación/edición/eliminación) - requieren JWT y rol agent/admin
router.post(
	'/',
	checkJwt(),
	validatorHandler(createCategorySchema, 'body'),
	createCategory
);
router.patch(
	'/:id',
	checkJwt(),
	validatorHandler(getCategorySchema, 'params'),
	validatorHandler(updateCategorySchema, 'body'),
	updateCategory
);
router.delete(
	'/:id',
	checkJwt(),
	validatorHandler(getCategorySchema, 'params'),
	deleteCategory
);

module.exports = router;
