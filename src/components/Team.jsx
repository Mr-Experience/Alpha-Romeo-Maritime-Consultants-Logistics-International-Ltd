import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import '../styles/team.css';

const Team = () => {
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="team-page">
            {/* Team Hero */}
            <section className="team-hero">
                <div className="team-hero-content">
                    <h1 className="team-hero-title">{t('Team Hero Title')}</h1>
                    <p className="team-hero-subtitle">{t('Team Hero Subtitle')}</p>
                </div>
            </section>

            {/* Team Intro */}
            <section className="team-intro">
                <div className="intro-container">
                    <p className="section-desc centered-desc">
                        {t('Team Intro')}
                    </p>
                </div>
            </section>

            {/* Founder Section (Full Width Featured) */}
            <section className="founder-section">
                <div className="founder-container">
                    <div className="founder-image-col">
                        <div className="founder-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundImage: "url('/images/hero-v3.jpg')" }}></div>
                        </div>
                    </div>
                    <div className="founder-text-col">
                        <span className="member-label">{t('Founder Label')}</span>
                        <h2 className="member-name">{t('CEO Title')}</h2>
                        <p className="member-quote">{t('CEO Quote')}</p>
                        <div className="member-bio">
                            <p>{t('CEO Bio 1')}</p>
                            <p>{t('CEO Bio 2')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Member (Managing Director - Side by Side) */}
            <section className="featured-member-section">
                <div className="featured-container">
                    <div className="featured-text-col">
                        <span className="member-label">{t('MD Label')}</span>
                        <h2 className="member-name">{t('James Name')}</h2>
                        <div className="member-bio">
                            <p>{t('James Bio 1')}</p>
                            <p>{t('James Bio 2')}</p>
                        </div>
                    </div>
                    <div className="featured-image-col">
                        <div className="featured-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundImage: "url('/images/hero-image.jpg')" }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Grid */}
            <section className="team-grid-section">
                <div className="team-grid-header">
                    <h2>{t('Core Team Title')}</h2>
                    <div className="header-line"></div>
                </div>
                <div className="team-container">

                    {/* Team Member 1 */}
                    <div className="team-card">
                        <div className="team-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundColor: '#F3F4F6' }}></div>
                        </div>
                        <div className="team-info">
                            <h3 className="team-name">{t('Sarah Name')}</h3>
                            <p className="team-role">Head of Operations</p>
                            <p className="team-bio">
                                {t('Sarah Bio')}
                            </p>
                        </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="team-card">
                        <div className="team-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundColor: '#F3F4F6' }}></div>
                        </div>
                        <div className="team-info">
                            <h3 className="team-name">{t('David Name')}</h3>
                            <p className="team-role">Technical Director</p>
                            <p className="team-bio">
                                {t('David Bio')}
                            </p>
                        </div>
                    </div>

                    {/* Team Member 3 */}
                    <div className="team-card">
                        <div className="team-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundColor: '#F3F4F6' }}></div>
                        </div>
                        <div className="team-info">
                            <h3 className="team-name">{t('Elena Name')}</h3>
                            <p className="team-role">Safety (HSE) Manager</p>
                            <p className="team-bio">
                                {t('Elena Bio')}
                            </p>
                        </div>
                    </div>

                    {/* Team Member 4 */}
                    <div className="team-card">
                        <div className="team-img-wrapper">
                            <div className="team-img-placeholder" style={{ backgroundColor: '#F3F4F6' }}></div>
                        </div>
                        <div className="team-info">
                            <h3 className="team-name">{t('Marcus Name')}</h3>
                            <p className="team-role">Fleet Manager</p>
                            <p className="team-bio">
                                {t('Marcus Bio')}
                            </p>
                        </div>
                    </div>

                </div>

            </section>

            {/* CTA Section */}
            <section className="join-team-cta">
                <h2 className="cta-title">{t('Join Team Title')}</h2>
                <p className="cta-subtitle">{t('Join Team Subtitle')}</p>
                <Link to="/careers" className="btn-join-team">{t('See Openings')}</Link>
            </section>
        </div>
    );
};

export default Team;
