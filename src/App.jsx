import { Route, Routes, Link } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyDashboard } from './pages/ToyDashboard.jsx'
import { About } from './pages/About.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'

function App() {
    return (
        <div className="main-app">
            <AppHeader />
            <main className="container">
                <Routes>
                    <Route path="/" element={<h1>Welcome to MisterToy</h1>} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/edit" element={<ToyEdit />} />
                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/toy/dashboard" element={<ToyDashboard />} />
                    <Route path="/toy/about" element={<About />} />
                    <Route path="/login" element={<LoginSignup />} />
                </Routes>
            </main>
            <UserMsg />
        </div>
    )
}

export default App