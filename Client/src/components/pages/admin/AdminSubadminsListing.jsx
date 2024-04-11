import React, { useEffect, useState } from "react";
import Button from "../../common/Button";
import { deleteSubAdmin, getSubAdmins } from "../../../utils/axios";
import Table from "../../common/Table";
import DeleteModal from "../../common/DeleteModal"; 
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBar from "../../common/SearchBar";
import Pagination from "../../common/Pagination"; 

function AdminSubadminListing() {
  const [subAdmins, setSubAdmins] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [dataIdToBeDeleted, setDataIdToBeDeleted] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 3;

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
        toast.success("Sub-admin Deleted successfully!");
        getSubAdmins()
          .then((res) => setSubAdmins(res.data))
          .catch((err) =>
            console.log("error in fetching subadmins at admin", err)
          );
        setShowConfirmationModal(false);
        setDataIdToBeDeleted(null);
      })
      .catch((err) => console.log("Error deleting sub-admin", err));
  };

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

  const filteredSubAdmins = subAdmins.filter((subAdmin) =>
    subAdmin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSort = (field) => {
    if (sortedField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedField(field);
      setSortOrder("asc");
    }
  };

  const sortedSubAdmins = filteredSubAdmins.sort((a, b) => {
    const fieldA = (a[sortedField] || "").toString().toLowerCase();
    const fieldB = (b[sortedField] || "").toString().toLowerCase();
    if (sortOrder === "asc") {
      return fieldA.localeCompare(fieldB);
    } else {
      return fieldB.localeCompare(fieldA);
    }
  });

  const indexOfLastSubAdmin = currentPage * itemsPerPage;
  const indexOfFirstSubAdmin = indexOfLastSubAdmin - itemsPerPage;
  const currentSubAdmins = sortedSubAdmins.slice(
    indexOfFirstSubAdmin,
    indexOfLastSubAdmin
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto p-4 px-6 md:p-10">
      <div className="text-center">
        <span className="text-xl font-semibold mt-2">Sub admins{" "}
        </span>
      </div>
      <div className="flex mb-0 mx-auto md:flex-row justify-between">
        <SearchBar
          placeholder="Search sub-admins..."
          onSearch={handleSearch}
          value={searchQuery}
        />
         <Button buttonStyle="ml-8  sm:text-xs lg:text-[15px] bg-green-600 border-green-600 hover:text-green-600 text-base mt-0 mb-2 cursor-default">
          <Link to="/admin-createSubAdmin">+Add</Link>
        </Button>{" "}
      </div>
      {filteredSubAdmins.length === 0 ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-customRed">
            No subadmins found!
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table
            data={currentSubAdmins}
            headers={subAdminsArray}
            className="w-full whitespace-nowrap"
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            handleSort={handleSort} 
          />
        </div>
      )}

      {/* Pagination */}
      <div className="m-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedSubAdmins.length / itemsPerPage)}
          onPageChange={paginate}
          itemsPerPage={itemsPerPage}
        />
      </div>

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

