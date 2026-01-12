import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { HomePage, FoundationPage } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wb-foundation" element={<FoundationPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

