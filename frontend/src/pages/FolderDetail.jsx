import { useState, useEffect } from "react";
import { getCardsByFolder } from "../services/cardService";
import { getFolder } from "../services/folderService";
import { getStudySessionByFolder } from "../services/studySessionService.js";
import '../index.css'
import { ArrowLeft, Plus, Trash2, BookOpen, Loader2 } from 'lucide-react'

import CardCreateModal from "../components/CardCreateModal.jsx";
import CreateStudySessionModal from "../components/CreateStudySessionModal.jsx";

import { useNavigate, useParams } from "react-router-dom";
function FolderDetail() {
    const { folderId } = useParams();
    const [cards, setCards] = useState([]);
    const [folder, setFolder] = useState(null);
    const [studySession, setStudySession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
    const navigate = useNavigate();

    const fetchCards = async () => {

        try {
            const cardsData = await getCardsByFolder(folderId);
            setCards(cardsData);
        }
        catch (error) {
            console.error('Error fetching cards:', error);
        }

    }

    const fetchFolder = async () => {

        try {
            const folderData = await getFolder(folderId);
            setFolder(folderData);
        }
        catch (error) {
            console.error('Error fetching folder:', error);
        }
        finally {
            setLoading(false);
        }

    }

    const fetchStudySession = async () => {

        try {
            const studySessionData = await getStudySessionByFolder(folderId);
            setStudySession(studySessionData);
        }

        catch(error) {

            console.error('Error fetching study session:', error)

        }

    }

    useEffect(() => {
        fetchFolder();
        fetchCards();
        fetchStudySession();
    }, [folderId]);

    const handleCardCreated = async () => {
        await fetchCards();
    }

    const handleCardClicked = (cardId) => {
        if (!cardId) {
            return;
        }
        else {
            navigate(`/card/${cardId}`);

        }
    }

    const handleStudySessionCreated = async () => {
        await fetchStudySession();
    }

    return (

        <div className="overflow-hidden min-h-screen items-center bg-[#F5F5F5] p-4 scroll-smooth">

            <div className="mb-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between gap-4 pb-5">

                        {loading ?
                            <Loader2 className="mx-auto animate-spin text-[#EEA2AD]" 
                            size={32}/> 
                            : (

                                <div className="flex items-center gap-4">
                                    <ArrowLeft className="text-[#EEA2AD] cursor-pointer items-center"
                                    size={26} onClick={() => window.history.back()} />
                                    <h3 className="text-[#EEA2AD] text-3xl font-bold"> {folder?.nome} </h3>
                                </div>
                            )
                        }

                        <div className="flex items-center gap-4">
                            <button
                            title="Criar cards"
                            className="text-[#EEA2AD] font-bold w-10 h-10 flex items-center justify-center rounded-full
                            hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                            onClick={() => setIsCardModalOpen(true)}>
                                <Plus size={24}/>
                            </button>

                            <button
                            title="Excluir pasta"
                            className="text-[#EEA2AD] font-bold w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300">
                                <Trash2 size={24}/>
                            </button>


                        </div>

                    </div>

                </div>
            </div>

            <div className="mb-6 max-w-6xl mx-auto">

                <div className="rounded-xl shadow-md bg-white py-8 px-6">

                    <div className="flex items-center justify-between pb-5">

                        <h3 className="text-[#EEA2AD] text-3xl font-bold">
                            Cards ({cards.length})
                        </h3>

                        <button
                        title="Sessão de Estudo"
                        className="text-[#FA8072] font-bold w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                        onClick={() => setIsStudyModalOpen(true)} >
                            <BookOpen size={24}/>
                        </button>

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {loading ? (
                            <Loader2 className="mx-auto animate-spin text-[#EEA2AD]" size={32}/>
                        ) : (

                            cards.map(card => (

                                <div key={card.id_card}
                                className=" w-full h-full backface-hidden rounded-lg shadow-lg p-6 flex items-center justify-center
                                bg-linear-to-br from-[#EEA2AD] to-[#FA8072] text-white
                                hover:scale-105 transition-transform duration-300">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{card.pergunta}</h4>
                                </div>

                            ))
                        )}

                    </div>

                </div>

            </div>

            <CardCreateModal
                isModalOpen={isCardModalOpen}
                setIsModalOpen={setIsCardModalOpen}
                folderId={folderId}
                onCardCreated={handleCardCreated}
            />

            <CreateStudySessionModal
                isModalOpen={isStudyModalOpen}
                setIsModalOpen={setIsStudyModalOpen}
                folderId={folderId}
                onCardCreated={handleStudySessionCreated}
             />

        </div>

    )
}

export default FolderDetail