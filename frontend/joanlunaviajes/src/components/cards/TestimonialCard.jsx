import '../../styles/cards/TestimonialCard.css'

export default function TestimonialCard({ name, quote, imageUrl, alt_text }) {
  return (
    <div className="testimonial-card-container">
      <div className="testimonial-card-content">
        <div className="testimonial-card-image">
          <img
            src={imageUrl}
            alt={alt_text || name}
          />
        </div>
        <p className="testimonial-card-quote">“{quote}”</p>
        <p className="testimonial-card-author">— {name}</p>
      </div>
    </div>
  )
}
