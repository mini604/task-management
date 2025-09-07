import { useState, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee"); // default role
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiClient.post("/auth/signup", {
        name,
        email,
        password,
        role,
      });

      // Backend should return { token, user: { name, email, role } }
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          background: "linear-gradient(to bottom, #fff, #f8f9fa)",
        }}
      >
        <Typography variant="h4" align="center" mb={3} fontWeight="bold" color="primary">
          Create an Account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            required
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ Role Dropdown */}
          <TextField
            select
            label="Role"
            fullWidth
            required
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", borderRadius: 2 }}
          >
            Sign Up
          </Button>
        </form>

        <Typography mt={3} align="center" color="text.secondary">
          Already have an account?{" "}
          <a href="/" style={{ textDecoration: "none", color: "#1976d2", fontWeight: "bold" }}>
            Login
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
