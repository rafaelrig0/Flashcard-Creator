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

export async function getFolder(id_pasta) {
    try {
        const response = await api.get(`/folders/${id_pasta}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching folder:', error);
        throw error;
    }
}

export async function createFolder(folderName) {

    try {
        const response = await api.post('/folders/', { nome: folderName });
        return response.data;
    }

    catch (error) {
        console.error('Error creating folder:', error);
        throw error;
    }

}

export async function deleteFolder(folderId) {

    try {
        const response = await api.delete(`/folders/${folderId}`);
        return response.data;
    }

    catch (error) {
        console.error('Error deleting folder:', error);
        throw error;
    }

}