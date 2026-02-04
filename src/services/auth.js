import { config } from '../config';

// Step 1: Login Request
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${config.supabaseUrl}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error_description || data.msg || 'Login failed');
        }

        // Return access_token and user info
        return data;
    } catch (error) {
        throw error;
    }
};

// Step 3 & 4: Get User Role and Verify
export const verifyAdminRole = async (userId, accessToken) => {
    try {
        // Fetch user details from the 'User' table finding by auth_id
        // Note: The screenshots suggest checking the 'User' table where auth_id == USER_ID
        const response = await fetch(`${config.supabaseUrl}/rest/v1/User?auth_id=eq.${userId}&select=role`, {
            method: 'GET',
            headers: {
                'apikey': config.supabaseAnonKey,
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch user role');
        }

        if (data.length === 0) {
            throw new Error('User record not found');
        }

        const userRole = data[0].role;

        // Check if role is admin
        return userRole === 'admin';
    } catch (error) {
        console.error("Role Verification Error:", error);
        return false;
    }
};

// Helper to save session
export const saveSession = (accessToken, user) => {
    localStorage.setItem('admin_access_token', accessToken);
    localStorage.setItem('admin_user', JSON.stringify(user));
};

export const clearSession = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_user');
};

export const getSession = () => {
    return localStorage.getItem('admin_access_token');
};
