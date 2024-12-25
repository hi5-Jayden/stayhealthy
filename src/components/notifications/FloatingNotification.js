import { useState } from 'react';
import { Calendar } from 'lucide-react';

const FloatingNotification = ({ appointments = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleNotificationClick = () => {
    if (appointments.length === 1) {
      setSelectedAppointment(appointments[0]);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Notification Button */}
      <div
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
        onClick={handleNotificationClick}
      >
        <div className="bg-blue-500 text-white rounded-lg p-3 flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-colors">
          <Calendar className="w-5 h-5" />
          <span>
            You have {appointments.length} appointment
            {appointments.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              setIsOpen(false);
              setSelectedAppointment(null);
            }}
          />
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 relative z-10">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>

            {selectedAppointment ? (
              <div className="space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                    Doctor Profile Picture
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedAppointment.doctorName}
                    </h3>
                    <p className="text-gray-600">
                      {selectedAppointment.specialty}
                    </p>
                    <p className="text-sm text-blue-600">
                      #{selectedAppointment.experience} years of experience
                    </p>
                    <div className="flex text-yellow-400 mt-1">
                      {'★'.repeat(selectedAppointment.rating)}
                    </div>
                  </div>
                </div>

                {/* Appointment Info */}
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-600">Name</label>
                    <input
                      type="text"
                      value={selectedAppointment.patientName}
                      readOnly
                      className="w-full mt-1 p-2 border rounded bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600">Phone Number</label>
                    <input
                      type="text"
                      value={selectedAppointment.phone}
                      readOnly
                      className="w-full mt-1 p-2 border rounded bg-gray-50"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-gray-600">Date</label>
                      <input
                        type="text"
                        value={selectedAppointment.date}
                        readOnly
                        className="w-full mt-1 p-2 border rounded bg-gray-50"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-gray-600">Time</label>
                      <input
                        type="text"
                        value={selectedAppointment.time}
                        readOnly
                        className="w-full mt-1 p-2 border rounded bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    /* Handle cancel */
                  }}
                  className="w-full mt-4 p-3 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                >
                  Cancel Appointment
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedAppointment(apt)}
                  >
                    <div className="font-semibold">{apt.doctorName}</div>
                    <div className="text-sm text-gray-600">
                      {apt.date} at {apt.time}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingNotification;
