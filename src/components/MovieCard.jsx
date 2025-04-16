import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_URL } from "../../utils/constants";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="cursor-pointer hover:scale-105 transition mb-[52px] border-[0.1px] pb-6 mr-6"
        onClick={() => {
          navigate("/", { replace: true });
          navigate(`/movie/${movie.movie_id}`);
        }}
      >
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
