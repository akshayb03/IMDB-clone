import { useNavigate } from "react-router-dom";

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
          src={
            movie.poster ||
            "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          }
          alt={movie.movie_name || "dummy"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
          }}
          className="w-full h-80 rounded-md"
        />
        <h2 className="mt-2 p-1">{movie.movie_name}</h2>
      </div>
    </>
  );
};

export default MovieCard;
