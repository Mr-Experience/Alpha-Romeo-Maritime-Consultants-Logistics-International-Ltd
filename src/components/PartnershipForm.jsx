import React, { useState } from 'react';
import { useTranslation } from '../context/TranslationContext';
import { submitProposal } from '../services/proposals';

const PartnershipForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        companyName: '',
        representativeName: '',
        email: '',
        phone: '',
        serviceInterest: 'logistics',
        message: ''
    });
    const [status, setStatus] = useState(''); // idle, sending, success, error

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            await submitProposal(formData);

            // Success
            setStatus('success');
            setFormData({
                companyName: '',
                representativeName: '',
                email: '',
                phone: '',
                serviceInterest: 'logistics',
                message: ''
            });

            // Auto-clear success message after 5s
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error('Error submitting proposal:', error);
            setStatus('error');
            alert(`Error: ${error.message}`);
        }
    };


    return (
        <div className="page-wrapper">
            {/* Reusing existing Hero styles or a simple header */}
            <div style={{ paddingTop: '120px', paddingBottom: '40px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '32px', fontWeight: '700', color: '#000000', marginBottom: '16px' }}>
                    {t('Partnership Heading') || 'Build with Alpha Romeo'}
                </h1>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: '#5B5F64', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    {t('Partnership Subheading') || 'Expand your maritime reach through a strategic alliance with our global network.'}
                </p>
            </div>

            <div className="partners-form-section">
                <div className="form-card">
                    <form onSubmit={handleSubmit} className="partnership-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label>{t('Label Company')}</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder={t('Placeholder Company')}
                                    className="standard-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('Label Representative')}</label>
                                <input
                                    type="text"
                                    name="representativeName"
                                    value={formData.representativeName}
                                    onChange={handleChange}
                                    placeholder={t('Placeholder Representative')}
                                    className="standard-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('Label Email')}</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('Placeholder Email')}
                                    className="standard-input"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('Label Phone')}</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('Placeholder Phone')}
                                    className="standard-input"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{t('Label Interest')}</label>
                            <select
                                name="serviceInterest"
                                value={formData.serviceInterest}
                                onChange={handleChange}
                                className="standard-select"
                            >
                                <option value="logistics">{t('Option Shipping')}</option>
                                <option value="technical">{t('Option Technical')}</option>
                                <option value="security">{t('Option Security')}</option>
                                <option value="marketplace">{t('Option Marketplace')}</option>
                                <option value="other">{t('Option Other')}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>{t('Label Message')}</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={t('Placeholder Message')}
                                className="standard-textarea"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="standard-btn"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? t('Sending') : t('Partnership Btn')}
                        </button>

                        {status === 'success' && (
                            <div className="form-success-message">
                                {t('Partnership Success')}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PartnershipForm;
