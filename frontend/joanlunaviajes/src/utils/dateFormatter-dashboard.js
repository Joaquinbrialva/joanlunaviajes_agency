export function dateFormatter(startDate, endDate) {
	const format = (date) =>
		new Date(date).toLocaleDateString('es-AR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});

	// Si no hay ninguna fecha
	if (!startDate && !endDate) return 'No aplica';

	// Si solo hay fecha de salida
	if (startDate && !endDate) return `${format(startDate)} | Sin retorno`;

	// Si hay ambas fechas
	if (startDate && endDate) return `${format(startDate)} al ${format(endDate)}`;

	return 'Fecha no disponible';
}
