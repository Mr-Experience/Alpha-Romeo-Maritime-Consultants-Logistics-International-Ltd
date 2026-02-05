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
export const submitMessage = async (payload) => {
    try {
        const response = await fetch(`${config.supabaseUrl}/rest/v1/contact_messages`, {
            method: 'POST',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to send message');
        }

        return true;
    } catch (error) {
        console.error('Submission Error:', error);
        throw error;
    }
};
