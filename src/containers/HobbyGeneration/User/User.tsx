import React from "react";
import styles from "./User.module.css";
import { UserData } from "../models";

interface OwnProps extends UserData {}

export const User: React.FC<OwnProps> = ({ picture, gender, name, phone, email, location }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.userInfo}>
        <img className={styles.userPhoto} src={picture.medium} alt="Photo" />
        <div className={styles.userInfoText}>
          <div className={styles.userData}>
            <div>Gender : {gender}</div>
            <div>
              Name : {name.title} {name.first} {name.last}
            </div>
            <div>Phone : {phone}</div>
            <div>Email : {email}</div>
          </div>
          <div>
            <div className={styles.location}>
              <div>Location : </div>
              <div>
                <ul className={styles.ul}>
                  <li>Country : {location.country}</li>
                  <li>State : {location.state} </li>
                  <li>City :{location.city}</li>
                </ul>
              </div>
            </div>
            <div>Time Zone offset :{location.timezone.offset} </div>
          </div>
        </div>
      </div>
    </div>
  );
};
