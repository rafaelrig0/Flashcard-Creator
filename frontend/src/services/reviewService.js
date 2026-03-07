import { api } from './api'

export async function getAccuracyByFolder(id_pasta) {

    try {
        const response = await api.get(`/reviews/accuracy/folder/${id_pasta}`);
        return response.data;
    }
    
    catch (error) {
        console.error('Error fetching reviews by folder:', error);
        throw error;
    }

}