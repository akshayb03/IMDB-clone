import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import { ClipLoader } from "react-spinners";
import { BASE_URL } from "../../utils/constants";
import DeleteModal from "../components/DeleteModal";
import Modal from "../components/Modal";
import axios from "axios";

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoader, setInitialLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`${BASE_URL}/api/movies/${movieId}`);
      setMovies((prev) => prev.filter((movie) => movie.movie_id !== movieId));
    } catch {
      alert("Unable to delete the movie! Please try again");
    }
  };

  const loadMovies = async () => {
    try {
      if (movies.length > 0) {
        setLoading(true);
      }
      const res = await fetch(`${BASE_URL}/api/movies?page=${page}`);
      const data = await res.json();
      setMovies((prev) => [...prev, ...data]);
    } catch (error) {
      console.error("Failed to load movies:", error);
    } finally {
      setLoading(false);
      setInitialLoader(false);
    }
  };

  useEffect(() => {
    if (movies.length == 0) {
      setInitialLoader(true);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [page]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (!loading && scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
      {showDeleteModal && (
        <DeleteModal
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedMovieId(null);
          }}
          onConfirm={handleDeleteMovie}
          movieId={selectedMovieId}
        />
      )}
      {initialLoader ? (
        <div className="flex justify-center align-center">
          <ClipLoader color="#36d7b7" loading={initialLoader} size={50} />
        </div>
      ) : (
        <div>
          <div className="w-full flex justify-center align-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 p-4 w-full mx-auto">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  movie={movie}
                  setShowDeleteModal={setShowDeleteModal}
                  setSelectedMovieId={setSelectedMovieId}
                  setShowModal={setShowModal}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-8">
            <ClipLoader color="#36d7b7" loading={loading} size={50} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
