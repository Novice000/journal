import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entries from "./Entries";
import Entry from "./Entry";
import Register from "./Register";
import Landingpage from "./Landing";
import LogIn from "./Login";
import Journal from "./Journal";
import UpdateEntry from "./UpdateEntry";
import ProtectedRoutes from "./utils/protected";
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landingpage />} />
        
        <Route element={<ProtectedRoutes />}>
          <Route path="entries" element={<Journal><Entries /></Journal>} />
          <Route path="entry" element={<Journal><Entry /></Journal>} />
          <Route path="update/:id" element={<Journal><UpdateEntry /></Journal>} />
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
