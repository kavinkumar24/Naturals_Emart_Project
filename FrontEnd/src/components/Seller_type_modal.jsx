import { useState } from 'react';

const SaleOptionModal = ({ isOpen, onClose, onSelectOption }) => {
  const [loadingButton, setLoadingButton] = useState(null); // Track which button is loading

  const handleOptionClick = (option) => {
    setLoadingButton(option); // Set the loading state for the clicked button
    setTimeout(() => {
      onSelectOption(option);
      setLoadingButton(null); // Reset loading state after action is complete
    }, 1000); // Simulate loading state with 1 second delay
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-center">Select Sale Type</h2>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            onClick={() => handleOptionClick('one_time_sale')}
            disabled={loadingButton === 'one_time_sale'}
          >
            {loadingButton === 'one_time_sale' ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              'One Time Sale'
            )}
          </button>

          <button
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-600 transition duration-300 flex justify-center items-center"
            onClick={() => handleOptionClick('regular_sale')}
            disabled={loadingButton === 'regular_sale'}
          >
            {loadingButton === 'regular_sale' ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Loading...
              </>
            ) : (
              'Regular Sale'
            )}
          </button>
        </div>
        <button
          className="mt-6 text-red-500 hover:underline text-center block w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SaleOptionModal;
