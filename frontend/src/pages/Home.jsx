import { useEffect, useState } from "react";

import { getFolders } from "../services/folderService";
import { getAccuracyByFolder } from "../services/reviewService";

import { useNavigate } from "react-router-dom";
import { Folder } from 'lucide-react'

function Home() {
    const [folders, setFolders] = useState([]);
    const [accuracy, setAccuracy] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFolders = async () => {
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
        }


        fetchFolders()

    }, []);

  return (

    <div>

        {folders.map(folder => (
            <div key={folder.id_pasta} onClick={() => navigate(`/folders/${folder.id_pasta}`)}>
                <Folder />
                <span>{folder.nome}</span>
                <span>{accuracy[folder.id_pasta] ? `Accuracy: ${accuracy[folder.id_pasta]}%` : 'No reviews yet'}</span>
            </div>
        ))}

    </div>

  ); 
}

    
export default Home