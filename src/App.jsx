import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Board from './components/Board';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='board' element={<Board />}/>
          <Route path='register' element={<Register />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
