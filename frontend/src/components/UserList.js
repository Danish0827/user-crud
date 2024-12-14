import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
import moment from "moment";

const UserList = ({ onDelete, onUpdate }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Form instance

  useEffect(() => {
    fetch("http://localhost:4000/api/getUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const showModal = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
    // Set form fields when the modal opens
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      dob: moment(user.dob), // Convert to moment for DatePicker
    });
  };

  const handleModalClose = () => {
    setEditingUser(null);
    setIsModalOpen(false);
    form.resetFields(); // Reset form fields when modal closes
  };

  const handleUpdate = (values) => {
    const updatedUser = {
      ...editingUser,
      ...values,
      dob: values.dob.format("YYYY-MM-DD"), // Format date before sending
    };
  
    fetch(`http://localhost:4000/api/updateUser/${editingUser.user_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User updated successfully") { // Check the message from server response
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.user_id === updatedUser.user_id ? updatedUser : user
            )
          );
          Swal.fire("Success", "User updated successfully!", "success");
        } else {
          Swal.fire("Error", "Failed to update user.", "error");
        }
        handleModalClose();
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        Swal.fire("Error", "Internal server error.", "error");
        handleModalClose();
      });
  };
  
  const confirmDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete API
        fetch(`http://localhost:4000/api/deleteUser/${userId}`, {
          method: "DELETE", // Assuming DELETE method for the API
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "User deleted successfully") {
              // If deletion is successful, remove the user from the UI
              setUsers(users.filter((user) => user.user_id !== userId));
              Swal.fire("Deleted!", "The user has been deleted.", "success");
            } else {
              Swal.fire("Error", "Failed to delete the user.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error", "Internal server error.", "error");
          });
      }
    });
  };
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center uppercase">User List</h2>
      <table className="min-w-full mt-4 table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left font-bold">Name</th>
            <th className="px-4 py-2 text-left font-bold">Email</th>
            <th className="px-4 py-2 text-left font-bold">DOB</th>
            <th className="px-4 py-2 text-left font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-b">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {new Intl.DateTimeFormat("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(user.dob))}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => showModal(user)}
                  className="text-blue-500 hover:bg-blue-500 hover:text-white shadow-md rounded-md mr-2 p-3"
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  onClick={() => confirmDelete(user.user_id)}
                  className="text-red-500 hover:bg-red-500 hover:text-white shadow-md rounded-md mr-2 p-3"
                >
                  <MdOutlineDeleteOutline className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select the date of birth!" }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button onClick={handleModalClose} style={{ marginLeft: "8px" }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
