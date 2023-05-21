
import React from "react"
import styles from './User.module.css'
import { OwnPropsUser } from "../models"

export const User : React.FC<OwnPropsUser> = ({user}) => {
   
    return (
        <div className={styles.wrapper}>
            <div className={styles.userInfo}>
                <img className={styles.userPhoto} src={user.picture.medium} alt="Photo" />
                <div className={styles.userInfoText}>
                    <div className={styles.userData}>
                        <div>Gender : {user.gender}</div>
                        <div> Name : {user.name.title} {user.name.first} {user.name.last}</div>
                        <div>Phone : {user.phone}</div>
                        <div>Email : {user.email}</div>
                    </div>
                    <div>
                        <div className={styles.location}>
                            <div>Location : </div>
                            <div>
                                <ul className={styles.ul}>
                                    <li>Country :  {user.location.country}</li>
                                    <li>State : {user.location.state}  </li>
                                    <li>City :{user.location.city}</li>
                                </ul>
                            </div>
                        </div>
                        <div>Time Zone offset :{user.location.timezone.offset} </div>
                    </div>
                </div>

            </div>
        </div>
    )
}