import React, { useState } from "react";
import styles from '../styles/Details.module.css'
import { HiOutlineMail } from "react-icons/hi";
import Modal from "./Modal";
import image from '../assests/AlbanPhoto.jpeg'
const weeklyData = [
    { day: 'Mon', value: Math.floor(Math.random() * 1001) },
    { day: 'Tus', value: Math.floor(Math.random() * 1001) },
    { day: 'Wen', value: Math.floor(Math.random() * 1001) },
    { day: 'The', value: Math.floor(Math.random() * 1001) },
        { day: 'Fri', value: Math.floor(Math.random() * 1001) },
    { day: 'Sat', value: Math.floor(Math.random() * 1001) },
    { day: 'Sun', value: Math.floor(Math.random() * 1001) },
  ];
const guestData = [
    { day: 'Mon', value: Math.floor(Math.random() * 26) },
    { day: 'Tus', value: Math.floor(Math.random() * 26) },
    { day: 'Wen', value: Math.floor(Math.random() * 26) },
    { day: 'The', value: Math.floor(Math.random() * 26) },
    { day: 'Fri', value: Math.floor(Math.random() * 26) },
    { day: 'Sat', value: Math.floor(Math.random() * 26) },
    { day: 'Sun', value: Math.floor(Math.random() * 26) },
  ];
const Details =()=>{
    const [notification, setNotification] = useState(true);
    const [modal, setModal] = useState({
        isVisible: false,
        content: '',
        position: { top: 0, left: 0 }
      });
    const [data,setData] = useState(weeklyData);
    const [isRevenue, setIsRevenue] =useState(true);

    const handleClick =(e)=>{
        const name = e.target.name;
        if(name === 'revenue'){
            setData(weeklyData);

        }else{
            setData(guestData);
        }
        setIsRevenue(!isRevenue);
    };
    const handleBarClick = (day, event) => {
        const rect = event.currentTarget.getBoundingClientRect();

        setModal({
          isVisible: true,
          content: `${day.value}`,
          position: { top: rect.top -15, left: rect.left + rect.width / 2 } 
        });
      };
      
    
      const closeModal = () => {
        setModal({ isVisible: false, content: '' });
      };

    return(
        <div className={styles.details}>
            <div className={styles.top}>
                <div>
                    <HiOutlineMail className={styles.icon}/>
                    {notification &&<span className={styles.dot}></span>}
                </div>
                <div className={styles.profile}>
                    <img src={image} alt="profile image"/>
                    
                    <div className={styles.info}>
                        <h1>Alban Zyle</h1>
                        <p>alban.zyle@hds.utc.fr</p>
                    </div>
                </div>
            </div>
            <div className={styles.activities}>
                <h1>Today's Activities</h1>
                <div className={styles.today}>
                    <span className={styles.todayinfo}>
                        <h1>5</h1>
                        <h2>Booked</h2>
                    </span>
                    <span className={styles.todayinfo}>
                        <h1>22</h1>
                        <h2>Guest</h2>
                    </span>
                    <span className={styles.todayinfo}>
                        <h1>$1000</h1>
                        <h2>Revenue</h2>
                    </span>
                </div>
                <h1>Weekly Stats</h1>

                <div className={styles.week}>
                    <button name="revenue" onClick={handleClick} style={{borderBottom: isRevenue? " 5px solid blueviolet" : ''}}>Revenue</button>
                    <button name="guest" onClick={handleClick} style={{borderBottom: !isRevenue? " 5px solid blueviolet" : ''}}>Guest</button>
                </div>

                <div className={styles.grafic}>
                   {isRevenue && <div className={styles.numbers}>
                        <h1>1k</h1>
                        <h1>800</h1>
                        <h1>600</h1>
                        <h1>400</h1>
                        <h1>200</h1>
                    </div>}
                    {!isRevenue && <div className={styles.numbers}>
                        <h1>25</h1>
                        <h1>20</h1>
                        <h1>15</h1>
                        <h1>10</h1>
                        <h1>5</h1>
                    </div>}
                    {data.map(day=>(
                        
                        <div key={day.day} className={styles.days}>
                            <div className={styles.bar} >
                                <div onClick={(e) => handleBarClick(day, e)} style={{height: isRevenue ? `${day.value/10}%`: `${(day.value/30)*100}%`}} className={styles.progress}/>
                            </div>
                            <p>{day.day}</p>
                        </div>
                    ))}



                </div>

            </div>
            <Modal isVisible={modal.isVisible} content={modal.content} onClose={closeModal} position={modal.position} />
        </div>

    )
}

export default Details;