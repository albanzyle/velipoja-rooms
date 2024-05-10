import React, { useState } from "react";
import styles from '../styles/Boarder.module.css'
import { CiLogin } from "react-icons/ci";
import { RiLuggageDepositLine } from "react-icons/ri";
import BorderNav from "./BorderNav";
import AddUser from "./AddUser";
const Board =()=>{
    const [add, setAdd] = useState(false);

    const handleAddUser =(e)=>{
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
                    <h2>54</h2>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>
                        <RiLuggageDepositLine className={styles.icon}/>
                        <div className={styles.details}>
                            <h1>Depaertures</h1>
                            <p>This week</p>
                        </div>
                    </div>
                    <h2>7</h2>
                </div>
                <div className={styles.card}>
                    <div className={styles.title}>
                        <CiLogin className={styles.icon}/>
                        <div className={styles.details}>
                            <h1>Rooms Occupied</h1>
                            <p>This week</p>
                        </div>
                    </div>
                    <h2>54</h2>
                </div>
            </div>
            <div className={styles.reservations}>
                <h2>Reservations</h2>
                <button onClick={handleAddUser}><span className={styles.plus}>+</span> Add</button>
            </div>
            {add && <AddUser handleAddUser={handleAddUser}/>}
            <BorderNav/>
        </div>
    )
}

export default Board;