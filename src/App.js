import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import { Header, Footer } from "./components";

//Components
import { Home, Contact, Register, Login, Reset } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutContext from "./context/logout-context";
import { useState } from "react";

function App() {
  const [isLogout, setIsLogout] = useState(true);
  const value = { isLogout, setIsLogout };

  return (
    <>
      <LogoutContext.Provider value={value}>
        <BrowserRouter>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          ></ToastContainer>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </LogoutContext.Provider>
    </>
  );
}

export default App;
