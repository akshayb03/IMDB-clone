import { useState } from "react";
import { BASE_URL } from "../../utils/constants";

const AdminScreen = () => {
  const [formData, setFormData] = useState({
    movie_name: "",
    release_date: "",
    imdb_rating: "",
    description: "",
    genre: "",
    duration: "",
    actors: "",
    producer: "",
    poster: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const actorNames = formData.actors
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name.length > 0);

      const actors = actorNames.map((name) => ({
        name,
        birthday: null,
        death_year: "",
        image: "",
      }));

      const producer = {
        name: formData.producer.trim(),
        birthday: null,
        death_year: "",
        image: "",
      };

      const parsedData = {
        ...formData,
        actors,
        producer,
      };

      const response = await fetch(`${BASE_URL}/api/admin/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Movie saved successfully!");
        setFormData({
          movie_name: "",
          release_date: "",
          imdb_rating: "",
          description: "",
          genre: "",
          duration: "",
          actors: "",
          producer: "",
          poster: "",
        });
      } else {
        alert(`Error: ${result.error || "Failed to save movie"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid input or server error");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Movie</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          "movie_name",
          "release_date",
          "imdb_rating",
          "description",
          "genre",
          "duration",
          "poster",
        ].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">
              {field.replace("_", " ")}:
            </label>
            <input
              type={field === "release_date" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-yellow-200 rounded"
              required={field !== "poster"}
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Producer:</label>
          <input
            type="text"
            name="producer"
            value={formData.producer}
            onChange={handleChange}
            className="w-full p-2 border border-yellow-200 rounded"
            placeholder="Example: Christopher Nolan"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Actors:</label>
          <textarea
            name="actors"
            value={formData.actors}
            onChange={handleChange}
            className="w-full p-2 border border-yellow-200 rounded h-32"
            placeholder="Example: Leonardo DiCaprio, Joseph Gordon-Levitt"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 rounded">
          Save Movie
        </button>
      </form>
    </div>
  );
};

export default AdminScreen;
