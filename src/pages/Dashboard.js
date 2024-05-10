import React from "react";
import styles from '../styles/Dashboard.module.css'
import Nav from "../components/Nav";
import Board from "../components/Board";
import Details from "../components/Details";
import AddUser from "../components/AddUser";
const Dashboard =()=>{
    return(
        <div className={styles.main}>
            <Nav/>
            <Board/>
            <Details/>
        </div>
    )
}

export default Dashboard;