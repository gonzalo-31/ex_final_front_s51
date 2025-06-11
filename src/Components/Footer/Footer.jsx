import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      width: "100%",
      py: 2,
      px: 1,
      mt: "auto",
      background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
      color: "#fff",
      textAlign: "center",
      boxShadow: 3,
    }}
  >
    <Typography variant="body2">
      © {new Date().getFullYear()} LicitaSeguro. Todos los derechos reservados.
    </Typography>
  </Box>
);

export default Footer;