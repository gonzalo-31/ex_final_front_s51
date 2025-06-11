import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, CircularProgress, Container, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Codigo Externo", width: 140 },
  { field: "Nombre", headerName: "Nombre", width: 350 },
  { field: "CodigoEstado", headerName: "Estado", width: 140 },
  { field: "FechaCierre", headerName: "Fecha Cierre", width: 180 },
];

const estadoMap = {
  5: "Publicada",
  6: "Cerrada",
  7: "Adjudicada",
  8: "Desierta",
  18: "Revocada",
  19: "Suspendida",
};

const paginationModel = { page: 0, pageSize: 20 };
const localeText = {
  noRowsLabel: "No hay licitaciones disponibles",
};

const Licitaciones = () => {
  const [licitaciones, setLicitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const fecha = `${dd}${mm}${yyyy}`;

        const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=activas&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al cargar datos");
        const data = await response.json();
        const rows = Array.isArray(data.Listado)
          ? data.Listado.map((item, idx) => ({
              id: item.CodigoExterno || idx,
              Nombre: item.Nombre || "",
              CodigoEstado: estadoMap[item.CodigoEstado] || item.CodigoEstado || "",
              FechaCierre: item.FechaCierre ? item.FechaCierre.slice(0, 10) : "",
            }))
          : [];
        setLicitaciones(rows);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: "center", mt: { xs: "56px", md: "64px" }, p: { xs: 2, md: 4 } }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            textAlign: "center",
            mb: 3,
          }}
        >
          Licitaciones Activas Mercado Público
        </Typography>
        <Paper sx={{ height: 600, width: "100%", mt: 4 }}>
          {loading ? (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={licitaciones}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[10, 20]}
              disableColumnMenu
              disableSelectionOnClick
              autoHeight={false}
              sx={{
                
                "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#f5faff",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#e3f2fd",
                },
                "& .MuiDataGrid-cell": {
                  fontSize: 15,
                },
                borderRadius: 2,
                boxShadow: 2,
                border: "1.5px solid #90caf9",
              }}
              localeText={localeText}
            />
          )}
        </Paper>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </Box>
    </Container>
  );
};

export default Licitaciones;