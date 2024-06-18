import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registre from "./pages/Login/Registre";
import Dashboard from "../src/pages/Dashboard/Home";
import Rendezvous from "../src/pages/Rendezvous/Rendezvous";
import User from "../src/pages/User/User";
import MainLayout from "./layout/MainLayout";
import Patient from "../src/pages/Patient/Patient";
import Consultation from "./pages/Consultation/Consultation";
import Dossierpatient from "../src/pages/Dossierpatient/Dossierpatient";
import AuthService from "./Service/AuthService/AuthService";


function App() {
  const currentUser = AuthService.getCurrentUser();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registre" element={<Registre />}></Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/dossierpatient" element={<Dossierpatient />} />
          <Route path="/rendezvous" element={<Rendezvous />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
