import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { format } from "date-fns";
import { BASE_URL, DEFAULT_IMAGE_URL } from "../../utils/constants";

const ActorScreen = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/celebrities/${id}`)
      .then((res) => res.json())
      .then((data) => setActor(data));
  }, [id]);

  if (!actor) return <p>Loading...</p>;

  return (
    <div className="p-4">
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
  );
};

export default ActorScreen;
