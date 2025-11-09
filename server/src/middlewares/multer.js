const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB por archivo
	fileFilter: (req, file, cb) => {
		if (!file.mimetype.startsWith('image/')) {
			return cb(new Error('Solo se permiten imágenes'));
		}
		cb(null, true);
	},
});

function saveImageBuffer(file) {
	const uploadDir = path.join(__dirname, '../uploads');

	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	const timestamp = Date.now();
	const random = Math.round(Math.random() * 1e9);
	const ext = path.extname(file.originalname);
	const filename = `${timestamp}-${random}${ext}`;

	const filePath = path.join(uploadDir, filename);
	fs.writeFileSync(filePath, file.buffer);

	return filePath;
}

module.exports = { upload, saveImageBuffer };
