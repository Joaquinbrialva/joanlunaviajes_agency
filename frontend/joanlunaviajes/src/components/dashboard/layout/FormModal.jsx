import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../styles/dashboard/layout/FormModal.css';
import { IoCloseCircle } from 'react-icons/io5';
import ImageUpload from '../../ui/ImageUpload';
import AnimatedButton from '../../ui/AnimatedButton';

export default function FormModal({ mode = 'offer', onClose, onNewItem }) {
	const [isRoundTrip, setIsRoundTrip] = useState(false);
	const [image, setImage] = useState(null);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, // ← AÑADE isSubmitting
		reset,
	} = useForm();

	async function submitData(payload) {
		setError(null);
		setSuccess(false);

		const MIN_LOADING_TIME = 600;
		const startTime = Date.now();

		try {
			const isFormData = payload instanceof FormData;

			const response = await fetch('http://localhost:3000/api/v1/trips', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
					...(isFormData ? {} : { 'Content-Type': 'application/json' }),
				},
				body: isFormData ? payload : JSON.stringify(payload),
			});

			if (!response.ok)
				throw new Error(response.statusText || 'Error al enviar los datos');

			const data = await response.json();

			const elapsed = Date.now() - startTime;
			if (elapsed < MIN_LOADING_TIME) {
				await new Promise((resolve) =>
					setTimeout(resolve, MIN_LOADING_TIME - elapsed)
				);
			}

			// ÉXITO: Mostrar animación
			setSuccess(true);
			onNewItem && onNewItem(data.data); // pasa el nuevo viaje al padre
			return data;
		} catch (err) {
			console.error('Error:', err);
			setError(err.message);
		}
	}

	const onSubmit = async (data) => {
		// Limpiamos el payload
		const cleanedData = Object.fromEntries(
			Object.entries(data).filter(
				([, value]) => value !== null && value !== undefined && value !== ''
			)
		);

		// Si hay imagen, usamos FormData
		if (image) {
			const formData = new FormData();

			Object.entries(cleanedData).forEach(([key, value]) => {
				formData.append(key, value);
			});

			formData.append('image', image); // solo un archivo
			await submitData(formData);
		} else {
			await submitData(cleanedData);
		}
	};

	const ErrorMessage = ({ error }) => (
		<span className='error-message'>⚠️ {error}</span>
	);

	const formTitle =
		mode === 'offer'
			? '✈️ Nueva Oferta de Vuelo'
			: mode === 'request'
			? '💬 Nueva Solicitud de Vuelo'
			: '🌴 Nuevo Destino Destacado';

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
					<h2>{formTitle}</h2>
					<button className='modal-close' onClick={onClose}>
						<IoCloseCircle />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className='form'>
					{mode === 'offer' && (
						<div className='form-field'>
							<label htmlFor='title'>📌 Título*</label>
							<input
								id='title'
								type='text'
								placeholder='Ej. Escapada a Madrid'
								disabled={isSubmitting}
								className={errors.title ? 'input-error' : ''}
								{...register('title', {
									required: { value: true, message: 'El título es requerido.' },
								})}
							/>
							{errors.title && <ErrorMessage error={errors.title.message} />}
						</div>
					)}
					<div className='form-field'>
						<label htmlFor='origin'>🛫 Origen*</label>
						<input
							id='origin'
							type='text'
							placeholder='Ej. Buenos Aires'
							disabled={isSubmitting}
							className={errors.origin ? 'input-error' : ''}
							{...register('origin', {
								required: { value: true, message: 'El origen es requerido.' },
							})}
						/>
						{errors.origin && <ErrorMessage error={errors.origin.message} />}
					</div>
					<div className='form-field'>
						<label htmlFor='destination'>🛬 Destino*</label>
						<input
							id='destination'
							type='text'
							placeholder='Ej. Río de Janeiro'
							disabled={isSubmitting}
							className={errors.destination ? 'input-error' : ''}
							{...register('destination', {
								required: { value: true, message: 'El destino es requerido.' },
							})}
						/>
						{errors.destination && (
							<ErrorMessage error={errors.destination.message} />
						)}
					</div>
					<div className='form-field'>
						<label htmlFor='departureDate'>📅 Fecha de salida</label>
						<input
							id='departureDate'
							type='date'
							disabled={isSubmitting}
							min={new Date().toISOString().split('T')[0]}
							className={errors.departureDate ? 'input-error' : ''}
							{...register('departureDate')}
						/>
						{errors.departureDate && (
							<ErrorMessage error={errors.departureDate.message} />
						)}
					</div>
					<div className='form-field checkbox-field'>
						<label htmlFor='isRoundTrip'>🔁 ¿Vuelo con retorno?</label>
						<input
							id='isRoundTrip'
							type='checkbox'
							disabled={isSubmitting}
							{...register('isRoundTrip')}
							onChange={(e) => setIsRoundTrip(e.target.checked)}
							checked={isRoundTrip}
						/>
					</div>
					{isRoundTrip && (
						<div className='form-field'>
							<label htmlFor='returnDate'>📆 Fecha de retorno*</label>
							<input
								id='returnDate'
								type='date'
								disabled={isSubmitting}
								className={errors.returnDate ? 'input-error' : ''}
								{...register('returnDate', {
									required: {
										value: isRoundTrip,
										message:
											'La fecha de retorno es requerida para vuelos ida y vuelta.',
									},
								})}
							/>
							{errors.returnDate && (
								<ErrorMessage error={errors.returnDate.message} />
							)}
						</div>
					)}
					<div className='form-field'>
						<label htmlFor='passengers'>👥 Pasajeros</label>
						<input
							id='passengers'
							type='number'
							min='1'
							placeholder='Ej. 2'
							disabled={isSubmitting}
							className={errors.passengers ? 'input-error' : ''}
							{...register('passengers')}
						/>
						{errors.passengers && (
							<ErrorMessage error={errors.passengers.message} />
						)}
					</div>
					{mode === 'offer' && (
						<div className='form-field'>
							<label htmlFor='price'>💵 Precio (USD)</label>
							<input
								id='price'
								type='number'
								disabled={isSubmitting}
								min='0'
								step='0.01'
								placeholder='Ej. 499.99'
								{...register('price')}
							/>
						</div>
					)}
					{mode !== 'destination' && (
						<div className='form-field'>
							<label htmlFor='notes'>📝 Notas</label>
							<textarea
								id='notes'
								maxLength='200'
								disabled={isSubmitting}
								placeholder='Información adicional...'
								{...register('notes')}
							></textarea>
						</div>
					)}
					{mode === 'offer' && (
						<>
							<div className='form-field'>
								<label htmlFor='description'>🗒️ Descripción</label>
								<input
									id='description'
									disabled={isSubmitting}
									type='text'
									placeholder='Describe brevemente la oferta...'
									{...register('description')}
								/>
							</div>

							<div className='form-field'>
								<label>📸 Imagen</label>
								<ImageUpload
									onChange={(file) => setImage(file)}
									filesFromParent={image}
									disabled={isSubmitting}
									multiple={false} // ⚡ solo una imagen
								/>
								{errors.image && <ErrorMessage error={errors.image.message} />}
							</div>
						</>
					)}
					{error && <ErrorMessage error={error} />}
					<div className='actions'>
						<AnimatedButton
							text='Guardar'
							isSubmitting={isSubmitting} // ← ahora es isSubmitting
							success={success}
							onClick={handleSubmit(onSubmit)}
							onSuccessEnd={onClose}
							disabled={isSubmitting}
						/>
						<button
							type='button'
							className='btn-secondary'
							onClick={() => {
								reset();
								setIsRoundTrip(false);
								setImage(null);
							}}
							disabled={isSubmitting}
						>
							Limpiar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
