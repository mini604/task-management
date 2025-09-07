import { useState, useContext, useEffect } from "react";
import {
  TextField, Button, Container, Typography, Box, Alert,
  InputAdornment, IconButton, Card, CircularProgress
} from "@mui/material";
import {
  Visibility, VisibilityOff, Email,
  Lock, Login as LoginIcon, PersonAdd
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../../api/apiAuth"; // ✅ use common API

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Validate email format
  useEffect(() => {
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  }, [email]);

  // Validate password length
  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (emailError) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser(email, password); // ✅ API call
      login(data); // store in context
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          sx={{
            mt: 10,
            p: 4,
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            background: "linear-gradient(135deg, #ffffff, #f9fafb)",
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="center" mb={2}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <LoginIcon color="primary" sx={{ fontSize: 48 }} />
            </motion.div>
          </Box>

          <Typography variant="h4" align="center" fontWeight="bold" color="primary" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Sign in to continue to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              value={email}
              error={emailError}
              helperText={emailError ? "Please enter a valid email" : ""}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              margin="normal"
              value={password}
              error={passwordError}
              helperText={passwordError ? "Password must be at least 6 characters" : ""}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <Typography variant="body2" align="right" mt={1} mb={2}>
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
                Forgot password?
              </Link>
            </Typography>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={isLoading || emailError || passwordError}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: "1rem",
                  fontWeight: "bold",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
                }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Sign In"}
              </Button>
            </motion.div>
          </form>

          {/* Signup Redirect */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Sign up <PersonAdd sx={{ fontSize: 16, ml: 0.5 }} />
              </Link>
            </Typography>
          </Box>
        </Card>
      </motion.div>
    </Container>
  );
};

export default Login;
