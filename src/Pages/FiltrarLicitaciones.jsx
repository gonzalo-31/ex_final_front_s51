import React, { useState } from "react";
import { Box, Typography, Container,Paper, TextField, MenuItem, Button, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Codigo Externo", width: 120 },
  { field: "Nombre", headerName: "Nombre", width: 350 },
  { field: "CodigoEstado", headerName: "Estado", width: 150 },
  { field: "FechaCierre", headerName: "Fecha Cierre", width: 180 },
];

const estados = [
  { value: "", label: "" },
  { value: "publicada", label: "Publicada" },
  { value: "cerrada", label: "Cerrada" },
  { value: "adjudicada", label: "Adjudicada" },
  { value: "desierta", label: "Desierta" },
  { value: "revocada", label: "Revocada" },
  { value: "suspendida", label: "Suspendida" },
];

const localeText = { noRowsLabel: "No hay licitaciones disponibles" };

const estadoMap = {
  5: "Publicada",
  6: "Cerrada",
  7: "Desierta",
  8: "Adjudicada",
  15: "Revocada",
  19: "Suspendida",
};

const FiltrarLicitaciones = () => {
  const [licitaciones, setLicitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);

    if (!fecha || !estado) {
      setOpenModal(true);
      setLoading(false);
      return;
    }

    try {
      const [yyyy, mm, dd] = fecha.split("-");
      const params = [
        `fecha=${dd}${mm}${yyyy}`,
        `estado=${estado}`,
        "ticket=AC3A098B-4CD0-41AF-81A5-41284248419B",
      ];
      const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?${params.join("&")}`;
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          textAlign: "center",
          mt: { xs: "56px", md: "64px" },
          p: { xs: 2, md: 4 },
        }}
      >
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
          Filtrar Licitaciones
        </Typography>
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            mb: { xs: 2, md: 3 },
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              mb: 2,
              alignItems: "center",
              background: "#f5faff",
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              border: "1px solid #90caf9",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            <TextField
              label="Fecha (dd-mm-aaaa)"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
              sx={{
                width: { xs: "100%", sm: 180 },
                background: "#fff",
                borderRadius: 1,
              }}
            />
            <TextField
              select
              label="Estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              size="small"
              sx={{
                width: { xs: "100%", sm: 150 },
                background: "#fff",
                borderRadius: 1,
              }}
              SelectProps={{
                MenuProps: { disablePortal: true },
              }}
            >
              {estados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              onClick={handleBuscar}
              sx={{
                height: 40,
                fontWeight: "bold",
                fontSize: 15,
                px: 3,
                boxShadow: 1,
                borderRadius: 1,
              }}
            >
              Buscar
            </Button>
          </Box>
        </Paper>
        <Paper sx={{ height: 500, width: "100%", mt: 2 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 200,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={licitaciones}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10]}
              localeText={localeText}
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
            />
          )}
        </Paper>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogTitle>Campos requeridos</DialogTitle>
          <DialogContent>
            Debes seleccionar una fecha y un estado para filtrar.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          variant="contained"
          sx={{ mb: 2, mt: 4 }}
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </Box>
    </Container>
  );
};

export default FiltrarLicitaciones;
