import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import Modal from "./Modal";
import "react-tooltip/dist/react-tooltip.css";
import Calendar from "./Calendar";
import { logCommunication } from "../redux/communicationSlice";
import { fetchNotifications } from "../redux/notificationSlice";
import { fetchCompanies } from "../redux/companySlice";
import { FaBell } from "react-icons/fa"; // Notification Icon
import { FaCalendarAlt } from "react-icons/fa"; // Calendar Icon

const Dashboard = () => {
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // Manage notification box visibility
  const [showCalendarModal, setShowCalendarModal] = useState(false); // For showing the calendar modal
  const dispatch = useDispatch();

  // Redux state for companies and notifications
  const companies = useSelector((state) => state.companies);
  const notifications = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchCompanies());
    dispatch(fetchNotifications());
  }, [dispatch]);

  const toggleCompanySelection = (companyId) => {
    console.log(companyId);
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  const handleLogCommunication = (communicationDetails) => {
    console.log(selectedCompanies);
    console.log(communicationDetails);
    dispatch(
      logCommunication({
        selectedCompanies,      // Array of company IDs
        communicationDetails,   // Object with communication details
      })
    );
    setShowModal(false);
    setSelectedCompanies([]);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications); // Toggle visibility
  };

  const handleOpenCalendar = () => {
    setShowCalendarModal(true); // Open the calendar modal
  };

  const handleCloseCalendar = () => {
    setShowCalendarModal(false); // Close the calendar modal
  };

  return (
    <div className="p-4">
      {/* Notifications */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <div className="relative">
          <button
            className="relative bg-red-500 text-white px-4 py-2 rounded-full"
            onClick={handleNotificationClick}
          >
            <FaBell className="text-white" size={20} /> {/* Notification Icon */}
            {notifications && notifications?.count > 0 && (
              <span className="absolute top-0 right-0 h-6 w-6 bg-yellow-500 text-center text-xs rounded-full">
                {notifications?.count}
              </span>
            )}
          </button>

          {/* Notification Box */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-64 p-4">
              <h4 className="font-medium mb-2">Overdue Communications</h4>
              {notifications?.overdue.length > 0 ? (
                notifications?.overdue?.map((note) => (
                  <div key={note.companyId} className="text-sm mb-1">
                    {note.companyName}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs">No overdue communications</p>
              )}
              <h4 className="font-medium mt-2 mb-2">Today's Communications</h4>
              {notifications?.today.length > 0 ? (
                notifications?.today?.map((note) => (
                  <div key={note.companyId} className="text-sm mb-1">
                    {note.companyName}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-xs">No communications due today</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Calendar Button (Floating) */}
      <div className="fixed bottom-10 right-10">
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
          onClick={handleOpenCalendar}
        >
          <FaCalendarAlt size={24} />
        </button>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full"
        onClick={() => setShowModal(true)}
        disabled={selectedCompanies.length === 0}
      >
        Communication Performed
      </button>

      <br>
      </br>
      <br></br>
      {/* Company Grid */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Select</th>
              <th className="px-4 py-2">Company Name</th>
              <th className="px-4 py-2">Last Five Communications</th>
              <th className="px-4 py-2">Next Scheduled Communication</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company) => {
              const isOverdue = company.isOverdue;
              const isDueToday = company.isDueToday;

              return (
                <tr
                  key={company?._id}
                  className={`${isOverdue
                    ? "bg-red-100"
                    : isDueToday
                      ? "bg-yellow-100"
                      : "bg-white"
                    }`}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(company?._id)}
                      onChange={() => toggleCompanySelection(company?._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{company.name}</td>
                  <td className="px-4 py-2">
                    {/* Displaying last five communications */}
                    {company.lastFiveCommunications?.map((comm, index) => (
                      <div key={index}>
                        <span
                          data-tooltip-id={`tooltip-${company?._id}-${index}`}
                          data-tooltip-content={comm?.notes}
                        >
                          {comm?.type} - {new Date(comm?.date).toLocaleDateString()}
                        </span>
                        <Tooltip id={`tooltip-${company?._id}-${index}`} />
                      </div>
                    ))}
                  </td>

                  <td className="px-4 py-2">
                    {/* Displaying next scheduled communication */}
                    {company.nextScheduledCommunication ? (
                      <>
                        Next Communication - {company.nextScheduledCommunication}
                      </>
                    ) : (
                      "No upcoming communication"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Log Communication Button */}
      

      {/* Modal */}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={handleLogCommunication}
        />
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-96">
            
            <h3 className="text-lg font-medium mb-4">Calendar View</h3>
            <button
              className="absolute top-4 right-4 font-bold "
              onClick={handleCloseCalendar}
            >
              ✖
            </button>
            <Calendar companies={companies} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
