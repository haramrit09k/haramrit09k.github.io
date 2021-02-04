import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if (this.props.data) {
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}><h3>{education.school}</h3>
          <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          <p>{education.description}</p></div>
      })
      var work = this.props.data.work.map(function (work) {
        return <div key={work.company}><h3>{work.company}</h3>
          {
            Object.keys(work.roles).map(function (role) {
              return <div>
                <p className="info">{work.roles[role].title}<span>&bull;</span> <em className="date">{work.roles[role].years}</em></p>
                <p className="newline">{work.roles[role].description}</p>
              </div>
            })
          }
        </div>
      })
      var skills = this.props.data.skills.map(function (skills) {
        var projectImage = 'images/tech/' + skills.image;
        return <div key={skills.name} className="columns feature-item">
          <img className='skill' alt={skills.name} src={projectImage} />
          <h5 style={{ color: 'white' }}>{skills.name}</h5>
          <p>{skills.description}</p>
        </div>
      })
    }

    return (
      <div>
        <section id="resume">

          <div className="row education">
            <div className="three columns header-col">
              <h1><span>Education</span></h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">
                  {education}
                </div>
              </div>
            </div>
          </div>


          <div className="row work">

            <div className="three columns header-col">
              <h1><span>Work</span></h1>
            </div>

            <div className="nine columns main-col">
              {work}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#2B2B2B' }} id='skills'>
          <div className="row skill">

            <div className="three columns header-col">
              <h1 style={{ color: 'white' }}><span>Favorite Tech</span></h1>
            </div>

            <div>
              <div className="nine columns main-col"><p className="lead center">{skillmessage}</p></div>
              <ul className="bgrid-quarters s-bgrid-thirds cf">
                {skills}
              </ul>
            </div>
          </div>
        </section>
      </div>

    );
  }
}

export default Resume;