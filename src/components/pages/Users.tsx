import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { manageUsers } from "../../data";
import AnimatedContent from "../ui/AnimatedContent";

interface Tag {
  name: string;
  color: string;
}

interface User {
  username: string;
  profileImage: string;
  domain: string;
  batch: string;
  email: string;
  tags: Tag[];
  isBlocked: boolean;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() =>
    manageUsers.map((user) => ({
      ...user,
      tags: Object.entries(user.tags).map(([name, color]) => ({ name, color })),
    }))
  );
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(
    null
  );
  const [selectedTagIndex, setSelectedTagIndex] = useState<number | null>(null);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("ff5722");

  const toggleBlock = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index].isBlocked = !updatedUsers[index].isBlocked;
    setUsers(updatedUsers);
  };

  const confirmRemoveTag = (userIndex: number, tagIndex: number) => {
    setSelectedUserIndex(userIndex);
    setSelectedTagIndex(tagIndex);
    setShowRemoveConfirmModal(true);
  };

  const removeTag = () => {
    if (selectedUserIndex === null || selectedTagIndex === null) return;

    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tags = updatedUsers[
      selectedUserIndex
    ].tags.filter((_, i) => i !== selectedTagIndex);

    setUsers(updatedUsers);
    setShowRemoveConfirmModal(false);
  };

  const handleAddTag = () => {
    if (selectedUserIndex === null) return;
    if (!newTagName.trim()) return;

    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].tags.push({
      name: newTagName.trim(),
      color: newTagColor,
    });

    setUsers(updatedUsers);
    setShowAddTagModal(false);
    setNewTagName("");
    setNewTagColor("ff5722");
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
      <AnimatedContent
        distance={50}
        direction="vertical"
        reverse={false}
        config={{ tension: 70, friction: 20 }}
        initialOpacity={0.2}
        animateOpacity
        scale={0.9}
        threshold={0.1}
      >
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Users List</h4>
          <input
            type="text"
            placeholder="Search users..."
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
                <th className="px-4 py-2">Tags</th>
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

                  <td className="ps-6 py-2">
                    <h5 className="text-base font-normal m-0">
                      {item.username}
                    </h5>
                    <p className="text-sm text-gray-500">{item.email}</p>
                  </td>
                  <td className="px-4 py-2">{item.domain}</td>
                  <td className="px-4 py-2">{item.batch}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2 py-1 rounded text-sm text-white"
                          style={{ backgroundColor: `#${tag.color}` }}
                        >
                          {tag.name}
                          <button
                            onClick={() => {
                              // Find the original index from filtered users
                              const originalIndex = users.findIndex(
                                (u) => u.username === item.username
                              );
                              confirmRemoveTag(originalIndex, tagIndex);
                            }}
                            className="ml-1 hover:text-gray-300"
                          >
                            -
                          </button>
                        </span>
                      ))}
                      {item.tags.length < 3 && (
                        <button
                          onClick={() => {
                            const originalIndex = users.findIndex(
                              (u) => u.username === item.username
                            );
                            setSelectedUserIndex(originalIndex);
                            setShowAddTagModal(true);
                          }}
                          className="px-1.5 hover:bg-lightGray border border-gray-800 rounded-full"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </td>
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
      </AnimatedContent>

      <CSSTransition
        in={showAddTagModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-customGray p-6 rounded-lg w-96 shadow-xl transform transition-all">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Add New Tag
            </h3>
            <input
              type="text"
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="w-full p-2 mb-4 rounded bg-midGray text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex items-center mb-4">
              <input
                type="color"
                value={`#${newTagColor}`}
                onChange={(e) =>
                  setNewTagColor(e.target.value.replace("#", ""))
                }
                className="mr-2 w-8 h-8 cursor-pointer"
              />
              <span className="text-gray-300">Select color</span>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddTagModal(false)}
                className="px-4 py-2 text-gray-300 hover:bg-lightGray rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTag}
                className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>

      {/* Remove Confirmation Modal */}
      <CSSTransition
        in={showRemoveConfirmModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-midGray p-6 rounded-lg w-96 shadow-xl transform transition-all">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Confirm Removal
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to remove this tag?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRemoveConfirmModal(false)}
                className="px-4 py-2 text-gray-300 hover:bg-lightGray rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={removeTag}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Users;
