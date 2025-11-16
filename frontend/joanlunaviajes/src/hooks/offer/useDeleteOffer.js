import { useState } from 'react';

export default function useDeleteOffer() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	async function deleteOffer(id, onRefresh) {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch(
				`http://localhost:3000/api/v1/offers/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.message.message || 'Error al eliminar la oferta');
				return;
			}

			setSuccess(true);
			onRefresh?.(); // si lo pasaron, lo ejecutamos
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	}

	return { deleteOffer, loading, error, success };
}
