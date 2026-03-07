import Home from "./pages/Home"
import FolderDetail from "./pages/FolderDetail"
import CardStudy from "./pages/CardStudy"
import { Routes, Route } from 'react-router-dom'

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/folders/:folderId" element= {<FolderDetail />} />
      <Route path="/study/:studyId" element={<CardStudy />} />
    </Routes>

  )
}

export default App