import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entries from "./Entries";
import Entry from "./Entry";
import Register from "./Register";
import Landingpage from "./Landing";
import LogIn from "./Login";
import Journal from "./Journal";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landingpage />}/>
        <Route path="entries" element={ <Journal > 
                                        < Entries /> 
                                        </Journal>} />
        <Route path="entry" element={ <Journal>
                                      < Entry /> 
                                      </Journal>} />
        <Route path="register" element={< Register />} />
        <Route path="login" element={< LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
