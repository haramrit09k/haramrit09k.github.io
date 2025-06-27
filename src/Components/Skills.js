import React, { useState, useEffect } from 'react';

const CATEGORY_MAP = {
    'Backend & APIs': [
        'Java',
        'Spring Boot',
        'Node.js',
        'Oracle SQL',
        'MongoDB',
        'GraphQL',
        'Python',
    ],
    'Frontend & UI': [
        'Angular',
        'React',
        'Phaser.js',
        'Streamlit',
        'Electron.js'
    ],
    'DevOps & Cloud': [
        'AWS',
        'Docker',
        'CI/CD (Jenkins & GitHub Actions)',
        'Monitoring & Logging (Kibana)'
    ],
    'Testing & Automation': [
        'Playwright',
        'JUnit',
        'Jest',
        'Shell Scripting'
    ]
};



const TAB_STYLE = {
    display: 'inline-block',
    padding: '10px 24px',
    marginRight: 8,
    border: 'none',
    borderRadius: '16px 16px 0 0',
    background: '#232323',
    color: '#fff',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.2s, color 0.2s',
};
const ACTIVE_TAB_STYLE = {
    ...TAB_STYLE,
    background: '#11ABB0',
    color: '#232323',
};

const Skills = ({ data }) => {
    const [selectedCategory, setSelectedCategory] = useState(Object.keys(CATEGORY_MAP)[0]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (!data) return null;
    const skillmessage = data.skillmessage;
    const skills = data.skills;

    // Group skills by category
    const categorized = {};
    Object.entries(CATEGORY_MAP).forEach(([cat, names]) => {
        categorized[cat] = skills.filter(skill => names.includes(skill.name));
    });

    const displayedSkills = (categorized[selectedCategory] || []).slice(0, 8);

    return (
        <section style={{ backgroundColor: '#2B2B2B', overflow: 'visible' }} id='skills'>
            <div className="row skill">
                <div className="three columns header-col">
                    <h1 style={{ color: 'white' }}><span>Favorite Tech</span></h1>
                </div>
                <div>
                    <div className="nine columns main-col"><p className="lead center">{skillmessage}</p></div>
                </div>
                {/* Tabs or Dropdown - below heading/message */}
                <div style={{
                    margin: '24px 0 32px 0',
                    borderBottom: isMobile ? 'none' : '2px solid #232323',
                    background: '#2B2B2B',
                    zIndex: 101,
                    paddingTop: 8,
                    paddingBottom: 8,
                    marginBottom: 24,
                    ...(isMobile ? { position: 'sticky', top: 60 } : {}),
                }}>
                    {isMobile ? (
                        <select
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: 8,
                                background: '#232323',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: 16,
                                border: 'none',
                                marginBottom: 12
                            }}
                        >
                            {Object.keys(CATEGORY_MAP).map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    ) : (
                        Object.keys(CATEGORY_MAP).map((cat) => (
                            <button
                                key={cat}
                                style={selectedCategory === cat ? ACTIVE_TAB_STYLE : TAB_STYLE}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))
                    )}
                </div>
                {/* Skills grid for selected tab */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 24,
                    justifyContent: isMobile ? 'center' : 'flex-start',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'center' : 'stretch'
                }}>
                    {displayedSkills.map(skill => {
                        const projectImage = 'images/tech/' + skill.image;
                        return (
                            <div key={skill.name} style={{
                                background: '#232323',
                                borderRadius: 16,
                                boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                                padding: 24,
                                minWidth: isMobile ? 0 : 220,
                                maxWidth: 260,
                                width: isMobile ? '90vw' : undefined,
                                flex: isMobile ? 'unset' : '1 1 220px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginBottom: 16,
                                minHeight: 320,
                                overflow: 'visible',
                                justifyContent: 'flex-start',
                            }}>
                                <div
                                    style={{
                                        width: 110,
                                        height: 110,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#fff',
                                        borderRadius: 12,
                                        boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                                        marginBottom: 18,
                                        overflow: 'hidden',
                                    }}
                                >
                                    <img
                                        className="skill"
                                        alt={skill.name}
                                        src={projectImage}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            display: 'block',
                                            background: 'transparent',
                                        }}
                                    />
                                </div>
                                <h5 style={{ color: 'white', marginBottom: 8 }}>{skill.name}</h5>
                                <p style={{ color: '#d3d3d3', textAlign: 'center', fontSize: 15, lineHeight: 1.5 }}>{skill.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
