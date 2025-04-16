import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ActorCard from "../components/ActorCard";

const MovieScreen = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  useEffect(() => {}, [movie]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <div className="flex flex-row">
        <div
          className="w-100 border-solid border-1"
          style={{
            backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={
              movie.poster ||
              "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            }
            alt={movie.movie_name || "dummy"}
            className="w-100"
          />
        </div>
        <div className="mt-6 ml-20 w-2xl">
          <h1 className="text-3xl font-bold mb-2">{movie.movie_name}</h1>
          <p className="mb-16">{movie.description}</p>
          {movie.actors.length > 0 && (
            <h2 className="mt-6 mb-2 text-xl font-semibold">Actors</h2>
          )}
          <div className="flex gap-4">
            {movie.actors.map((actor) => (
              <ActorCard key={actor.personality_id} actor={actor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieScreen;
