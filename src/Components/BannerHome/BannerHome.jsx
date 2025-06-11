import { Box } from "@mui/material";
import { motion } from "framer-motion";

const BannerHome = ({ children }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
      sx={{
        
        width: "100%",
        minHeight: { xs: 180, md: 320, lg: 380, }, // Altura adaptable
        
        background: "#00296b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, md: 10 },
        py: { xs: 4, md: 8 },

        mt: { xs: 7, md: 10 }, 
        mb: { xs: 4, md: 10 },
        borderRadius: { xs: 0, md: 4 },
        boxShadow: { xs: 1, md: 3 },
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default BannerHome;