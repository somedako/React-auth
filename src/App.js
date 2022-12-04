import { Routes, Route } from 'react-router-dom';
import AddComment from './pages/AddComment/AddComment';
import Home from './pages/Home/Home';
import MyAccount from './pages/MyAccount/MyAccount';
import Header from './layout/Header/Header';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [user, setUser] = useState({});
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user')) !== null) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);
    return (
        <div className="App">
            <Header user={user} setUser={setUser} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/addcomment" element={<AddComment />} />
            </Routes>
        </div>
    );
}

export default App;
