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

export async function getAccuracyToday() {

    try {
        const response = await api.get(`/reviews/accuracy/date/today`);
        return response.data;
    }
    
    catch (error) {
        console.error('Error fetching reviews by data:', error);
        throw error;
    }

}

export async function getAccuracyByWeek() {

    try {
        const response = await api.get(`/reviews/accuracy/date/week`);
        return response.data;
    }
    
    catch (error) {
        console.error('Error fetching reviews by week:', error);
        throw error;
    }

}