import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BannerHome from "../Components/BannerHome/BannerHome";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <BannerHome>
        <Paper
          elevation={4}
          sx={{
            background: "rgba(255, 255, 255, 0.99)",
            borderRadius: 3,
            boxShadow: 3,
            p: 3,
            textAlign: "center",
            maxWidth: 900,
            margin: "0 0 0 32px",
          }}
        >
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
            Bienvenido al Portal de Licitaciones
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
            Consulta y filtra licitaciones del Mercado Público de manera sencilla.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mt: 4,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)",
                  color: "#fff",
                },
                borderRadius: 2,
                px: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
              onClick={() => navigate("/licitaciones")}
            >
              Ver Licitaciones
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)",
                  color: "#fff",
                },
                borderRadius: 2,
                px: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
              onClick={() => navigate("/filtrarlicitaciones")}
            >
              Filtrar Licitaciones
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)",
                  color: "#fff",
                },
                borderRadius: 2,
                px: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
              onClick={() => navigate("/detallelicitacion")}
            >
              Detalles de Licitación
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 0%, #1976d2 100%)",
                  color: "#fff",
                },
                borderRadius: 2,
                px: 4,
                fontSize: { xs: "1rem", md: "1.1rem" },
              }}
              onClick={() => navigate("/buscar-proveedor")}
            >
              Buscar Proveedor por RUT
            </Button>
          </Box>
        </Paper>
      </BannerHome>
    </Box>
  );
};

export default Home;