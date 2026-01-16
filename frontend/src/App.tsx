import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Header from "./components/header/Header";
import Camera from "./lib/camera";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Camera/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
