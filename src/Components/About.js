import React, { Component } from 'react';
import dompurify from 'dompurify';

class About extends Component {
  render() {
   const sanitizer = dompurify.sanitize;

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
      <div className="row">
         <div className="three columns">
            <img className="profile-pic"  src={profilepic} alt="Haramrit Profile Pic" />
         </div>
         <div className="nine columns main-col">
            <h2>About Me</h2>

            <p dangerouslySetInnerHTML={{__html: sanitizer(bio)}}></p>
            <div className="row">
               <div className="columns contact-details download">
                  <h2>Contact Details</h2>
                  <p className="address">
						   <span><h4 className="contact-heading">Address:</h4>{street}<br />
						         {city} {state}, {zip}
                   </span><br />
						   <span><h4 className="contact-heading">Phone:</h4>{phone}</span><br />
                     <span><h4 className="contact-heading">Email:</h4><a href="mailto:haramrit09k@gmail.com">{email}</a></span>
					   </p>
                  <p>
                     <a href={resumeDownload} className="button"><i className="fa fa-download"></i>Download Resume</a>
                  </p>
               </div>
               <h2 className="github-stats-heading">~My GitHub Stats~</h2>
               <div className="columns github-profile">
               <github-profile-widget username="haramrit09k"></github-profile-widget>
               </div>
            </div>
         </div>
      </div>

   </section>
    );
  }
}

export default About;
