import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './paginas/Home'
import Sobre from './paginas/Sobre'
import Contato from './paginas/Contato'
import Layout from './paginas/Layout';
import GuiaAlagamento from './paginas/GuiaSegurança';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/guiaSeguranca" element={<GuiaAlagamento />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
}

export default App
