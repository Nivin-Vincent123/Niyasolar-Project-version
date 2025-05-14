import React from "react";

const InstallerContact: React.FC = () => {
  // You can customize these details or fetch dynamically if needed
  const contactDetails = {
    name: "Niya Solar Installer Support",
    phone: "7736190397",
    email: "installer-support@niyasolar.com",
    address: "45 Marine Drive, Kochi, Kerala, 682031, India",
    workingHours: "Mon-Fri 9:00am - 6:00pm"
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-100 py-12 px-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Contact Installer Support</h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="ml-2 text-gray-900">{contactDetails.name}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Phone:</span>
            <span className="ml-2 text-gray-900">{contactDetails.phone}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="ml-2 text-gray-900">{contactDetails.email}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Address:</span>
            <span className="ml-2 text-gray-900">{contactDetails.address}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Working Hours:</span>
            <span className="ml-2 text-gray-900">{contactDetails.workingHours}</span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">For installation queries, technical support, or urgent issues, please contact us using the details above.</p>
        </div>
      </div>
    </div>
  );
};

export default InstallerContact;
