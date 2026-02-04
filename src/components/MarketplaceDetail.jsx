import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { operationsData } from '../data/operationsData';
import { fetchMarketplaceItems } from '../services/marketplace';
import { ArrowLeft, Call, Sms, Information, CloseCircle, Home2 } from 'iconsax-react';
import { config } from '../config';
import emailjs from '@emailjs/browser';

const MarketplaceDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        loadItemDetails();
    }, [id]);

    const loadItemDetails = async () => {
        try {
            setLoading(true);
            // Search in static data first
            let foundItem = operationsData.find(op => op.id.toString() === id);

            if (!foundItem) {
                // Search in dynamic data
                const dynamicItems = await fetchMarketplaceItems();
                const dynamicItem = dynamicItems.find(di => di.id.toString() === id);
                if (dynamicItem) {
                    foundItem = {
                        id: dynamicItem.id,
                        category: dynamicItem.category,
                        title: dynamicItem.title,
                        description: dynamicItem.description,
                        image: dynamicItem.image_url || '/images/hero-v3.jpg',
                        gallery: [dynamicItem.image_url].filter(Boolean),
                        tags: dynamicItem.category === 'sale' ? ['Available', 'Marketplace'] : ['Featured'],
                        price: dynamicItem.price
                    };
                }
            }

            if (foundItem) {
                setItem(foundItem);
                setActiveImage(foundItem.image);
            }
        } catch (error) {
            console.error("Error loading item details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `Inquiry: ${item.title} (ID: ${item.id})`;

        try {
            // 1. Save to Supabase Dashboard
            const supabasePromise = fetch(`${config.supabaseUrl}/rest/v1/contact_messages`, {
                method: 'POST',
                headers: {
                    'apikey': config.supabaseAnonKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    full_name: formData.name,
                    email: formData.email,
                    subject: subject,
                    message: formData.message
                })
            }).then(async res => {
                if (!res.ok) {
                    const error = await res.json();
                    throw new Error(`Dashboard Error: ${error.message || res.statusText}`);
                }
                return res;
            });

            // 2. Send to Zoho Mail via EmailJS
            const emailjsPromise = emailjs.send(
                config.emailjsServiceId,
                config.emailjsTemplateId,
                {
                    name: formData.name,
                    email: formData.email,
                    subject: subject,
                    message: formData.message,
                    time: new Date().toLocaleString(),
                    to_email: 'info@Alpharomeo.com'
                },
                config.emailjsPublicKey
            ).catch(err => {
                throw new Error(`Email Error: ${err.text || err.message || 'Failed to send email'}`);
            });

            await Promise.all([supabasePromise, emailjsPromise]);

            alert(t('Form Success Alert') || 'Message sent successfully!');
            setShowModal(false);
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            console.error('Submission Error:', error);
            alert(`Oops! ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="detail-loading-container">
                <div className="loader"></div>
                <p>Loading item details...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="detail-error-container">
                <h2>Item Not Found</h2>
                <p>The marketplace item you're looking for doesn't exist or has been removed.</p>
                <Link to="/marketplace" className="back-btn-solid">
                    <ArrowLeft size="18" /> Back to Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="marketplace-detail-page">
            <section className="detail-hero">
                <div className="detail-container">
                    <div className="breadcrumb-wrapper">
                        <Link to="/" className="breadcrumb-link">
                            <Home2 size="16" variant="Bold" />
                            <span>Home</span>
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <Link to="/marketplace" className="breadcrumb-link">
                            <span>Marketplace</span>
                        </Link>
                        <span className="breadcrumb-separator">/</span>
                        <span className="breadcrumb-current">{item.title}</span>
                    </div>

                    <div className="detail-header">
                        <div>
                            <span className="detail-category-tag">{item.category.toUpperCase()}</span>
                            <h1 className="detail-title">{item.title}</h1>
                        </div>
                        {item.price && <div className="detail-price-tag">{item.price}</div>}
                    </div>
                </div>
            </section>

            <section className="detail-main-content">
                <div className="detail-container">
                    <div className="detail-grid">
                        {/* Gallery Section */}
                        <div className="detail-gallery-column">
                            <div className="main-display-image">
                                <img src={activeImage} alt={item.title} />
                            </div>
                            {item.gallery && item.gallery.length > 1 && (
                                <div className="thumbnail-grid">
                                    {item.gallery.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className={`thumbnail-item ${activeImage === img ? 'active' : ''}`}
                                            onClick={() => setActiveImage(img)}
                                        >
                                            <img src={img} alt={`${item.title} thumbnail ${idx + 1}`} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="detail-info-column">
                            <div className="info-card">
                                <h3><Information size="20" variant="Bulk" color="#001F3F" /> Item Description</h3>
                                <p className="description-text">{item.longDescription || item.description}</p>

                                <div className="specifications-list">
                                    <h4>Key Specifications</h4>
                                    <ul>
                                        <li><strong>Category:</strong> {item.category}</li>
                                        <li><strong>Availability:</strong> Immediate</li>
                                        <li><strong>Location:</strong> Port Harcourt, Nigeria</li>
                                        {item.tags && item.tags.length > 0 && (
                                            <li><strong>Tags:</strong> {item.tags.join(', ')}</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="inquiry-actions">
                                    <h4>Interested in this item?</h4>
                                    <div className="action-buttons">
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="action-btn-primary"
                                            style={{ border: 'none', cursor: 'pointer', fontSize: '16px' }}
                                        >
                                            <Sms size="18" /> Send Inquiry
                                        </button>
                                        <a href="tel:+2348066184330" className="action-btn-secondary">
                                            <Call size="18" /> Call Support
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="support-card-mini">
                                <img src="/images/support-rep.jpg" alt="Support Rep" className="rep-avatar" />
                                <div>
                                    <h5>Maritime Consultant</h5>
                                    <p>Ready to assist with your procurement.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry Modal */}
            {
                showModal && (
                    <div className="inquiry-modal-overlay">
                        <div className="inquiry-modal-content">
                            <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                                <CloseCircle size="24" color="#FF8A65" />
                            </button>

                            <h3>Inquire about {item.title}</h3>
                            <p className="modal-subtitle">Fill out the form below and our team will get back to you regarding this vessel.</p>

                            <form onSubmit={handleSubmit} className="inquiry-modal-form">
                                <div className="form-group-modal">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="form-group-modal">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div className="form-group-modal">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        value={`Inquiry: ${item.title}`}
                                        disabled
                                        className="disabled-input"
                                    />
                                </div>

                                <div className="form-group-modal">
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="I am interested in this vessel..."
                                        rows="4"
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-inquiry-btn" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default MarketplaceDetail;
