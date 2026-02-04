import { config } from '../config';
import { getSession } from './auth';

export const fetchMessages = async () => {
    try {
        const token = getSession();
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await fetch(`${config.supabaseUrl}/rest/v1/contact_messages?select=*&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch messages');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        throw error;
    }
};
