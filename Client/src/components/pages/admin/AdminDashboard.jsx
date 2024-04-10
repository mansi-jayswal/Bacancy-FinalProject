import React, { useEffect, useState } from "react";
import { deleteUser, getUsers } from "../../../utils/axios";
import Table from "../../common/Table";
import Button from "../../common/Button";
import { Link, useNavigate } from "react-router-dom";
import DeleteModal from "../../common/DeleteModal";
import { toast } from "react-toastify";
import SearchBar from "../../common/SearchBar"; 

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dataIdToBeDeleted, setDataIdToBeDeleted] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.log("error in fetching users at admin", err)
      );
  }, []);

  const usersArray = [
    { key: "id", label: "User ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "preference", label: "Preference" },
  ];

  const handleUpdate = (id) => {
    const url = `/admin-updateUser/${id}`;
    console.log("Navigating to:", url);
    try {
      navigate(`/admin-updateUser/${id}`);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  const handleDelete = (id) => {
    setShowConfirmationModal(true);
    setDataIdToBeDeleted(id);
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
    setDataIdToBeDeleted(null);
  };

  const confirmDelete = () => {
    deleteUser(dataIdToBeDeleted)
      .then(() => {
        // to fetch the updated users again calling getUsers function
        toast.success("User Deleted successfully!");
        getUsers()
          .then((res) => setUsers(res.data))
          .catch((err) =>
            console.log("error in fetching users at admin", err)
          );
        setShowConfirmationModal(false);
        setDataIdToBeDeleted(null);
      })
      .catch((err) => console.log("Error deleting user", err));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 px-6 md:p-10">
      <div className="text-center">
        <span className="text-xl font-semibold mt-2">Application users</span>
        <Button
          buttonStyle="ml-8 bg-green-500 border-green-500 hover:text-green-500 text-base mt-0 mb-2 cursor-default"
        >
          <Link to="/admin-createUser">+ADD</Link>
        </Button>{" "}
      </div>
      {/* Search bar */}
      <div className="mb-4">
        <SearchBar
          placeholder="Search users..."
          onSearch={handleSearch}
          value={searchQuery}
        />
      </div>
      {filteredUsers.length === 0 ? (
        <div className="text-center">
          <h1 className="text-xl font-semibold text-customRed">No users found!</h1>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            data={filteredUsers} 
            headers={usersArray}
            className="w-full whitespace-nowrap"
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        </div>
      )}

      {showConfirmationModal && (
        <DeleteModal
          Id={dataIdToBeDeleted}
          handleDelete={confirmDelete}
          setShowConfirmationModal={setShowConfirmationModal}
          setDataIdToBeDeleted={setDataIdToBeDeleted}
          itemType="user"
        />
      )}
    </div>
  );
}

export default AdminDashboard;

