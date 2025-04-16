import { useState } from "react";

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
      const parsedData = {
        ...formData,
        actors: JSON.parse(formData.actors),
        producer: JSON.parse(formData.producer),
      };

      const response = await fetch("http://localhost:8000/api/admin/movies", {
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
          actors: "[]",
          producer: "{}",
          poster: "",
        });
      } else {
        alert(`Error: ${result.error || "Failed to save movie"}`);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Invalid JSON format or server error");
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
              className="w-full p-2 border border-black rounded"
              required={field !== "poster"}
            />
          </div>
        ))}

        <div>
          <label className="block mb-1">Producer (JSON object):</label>
          <textarea
            name="producer"
            value={formData.producer}
            onChange={handleChange}
            className="w-full p-2 border border-black rounded h-32"
            placeholder='Example: {"name": "Christopher Nolan", "birthday": "1970-07-30"}'
            required
          />
        </div>

        <div>
          <label className="block mb-1">Actors (JSON array):</label>
          <textarea
            name="actors"
            value={formData.actors}
            onChange={handleChange}
            className="w-full p-2 border border-black rounded h-32"
            placeholder='Example: [{"name": "Leonardo DiCaprio"}, {"name": "Joseph Gordon-Levitt"}]'
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Movie
        </button>
      </form>
    </div>
  );
};

export default AdminScreen;
