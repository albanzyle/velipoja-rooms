import React, { useState } from "react";
import styles from "../styles/AddUser.module.css";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

// Function to format a date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const AddUser = ({ fetchAllGuests, rowData={}, handleAddUser, postState=false}) => {

  const formattedCheckInDate = rowData.checkInDate ? formatDate(rowData.checkInDate) : '';
  const formattedDepartureInDate = rowData.checkInDate ? formatDate(rowData.departureDate) : '';


  const [formData, setFormData] = useState({
    fullName: rowData.fullName || '',
    roomNumber: rowData.roomNumber || '',
    pricePerNight: rowData.pricePerNight || 0,
    checkInDate: formattedCheckInDate || '',
    departureDate: formattedDepartureInDate || '',
    description: rowData.description || ''
  });
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/guests", formData);
      setFormData({
        fullName: "",
        roomNumber: "",
        pricePerNight: "",
        checkInDate: "",
        departureDate: "",
        description: ""
      });
      fetchAllGuests();
      handleRemove();
      console.log("Successfully added new guest");
    } catch (error) {
      console.error("Error adding guest:", error);
    }
  };
  const handleRemove = () => {
    handleAddUser();
  };
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleEdit = async (e) =>{
    e.preventDefault();
    try{
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      };
      await fetch(`http://localhost:5000/guests/${rowData.id}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
      handleAddUser();
      fetchAllGuests();
    }
    catch(error){
      console.error("Error adding guest:", error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      await fetch(`http://localhost:5000/guests/${rowData.id}`, requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
      fetchAllGuests();
      handleAddUser();
    }
    catch(error) {
      console.error("Error deleting guest:", error);
    }
  }
  return (
    <div onClick={handleRemove} className={styles.background}>
      <RxCross1 className={styles.icon} />
      <form
        onClick={handleStopPropagation}
        className={styles.form}
      >
        {!postState && <h1 className={styles.details}>Details</h1>}
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="roomNumber">Room Number:</label>
          <select
            id="roomNumber"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
          >
            <option value="">Select Room</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="104">104</option>
            <option value="105">105</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="pricePerNight">Price per Night:</label>
          <input
            type="number"
            id="pricePerNight"
            name="pricePerNight"
            value={formData.pricePerNight}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="checkInDate">Check-in Date:</label>
          <input
            type="date"
            id="checkInDate"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="departureDate">Departure Date:</label>
          <input
            type="date"
            id="departureDate"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {postState && <button onClick={handleSubmit} className={styles.submitButton}>Add Guest</button>}
        {!postState && <div className={styles.divBtns}>
          <button onClick={handleEdit} className={styles.editButton}>Edit</button>
          <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
        </div>}
      </form>
    </div>
  );
};

export default AddUser;
