import { useEffect, useState, useCallback } from 'react';

export function useFetchOffers(
	url = 'http://localhost:3000/api/v1/offers?limit=30'
) {
	const [offers, setOffers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const fetchOffers = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetch(url, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});

			if (!response.ok) {
				throw new Error(response.statusText || 'Error al obtener los datos');
			}

			const data = await response.json();
			setOffers(data?.data || []);
		} catch (err) {
			setError(err.message || 'Error desconocido');
		} finally {
			setLoading(false);
		}
	}, [url]);

	useEffect(() => {
		fetchOffers();
	}, [fetchOffers]);

	return { offers, setOffers, loading, error, refetch: fetchOffers };
}
