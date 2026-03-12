import { useState } from "react";
import { createFolder } from "../services/folderService";


function CreateFolderModal({ isModalOpen, setIsModalOpen, onFolderCreated }) {
    const [newFolderName, setNewFolderName] = useState('');

    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) {
            alert('Please enter a folder name');
            return;
        }
    
        try {
            await createFolder(newFolderName);
            await onFolderCreated();
    
            setNewFolderName('');
            setIsModalOpen(false);
    
        }
    
        catch (error) {
            console.error('Error creating folder:', error);
            alert('Failed to create folder. Please try again.');
        }
    }


    return (
        <div>
            {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl p-6 shadow-xl">
                    <h3 className="text-xl font-semibold text-gray-800 pb-4">Nova Pasta</h3>
                    <input 
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
                        placeholder="Nome da pasta"
                    />
                    <div className="flex justify-center gap-4">
                    <button
                     className="bg-[#EEA2AD] border border-pink-300 text-white px-4 py-2 rounded-md hover:bg-pink-300 transition-colors duration-200"
                     onClick={handleCreateFolder}>Criar</button>

                    <button
                     className="bg-[#CD5C5C] border border-[#CD5C5C] text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-200"
                     onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    </div>
                </div>
            </div>
        )}

        </div>
    )
}

export default CreateFolderModal;