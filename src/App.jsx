import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import MovieScreen from "./screens/MovieScreen";
import ActorScreen from "./screens/ActorScreen";
import AdminScreen from "./screens/AdminScreen";
import Header from "./components/Header";
import Modal from "./components/Modal";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAdminClick = () => {
    const token = sessionStorage.getItem("jwt_token");
    if (token) {
      navigate("/admin");
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <Header onAdminClick={handleAdminClick} />
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSuccess={(token) => {
            sessionStorage.setItem("jwt_token", token);
            navigate("/admin");
            setShowModal(false);
          }}
        />
      )}
      <div className="pt-[100px] px-[100px] w-screen h-screen">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminScreen />
              </ProtectedRoute>
            }
          />
          <Route path="/movie/:id" element={<MovieScreen />} />
          <Route path="/actor/:id" element={<ActorScreen />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
