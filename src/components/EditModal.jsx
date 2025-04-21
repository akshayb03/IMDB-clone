import React, { useState } from "react";

const EditModal = ({ onClose, movie, onSave }) => {
  const [formData, setFormData] = useState({
    movie_name: movie.movie_name || "",
    release_date: movie.release_date
      ? new Date(movie.release_date).toISOString().split("T")[0]
      : "",
    imdb_rating: movie.imdb_rating || "",
    description: movie.description || "",
    genre: movie.genre || "",
    duration: movie.duration || "",
    poster: movie.poster || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
      ...formData,
      release_date: new Date(formData.release_date),
      imdb_rating: Number(formData.imdb_rating),
      duration: Number(formData.duration),
    };
    onSave(updateData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-[#242424] relative rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-2xl">
        <div className="px-6 py-8 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Edit Movie Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Movie Name
                </label>
                <input
                  type="text"
                  name="movie_name"
                  value={formData.movie_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Release Date
                </label>
                <input
                  type="date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  IMDB Rating
                </label>
                <input
                  type="number"
                  name="imdb_rating"
                  value={formData.imdb_rating}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  step="0.1"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">
                  Genre
                </label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-1">
                  Poster URL
                </label>
                <input
                  type="url"
                  name="poster"
                  value={formData.poster}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>
            </div>
          </form>
        </div>

        <div className="bg-[#242424] px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleSubmit}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm bg-blue-600 hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full justify-center rounded-md px-4 py-2 font-medium bg-gray-600 hover:bg-gray-700 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
