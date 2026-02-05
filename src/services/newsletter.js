import { config } from '../config';
import { getSession } from './auth';

export const fetchNewsletterSubscriptions = async () => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/newsletter_subscriptions?select=*&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch subscriptions');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
    }
};

export const deleteNewsletterSubscription = async (id) => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/newsletter_subscriptions?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete subscription');
        }

        return true;
    } catch (error) {
        console.error("Error deleting subscription:", error);
        throw error;
    }
};
export const subscribeToNewsletter = async (email) => {
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

        return true;
    } catch (error) {
        console.error('Subscription Error:', error);
        throw error;
    }
};
