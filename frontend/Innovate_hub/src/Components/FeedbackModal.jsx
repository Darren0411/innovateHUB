const FeedbackModal = ({ show, onClose, onSubmit, action }) => {
    const [feedback, setFeedback] = useState("");
  
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Provide Feedback for {action}</h2>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
            placeholder="Write your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button
              onClick={() => {
                onSubmit(feedback);
                setFeedback("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };
  