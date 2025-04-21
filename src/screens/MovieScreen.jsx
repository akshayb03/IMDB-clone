import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ActorCard from "../components/ActorCard";
import { BASE_URL, DEFAULT_IMAGE_URL } from "../../utils/constants";
import editIcon from "../assets/edit.png";
import Modal from "../components/Modal";
import EditModal from "../components/EditModal";
import axios from "axios";
import { format } from "date-fns";

const MovieScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
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
      await axios.patch(`${BASE_URL}/api/movies/${id}`, updatedData);

      refetch();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating movie:", error);
      const message =
        error.response?.data?.message || error.message || "Unknown error";
      alert(`Error: ${message}`);
    }
  };

  const refetch = useCallback(() => {
    fetch(`${BASE_URL}/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <p>Loading...</p>;

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
        <EditModal
          onClose={() => setShowEditModal(false)}
          movie={movie}
          onSave={handleSave}
        />
      )}
      <div className="p-4 relative">
        <img
          src={editIcon}
          style={{ width: 24, height: 24 }}
          className="absolute right-0 top-6"
          onClick={editItem}
        />
        <div className="flex flex-row">
          <div
            className="w-100 border-solid border-1"
            style={{
              backgroundImage: `url(${DEFAULT_IMAGE_URL})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <img
              src={movie.poster || DEFAULT_IMAGE_URL}
              alt={movie.movie_name || "dummy"}
              className="w-100"
            />
          </div>
          <div className="mt-6 ml-20 w-2xl">
            <h1 className="text-3xl font-bold mb-1">{movie.movie_name}</h1>
            <p className="">{movie.description}</p>
            <p className="text-yellow-200 mb-1">{movie.genre}</p>
            <p className="mb-1 text-yellow-200">
              {format(movie.release_date, "MMMM do, yyyy")}
            </p>
            <p className="mb-1 text-yellow-200">{movie.imdb_rating}/10</p>
            {movie.actors.length > 0 && (
              <h2 className="mt-6 mb-1 text-xl font-semibold">Actors</h2>
            )}
            <div className="flex gap-4">
              {movie.actors.map((actor) => (
                <ActorCard key={actor.personality_id} actor={actor} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieScreen;
