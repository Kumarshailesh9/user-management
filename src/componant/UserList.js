import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './Navbar';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import Form from '../componant/Form';

const UserList = () => {
    // State variables to manage user data, modal visibility, and form inputs
    const [users, setUsers] = useState([]);         // Stores the list of users
    const [name, setName] = useState('');           // Stores the input value for name
    const [email, setEmail] = useState('');          // Stores the input value for email
    const [phone, setPhone] = useState('');          // Stores the input value for phone
    const [visible, setVisible] = useState(false);     // Visibility of the modal
    const [selected, setSelected] = useState(null);       // Select user being edited
    const [isUpdate, setIsUpdate] = useState(false);    // Current operation is an update


    useEffect(() => {
        getAllUser(); //call fetch user function
    }, []);

    // Fetch users from the API
    const getAllUser = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            if (res.status === 200) {
                setUsers(res.data); //update users state
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle form submission for adding a new user
    const addUser = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', { name, email, phone });
            if (res.status === 201) {
                setUsers([...users, res.data]); // Add the new user to the list
                toast.success('User created successfully!'); // Show success message
                setVisible(false); // Close the modal
                resetForm(); // Reset the form fields
            }

        } catch {
            toast.error('Failed to create user'); // Show error message if creation fails
        }
    };

    // Function to handle form submission for updating an existing user
    const updateUser = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${selected.id}`, { name, email, phone });
            if (res.status === 200) {
                setUsers(users.map(user => user.id === selected.id ? res.data : user)); // Update the user in the list
                toast.success('User updated successfully!'); // Show success message
                setVisible(false); // Close the modal
                resetForm(); // Reset the form fields
            }

        } catch {
            toast.error('Failed to update user'); // Show error message if update fails
        }
    };

    // Function to handle user deletion
    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            if (res.status === 200) {
                setUsers(users.filter(user => user.id !== id)); // Remove the user from the list
                toast.success('User deleted successfully!'); // Show success message
            } else {
                toast.error('Failed to delete user') // Show error message if deletion fails
            }
        } catch (error) {
            console.log(error)
        }

    };

    // Function to open the modal for creating a new user
    const openCreateModal = () => {
        resetForm(); // Reset the form fields
        setIsUpdate(false); // Set mode to create
        setVisible(true); // Open the modal
    };

    // Function to open the modal for editing an existing user
    const openEditModal = (user) => {
        setName(user.name); // Populate form fields with user's data
        setEmail(user.email);
        setPhone(user.phone);
        setSelected(user); // Set the selected user
        setIsUpdate(true); // Set mode to update
        setVisible(true); // Open the modal
    };

    // Function to reset form fields
    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setSelected(null);
        setIsUpdate(false);
    };

    return (
        <div className=' container m-3'>
            <Navbar openCreateModal={openCreateModal} /> {/* Navbar with button to open modal */}
            <h1>User List</h1>
            <table className="table ">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button className='me-3 btn btn-outline-success' onClick={() => openEditModal(user)}><FaEdit /></button> {/* Button to open edit modal */}
                                <button className='me-3 btn btn-outline-danger' onClick={() => deleteUser(user.id)}><MdDelete /></button> {/* Button to delete user */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal open={visible} onCancel={() => setVisible(false)} footer={null}> {/* Modal for add/edit user */}
                <Form
                    submitHandler={isUpdate ? updateUser : addUser} // Determine whether to call addUser or updateUser
                    name={name} // Pass form input values and handlers
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    phone={phone}
                    setPhone={setPhone}
                    isUpdate={isUpdate} // Indicate whether it is an update operation
                />
            </Modal>
        </div>
    );
};

export default UserList;



