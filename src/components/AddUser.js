import React, { useState } from "react";
import styles from "../styles/AddUser.module.css";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

const AddUser = ({ handleAddUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    roomNumber: "",
    pricePerNight: "",
    checkInDate: "",
    departureDate: "",
    description: ""
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
      // Make a POST request to your backend API to add a new guest
      await axios.post("http://localhost:5000/guests", formData);
      
      // Reset the form data after successful submission
      setFormData({
        fullName: "",
        roomNumber: "",
        pricePerNight: "",
        checkInDate: "",
        departureDate: "",
        description: ""
      });

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

  return (
    <div onClick={handleRemove} className={styles.background}>
      <RxCross1 className={styles.icon} />
      <form
        onClick={handleStopPropagation}
        className={styles.form}
        onSubmit={handleSubmit}
      >
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

        <button type="submit" className={styles.submitButton}>Add Guest</button>
      </form>
    </div>
  );
};

export default AddUser;
