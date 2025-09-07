import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, role, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); //  redirect after logout
  };

  //  Protect route: redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h3" mb={2}>
        Welcome, {user?.name} ({role})
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
