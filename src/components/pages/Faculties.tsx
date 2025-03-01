import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { manageUsers } from "../../data";

interface User {
  username: string;
  profileImage: string;
  domain: string;
  batch: string;
  email: string;
  isBlocked: boolean;
}

const Faculties: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() =>
    manageUsers.map((user) => ({
      ...user,
    }))
  );
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );

  const toggleBlock = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index].isBlocked = !updatedUsers[index].isBlocked;
    setUsers(updatedUsers);
  };

  

  // SEARCHING AND PAGINATION
  // New states for search and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtered and paginated users
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => (
    <div className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm rounded bg-midGray hover:bg-lightGray disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 text-sm rounded ${
            currentPage === page
              ? "bg-white text-black"
              : "bg-midGray hover:bg-lightGray"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm rounded bg-midGray hover:bg-lightGray disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold">Faculties List</h4>
        <input
          type="text"
          placeholder="Search faculties..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 mx-1 border border-gray-800 rounded w-64 focus:outline-none focus:ring-2 placeholder:text-sm text-sm focus:ring-gray-500"
        />
      </div>
      <div className="overflow-x-auto border-none mb-0">
        <table className="w-full border-collapse border-none text-left">
          <thead className="bg-customGray">
            <tr>
              <th colSpan={2} className="px-4 py-2">
                Profile
              </th>
              <th className="px-4 py-2">Domain</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-lightGray/30 transition-all duration-200"
              >
                <td className="ps-4 py-2">
                  {item.profileImage ? (
                    <img
                      src={item.profileImage}
                      alt="profile"
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

                <td className="pr-4 py-2">
                  <h5 className="text-base font-normal m-0">{item.username}</h5>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </td>
                <td className="px-4 py-2">{item.domain}</td>
                <td className="px-4 py-2">{item.batch}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => {
                      const originalIndex = users.findIndex(
                        (u) => u.username === item.username
                      );
                      toggleBlock(originalIndex);
                    }}
                    className={`px-3 py-1 rounded-lg flex items-center gap-2 text-white bg-transparent hover:bg-midGray border border-gray-800 transition-all duration-200`}
                  >
                    {/* Dot Indicator */}
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isBlocked ? "bg-green-400" : "bg-red-500"
                      }`}
                    ></span>

                    {/* Button Text */}
                    {item.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && renderPagination()}

    </>
  );
};

export default Faculties;
