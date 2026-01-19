import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage, FoundationPage, PrivacyPage, TermsPage, ProjectsPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wb-foundation" element={<FoundationPage />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
        <Route path="/regulamin" element={<TermsPage />} />
        <Route path="/projekty" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

