// formConfigs.js

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Función para simplificar la definición de validaciones requeridas
const requiredValidation = (message) => ({
	required: { value: true, message: message },
});

// --- CONFIGURACIÓN 1: OFERTA DE VUELO (TRIP) ---
// formConfigs.js

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Función para simplificar la definición de validaciones requeridas
const requiredValidation = (message) => ({
	required: { value: true, message: message },
});

// --- CONFIGURACIÓN 1: PAQUETE DE OFERTA/VIAJE (PACKAGE OFFER) ---
export const offerConfig = {
	title: '🎁 Nuevo Paquete de Oferta',
	apiUrl: `${API_BASE_URL}/packages`, // Podría ser un endpoint diferente: /api/v1/packages
	submitText: 'Crear Paquete',
	imageFieldName: 'images', // Tu ejemplo usa un array de imágenes
	defaultValues: { nights: 3, currency: 'ARS', availability: 10, price: 0 },

	// Función para transformar los datos antes de enviar
	cleanData: (data) => {
		// 1. Limpiar valores nulos/vacíos
		const cleaned = Object.fromEntries(
			Object.entries(data).filter(
				([, value]) => value !== null && value !== undefined && value !== ''
			)
		);

		// 2. Convertir strings separados por comas a arrays
		if (cleaned.included) {
			cleaned.included = cleaned.included
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item);
		}
		if (cleaned.notIncluded) {
			cleaned.notIncluded = cleaned.notIncluded
				.split(',')
				.map((item) => item.trim())
				.filter((item) => item);
		}

		return cleaned;
	},

	fields: [
		{
			name: 'title',
			label: '📌 Título del Paquete*',
			type: 'text',
			placeholder: 'Ej. Escapada a Salta 3 noches',
			validation: requiredValidation('El título es requerido.'),
			fullWidth: true,
		},
		{
			name: 'description',
			label: '🗒️ Descripción Breve',
			type: 'textarea',
			placeholder: 'Hotel céntrico, desayuno, city tour...',
			validation: requiredValidation('La descripción es requerida.'),
			fullWidth: true,
		},
		{
			name: 'destination_id',
			label: '🗺️ Destino Asociado*',
			type: 'select', // Asume que cargarás los destinos aquí
			options: [
				{ value: '', label: '-- Seleccionar Destino --' },
				{ value: '4a3cec40-aba4-4a3e-a163-cae27299dd01', label: 'Salta' }, // Ejemplo
				{ value: '4a3cec40-aba4-4a3e-a163-cae27299dd02', label: 'Córdoba' }, // Ejemplo
			],
			validation: requiredValidation('Seleccionar un destino es requerido.'),
		},
		{
			name: 'category_id',
			label: '📂 Categoría*',
			type: 'select',
			options: [
				{ value: '', label: '-- Seleccionar Categoría --' },
				{ value: '07d29416-4f5b-4295-afab-ee0ffd1075b2', label: 'Destinos' }, // Ejemplo
			],
			validation: requiredValidation('Seleccionar una categoría es requerido.'),
		},
		{
			name: 'startDate',
			label: '📅 Fecha de Inicio*',
			type: 'date',
			validation: requiredValidation('La fecha de inicio es requerida.'),
		},
		{
			name: 'endDate',
			label: '📆 Fecha de Fin*',
			type: 'date',
			validation: requiredValidation('La fecha de fin es requerida.'),
		},
		{
			name: 'nights',
			label: '🌙 Noches',
			type: 'number',
			min: '1',
			placeholder: 'Ej. 3',
			validation: requiredValidation('El número de noches es requerido.'),
		},
		{
			name: 'availability',
			label: '✅ Disponibilidad (Cupos)',
			type: 'number',
			min: '1',
			placeholder: 'Ej. 15',
		},
		{
			name: 'price',
			label: '💵 Precio*',
			type: 'number',
			min: '0',
			step: '0.01',
			placeholder: 'Ej. 250000',
			validation: requiredValidation('El precio es requerido.'),
		},
		{
			name: 'currency',
			label: '🪙 Moneda',
			type: 'select',
			options: [
				{ value: 'ARS', label: 'ARS (Pesos Argentinos)' },
				{ value: 'USD', label: 'USD (Dólares Americanos)' },
			],
		},
		{
			name: 'included',
			label: '✅ Incluido (Separar por comas)',
			type: 'textarea',
			placeholder: 'Hotel 3*, Desayuno, City Tour...',
			fullWidth: true,
		},
		{
			name: 'notIncluded',
			label: '❌ No Incluido (Separar por comas)',
			type: 'textarea',
			placeholder: 'Comidas, Excursiones opcionales...',
			fullWidth: true,
		},
		{
			name: 'policies',
			label: '📄 Políticas/Condiciones',
			type: 'textarea',
			placeholder: 'No reembolsable dentro de los 7 días previos.',
			fullWidth: true,
		},
		{
			name: 'highlighted',
			label: '⭐ Destacar Oferta',
			type: 'checkbox',
		},
		{
			name: 'images',
			label: '📸 Imágenes del Paquete',
			type: 'image', // Nota: Tu componente ImageUpload actual solo soporta una, podrías ajustarlo a `multiple={true}`.
			fullWidth: true,
		},
	],
};

// ... (El resto de las configuraciones como destinationConfig, requestConfig se mantienen)

// --- CONFIGURACIÓN 2: DESTINO DESTACADO (DESTINATION) ---
export const destinationConfig = {
	title: '🌴 Nuevo Destino Destacado',
	apiUrl: `${API_BASE_URL}/destinations`,
	submitText: 'Crear Destino',
	imageFieldName: 'image',

	fields: [
		{
			name: 'city',
			label: '🏙️ Ciudad*',
			type: 'text',
			placeholder: 'Ej. París',
			validation: requiredValidation('La ciudad es requerida.'),
		},
		{
			name: 'country',
			label: '🌍 País*',
			type: 'text',
			placeholder: 'Ej. Francia',
			validation: requiredValidation('El país es requerido.'),
		},
		{
			name: 'description',
			label: '🗒️ Descripción',
			type: 'textarea',
			placeholder: 'Un lugar mágico...',
			fullWidth: true,
		},
		{
			name: 'image',
			label: '📸 Foto del Destino*',
			type: 'image',
			validation: requiredValidation('Se requiere una imagen del destino.'),
			fullWidth: true,
		},
		{
			name: 'isActive',
			label: '✅ Mostrar en página principal',
			type: 'checkbox',
			defaultChecked: true,
			fullWidth: true,
		},
	],
};

// --- CONFIGURACIÓN 3: SOLICITUD DE VUELO (REQUEST) ---
export const requestConfig = {
	title: '💬 Nueva Solicitud de Vuelo',
	apiUrl: `${API_BASE_URL}/requests`, // Asume un endpoint diferente
	submitText: 'Enviar Solicitud',
	defaultValues: { passengers: 1 },

	fields: [
		{
			name: 'origin',
			label: '🛫 Origen*',
			type: 'text',
			placeholder: 'Ej. Buenos Aires',
			validation: requiredValidation('El origen es requerido.'),
		},
		{
			name: 'destination',
			label: '🛬 Destino*',
			type: 'text',
			placeholder: 'Ej. Barcelona',
			validation: requiredValidation('El destino es requerido.'),
		},
		{
			name: 'flexibleDates',
			label: '🗓️ ¿Fechas flexibles?',
			type: 'checkbox',
			fullWidth: true,
		},
		{
			name: 'preferredDepartureDate',
			label: '📅 Fecha de salida preferida',
			type: 'date',
		},
		{
			name: 'maxPrice',
			label: '💰 Precio máximo a pagar (USD)',
			type: 'number',
			min: '0',
			placeholder: 'Ej. 800',
		},
		{
			name: 'passengers',
			label: '👥 Pasajeros',
			type: 'number',
			min: '1',
			placeholder: 'Ej. 2',
		},
		{
			name: 'notes',
			label: '📝 Detalles de la Solicitud',
			type: 'textarea',
			placeholder:
				'Especifica la clase (ej. business), aerolíneas preferidas o cualquier otro detalle...',
			fullWidth: true,
		},
	],
};
