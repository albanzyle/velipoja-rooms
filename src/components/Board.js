import React, {useState, useEffect} from "react";
import styles from '../styles/Boarder.module.css'
import { CiLogin } from "react-icons/ci";
import { RiLuggageDepositLine } from "react-icons/ri";
import BorderNav from "./BorderNav";
import AddUser from "./AddUser";

const Board =({ fetchAllGuests, loading, allGuests})=>{
    const [add, setAdd] = useState(false);

    // Helper function to check if a date is within this week
    const isThisWeek = (date) => {
        const today = new Date();
        const startOfWeek = today.getDate() - today.getDay();
        const endOfWeek = startOfWeek + 6;
        const day = date.getDate();
        return day >= startOfWeek && day <= endOfWeek;
    };

    // Calculate the number of arrivals, departures, and rooms occupied this week
    const arrivalsThisWeek = allGuests.filter(guest => isThisWeek(new Date(guest.checkInDate))).length;
    const departuresThisWeek = allGuests.filter(guest => isThisWeek(new Date(guest.departureDate))).length;
    const roomsOccupiedThisWeek = allGuests.filter(guest => isThisWeek(new Date(guest.checkInDate)) && isThisWeek(new Date(guest.departureDate))).length;

    const handleAddUser =()=>{
        setAdd(!add)
    }
    return(
        <div className={styles.board}>
            <h1>Dashboard</h1>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <div className={styles.title}>
                        <CiLogin className={styles.icon}/>
                        <div className={styles.details}>
                            <h1>Arrivals</h1>
                            <p>This week</p>
                        </div>
                    </div>
                    <h2>{arrivalsThisWeek}</h2>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>
                        <RiLuggageDepositLine className={styles.icon}/>
                        <div className={styles.details}>
                            <h1>Departures</h1>
                            <p>This week</p>
                        </div>
                    </div>
                    <h2>{departuresThisWeek}</h2>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>
                        <CiLogin className={styles.icon}/>
                        <div className={styles.details}>
                            <h1>Rooms Occupied</h1>
                            <p>This week</p>
                        </div>
                    </div>
                    <h2>{roomsOccupiedThisWeek}</h2>
                </div>
            </div>
            <div className={styles.reservations}>
                <h2>Reservations</h2>
                <button onClick={handleAddUser}><span className={styles.plus}>+</span> Add</button>
            </div>
            {add && <AddUser fetchAllGuests={fetchAllGuests} handleAddUser={handleAddUser} postState={true}/>}
            <BorderNav fetchAllGuests={fetchAllGuests} loading={loading} allGuests={allGuests}/>
        </div>
    )
};

export default Board;
