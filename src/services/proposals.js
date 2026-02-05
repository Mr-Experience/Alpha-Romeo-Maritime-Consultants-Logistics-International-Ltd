import { config } from '../config';
import { getSession } from './auth';

export const fetchProposals = async () => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/partnership_proposals?select=*&order=created_at.desc`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch proposals');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching proposals:", error);
        throw error;
    }
};

export const submitProposal = async (proposal) => {
    try {
        const response = await fetch(`${config.supabaseUrl}/rest/v1/partnership_proposals`, {
            method: 'POST',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                company_name: proposal.companyName,
                representative_name: proposal.representativeName,
                email: proposal.email,
                phone: proposal.phone,
                service_interest: proposal.serviceInterest,
                message: proposal.message
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit proposal');
        }

        return true;
    } catch (error) {
        console.error("Error submitting proposal:", error);
        throw error;
    }
};

export const deleteProposal = async (id) => {
    try {
        const token = getSession();
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`${config.supabaseUrl}/rest/v1/partnership_proposals?id=eq.${id}`, {
            method: 'DELETE',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete proposal');
        }

        return true;
    } catch (error) {
        console.error("Error deleting proposal:", error);
        throw error;
    }
};
