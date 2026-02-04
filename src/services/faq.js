// FAQ Service - localStorage persistence for FAQ management
// Can be migrated to backend API later

const FAQ_STORAGE_KEY = 'romeo_alpha_faqs';

// Default FAQs to display if no custom FAQs exist
const defaultFaqs = [
    {
        id: 1,
        question: 'What maritime services does Romeo Alpha offer?',
        answer: 'Romeo Alpha provides comprehensive maritime services including vessel chartering, offshore support, marine security escort services, ship brokerage, cargo logistics, fleet management, and oil & gas offshore operations across coastal and international waters.'
    },
    {
        id: 2,
        question: 'What areas do you operate in?',
        answer: 'We operate globally across major shipping routes and offshore locations. Our primary coverage includes West African waters, the Gulf of Guinea, Mediterranean Sea, and international shipping lanes connecting Africa, Europe, and the Americas.'
    },
    {
        id: 3,
        question: 'How do I request a quote for your services?',
        answer: 'You can request a quote by clicking the "Get Quotes" button on our website, contacting us via email, or calling our 24/7 operations center. Our team typically responds within 24 hours with a detailed proposal tailored to your specific requirements.'
    },
    {
        id: 4,
        question: 'What types of vessels are in your fleet?',
        answer: 'Our fleet includes offshore support vessels (OSVs), anchor handling tugs (AHTS), platform supply vessels (PSVs), crew boats, tugboats, and security escort vessels. All vessels are modern, well-maintained, and comply with international maritime standards.'
    },
    {
        id: 5,
        question: 'Do you provide 24/7 operational support?',
        answer: 'Yes, we maintain round-the-clock operations with our dedicated support team available 24/7. Our operations center monitors all active vessels and can respond to emergencies or schedule changes at any time.'
    },
    {
        id: 6,
        question: 'What safety certifications do you hold?',
        answer: 'Romeo Alpha holds ISM Code certification, ISO 9001:2015 for quality management, and complies with SOLAS, MARPOL, and ISPS Code requirements. Our crews are certified according to STCW standards and undergo regular safety training.'
    },
    {
        id: 7,
        question: 'How can I partner with Romeo Alpha?',
        answer: 'We welcome partnerships with shipping companies, oil & gas operators, and maritime service providers. Contact our business development team through our Contact page to discuss collaboration opportunities and strategic alliances.'
    }
];

// Get all FAQs from storage
export const getFaqs = () => {
    try {
        const stored = localStorage.getItem(FAQ_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
        // Return defaults if no stored FAQs
        return defaultFaqs;
    } catch (error) {
        console.error('Error loading FAQs:', error);
        return defaultFaqs;
    }
};

// Save FAQs array to storage
export const saveFaqs = (faqs) => {
    try {
        localStorage.setItem(FAQ_STORAGE_KEY, JSON.stringify(faqs));
        return true;
    } catch (error) {
        console.error('Error saving FAQs:', error);
        return false;
    }
};

// Add a new FAQ item
export const addFaq = (faq) => {
    const faqs = getFaqs();
    const newFaq = {
        ...faq,
        id: Date.now(), // Use timestamp as unique ID
        createdAt: new Date().toISOString()
    };
    faqs.push(newFaq);
    saveFaqs(faqs);
    return newFaq;
};

// Update an existing FAQ
export const updateFaq = (id, updatedFaq) => {
    const faqs = getFaqs();
    const index = faqs.findIndex(faq => faq.id === id);
    if (index !== -1) {
        faqs[index] = { ...faqs[index], ...updatedFaq, updatedAt: new Date().toISOString() };
        saveFaqs(faqs);
        return faqs[index];
    }
    return null;
};

// Delete a FAQ by ID
export const deleteFaq = (id) => {
    const faqs = getFaqs();
    const filtered = faqs.filter(faq => faq.id !== id);
    saveFaqs(filtered);
    return true;
};

// Reset to default FAQs
export const resetToDefaults = () => {
    saveFaqs(defaultFaqs);
    return defaultFaqs;
};
