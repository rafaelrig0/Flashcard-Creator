import { useState, useEffect } from "react";
import { getCardsByFolder } from "../services/cardService";
import { getFolder } from "../services/folderService";
import '../index.css'
import { ArrowLeft, Plus, Trash2, BookOpen, Loader2 } from 'lucide-react'

import { useNavigate, useParams } from "react-router-dom";
function FolderDetail() {
    const { folderId } = useParams();
    const [cards, setCards] = useState([]);
    const [folder, setFolder] = useState(null);
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        fetchFolder();
        fetchCards();
    }, [folderId]);

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
                            <button className="text-[#EEA2AD] font-bold w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300">
                                <Plus size={24}/>
                            </button>

                            <button className="text-[#EEA2AD] font-bold w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300">
                                <Trash2 size={24}/>
                            </button>

                            <button className="text-[#FA8072] font-bold w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300" >
                                <BookOpen size={24}/>
                            </button>

                        </div>

                    </div>

                </div>
            </div>

            <div className="mb-6 max-w-6xl mx-auto">

                <div className="rounded-xl shadow-md bg-white py-8 px-6">

                </div>

            </div>

        </div>

    )
}

export default FolderDetail