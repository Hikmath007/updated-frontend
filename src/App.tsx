import React from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import { Router } from "wouter";
import { Box } from "@mui/material";
import AppRoutes from "./services/routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Box
          p={"85px 20px 20px 85px"}
          bgcolor={"#F8FAFB"}
          height="calc(100vh - 105px)"
        >
          <AppRoutes />
        </Box>
      </Router>
    </div>
  );
}

export default App;
