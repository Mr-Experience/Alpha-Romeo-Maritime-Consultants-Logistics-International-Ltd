import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { operationsData } from '../data/operationsData';
import { ArrowLeft, Call, Sms, Information, CloseCircle, Home2, Edit } from 'iconsax-react';
import { fetchSiteInfo } from '../services/siteInfo';
import { fetchMarketplaceItems } from '../services/marketplace';
import { config } from '../config';
import emailjs from '@emailjs/browser';

const MarketplaceDetail = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const [item, setItem] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [sitePhone, setSitePhone] = useState('+2348066184330');
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
        loadItemDetails();
    }, [id]);

    const loadItemDetails = async () => {
        try {
            setLoading(true);

            // Fetch site info for phone number
            try {
                const info = await fetchSiteInfo();
                const phoneItem = info.find(i => i.info_key === 'phone_primary');
                if (phoneItem) setSitePhone(phoneItem.info_value);
            } catch (err) { console.error("Site info fetch skip", err); }

            // Fetch marketplace items for navigation
            const dynamicItems = await fetchMarketplaceItems();
            const all = [...operationsData, ...dynamicItems.map(di => ({
                id: di.id,
                category: di.category,
                title: di.title,
                description: di.description,
                image: di.image_url || '/images/hero-v3.jpg',
                gallery: di.gallery || [di.image_url].filter(Boolean),
                tags: di.category === 'sale' ? [t('Marketplace Available'), t('Tag Marketplace')] : [t('Marketplace Featured')],
                price: di.price ? (di.price.toString().startsWith('₦') ? di.price : `₦${di.price}`) : null,
                availability: di.availability || t('Immediate'),
                location: di.location || t('Default Location'),
                dynamicTags: di.tags ? di.tags.split(',').map(t => t.trim()) : []
            }))];
            setAllItems(all);

            const foundItem = all.find(op => op.id.toString() === id);
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
        // Logic for handling other inputs if needed
    };

    if (loading) {
        return (
            <div className="detail-loading-container">
                <div className="loader"></div>
                <p>{t('Marketplace Loading')}</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="detail-error-container">
                <h2>{t('Item Not Found')}</h2>
                <p>{t('Item Error Desc')}</p>
                <Link to="/marketplace" className="back-btn-solid">
                    <ArrowLeft size="18" /> {t('Back to Marketplace')}
                </Link>
            </div>
        );
    }

    return (
        <div className="marketplace-detail-page" style={{ backgroundColor: '#fff' }}>
            {/* Page Header / Back Button Only */}
            <div style={{ borderBottom: '1px solid #eee', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
                <div className="detail-container" style={{ display: 'flex', alignItems: 'center', padding: '16px 20px' }}>
                    <Link to="/marketplace" style={{ color: '#001F3F', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                        <ArrowLeft size="18" /> {t('Back')}
                    </Link>
                </div>
            </div>

            <section className="detail-main-content" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
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
                        <div className="info-card">
                            <div style={{ marginBottom: '20px' }}>
                                <span className="detail-category-tag" style={{ backgroundColor: '#E6F1FF', color: '#0056b3', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>{item.category.toUpperCase()}</span>
                                <h1 className="detail-title" style={{ fontSize: '24px', marginTop: '8px', marginBottom: '4px', color: '#001F3F' }}>{item.title}</h1>
                                {item.price && <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#00B341' }}>{item.price.toString().startsWith('₦') ? item.price : `₦${item.price}`}</div>}
                            </div>

                            <h3><Information size="20" variant="Bulk" color="#001F3F" /> {t('Item Description')}</h3>
                            <p className="description-text">{item.longDescription || item.description}</p>

                            <div className="specifications-list">
                                <h4>{t('Key Specifications')}</h4>
                                <ul>
                                    <li><strong>{t('Label Category')}</strong> {item.category}</li>
                                    <li><strong>{t('Label Availability')}</strong> {item.availability || t('Immediate')}</li>
                                    <li><strong>{t('Label Location')}</strong> {item.location || t('Default Location')}</li>
                                    {item.dynamicTags && item.dynamicTags.length > 0 ? (
                                        <li><strong>{t('Label Tags')}</strong> {item.dynamicTags.join(', ')}</li>
                                    ) : item.tags && item.tags.length > 0 && (
                                        <li><strong>{t('Label Tags')}</strong> {item.tags.join(', ')}</li>
                                    )}
                                </ul>
                            </div>

                            <div className="inquiry-actions">
                                <Link
                                    to={`/marketplace-inquiry/${item.id}`}
                                    className="action-btn-primary"
                                    style={{ border: 'none', cursor: 'pointer', fontSize: '16px', padding: '16px 32px', textDecoration: 'none', display: 'flex', width: '100%', borderRadius: '8px' }}
                                >
                                    <Sms size="20" variant="Bulk" /> {t('Send Inquiry Detail')}
                                </Link>
                            </div>
                        </div>

                        <div className="support-card-mini">
                            <img src="/images/support-rep.jpg" alt="Support Rep" className="rep-avatar" />
                            <div>
                                <h5>{t('Maritime Consultant')}</h5>
                                <p>{t('Consultant Ready')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MarketplaceDetail;
