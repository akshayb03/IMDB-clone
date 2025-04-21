import React, { useState } from "react";

const ActorEditModal = ({ onClose, actor, onSave }) => {
  const [formData, setFormData] = useState({
    name: actor.name || "",
    birthday: actor.birthday
      ? new Date(actor.birthday).toISOString().split("T")[0]
      : "",
    death_year: actor.death_year || "",
    image: actor.image || "",
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
      birthday: formData.birthday ? new Date(formData.birthday) : null,
    };
    onSave(updateData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-[#242424] relative rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md">
        <div className="px-6 py-8 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Edit Actor Details
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Birthday
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Death Year (if applicable)
              </label>
              <input
                type="text"
                name="death_year"
                value={formData.death_year}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                required
              />
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

export default ActorEditModal;
