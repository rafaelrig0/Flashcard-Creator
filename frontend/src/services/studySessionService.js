import { api } from "./api";

export async function createStudySession(folderId) {

    try {

        const response = await api.post('/study/', {folderId});
        return response.data;

    }

    catch (error) {
        console.error('Error creating Study Session', error)
        throw error;
    }

}

export async function getStudySessionByFolder(folderId) {
    
    try {

        const response = await api.get(`/study/${folderId}`);
        return response.data;

    }

    catch (error) {

        console.error('Error fetching data', error)
        throw error;

    }
}

export async function getAllStudySessions() {

    try {

        const response = await api.get('/study/');
        return response.data;

    }

    catch (error) {

        console.error('Error fetching data', error)
        throw error;

    }
    
}

export async function updateFinished(sessionId) {

    try {

        const response = await api.put(`/study/${sessionId}/finish`);
        return response.data;

    }

    catch(error) {

        console.error('Error updating data', error)
        throw error;

    }
    
}