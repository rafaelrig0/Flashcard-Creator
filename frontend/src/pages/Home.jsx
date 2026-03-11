import { useEffect, useState } from "react";

import { getFolders } from "../services/folderService";
import { getAccuracyByFolder, getAccuracyToday, getAccuracyByWeek } from "../services/reviewService";

import { useNavigate } from "react-router-dom";
import { Folder, Loader2, Plus, Trash2 } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis, Label } from 'recharts'
import '../index.css'

function Home() {
    const [folders, setFolders] = useState([]);
    const [loadingFolders, setLoadingFolders] = useState(true);
    const [accuracy, setAccuracy] = useState([]);
    const [loadingAccuracy, setLoadingAccuracy] = useState(true);
    const [accuracyGeral, setAccuracyGeral] = useState(null);
    const [selectedDate, setSelectedDate] = useState('today');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchFolders = async () => {
            setLoadingFolders(true);
            setLoadingAccuracy(true);

            try {
                const foldersData = await getFolders();
                console.log('Fetched folders:', foldersData);
                setFolders(foldersData);

                const accuracyData = {}
                for (const folder of foldersData) {
                    const reviewsData = await getAccuracyByFolder(folder.id_pasta);
                    accuracyData[folder.id_pasta] = reviewsData;
                }

                setAccuracy(accuracyData);

            }
            
            catch (error) {
                console.error('Error fetching folders:', error);
            }

            finally {
                setLoadingFolders(false);
                setLoadingAccuracy(false);
            }

        }


        fetchFolders()

    }, []);

    useEffect(() => {

        const fetchAccuracyByDate = async () => {
            setLoadingAccuracy(true);

            if (selectedDate === 'today') {

                try {
                    const accuracyToday = await getAccuracyToday();
                    setAccuracyGeral(accuracyToday)
                }

                catch (error) {
                    console.error('Error fetching accuracy today:', error);
                }

                finally {
                    setLoadingAccuracy(false)
                }

            }

            else {

                try {
                    const accuracyByWeek = await getAccuracyByWeek();
                    setAccuracyGeral(accuracyByWeek)
            }

            catch (error) {
                console.error('Error fetching accuracy by week:', error);
            }

            finally {
                setLoadingAccuracy(false)
            }
        }
    }

        fetchAccuracyByDate();

    }, [selectedDate]);

    const chartData = [{ value: accuracyGeral ? accuracyGeral.percentage : 0 }]
    const color = accuracyGeral ?
    (accuracyGeral.percentage >= 80 ? '#FF69B4' : (accuracyGeral.percentage >= 55 ? '#FFB6C1' : '#FFE4E1')) : '#FFF0F5';

    const chartConfig = {
    width: 500,
    height: 300,
    innerRadius: "80%",
    outerRadius: "60%",
    data: chartData,
    startAngle: 180,
    endAngle: 0
}

  return (

    <div id="home" className="overflow-hidden min-h-screen items-center bg-[#F5F5F5] p-4 scroll-smooth">

        <div className="mb-6 max-w-6xl mx-auto">
            <div className="rounded-xl shadow-md bg-white py-8 flex flex-col items-center ">
                {loadingAccuracy 
                    ? <Loader2 className="mx-auto animate-spin text-[#EEA2AD]" size={32} />  
                    : (
                        <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}
                            className="p-2 border border-gray-200 rounded-md outline-none focus:border-pink-300 cursor-pointer">
                            <option value="today">Hoje</option>
                            <option value="week">Semana</option>
                        </select>
                    )
                }

                <span className="py-3 text-center text-3xl text-[#FFAEB9] font-bold">
                {accuracyGeral
                    ? `${accuracyGeral.percentage}% - ${accuracyGeral.correct} de ${accuracyGeral.total} acertos`
                    : "No reviews yet"}
                </span>


            <RadialBarChart {...chartConfig} className="mx-auto">
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar dataKey="value" fill={color} background={[{ fill: '#B5B5B5' }]} />

                    <Label value={accuracyGeral ? `${accuracyGeral.percentage}%` : 'No reviews yet'}
                    position="center" className="text-2xl font-bold" />

            </RadialBarChart>
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
                            onClick={() => navigate('/create-folder')}
                            className="w-10 h-10 flex items-center justify-center text-[#EEA2AD] rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                        >
                            <Plus size={20} />
                        </button>

                        <button
                            id="exclude-folder"
                            onClick={() => navigate('/exclude-folder')}
                            className="w-10 h-10 flex items-center justify-center text-[#ff0026] rounded-full hover:scale-110 hover:bg-gray-100 transition-all duration-300"
                        >
                            <Trash2 size={20} />
                        </button>

                    </div>

                </div>

                {loadingFolders ? (
                <Loader2 className="animate-spin mx-auto" />
                ) : (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {folders.map(folder => (

                    <div
                        key={folder.id_pasta}
                        onClick={() => navigate(`/folders/${folder.id_pasta}`)}
                        className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl cursor-pointer group hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 hover:shadow-md"
                    >
                        <Folder size={40} className="text-[#EEA2AD] group-hover:scale-110 transition-transform"/>

                        <span className="text-base">
                        {folder.nome}
                        </span>

                        <span className="text-sm font-semibold">
                        {accuracy[folder.id_pasta]
                            ? `${accuracy[folder.id_pasta]}%`
                            : "No reviews"}
                        </span>

                    </div>

                    ))}
                </div>

                )}

            </div>
        </div>

    </div>

  ); 
}

    
export default Home