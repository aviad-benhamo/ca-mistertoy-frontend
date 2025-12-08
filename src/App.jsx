import { Route, Routes, Link } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'

function App() {
    return (
        <div className="main-app">
            <header className="app-header">
                <section className="header-container">
                    <h1>MisterToy</h1>
                    <nav>
                        <Link to="/toy">Toys</Link> |
                        <Link to="/toy/edit">Add Toy</Link>
                    </nav>
                </section>
            </header>

            <main className="container">
                <Routes>
                    <Route path="/" element={<h1>Welcome to MisterToy</h1>} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/edit" element={<ToyEdit />} />
                    <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                </Routes>
            </main>
        </div>
    )
}

export default App