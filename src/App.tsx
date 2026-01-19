import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage, FoundationPage, PrivacyPage, TermsPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wb-foundation" element={<FoundationPage />} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
        <Route path="/regulamin" element={<TermsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

