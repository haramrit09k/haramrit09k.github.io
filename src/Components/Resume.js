import React, { Component } from 'react';
import dompurify from 'dompurify';
import Skills from './Skills';

class Resume extends Component {
  render() {
    const sanitizer = dompurify.sanitize;

    if (this.props.data) {
      var education = this.props.data.education.map(function (education) {
        return <div key={education.school}><h3>{education.school}</h3>
          <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
          <p>{education.description}<br></br>{education.achievements}</p></div>
      })
      var work = this.props.data.work.map(function (work) {
        return <div key={work.company}><h3>{work.company}</h3>
          {
            Object.keys(work.roles).map(function (role) {
              return <div key={role}>
                <p className="info">{work.roles[role].title}<span>&bull;</span> <em className="date">{work.roles[role].years}</em></p>
                <p style={{whiteSpace: 'pre-line'}} className="newline" dangerouslySetInnerHTML={{__html: sanitizer(work.roles[role].description)}}></p>
              </div>
            })
          }
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

        <Skills data={this.props.data} />
      </div>

    );
  }
}

export default Resume;