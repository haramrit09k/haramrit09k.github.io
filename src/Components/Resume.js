import React, { Component } from 'react';
import dompurify from 'dompurify';
import Skills from './Skills';

class Resume extends Component {
  render() {
    const sanitizer = dompurify.sanitize;

    if (this.props.data) {
      var education = this.props.data.education.map(function (education) {
        return (
          <div key={education.school} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 4 }}>{education.school}</h3>
              <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
              <p>{education.description}<br />{education.achievements}</p>
            </div>
            {education.logo && (
              <img
                src={education.logo}
                alt={education.school + ' logo'}
                style={{ width: 150, height: 150, objectFit: 'contain', marginLeft: 32, borderRadius: 12, background: '#fff', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
              />
            )}
          </div>
        );
      })
      var work = this.props.data.work.map(function (work) {
        console.log('WORK ENTRY:', work);
        return (
          <div key={work.company} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: 4 }}>{work.company}</h3>
              {Object.keys(work.roles).map(function (role) {
                return (
                  <div key={role}>
                    <p className="info">{work.roles[role].title}<span>&bull;</span> <em className="date">{work.roles[role].years}</em></p>
                    <p style={{whiteSpace: 'pre-line'}} className="newline" dangerouslySetInnerHTML={{__html: sanitizer(work.roles[role].description)}}></p>
                  </div>
                );
              })}
            </div>
            {work.logo && (
              <img
                src={work.logo}
                alt={work.company + ' logo'}
                style={{ width: 150, height: 150, objectFit: 'contain', marginLeft: 32, borderRadius: 12, background: '#fff', border: '1px solid #eee', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
              />
            )}
          </div>
        );
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