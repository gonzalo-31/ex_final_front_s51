import { useState } from "react";
import { Box, Typography, CircularProgress, Alert, TextField, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const DetalleLicitacion = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState("");
  const [detalle, setDetalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuscar = async () => {
    setLoading(true);
    setError(null);
    setDetalle(null);
    try {
      const response = await fetch(
        `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigo}&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`
      );
      const data = await response.json();
      if (data && data.Listado && data.Listado.length > 0) {
        setDetalle(data.Listado[0]);
      } else {
        setError("No se encontró la licitación.");
      }
    } catch (err) {
      setError("Error al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const compradorColumns = [
    { field: "campo", headerName: "", width: 180 },
    { field: "valor", headerName: "", width: 320 },
  ];

  const compradorRows =
    detalle && detalle.Comprador
      ? [
          { id: 1, campo: "Codigo Organismo", valor: detalle.Comprador.CodigoOrganismo },
          { id: 2, campo: "Nombre Organismo", valor: detalle.Comprador.NombreOrganismo },
          { id: 3, campo: "Rut Unidad", valor: detalle.Comprador.RutUnidad },
          { id: 4, campo: "Codigo Unidad", valor: detalle.Comprador.CodigoUnidad },
          { id: 5, campo: "Nombre Unidad", valor: detalle.Comprador.NombreUnidad },
          { id: 6, campo: "Dirección Unidad", valor: detalle.Comprador.DireccionUnidad },
          { id: 7, campo: "Comuna Unidad", valor: detalle.Comprador.ComunaUnidad },
          { id: 8, campo: "Region Unidad", valor: detalle.Comprador.RegionUnidad },
          { id: 9, campo: "Rut Usuario", valor: detalle.Comprador.RutUsuario },
          { id: 10, campo: "Codigo Usuario", valor: detalle.Comprador.CodigoUsuario },
          { id: 11, campo: "Nombre Usuario", valor: detalle.Comprador.NombreUsuario },
          { id: 12, campo: "Cargo Usuario", valor: detalle.Comprador.CargoUsuario },
        ]
      : [];

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
      
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.2rem", md: "1.5rem" },
          textAlign: "center",
          mb: 3,
          fontWeight: "bold", 
        }}
      >
        Buscar Licitación por Código
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
            label="Código Externo"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
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
            disabled={loading || !codigo}
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

      {detalle && (
        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            mb: 2,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: { xs: "1.1rem", md: "1.4rem" }, textAlign: "center" }}
          >
            {detalle.Nombre}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ textAlign: "center" }}>
            Código: {detalle.CodigoExterno}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detalle.Descripcion}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Estado:</b> {detalle.Estado}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <b>Fecha de Cierre:</b>{" "}
            {detalle.Fechas?.FechaCierre
              ? detalle.Fechas.FechaCierre.slice(0, 10) + " " + detalle.Fechas.FechaCierre.slice(11, 16)
              : detalle.FechaCierre}
          </Typography>
          {detalle.Comprador && (
            <>
              <Typography variant="h6" sx={{ mt: 2, mb: 2, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                Información del Comprador
              </Typography>
                <Box sx={{ height: { xs: 320, md: 350 }, width: "100%", overflowX: "auto" }}>
                <DataGrid
                  rows={compradorRows}
                  columns={compradorColumns}
                  hideFooter
                  disableColumnMenu
                  disableRowSelectionOnClick
                  rowHeight={28}
                  headerHeight={10}
                  localeText={{ noRowsLabel: "Sin información" }}
                  sx={{
                    
                    "& .MuiDataGrid-row:nth-of-type(even)": {
                      backgroundColor: "#f5faff",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: 14,
                    },
                    borderRadius: 2,
                    boxShadow: 2,
                    border: "1.5px solid #90caf9",
                  }}
                />
              </Box>
            </>
          )}
          {detalle.Items && detalle.Items.Listado && detalle.Items.Listado.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 4, mb: 2, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                Detalle de Ítems Adjudicados
              </Typography>
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <DataGrid
                  autoHeight
                  rows={detalle.Items.Listado.map((item, idx) => ({
                    id: idx + 1,
                    Correlativo: item.Correlativo,
                    NombreProducto: item.NombreProducto,
                    Descripcion: item.Descripcion,
                    UnidadMedida: item.UnidadMedida,
                    Cantidad: item.Cantidad,
                    RutProveedor: item.Adjudicacion?.RutProveedor || "",
                    NombreProveedor: item.Adjudicacion?.NombreProveedor || "",
                    CantidadAdjudicada: item.Adjudicacion?.Cantidad || "",
                    MontoUnitario: item.Adjudicacion?.MontoUnitario
                      ? `$${item.Adjudicacion.MontoUnitario.toLocaleString("es-CL")}`
                      : "",
                  }))}
                  columns={[
                    { field: "Correlativo", headerName: "#", width: 40 },
                    { field: "NombreProducto", headerName: "Producto", width: 180 },
                    { field: "Descripcion", headerName: "Descripción", width: 220 },
                    { field: "UnidadMedida", headerName: "Unidad", width: 70 },
                    { field: "Cantidad", headerName: "Cantidad", width: 70 },
                    { field: "RutProveedor", headerName: "RUT Proveedor", width: 120 },
                    { field: "NombreProveedor", headerName: "Proveedor", width: 180 },
                    { field: "CantidadAdjudicada", headerName: "Adjudicado", width: 90 },
                    { field: "MontoUnitario", headerName: "Monto Unitario", width: 120 },
                  ]}
                  hideFooter
                  disableColumnMenu
                  disableRowSelectionOnClick
                  localeText={{ noRowsLabel: "Sin ítems adjudicados" }}
                  sx={{
                   
                    "& .MuiDataGrid-row:nth-of-type(even)": {
                      backgroundColor: "#f5faff",
                    },
                    "& .MuiDataGrid-row:hover": {
                      backgroundColor: "#e3f2fd",
                    },
                    "& .MuiDataGrid-cell": {
                      fontSize: 14,
                    },
                    borderRadius: 2,
                    boxShadow: 2,
                    border: "1.5px solid #90caf9",
                  }}
                />
              </Box>
            </>
          )}
        </Paper>
      )}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          onClick={() => navigate("/")}
        >
          Regresar
        </Button>
      </Box>
    </Box>
  );
};

export default DetalleLicitacion;