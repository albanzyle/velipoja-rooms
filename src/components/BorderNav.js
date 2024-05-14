import React, { useEffect, useState, useMemo } from "react";
import styles from "../styles/BorderNav.module.css";
import { FaSort } from "react-icons/fa";
import axios from "axios";
import { format } from "date-fns";
import AddUser from "./AddUser";

const BorderNav = ({loading, fetchAllGuests, allGuests}) => {
  // const [allGuests, setAllGuests] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState("allguests");
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'ascending' });;
  const [error, setError] = useState(null);
  const [add, setAdd] = useState(false);
  const [rowData, setRowData] = useState({});

  // Switch category when a navigation button is clicked
  const handleNav = (category) => {
    setSelectedCategory(category);
  };

  // Sort guests based on current selection and sorting rules
  const sortedData = useMemo(() => {
    // Filter by category if not "allguests"
    let filteredGuests = selectedCategory === "allguests" ? allGuests : allGuests.filter(guest => guest.category === selectedCategory);
    console.log("It was here")
    // Sort based on current sorting configuration
    if (sortConfig.field !== null) {
      filteredGuests.sort((a, b) => {
        if (a[sortConfig.field] < b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.field] > b[sortConfig.field]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredGuests;
  }, [allGuests, selectedCategory, sortConfig]);

  // Update sorting field and direction
  const handleSort = (field) => {
    let direction = 'ascending';
    if (sortConfig.field === field && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ field, direction });
  };
  const handleClickRow =(row)=>{
    console.log(row)
    setAdd(!add)
    setRowData(row);
  }
  const handleAddUser =()=>{
    setAdd(!add)
  }
  return (
    <>
      {/* Navigation Buttons */}

      <div className={styles.nav}>
        {["allguests", "arrivals", "departures", "inhouse"].map((category) => (
          <button
            key={category}
            style={{ borderBottom: selectedCategory === category ? "5px solid blueviolet" : "" }}
            onClick={() => handleNav(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {/* Table displaying guest information */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {["fullName", "roomNumber", "checkInDate", "pricePerNight"].map((field) => (
                <th key={field} onClick={() => handleSort(field)}>
                  {field.charAt(0).toUpperCase() + field.slice(1)} <FaSort />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr onClick={()=>handleClickRow(item)} key={item.id}>
                <td>{item.fullName}</td>
                <td>{item.roomNumber}</td>
                <td>{format(new Date(item.checkInDate), "yyyy-MM-dd")}</td>
                <td>{item.pricePerNight}&euro;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {add && <AddUser fetchAllGuests={fetchAllGuests} rowData={rowData} handleAddUser={handleAddUser} postState={false}/>}
      {/* Loading and Error Handling */}
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default BorderNav;
