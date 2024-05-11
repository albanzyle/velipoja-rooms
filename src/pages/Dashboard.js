import React,{useState, useEffect} from "react";
import styles from '../styles/Dashboard.module.css'
import Nav from "../components/Nav";
import Board from "../components/Board";
import Details from "../components/Details";
import AddUser from "../components/AddUser";
import axios from "axios";

const Dashboard =()=>{
    const [allGuests, setAllGuests] = useState([]);
    const [loading, setLoading] = useState(false);
    // Fetch all guests from the server
    const fetchAllGuests = async () => {
        setLoading(true);
        try {
        const response = await axios.get("http://localhost:5000/guests");
        setAllGuests(response.data);
        } catch (error) {
        console.error("Error fetching data:", error);
        }
        setLoading(false);
    };
    // Load guests on initial render
    useEffect(() => {
        fetchAllGuests();
    }, []);
    return(
        <div className={styles.main}>
            <Nav/>
            <Board fetchAllGuests={fetchAllGuests} loading={loading} allGuests={allGuests}/>
            <Details allGuests={allGuests}/>
        </div>
    )
}

export default Dashboard;