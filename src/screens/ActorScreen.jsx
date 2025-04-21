import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import { format } from "date-fns";
import { BASE_URL, DEFAULT_IMAGE_URL } from "../../utils/constants";
import editIcon from "../assets/edit.png";
import Modal from "../components/Modal";
import ActorEditModal from "../components/ActorEditModal";
import axios from "axios";

const ActorScreen = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const editItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = sessionStorage.getItem("jwt_token");

    if (!token) {
      setShowModal(true);
      return;
    }
    setShowEditModal(true);
  };

  const handleSave = async (updatedData) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/celebrities/${actor.personality_id}`,
        updatedData
      );

      refetch();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating actor:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const refetch = useCallback(() => {
    fetch(`${BASE_URL}/api/celebrities/${id}`)
      .then((res) => res.json())
      .then((data) => setActor(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/celebrities/${id}`)
      .then((res) => res.json())
      .then((data) => setActor(data));
  }, [id]);

  if (!actor) return <p>Loading...</p>;

  return (
    <>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSuccess={(token) => {
            sessionStorage.setItem("jwt_token", token);
            setShowModal(false);
          }}
        />
      )}
      {showEditModal && (
        <ActorEditModal
          onClose={() => setShowEditModal(false)}
          actor={actor}
          onSave={handleSave}
        />
      )}
      <div className="p-4 relative">
        <img
          src={editIcon}
          alt="edit"
          style={{ width: 24, height: 24 }}
          className="absolute right-80 top-8"
          onClick={editItem}
        />
        <div
          className="w-50 rounded-full mb-4 border-solid border-1"
          style={{
            backgroundImage: `url(${DEFAULT_IMAGE_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        >
          <img
            src={actor.image || DEFAULT_IMAGE_URL}
            alt={actor.name || "dummy"}
            className="w-40 rounded-full mb-4"
            style={{ width: "100%", height: 200 }}
          />
        </div>
        <h1 className="text-3xl font-bold">{actor.name}</h1>
        <p>Born - {format(actor.birthday, "MMMM do, yyyy")}</p>
        {actor.death_year && (
          <p>Died on - {format(actor.death_year, "MMMM do, yyyy")}</p>
        )}

        <h2 className="mt-6 mb-2 text-xl font-semibold">Movies</h2>
        <div className="flex flex-row">
          {actor.movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ActorScreen;
