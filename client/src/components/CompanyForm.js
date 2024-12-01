import React, { useState, useEffect } from "react";
import axios from "axios";

const CompanyForm = ({ onClose, company }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    linkedInProfile: "",
    emails: [""],
    phoneNumbers: [""],
    comments: "",
    communicationPeriodicity: "2 weeks",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        ...company,
        emails: company.emails || [""],
        phoneNumbers: company.phoneNumbers || [""],
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, value, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (company) {
        // Update an existing company
        await axios.put(`http://localhost:8800/api/admin/${company._id}`, formData);
      } else {
        // Add a new company
        await axios.post("http://localhost:8800/api/admin/addCompany", formData);
      }
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div  className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-6 rounded shadow w-[80%] h-[90%] max-h-[90%] overflow-y-auto">
    <h2 className="text-xl font-bold mb-4">
      {company ? "Edit Company" : "Add Company"}
    </h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="linkedInProfile"
          placeholder="LinkedIn Profile"
          value={formData.linkedInProfile}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Emails</label>
        {formData.emails.map((email, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "emails")
              }
              className="border p-2 w-full"
              required
            />
            <button
              type="button"
              className="text-red-500 ml-2"
              onClick={() => removeArrayField(index, "emails")}
            >
              ✖
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 mt-2"
          onClick={() => addArrayField("emails")}
        >
          + Add Email
        </button>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Phone Numbers</label>
        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={phone}
              onChange={(e) =>
                handleArrayChange(index, e.target.value, "phoneNumbers")
              }
              className="border p-2 w-full"
              required
            />
            <button
              type="button"
              className="text-red-500 ml-2"
              onClick={() => removeArrayField(index, "phoneNumbers")}
            >
              ✖
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 mt-2"
          onClick={() => addArrayField("phoneNumbers")}
        >
          + Add Phone Number
        </button>
      </div>
      <div className="mb-4">
        <textarea
          name="comments"
          placeholder="Comments"
          value={formData.comments}
          onChange={handleChange}
          className="border p-2 w-full"
          rows="3"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">
          Communication Periodicity
        </label>
        <select
          name="communicationPeriodicity"
          value={formData.communicationPeriodicity}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="2 weeks">Every 2 weeks</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="text-red-500 mr-4"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {company ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default CompanyForm;
