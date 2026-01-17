import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import Header from "./components/header/Header";
import Camera from "./lib/camera";

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
      </Routes>
      <Camera/>
    </BrowserRouter>
  );
}

export default App;
