import { useState } from "react";
import { createStudySession } from "../services/studySessionService";
import { Shuffle, X } from "lucide-react";

function CreateStudySessionModal({ isModalOpen, setIsModalOpen, folderId, onStudySessionCreated }) {
    const [newStudySession, setNewStudySession] = useState(null)

    const handleCreateStudySession = async () => {
        if (!newStudySession) {
            alert('Create the study session')
            return
        }

        try {
            await createStudySession(folderId);
            await onStudySessionCreated();

            setNewStudySession(null);
            setIsModalOpen(false);

        }

        catch (error) {
            console.error('Error creating Study Session', error)
            alert('Failed to create Study Session, please try again')
        }
    }

    return (
        <div>

            { isModalOpen && (

            <div className="fixed inset-0 bg-opacity-50 max-w-4xl flex items-center justify-center p-4">
                <div className="flex flex-col gap-4 w-full max-w-ml">

                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-ml">

                            <div className="flex justify-between">

                                <h3 className="text-3xl font-bold mb-4">
                                Sessão de estudos
                                </h3>

                                <X 
                                className="items-center"
                                size={20}/>

                            </div>

                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-ml">

                            <div className="flex flex-col justify-center gap-4">

                                <p className="text-2xl font-bold mb-4">
                                    Configure sua sessão de estudos
                                </p>

                                <input
                                type="range"
                                min={1}
                                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                >
                                </input>

                                <p
                                className="mt-5 text-xl font-semibold">
                                    Selecione a Dificuldade:
                                </p>

                                <div className="flex items-center gap-4 w-full">

                                    <button
                                    className="flex-1 px-4 py-2 font-medium
                                    rounded-lg bg-gray-200">
                                        Todos
                                    </button>

                                    <button
                                    className="flex-1 px-4 py-2 font-medium
                                    rounded-lg bg-gray-200">
                                        Fácil
                                    </button>

                                    <button
                                    className="flex-1 px-4 py-2 font-medium
                                    rounded-lg bg-gray-200">
                                        Médio
                                    </button>

                                    <button
                                    className="flex-1 px-4 py-2 font-medium
                                    rounded-lg bg-gray-200">
                                        Díficil
                                    </button>

                                </div>

                                <div
                                className="flex items-center justify-between p-4 mt-5 bg-gray-200 rounded-lg shadow-lg">

                                    <div
                                    className="flex items-center gap-3 p-6 w-full">

                                        <Shuffle
                                        className="w-5 h-5 text-gray-600"/>
                                        <div>
                                            <p className="font-medium text-gray-700">Embaralhar Cards</p>
                                            <p className="text-gray-600 text-sm">Os cards serão embaralhados em ordem aleatória</p>
                                        </div>

                                    </div>
                                    <label
                                    className="relative inline-flex items-center cursor-pointer">
                                        <input
                                        type="checkbox"
                                        className="sr-only peer">
                                        </input>
                                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:inset-s-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                    </label>
                                </div>

                        </div>

                    </div>

                </div>

            </div>

            )}

        </div>
    )
}

export default CreateStudySessionModal;