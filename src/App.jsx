import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ActorScreen from "./screens/ActorScreen";
import AdminScreen from "./screens/AdminScreen";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="pt-[100px] px-[100px] w-screen h-screen">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/movie/:id" element={<MovieScreen />} />
          <Route path="/actor/:id" element={<ActorScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
