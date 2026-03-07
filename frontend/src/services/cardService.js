import { api } from './api'

export async function getCardsByFolder(id_pasta) {

    try {
        const response = await api.get(`/cards/folder/${id_pasta}`);
        return response.data;

    }
    
    catch (error) {
        console.error('Error fetching cards:', error);
        throw error;
    }

}