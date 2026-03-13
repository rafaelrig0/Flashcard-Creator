import { useEffect, useState } from "react";

import { getFolders } from "../services/folderService";
import { getAccuracyToday, getAccuracyByWeek } from "../services/reviewService";

import { useNavigate } from "react-router-dom";
import { Loader2, Plus, Trash2 } from 'lucide-react'

import '../index.css'
import FolderCard from "../components/FolderCard.jsx";
import AccuracyChart from "../components/AccuracyChart.jsx";
import CreateFolderModal from "../components/CreateFolderModal.jsx";
import DeleteFolderModal from "../components/DeleteFolderModal.jsx";

function Home() {
    const [folders, setFolders] = useState([]);
    const [loadingFolders, setLoadingFolders] = useState(true);
    const [loadingAccuracy, setLoadingAccuracy] = useState(true);
    const [accuracyGeral, setAccuracyGeral] = useState(null);
    const [selectedDate, setSelectedDate] = useState('today');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const navigate = useNavigate();
    const fetchFolders = async () => {
            try {
                setLoadingFolders(true);
                const foldersData = await getFolders();
                setFolders(foldersData);
            }
            
            catch (error) {
                console.error('Error fetching folders:', error);
            }

            finally {
                setLoadingFolders(false);
            }

        }
    const accuracyServices = {
        today: getAccuracyToday,
        week: getAccuracyByWeek
    }
    const fetchAccuracy = async () => {

        try {
            setLoadingAccuracy(true);
            const service = accuracyServices[selectedDate];
            if (!service) return;

            const accuracyData = await service();
            setAccuracyGeral(accuracyData);
        }
        catch (error) {
            console.error('Error fetching accuracy:', error);
        }
        finally {
            setLoadingAccuracy(false);
        }
    }

    useEffect(() => {
        fetchAccuracy();
    }, [selectedDate]);

    useEffect(() => {
        fetchFolders()
    }, []);

    const handleFolderClick = (folder) => {
        if (deleteMode) {
            setFolderToDelete(folder);
            setDeleteModalOpen(true);
        } else {
            navigate(`/folders/${folder.id_pasta}`);
        }
    };


  return (

    <div id="home" className="overflow-hidden min-h-screen items-center bg-[#F5F5F5] p-4 scroll-smooth">

        <div className=" mb-4 max-w-6xl mx-auto">
            <div className="rounded-xl shadow-md bg-white flex flex-col items-center ">
                <div className="pt-5">
                    <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}
                        className="p-2 border border-gray-200 rounded-md outline-none focus:border-pink-300 cursor-pointer">
                            <option value="today">Hoje</option>
                            <option value="week">Semana</option>
                        </select>
                </div>


                {loadingAccuracy 
                    ? <Loader2 className="mx-auto animate-spin text-[#EEA2AD]" size={32} />  
                    : (
                        <div className="pt-5">
                            <span className="py-3 text-center text-3xl text-[#FFAEB9] font-bold">
                            {accuracyGeral
                                ? `${accuracyGeral.percentage}% - ${accuracyGeral.correct} de ${accuracyGeral.total} acertos`
                                : "No reviews yet"}
                            </span>
                        </div>
                    )
                }

                <div className="overflow-hidden w-full h-64 py-5">
                    <AccuracyChart accuracyData={accuracyGeral} loading={loadingAccuracy} />
                </div>

            </div>
        </div>


        <div className="mb-6 max-w-6xl mx-auto">
            <div className="rounded-xl shadow-md bg-white py-8 px-6">

                <div className="flex items-center justify-between pb-5">

                    <h2 className="text-[#EEA2AD] text-2xl font-semibold">
                        Pastas
                    </h2>

                    <div className="flex items-center gap-2">

                        <button
                            id="create-folder"
                            onClick={() => setIsModalOpen(true)}
                            className="w-10 h-10 flex items-center justify-center text-[#EEA2AD] rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                        >
                            <Plus size={24} />
                        </button>

                        <button
                            id="exclude-folder"
                            onClick={() => setDeleteMode(!deleteMode)}
                            className={`w-10 h-10 flex items-center justify-center text-[#ff0026] rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300
                                ${deleteMode ? "bg-red-100 text-red-500" : "text-[#ff0026] hover:bg-gray-100"}`}
                        >
                            <Trash2 size={24} />
                        </button>

                    </div>

                </div>

                {loadingFolders ? (
                <Loader2 className="animate-spin mx-auto" />
                ) : (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {folders.map(folder => (
                        <FolderCard
                        key={folder.id_pasta}
                        folder={folder}
                        deleteMode={deleteMode}
                        onClick={() => handleFolderClick(folder)}
                        />

                    ))}
                </div>

                )}

            </div>
        </div>

        <CreateFolderModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onFolderCreated={fetchFolders}
        />

        <DeleteFolderModal
            isOpen={deleteModalOpen}
            folderId={folderToDelete?.id_pasta}
            folderName={folderToDelete?.nome}
            onConfirm={() => {
                setFolders(prev => prev.filter(f => f.id_pasta !== folderToDelete?.id_pasta));
                setDeleteModalOpen(false);
                setDeleteMode(false); }}
            onCancel={() => setDeleteModalOpen(false)}
        />

    </div>

  ); 
}

    
export default Home