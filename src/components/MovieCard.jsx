import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_URL } from "../../utils/constants";
import crossIcon from "../assets/cross.png";

const MovieCard = ({
  movie,
  setShowDeleteModal,
  setSelectedMovieId,
  setShowModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const deleteItem = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = sessionStorage.getItem("jwt_token");

    if (!token) {
      setShowModal(true);
      return;
    }

    setShowDeleteModal(true);
    setSelectedMovieId(movie.movie_id);
  };

  return (
    <>
      <div
        className="cursor-pointer hover:scale-105 transition mb-[52px] border-[0.1px] pb-6 mr-6"
        onClick={() => {
          navigate("/", { replace: true });
          navigate(`/movie/${movie.movie_id}`);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <div className="flex flex-row absolute right-0 top-0">
            <img
              src={crossIcon}
              alt={"delete"}
              style={{ width: 32, height: 32 }}
              onClick={deleteItem}
            />
          </div>
        ) : (
          <></>
        )}
        <img
          src={movie.poster || DEFAULT_IMAGE_URL}
          alt={movie.movie_name || "dummy"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = DEFAULT_IMAGE_URL;
          }}
          className="w-full h-80 rounded-md"
        />
        <h2 className="mt-2 p-1">{movie.movie_name}</h2>
      </div>
    </>
  );
};

export default MovieCard;
