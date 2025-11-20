import { Skeleton } from '@mui/material';
import '../../../styles/dashboard/layout/TableSkeleton.css';
export default function TableSkeleton() {
	return (
		<table className='table table-skeleton'>
			<thead>
				<tr>
					{[
						'Título',
						'Origen',
						'Destino',
						'Fechas',
						'Precio',
						'Estado',
						'Acciones',
					].map((col) => (
						<th key={col}>
							<Skeleton variant='text' width={80} />
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{Array.from({ length: 5 }).map((_, i) => (
					<tr key={i}>
						<td>
							<Skeleton animation='wave' variant='text' width='90%' />
						</td>
						<td>
							<Skeleton animation='wave' variant='text' width='70%' />
						</td>
						<td>
							<Skeleton animation='wave' variant='text' width='70%' />
						</td>
						<td>
							<Skeleton animation='wave' variant='text' width='80%' />
						</td>
						<td>
							<Skeleton animation='wave' variant='text' width='50%' />
						</td>
						<td>
							<Skeleton
								animation='wave'
								variant='rounded'
								width={60}
								height={22}
							/>
						</td>
						<td>
							<div className='actions-wrapper'>
								<Skeleton
									animation='wave'
									variant='rounded'
									width={40}
									height={22}
								/>
								<Skeleton
									animation='wave'
									variant='rounded'
									width={50}
									height={22}
								/>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
