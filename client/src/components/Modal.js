import React, { useState } from "react";

const Modal = ({ onClose, onSubmit }) => {
  const [type, settype] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!type || !date) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ type, date, notes });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Log Communication</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Communication Type
          </label>
          <select
            value={type}
            onChange={(e) => settype(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-2"
          >
            <option value="">Select</option>
            <option value="LinkedIn Post">LinkedIn Post</option>
            <option value="LinkedIn Message">LinkedIn Message</option>
            <option value="Email">Email</option>
            <option value="Phone Call">Phone Call</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
