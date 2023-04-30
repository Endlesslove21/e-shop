import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import { Header, Footer } from "./components";

//Components
import { Home, Contact } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
