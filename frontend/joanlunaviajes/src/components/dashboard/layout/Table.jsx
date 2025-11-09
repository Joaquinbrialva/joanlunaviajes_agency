import '../../../styles/dashboard/layout/Table.css';
import Loader from '../../../components/ui/Loader';

export default function Table({ data = [], onRefresh, loading, onError }) {
	async function deleteOffer(id) {
		try {
			const response = await fetch(`http://localhost:3000/api/v1/trips/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error al eliminar la oferta');
			}

			await onRefresh?.(); // ✅ refresca solo si la eliminación fue exitosa
		} catch (err) {
			console.error('❌ Error al eliminar:', err);
			alert('No se pudo eliminar la oferta. Inténtalo nuevamente.');
		}
	}

	function formatDate(departureDate, returnDate) {
		const format = (date) =>
			new Date(date).toLocaleDateString('es-AR', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});

		// Si no hay ninguna fecha
		if (!departureDate && !returnDate) return 'No aplica';

		// Si solo hay fecha de salida
		if (departureDate && !returnDate)
			return `${format(departureDate)} | Sin retorno`;

		// Si hay ambas fechas
		if (departureDate && returnDate)
			return `${format(departureDate)} al ${format(returnDate)}`;

		return 'Fecha no disponible';
	}

	const handleEdit = (id) => {
		console.log('Editando viaje:', id);
	};

	const handleDelete = (id) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
			deleteOffer(id);
		}
	};

	return (
		<div className='table-wrapper'>
			<div className='table-container'>
				{/* 🔴 Zona de error */}
				{onError && (
					<div className='error-wrapper'>
						<p>⚠️ {onError.message || 'Ocurrió un error inesperado.'}</p>
					</div>
				)}

				{/* Loader o tabla */}
				{loading ? (
					<div className='loader-wrapper'>
						<Loader />
					</div>
				) : (
					<>
						<table className='table'>
							<thead>
								<tr>
									<th>Título</th>
									<th>Origen</th>
									<th>Destino</th>
									<th>Fechas</th>
									<th>Precio</th>
									<th>Estado</th>
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item) => (
									<tr key={item.id}>
										<td title={item.title}>{item.title}</td>
										<td title={item.origin}>{item.origin}</td>
										<td title={item.destination}>{item.destination}</td>
										<td>{formatDate(item.departureDate, item.returnDate)}</td>
										<td>${Number(item.price).toFixed(2)}</td>
										<td>
											<span
												className={`status-badge ${
													item.status ? 'active' : 'inactive'
												}`}
											>
												{item.status ? 'Activa' : 'Inactiva'}
											</span>
										</td>
										<td>
											<div className='actions-wrapper'>
												<button
													onClick={() => handleEdit(item.id)}
													title='Editar oferta'
												>
													Editar
												</button>
												<button
													onClick={() => handleDelete(item.id)}
													title='Eliminar oferta'
												>
													Eliminar
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>

						{!loading && data.length === 0 && (
							<div className='table-no-results'>
								No se encontraron resultados
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
