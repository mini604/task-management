import { useState, useContext, useEffect } from "react";
import { 
  TextField, Button, Container, Typography, Box, Alert,
  InputAdornment, IconButton, Fade, Zoom, Card, Divider
} from "@mui/material";
import { 
  Visibility, VisibilityOff, Email, 
  Login as LoginIcon, PersonAdd 
} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    
    // Basic validation
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
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = (role) => {
    setEmail(`${role}@demo.com`);
    setPassword("password123");
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
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
          }}
        >
          <Box display="flex" justifyContent="center" mb={2}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <LoginIcon color="primary" sx={{ fontSize: 48 }} />
            </motion.div>
          </Box>
          
          <Typography variant="h4" align="center" mb={2} fontWeight="bold" color="primary">
            Welcome Back
          </Typography>
          
          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Sign in to continue to your account
          </Typography>
          
          {error && (
            <Zoom in={true}>
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                {error}
              </Alert>
            </Zoom>
          )}
          
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }
              }}
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
                    <IconButton edge="start" disabled>
                      <LoginIcon color="action" />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                }
              }}
            />
            
            <Typography variant="body2" align="right" mt={1} mb={2}>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#1976d2' }}>
                Forgot password?
              </Link>
            </Typography>
            
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
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
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                  background: isLoading ? 'rgba(25, 118, 210, 0.7)' : '',
                  transition: 'all 0.3s ease'
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </motion.div>
          </form>
          
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Demo Accounts
            </Typography>
          </Divider>
          
          <Box display="flex" gap={2} mb={3}>
            <Button 
              variant="outlined" 
              fullWidth 
              size="small"
              onClick={() => handleDemoLogin("user")}
              sx={{ borderRadius: 2 }}
            >
              User Demo
            </Button>
            <Button 
              variant="outlined" 
              fullWidth 
              size="small"
              onClick={() => handleDemoLogin("admin")}
              sx={{ borderRadius: 2 }}
            >
              Admin Demo
            </Button>
          </Box>
          
          <Box textAlign="center" mt={2}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={{ 
                  textDecoration: 'none', 
                  color: '#1976d2',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center'
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