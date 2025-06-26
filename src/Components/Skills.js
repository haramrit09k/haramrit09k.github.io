import React from 'react';

const Skills = ({ data }) => {
  if (!data) return null;

  const skillmessage = data.skillmessage;
  const skills = data.skills.map((skill) => {
    const projectImage = 'images/tech/' + skill.image;
    return (
      <div key={skill.name} className="columns feature-item">
        <img className='skill' alt={skill.name} src={projectImage} />
        <h5 style={{ color: 'white' }}>{skill.name}</h5>
        <p>{skill.description}</p>
      </div>
    );
  });

  return (
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
  );
};

export default Skills;
