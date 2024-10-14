import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./components/Login/Login";

import "./index.css";
import Register from "./components/Register";
import Contacts from "./components/Contacts";
import Account from "./components/Account";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/contatos" element={<Contacts />} />
        <Route path="/conta" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;
