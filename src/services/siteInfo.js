import { config } from '../config';

export const fetchSiteInfo = async () => {
    const token = localStorage.getItem('supabaseToken');
    const headers = {
        'apikey': config.supabaseAnonKey
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${config.supabaseUrl}/rest/v1/site_info?select=*`, {
        headers: headers
    });
    if (!response.ok) throw new Error('Failed to fetch site info');
    return response.json();
};

export const updateSiteInfo = async (id, value) => {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/site_info?id=eq.${id}`, {
        method: 'PATCH',
        headers: {
            'apikey': config.supabaseAnonKey,
            'Authorization': `Bearer ${localStorage.getItem('supabaseToken')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info_value: value })
    });
    if (!response.ok) throw new Error('Failed to update site info');
    return response.json();
};

export const addSiteInfo = async (key, value) => {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/site_info`, {
        method: 'POST',
        headers: {
            'apikey': config.supabaseAnonKey,
            'Authorization': `Bearer ${localStorage.getItem('supabaseToken')}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ info_key: key, info_value: value })
    });
    if (!response.ok) throw new Error('Failed to add site info');
    return true;
};

export const deleteSiteInfo = async (id) => {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/site_info?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
            'apikey': config.supabaseAnonKey,
            'Authorization': `Bearer ${localStorage.getItem('supabaseToken')}`
        }
    });
    if (!response.ok) throw new Error('Failed to delete site info');
    return true;
};
