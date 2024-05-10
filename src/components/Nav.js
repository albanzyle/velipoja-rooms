import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { SiHiltonhotelsandresorts } from "react-icons/si";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineRoomService } from "react-icons/md";
import { MdOutlineInventory } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import styles from '../styles/Nav.module.css'
const Nav =()=>{
    return(
        <div className={styles.nav}>
            
            <h1><SiHiltonhotelsandresorts className={styles.icon1}/>Velipoja Rooms</h1>

            <div className={styles.option} style={{background: "#8a2be2"}}>
                <BiHomeAlt2 className={styles.icon}/>
                <h1>Dashboard</h1>
            </div>
            <div className={styles.option}>
                <IoCalendarOutline className={styles.icon}/>
                <h1>Reservation</h1>
            </div>

            <div className={styles.option}>
                <MdOutlineRoomService className={styles.icon}/>
                <h1>Rooms</h1>
            </div>
            <div className={styles.option}>
                <MdOutlineInventory className={styles.icon}/>
                <h1>Inventory</h1>
            </div>
            <div className={styles.option}>
                <HiOutlineDocumentReport className={styles.icon}/>
                <h1>Report</h1>
            </div>
            <div className={styles.option}>
                <MdLogout className={styles.icon}/>
                <h1>Logout</h1>
            </div>
        </div>  
    )
}

export default Nav;