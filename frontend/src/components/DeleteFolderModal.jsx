import { deleteFolder } from '../services/folderService';

function DeleteFolderModal({ isOpen, folderName, folderId, onConfirm, onCancel }) {

    const handleDelete = async () => {
        try {
            await deleteFolder(folderId);
            console.log('Folder deleted succesfully')
            onConfirm();
        }
         catch (error) {
            console.error('Error deleting folder:', error);
            alert('Failed to delete folder. Please try again.');
        }
    };


    return (
        <div>
            {isOpen ? (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl p-6 shadow-xl">
                        <h3 className="text-xl font-semibold text-gray-800 pb-4">Deletar Pasta</h3>
                        <p className="mb-4">Tem certeza que deseja deletar a pasta "{folderName}"?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-[#CD5C5C] border border-[#CD5C5C] text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors duration-200"
                                onClick={handleDelete}>Deletar</button>
                        <button
                            className="bg-gray-300 border border-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                            onClick={() => onCancel()}>Cancelar</button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>

    )
}

export default DeleteFolderModal;