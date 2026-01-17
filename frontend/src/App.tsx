import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Header from "./components/header/Header";
import Camera from "./lib/camera";
import { Result } from "./pages/Result/Result";
import { Sampai } from "./pages/SampaiScreen/Sampai";

function App() {
  return (
    <BrowserRouter>
      <Header />

      {/* // 拍手だけ検知したい場合 */}
      {/* <Camera detectMotion="clap"/> */}

      {/* // 投げるだけ検知したい場合 */}
      {/* <Camera detectMotion="throw" />  */}

      {/* <Camera detectMotion="swing" />  */}
      {/* <Camera detectMotion="bow" />  */}



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/sanpai" element={<Sampai/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
