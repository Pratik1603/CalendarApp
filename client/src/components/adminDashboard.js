import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanies, deleteCompany } from "../redux/companySlice";
import CompanyForm from "./CompanyForm";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.companies);
  const [showForm, setShowForm] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null); // For editing

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      dispatch(deleteCompany(id));
    }
  };

  const handleEdit = (company) => {
    setCurrentCompany(company);
    setShowForm(true);
  };
  const navigate=useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="flex justify-between">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          setCurrentCompany(null);
          setShowForm(true);
        }}
      >
        Add Company
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          navigate('/user');
        }}
      >
        User Dashboard
      </button>
      </div>
      
      <table className="min-w-full mt-6 bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Location</th>
            <th className="p-4">LinkedIn Profile</th>
            <th className="p-4">Phone Numbers</th>
            <th className="p-4">Emails</th>
            <th className="p-4">Periodicity</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company._id}>
              <td className="p-4">{company.name}</td>
              <td className="p-4">{company.location}</td>
              <td className="p-4">
                <a
                  href={company.linkedInProfile}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  LinkedIn
                </a>
              </td>
              <td className="p-4">{company.phoneNumbers?.join(", ")}</td>
              <td className="p-4">{company.emails?.join(", ")}</td>
              <td className="p-4">{company.communicationPeriodicity}</td>
              <td className="p-4 flex gap-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(company)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(company._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <CompanyForm
          onClose={() => setShowForm(false)}
          company={currentCompany} // Pass company for editing
        />
      )}
    </div>
  );
};

export default AdminDashboard;
