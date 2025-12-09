import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

/**
 * App Component - Root component dengan routing dan provider
 * Implementasi:
 * - Router untuk navigasi multi-halaman
 * - BookProvider untuk state management global
 * - Layout untuk konsistensi UI di seluruh halaman
 */
function App() {
  return (
    <BookProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </Layout>
      </Router>
    </BookProvider>
  );
}

export default App;
