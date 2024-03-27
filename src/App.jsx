import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Board from './components/Board';
import Register from './components/Register';
import ErrorPage from './components/ErrorPage';
import Modal from './components/Modal';
import QuestionPage from './components/QuestionPage';
import AnswerModal from './components/AnswerModal';
import { Routes, Route } from 'react-router-dom';
import EditAnswerModal from './components/EditAnswerModal';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='board' element={<Board />}/>
          <Route path='board/:id' element={<QuestionPage />}/>
          <Route path='register' element={<Register />}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
        <div className="img">
          
        </div>
      </main>
      <Footer />
      <Modal />
      <AnswerModal />
      <EditAnswerModal />
    </>
  );
}

export default App;
