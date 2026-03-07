import { api } from './api'

export async function getFolders() {

    try {
        const response = await api.get('/folders/');
        return response.data;
    }
    
    catch (error) {
        console.error('Error fetching folders:', error);
        throw error;
    }

}