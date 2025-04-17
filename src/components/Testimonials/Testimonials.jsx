import React, { useRef } from 'react';
import './Testimonials.css';
import testimonialUserImage from '../../assets/testimonial-user.png';

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const scrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const testimonials = [
    {
      name: "OLIVIA COLE",
      text: "Lorem ipsum dolor sit amet consectetur. Leo blandit sollicitudin dui quis bibendum adipiscing."
    },
    {
      name: "OLIVIA COLE",
      text: "Lorem ipsum dolor sit amet consectetur. Leo blandit sollicitudin dui quis bibendum adipiscing."
    },
    {
      name: "OLIVIA COLE",
      text: "Lorem ipsum dolor sit amet consectetur. Leo blandit sollicitudin dui quis bibendum adipiscing."
    },
    {
      name: "OLIVIA COLE",
      text: "Lorem ipsum dolor sit amet consectetur. Leo blandit sollicitudin dui quis bibendum adipiscing."
    },
    {
      name: "OLIVIA COLE",
      text: "Lorem ipsum dolor sit amet consectetur. Leo blandit sollicitudin dui quis bibendum adipiscing."
    }
  ];

  return (
    <section className="testimonials-container">
      <h1>What Our Users Say</h1>
      
      <div className="testimonials-slider-container">
        <button 
          className="testimonial-nav-btn left" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
         <span>‹</span>
        </button>

        <div className="testimonials-scroll" ref={scrollContainerRef}>
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-user-image">
                <img src={testimonialUserImage} alt="User" />
              </div>
              <h3>{testimonial.name}</h3>
              <p>{testimonial.text}</p>
            </div>
          ))}
        </div>

        <button 
          className="testimonial-nav-btn right" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
         <span>›</span>
        </button>
      </div>
    </section>
  );
};

export default Testimonials; 