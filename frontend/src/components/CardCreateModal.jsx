import { useState } from "react";
import { createCard } from "../services/cardService";

function CardCreateModal({ isModalOpen, setIsModalOpen, folderId, onCardCreated }) {
    const [frontText, setFrontText] = useState('');
    const [backText, setBackText] = useState('');
    const [cardColor, setCardColor] = useState('#EEA2AD');

    const handleCreateCard = async () => {
        if (!frontText.trim() || !backText.trim()) {
            alert('Please enter text for both sides of the card');
            return;
        }

        try {
            await createCard(folderId, frontText, backText);
            await onCardCreated();

            setFrontText('');
            setBackText('');
            setIsModalOpen(false);
        }

        catch (error) {
            console.error('Error creating card:', error);
            alert('Failed to create card. Please try again.');
        }
    }

    return (

        <div>

            {isModalOpen && (

                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4">

                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            Novo Card
                        </h3>

                        <div className="space-y-4 mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pergunta
                            </label>
                            <textarea
                                value={frontText}
                                onChange={(e) => setFrontText(e.target.value)}
                                className=" w-full h-15 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={3}
                                autoFocus
                                placeholder="  Digite a pergunta ou termo..."
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Resposta
                            </label>
                            <textarea
                                value={backText}
                                onChange={(e) => setBackText(e.target.value)}
                                className="w-full h-15 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                rows={3}
                                placeholder="  Digite a resposta ou definição..."
                            />

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cor do card
                            </label>
                            <input
                                type="color"
                                value={cardColor}
                                className="w-10 h-10 rounded cursor-pointer border-none"
                                onChange={(e) => setCardColor(e)}
                            />

                        </div>

                        <div className="flex justify-between gap-2">
                            <button
                                onClick={handleCreateCard}
                                className="px-4 py-2 bg-[#EEA2AD] text-white rounded-md hover:bg-pink-400 hover:text-bold"
                            >
                                Criar Card
                            </button>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-500 hover:text-white"
                            >
                                Cancelar
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>

    )
}

export default CardCreateModal;