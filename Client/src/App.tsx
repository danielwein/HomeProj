
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Home from "./pages/Home.tsx";
import { ThemeProvider } from "@/components/theme-provider"
import LoginPage from "./pages/LoginPage.tsx"
import SignPage from "./pages/SignPage.tsx"
import ProtectedRoutes from "./components/ProtectedRoute.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Repository from "./pages/Repository.tsx";
function App() {
    return (
        <Router>
             <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <Navbar /> 
            <div>
                <Routes>
                    <Route element={<ProtectedRoutes/>}>
                          <Route path="/dashboard" element={<Dashboard/>} />
                          <Route path="/repository/:id" element={<Repository />} />
                    </Route>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Sign" element={<SignPage />} />
                    
                </Routes>
            </div>
    </ThemeProvider>
          
        </Router>
    );
}

export default App;