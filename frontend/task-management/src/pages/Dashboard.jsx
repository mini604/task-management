import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container, Typography } from "@mui/material";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h3" mb={2}>
        Welcome, {user?.name}
      </Typography>
      <Typography variant="h6" mb={4}>
        Role: {user?.role}
      </Typography>
      <Button variant="contained" color="error" onClick={logout}>
        Logout
      </Button>
    </Container>
  );
};

export default Dashboard;
