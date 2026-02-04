import { config } from '../config';
import { getSession } from './auth';

export const fetchAds = async () => {
    try {
        const response = await fetch(`${config.supabaseUrl}/rest/v1/promotional_ads?select=*&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch ads');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching ads:", error);
        throw error;
    }
};

export const addAd = async (ad) => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/promotional_ads`, {
            method: 'POST',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(ad)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add ad');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding ad:", error);
        throw error;
    }
};

export const deleteAd = async (id) => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/promotional_ads?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete ad');
        }

        return true;
    } catch (error) {
        console.error("Error deleting ad:", error);
        throw error;
    }
};
