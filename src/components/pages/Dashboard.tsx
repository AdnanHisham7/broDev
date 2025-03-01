import React from "react";
import { manageUsers } from "../../data";

const Dashboard: React.FC = () => {
  return (
    <>
      <h4 className="text-lg font-semibold mb-3 ">Users List</h4>
      <div className="overflow-x-auto border-none mb-0">
        <table className="w-full border-collapse border-none text-left">
          <thead className="bg-customGray">
            <tr>
              <th colSpan={2} className="px-4 py-2">
                Profile
              </th>
              <th className="px-4 py-2">Domain</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Tags</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(manageUsers || []).map((item, i) => (
              <tr
                key={i}
                className="hover:bg-lightGray transition-all duration-200"
              >
                <td className="px-4 py-2 w-9">
                  {item.profileImage ? (
                    <img
                      src={item.profileImage}
                      alt="contact-img"
                      title="contact-img"
                      className="rounded-full w-9 h-9 object-cover"
                    />
                  ) : (
                    <svg
                      className="w-9 h-9 rounded-full bg-gray-200"
                      viewBox="0 0 122 122"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="122" height="122" rx="11" fill="#D9D9D9" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M47.9286 42.6999C47.9286 35.1197 53.7809 28.9749 61.0001 28.9749C68.2192 28.9749 74.0715 35.1197 74.0715 42.6999C74.0715 50.28 68.2192 56.4249 61.0001 56.4249C53.7809 56.4249 47.9286 50.28 47.9286 42.6999Z"
                        fill="#535252"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M37.0394 85.7211C37.264 72.0273 47.9053 60.9999 61.0001 60.9999C74.0951 60.9999 84.7366 72.0279 84.9607 85.7221C84.9756 86.6303 84.4773 87.4616 83.6911 87.8405C76.7808 91.1698 69.0942 93.0249 61.001 93.0249C52.907 93.0249 45.2197 91.1695 38.309 87.8395C37.5228 87.4607 37.0245 86.6293 37.0394 85.7211Z"
                        fill="#535252"
                      />
                    </svg>
                  )}
                </td>

                <td className="px-4 py-2">
                  <h5 className="text-base font-normal m-0">{item.username}</h5>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </td>
                <td className="px-4 py-2">{item.domain}</td>
                <td className="px-4 py-2">{item.batch}</td>
                <td className="px-4 py-2">
                  {item.isBlocked ? "Unblock" : "Block"}
                </td>
                <td className="px-4 py-2">
                  {item.isBlocked ? "Unblock" : "Block"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
