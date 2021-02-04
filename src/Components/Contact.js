import React, { Component } from 'react';

class Contact extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">

         <div className="row section-head">

            <div className="two columns header-col">

               <h1><span>Get In Touch.</span></h1>

            </div>

         </div>

         <div className="row">
            <div className="six columns">

                  <p className="lead">{message}</p>

            </div>


            <aside className="four columns footer-widgets">
               <div className="widget widget_contact">

					   <h4>Address and Phone</h4>
					   <p className="address">
                  <i class="fa fa-user"></i>&emsp;{name}<br />
                  <i class="fa fa-home"></i>&emsp;{street} <br />
                  &emsp;{city}, {state} {zip}<br />
                  <i class="fa fa-phone"></i>&emsp;<span>{phone}</span><br/>
                  <i class="fa fa-envelope"></i>&emsp;<span><a href="mailto:haramrit09k@gmail.com">{email}</a></span>
					   </p>
				   </div>
               
            </aside>
      </div>
   </section>
    );
  }
}

export default Contact;
