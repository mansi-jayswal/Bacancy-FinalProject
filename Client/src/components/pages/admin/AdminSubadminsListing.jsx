import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import { deleteSubAdmin, getSubAdmins } from "../../../utils/axios";
import Table from "../../common/Table";
import DeleteModal from "../../common/DeleteModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "../../common/SearchBar";


function AdminSubadminListing() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dataIdToBeDeleted, setDataIdToBeDeleted] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const navigate = useNavigate();

  useEffect(() => {
    getSubAdmins()
      .then((res) => setSubAdmins(res.data))
      .catch((err) => console.log("error in fetching sub admins", err));
  }, []);

  const handleUpdate = (id) => {
    const url = `/admin-updateSubAdmin/${id}`;
    console.log("Navigating to:", url);
    try {
      navigate(`/admin-updateSubAdmin/${id}`);
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
    deleteSubAdmin(dataIdToBeDeleted)
        .then(() => {
            // Refresh the user list after deletion
            toast.success('Sub-admin Deleted successfully!');
            getSubAdmins()
                .then(res => setSubAdmins(res.data))
                .catch(err => console.log('error in fetching subadmins at admin', err));
            setShowConfirmationModal(false);
            setDataIdToBeDeleted(null);
        })
        .catch(err => console.log('Error deleting sub-admin', err));
} 

  const subAdminsArray = [
    { key: "id", label: "Sub admin ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "password", label: "Password" },
    { key: "assignedCategory", label: "assignedCategory" },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredSubAdmins = subAdmins.filter((subAdmins) =>
  subAdmins.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 px-6 md:p-10 my-2">
    <div className="text-center">
      <span className="text-xl font-semibold mt-2">List of all Sub admins </span>
      <Button buttonStyle="ml-8 bg-green-500 border-green-500 hover:text-green-500 text-base mt-0 mb-2 cursor-default">
        <Link to="/admin-createSubAdmin">+ADD</Link>
      </Button>{" "}
    </div>
    <div className="mb-4">
        <SearchBar
          placeholder="Search sub-admins..."
          onSearch={handleSearch}
          value={searchQuery}
        />
      </div>
    {filteredSubAdmins.length === 0 ? (
      <div className="text-center">
        <h2 className="text-xl font-semibold text-customRed">No subadmins found!</h2>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <Table
          data={filteredSubAdmins}
          headers={subAdminsArray}
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
        itemType="sub-admin"
      />
    )}
  </div>
  );
}

export default AdminSubadminListing;
