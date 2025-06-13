import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HEADER_HEIGHT = 56; 

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
        boxShadow: 3,
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: HEADER_HEIGHT, md: 64 },
          px: { xs: 1, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            width: "100%",
          }}
        >
          <img
            src="/img/logo.png"
            alt="Logo"
            style={{
              height: 34,
              width: 34,
              minWidth: 28,
              maxWidth: 40,
              marginRight: 10,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #fff",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              letterSpacing: 2,
              textShadow: "1px 1px 2px #00000055",
              fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.7rem" },
              userSelect: "none",
            }}
          >
            LicitaSeguro
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
