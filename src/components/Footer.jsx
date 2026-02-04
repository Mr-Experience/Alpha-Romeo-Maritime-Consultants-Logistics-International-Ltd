import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { config } from '../config';

const Footer = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('sending');
        setErrorMessage('');

        try {
            const response = await fetch(`${config.supabaseUrl}/rest/v1/newsletter_subscriptions`, {
                method: 'POST',
                headers: {
                    'apikey': config.supabaseAnonKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ email, created_at: new Date().toISOString() })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to subscribe');
            }

            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error('Subscription Error:', err);
            setStatus('error');
            setErrorMessage(err.message);
        }
    };

    return (
        <footer className="footer-section">
            <div className="footer-main-group" style={{ borderTop: 'none' }}>
                <div className="footer-col">
                    <h3>{t('Footer Subscribe Heading')}</h3>
                    <form className="footer-newsletter-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder={t('Email Placeholder')}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={status === 'sending' || status === 'success'}
                                required
                            />
                            <button type="submit" disabled={status === 'sending' || status === 'success'}>
                                {status === 'sending' ? t('Sending') : t('Footer Subscribe Btn')}
                            </button>
                        </div>
                    </form>
                    {status === 'success' && (
                        <p style={{ color: '#00B341', fontSize: '13px', marginTop: '8px' }}>
                            {t('Partnership Success')}
                        </p>
                    )}
                    {status === 'error' && (
                        <p style={{ color: '#dc3545', fontSize: '13px', marginTop: '8px' }}>
                            {errorMessage || 'Something went wrong. Please try again.'}
                        </p>
                    )}
                </div>
                <div className="footer-col footer-col-middle">
                    <h3>{t('Footer Business Heading')}</h3>
                    <ul className="footer-services-list">
                        <li><Link to="/#services">{t('Footer Link What')}</Link></li>
                        <li><Link to="/fleets">{t('Footer Link Fleets')}</Link></li>
                        <li><Link to="/#offshore">{t('Footer Link Offshore')}</Link></li>
                        <li><Link to="/#security">{t('Footer Link Security')}</Link></li>
                        <li><Link to="/#charter">{t('Footer Link Charter')}</Link></li>
                        <li><Link to="/#banner">{t('Footer Link Partnership')}</Link></li>
                    </ul>
                </div>
                <div className="footer-col footer-col-middle">
                    <h3>{t('Footer Know Heading')}</h3>
                    <ul className="footer-services-list">
                        <li><Link to="/about">{t('Footer Link About')}</Link></li>
                        <li><Link to="/#insights">{t('Footer Link News')}</Link></li>
                        <li><Link to="/careers">{t('Footer Link Careers')}</Link></li>
                        <li><Link to="/contact">{t('Footer Link Contact')}</Link></li>
                        <li><Link to="/admin-login">Login</Link></li>
                    </ul>
                </div>
            </div>

            <div className="scroll-top-btn" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <span>{t('Scroll Top')}</span>
            </div>

            <div className="footer-secondary-group">
                <span>{t('Footer Address')}</span>
            </div>
            <div className="copyright-group">
                <span>{t('Copyright')}</span>
            </div>
        </footer>
    );
};

export default Footer;
