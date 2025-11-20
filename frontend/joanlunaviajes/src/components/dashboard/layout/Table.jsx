import '../../../styles/dashboard/layout/Table.css';
import { dateFormatter } from '../../../utils/dateFormatter-dashboard';
import useDeleteOffer from '../../../hooks/offer/useDeleteOffer';
import { CircularProgress, Skeleton } from '@mui/material';
import TableSkeleton from './TableSkeleton';

export default function Table({ data = [], onRefresh, loading, onError }) {
	const { deleteOffer, loading: deleting } = useDeleteOffer();

	const handleDelete = (id) => {
		if (window.confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
			deleteOffer(id, onRefresh);
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
				{loading || deleting ? (
					<div className='loader-wrapper'>
						<TableSkeleton />
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
								{data.map((offer) => (
									<tr key={offer.id}>
										<td title={offer.title}>{offer.title}</td>
										<td>{offer.origin?.name}</td>
										<td>{offer.destination?.name}</td>
										<td>{dateFormatter(offer.startDate, offer.endDate)}</td>
										<td>${offer.price.toLocaleString('es-AR')}</td>
										<td>
											<span
												className={`status-badge ${
													offer.status ? 'active' : 'inactive'
												}`}
											>
												{offer.status ? 'Activa' : 'Inactiva'}
											</span>
										</td>
										<td>
											<div className='actions-wrapper'>
												<button>Editar</button>
												<button onClick={() => handleDelete(offer.id)}>
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
