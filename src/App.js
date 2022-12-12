import { StoreProvider } from './Providers/Store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Screens/Home';
import Article from './Screens/Article';
import Create from './Screens/ArticleCreate';
import Register from './Screens/Register';
import Login from './Screens/Login';

import Nav from './Components/Nav';

import './App.css';

function App() {

    return (
        <StoreProvider>
            <BrowserRouter>
                <div className='py-3 px-10'>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/articles/:id" element={<Article />} />
                        <Route path="/articles/create" element={<Create />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </StoreProvider>
    );

}

export default App;
