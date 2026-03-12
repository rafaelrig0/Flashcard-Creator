import { Folder } from "lucide-react";

function FolderCard({ folder, deleteMode, onClick }) {
    return (
        <div
            onClick={onClick}
                className={`flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl cursor-pointer group hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 hover:shadow-md
                ${deleteMode ? 'jiggle ring-2 ring-red-400' : ''}`}
        >
            <Folder size={40} className="text-[#EEA2AD] group-hover:scale-110 transition-transform"/>

            <span className="text-base">
                {folder.nome}
            </span>

            <span className="text-sm font-semibold">
                {folder.cards_count > 0
                    ? `${folder.cards_count} cards`
                    : "No cards yet"}

                {folder.accuracy !== null
                    ? ` | ${folder.accuracy}% acerto`
                    : " | No reviews yet"}
            </span>
        </div>
    );
}

export default FolderCard;