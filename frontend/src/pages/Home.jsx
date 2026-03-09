import { useEffect, useState } from "react";

import { getFolders } from "../services/folderService";
import { getAccuracyByFolder, getAccuracyToday, getAccuracyByWeek } from "../services/reviewService";

import { useNavigate } from "react-router-dom";
import { Folder, Loader2 } from 'lucide-react'
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
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
    width: 200,
    height: 200,
    innerRadius: "60%",
    outerRadius: "80%",
    data: chartData,
    startAngle: 180,
    endAngle: 0
}

  return (

    <div className="min-h-screen bg-[#F5F5F5] p-4">

        {loadingAccuracy 
            ? <Loader2 className="animate-spin" />  
            : (
                <div>
                    <select onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
                        <option value="today">Hoje</option>
                        <option value="week">Semana</option>
                    </select>
                    <span>{accuracyGeral ? `${accuracyGeral.percentage}%` : 'No reviews yet'}</span>
                    <span>{accuracyGeral ? `${accuracyGeral.correct} de ${accuracyGeral.total} acertos` : ''}</span>
                </div>
            )
        }

        <RadialBarChart {...chartConfig} >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" fill={color} background={[{ fill: '#B5B5B5' }]} />
        </RadialBarChart>


        {loadingFolders ?
            <Loader2 className="animate-spin" />
            : (
                folders.map(folder => (
                    <div key={folder.id_pasta} onClick={() => navigate(`/folders/${folder.id_pasta}`)}>
                        <Folder />
                        <span>{folder.nome}</span>
                        <span>{accuracy[folder.id_pasta] ? `Accuracy: ${accuracy[folder.id_pasta]}%` : 'No reviews yet'}</span>
                    </div>

                ))
            )
        }

    </div>

  ); 
}

    
export default Home