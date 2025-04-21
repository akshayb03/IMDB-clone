import React, { useState } from "react";

const DeleteModal = ({ onClose, onConfirm, movieId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    try {
      await onConfirm(movieId);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete movie");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 backdrop-blur-sm" onClick={onClose}></div>

      <div className="bg-[#242424] relative rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-md">
        <div className="px-6 py-8 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-6">
              Are you sure you want to delete?
            </h2>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded-md">
              {error}
            </div>
          )}
        </div>

        <div className="bg-[#242424] px-6 py-4 sm:px-8 sm:flex sm:flex-row-reverse">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 sm:ml-3 sm:w-auto sm:text-sm transition ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Deleting...
              </>
            ) : (
              "Yes"
            )}
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

export default DeleteModal;
