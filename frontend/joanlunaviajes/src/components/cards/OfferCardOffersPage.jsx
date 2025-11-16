// Ajustamos la importación para usar 'react-icons/fa', que es más universalmente resuelta
import '../../styles/cards/OfferCardOffersPage.css';

// Componente para una tarjeta de oferta (Estilo Despegar)
export default function OfferCardOffersPage({
	origin,
	destination,
	image,
	alt_text,
	price,
	isRoundTrip,
	departureDate,
	returnDate,
}) {
	const roundTripMessage = isRoundTrip ? 'Ida y vuelta' : 'Solo ida';
	return (
		<div className='offer-card'>
			{/* Imagen del Destino */}
			<div className='card-image-container'>
				<img
					className='card-image'
					src={image}
					alt={alt_text}
					// Placeholder en caso de error de carga
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
							'https://placehold.co/400x250/374151/FFFFFF?text=No+Image';
					}}
				/>
			</div>

			{/* Contenido Superior: Título y Ruta (Simulando Vuelo) */}
			<div className='card-content-top'>
				{/* Categoría o Tipo de Oferta */}
				<div className='card-category'>VUELO</div>

				{/* Título de la Oferta (ej: "Vuelos a Ciudad de México") */}
				<h3 className='card-title'>{`Vuelos a ${destination}`}</h3>

				{/* Origen del Viaje (similar a "From New York") */}
				<div className='card-details-line'>
					Partiendo desde <span className='card-label'>{origin}</span>
				</div>

				{/* Etiqueta de Tipo de Viaje (ej: "Ida y Vuelta") */}
				<div className='card-tag'>{roundTripMessage}</div>
			</div>

			{/* Contenido Inferior: Precio y Fechas */}
			{departureDate &&
				price(
					<div className='card-content-bottom'>
						<div className='card-price-label'>{`Precio ${roundTripMessage.toLowerCase()} desde`}</div>

						{/* Monto del Precio */}
						<div className='card-price-amount'>
							<span className='card-price-currency'>$</span>
							{price}
						</div>

						{/* Fechas de Referencia (simulación con datos fijos) */}
						{departureDate && (
							<div className='card-reference-date'>
								Fecha de referencia:
								<span className='card-label'>
									{departureDate} - {returnDate}
								</span>
							</div>
						)}
					</div>
				)}
		</div>
	);
}
