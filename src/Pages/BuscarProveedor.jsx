import { useState } from "react";
import { Box, Paper, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BuscarProveedor = () => {
  const [rut, setRut] = useState("");
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setProveedor(null);
    try {
      const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al buscar proveedor");
      const data = await response.json();
      if (data.listaEmpresas && data.listaEmpresas.length > 0) {
        setProveedor(data.listaEmpresas[0]);
      } else {
        setError("Proveedor no encontrado.");
      }
    } catch (err) {
      setError("Error al buscar proveedor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        mt: { xs: "56px", md: "64px" },
        p: { xs: 2, md: 4 },
        maxWidth: { xs: "100%", md: 700 },
        mx: "auto",
        width: "100%",
      }}
    >
      {/* Título fuera del Paper */}
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
        Buscar Proveedor por RUT
      </Typography>
      <Paper
        sx={{
          p: { xs: 2, md: 3 },
          mb: { xs: 2, md: 3 },
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mb: 2,
            justifyContent: "center",
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
            label="RUT Empresa Proveedor"
            value={rut}
            onChange={e => setRut(e.target.value)}
            fullWidth
            size="small"
            sx={{
              background: "#fff",
              borderRadius: 1,
            }}
          />
          <Button
            variant="contained"
            onClick={handleBuscar}
            disabled={loading || !rut}
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
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && <Alert severity="error">{error}</Alert>}
      </Paper>
      {proveedor && (
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            mb: 2,
            backgroundColor: "#f5faff",
            boxShadow: 2,
            border: "1.5px solid #90caf9",
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1rem", md: "1.2rem" }, color: "#1976d2", fontWeight: "bold" }}>
            Información del Proveedor
          </Typography>
          <Typography sx={{ fontSize: 15 }}>
            <b>Código Empresa:</b> {proveedor.CodigoEmpresa}
          </Typography>
          <Typography sx={{ fontSize: 15 }}>
            <b>Nombre Empresa:</b> {proveedor.NombreEmpresa}
          </Typography>
        </Paper>
      )}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </Box>
    </Box>
  );
};

export default BuscarProveedor;