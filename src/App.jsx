import { Box } from "@mui/material";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Licitaciones from "./Pages/Licitaciones";
import FiltrarLicitaciones from "./Pages/FiltrarLicitaciones";
import BuscarProveedor from "./Pages/BuscarProveedor";

import DetalleLicitacion from "./Pages/DetalleLicitacion";
import Home from "./Pages/Home";


function App() {
  return (
    <Router>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/licitaciones" element={<Licitaciones />} />
            <Route path="/detallelicitacion" element={<DetalleLicitacion />} />
            <Route path="/filtrarlicitaciones" element={<FiltrarLicitaciones />} />
            <Route path="/buscar-proveedor" element={<BuscarProveedor />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;


