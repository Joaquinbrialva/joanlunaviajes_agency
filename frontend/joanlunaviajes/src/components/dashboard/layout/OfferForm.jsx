import { useState } from 'react';
import '../../../styles/dashboard/layout/OfferForm.css';
import { useForm } from 'react-hook-form';

export default function OfferForm() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  const ErrorMessage = ({ error }) => (
    <span className='error-message'>{error.message}</span>
  );

  return (
    <form onSubmit={onSubmit} className='offer-form'>
      <h2 className='offer-form-title'>Nueva Oferta de Vuelo</h2>

      <div className='offer-form-grid'>
        {/* Columna izquierda */}
        <div className='offer-form-column'>
          <div className='offer-form-field'>
            <label htmlFor='title'>Título*</label>
            <input
              id='title'
              type='text'
              placeholder='Ej. Escapada a Madrid'
              className={errors.title ? 'input-error' : ''}
              {...register('title', {
                required: { value: true, message: 'El título es requerido.' },
              })}
            />
            {errors.title && <ErrorMessage error={errors.title} />}
          </div>

          <div className='offer-form-field'>
            <label htmlFor='origin'>Origen*</label>
            <input
              id='origin'
              type='text'
              placeholder='Ej. Buenos Aires'
              className={errors.origin ? 'input-error' : ''}
              {...register('origin', {
                required: { value: true, message: 'El origen es requerido.' },
              })}
            />
            {errors.origin && <ErrorMessage error={errors.origin} />}
          </div>

          <div className='offer-form-field'>
            <label htmlFor='departureDate'>Fecha de salida*</label>
            <input
              id='departureDate'
              type='date'
              className={errors.departureDate ? 'input-error' : ''}
              {...register('departureDate', {
                required: {
                  value: true,
                  message: 'La fecha de vuelo es requerida.',
                },
              })}
            />
            {errors.departureDate && <ErrorMessage error={errors.departureDate} />}
          </div>

          <div className='offer-form-field'>
            <label htmlFor='passengers'>Pasajeros</label>
            <input
              id='passengers'
              type='number'
              min='1'
              placeholder='Ej. 2'
              {...register('passengers')}
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className='offer-form-column'>
          <div className='offer-form-field'>
            <label htmlFor='destination'>Destino*</label>
            <input
              id='destination'
              type='text'
              placeholder='Ej. Río de Janeiro'
              className={errors.destination ? 'input-error' : ''}
              {...register('destination', {
                required: { value: true, message: 'El destino es requerido.' },
              })}
            />
            {errors.destination && <ErrorMessage error={errors.destination} />}
          </div>

          <div className='offer-form-field offer-form-field-checkbox'>
            <label htmlFor='isRoundTrip'>¿Vuelo con retorno?</label>
            <input
              id='isRoundTrip'
              type='checkbox'
              {...register('isRoundTrip')}
              onChange={(e) => setIsRoundTrip(e.target.checked)}
              checked={isRoundTrip}
            />
          </div>

          {isRoundTrip && (
            <div className='offer-form-field'>
              <label htmlFor='returnDate'>Fecha de retorno*</label>
              <input
                id='returnDate'
                type='date'
                className={errors.returnDate ? 'input-error' : ''}
                {...register('returnDate', {
                  required: {
                    value: isRoundTrip,
                    message:
                      'La fecha de retorno es requerida para viajes de ida y vuelta.',
                  },
                })}
              />
              {errors.returnDate && <ErrorMessage error={errors.returnDate} />}
            </div>
          )}

          <div className='offer-form-field'>
            <label htmlFor='price'>Precio (USD)</label>
            <input
              id='price'
              type='number'
              min='0'
              step='0.01'
              placeholder='Ej. 499.99'
              {...register('price')}
            />
          </div>
        </div>
      </div>

      {/* Campos de ancho completo */}
      <div className='offer-form-wide'>
        <div className='offer-form-field'>
          <label htmlFor='description'>Descripción</label>
          <input
            id='description'
            type='text'
            placeholder='Describe brevemente la oferta...'
            {...register('description')}
          />
        </div>

        <div className='offer-form-field'>
          <label htmlFor='photos'>Fotos*</label>
          <input
            id='photos'
            type='file'
            accept='image/*'
            multiple
            className={errors.photos ? 'input-error' : ''}
            {...register('photos', {
              required: { value: true, message: 'Al menos una foto es requerida.' },
            })}
          />
          {errors.photos && <ErrorMessage error={errors.photos} />}
        </div>

        <div className='offer-form-field'>
          <label htmlFor='notes'>Notas</label>
          <textarea
            id='notes'
            placeholder='Información adicional...'
            {...register('notes')}
          ></textarea>
        </div>
      </div>

      <div className='offer-actions'>
        <button type='submit' className='btn-primary'>
          Guardar oferta
        </button>
        <button
          type='button'
          className='btn-secondary'
          onClick={() => {
            reset();
            setIsRoundTrip(false);
          }}
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}
