import '../../../styles/dashboard/layout/OfferForm.css';

export default function OfferForm() {
	return (
		<form className='offer-form'>
			<div className='offer-form-fields'>
				<div className='offer-form-field'>
					<label htmlFor='title'>Título</label>
					<input type='text' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Descripción</label>
					<input type='text' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Origen</label>
					<input type='text' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Destino</label>
					<input type='text' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Fecha de vuelo</label>
					<input type='date' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Fecha de retorno</label>
					<input type='date' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Precio</label>
					<input type='number' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Fotos</label>
					<input type='file' />
				</div>
				<div className='offer-form-field'>
					<label htmlFor='title'>Notas</label>
					<input type='textarea' />
				</div>
			</div>
		</form>
	);
}
