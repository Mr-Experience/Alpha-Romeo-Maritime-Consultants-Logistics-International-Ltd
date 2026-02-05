import { translations } from '../translations';
import { fetchSiteInfo } from '../services/siteInfo';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');
    const [overrides, setOverrides] = useState({});

    useEffect(() => {
        const loadOverrides = async () => {
            try {
                const data = await fetchSiteInfo();
                const overrideMap = {};
                data.forEach(item => {
                    // Try to match key exactly or case-insensitively
                    overrideMap[item.info_key] = item.info_value;
                });
                setOverrides(overrideMap);
            } catch (err) {
                console.error("Translation overrides failed:", err);
            }
        };
        loadOverrides();
    }, []);

    const t = (key) => {
        // 1. Check if we have a Supabase override for this exact key
        if (overrides[key]) {
            return overrides[key];
        }

        // 2. Fallback to local translation dictionary
        if (translations[language] && translations[language][key]) {
            return translations[language][key];
        }
        return key;
    };

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        }
    };

    return (
        <TranslationContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
