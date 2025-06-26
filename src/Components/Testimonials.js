import React, { Component } from 'react';

class Testimonials extends Component {
  render() {

    if(this.props.data){
      var testimonials = this.props.data.testimonials.map(function(testimonials){
        return  <li key={testimonials.user}>
            <blockquote>
               <p>{testimonials.text}</p>
               <cite>{testimonials.user}</cite>
            </blockquote>
         </li>
      })
    }

    return (
      <section id="testimonials">
         <div className='bg-blur'></div>
      <div className="text-container">
         <div className="row">

            <div className="two columns header-col">
               <h1><span>Client Testimonials</span></h1>
            </div>

            <div className="ten columns flex-container">
               <div className="testimonials-intro">
                  <p className="testimonials-prompt">
                     Still on the fence? See what others have to say about working with me.
                  </p>
               </div>
                  <ul className="slides">
                      {testimonials}
                  </ul>
               </div>
            </div>
            
            <div className="row">
               <div className="twelve columns">
                  <div className="linkedin-recommendations">
                     <p>
                        To hear more awesome people tell you about why they've loved working with me, 
                        <a href="https://www.linkedin.com/in/haramrit09k/#:~:text=all%2066%20skills-,Recommendations,-Recommendations" 
                           target="_blank" 
                           rel="noopener noreferrer"> click here</a>
                     </p>
                  </div>
               </div>
            </div>
         </div>
   </section>
    );
  }
}

export default Testimonials;
