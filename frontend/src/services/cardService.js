import { api } from './api'

export async function createCard(id_pasta, pergunta, resposta) {

    try {
        const response = await api.post('/cards', {
            id_pasta: folderId,
            pergunta: frontText,
            resposta: backText,
            color: cardColor,
            dificuldade: difficulty
        });
        return response.data;
    }

    catch (error) {
        console.error('Error creating card:', error);
        throw error;
    }
}

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