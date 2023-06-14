import React from "react";
import styles from "./Statistic.module.css";
import { userAndActivity } from "../models";

interface OwnProps {
  listOfUsers: userAndActivity[];
}

export const Statistic: React.FC<OwnProps> = (listOfUsers) => {
  const users = listOfUsers.listOfUsers;

  const userNames = users.map((user) => {
    for (const name in user) {
      return name;
    }
  });
  const userData = users.map((user) => {
    for (const name in user) {
      return {
        gender: user[name].gender,
        activity: user[name].activity,
        accessibility: user[name].accessibility,
        price: user[name].price,
      };
    }
  });
  const gender = userData
    .filter((user) => user?.gender !== "")
    .map((user) => user?.gender);
  const activities = userData
    .filter((user) => user?.activity !== "")
    .map((user) => user?.activity);
  const accessibility = userData
    .filter((user) => user?.gender !== "")
    .map((user) => user?.accessibility);
  const prices = userData
    .filter((user) => user?.gender !== "")
    .map((user) => user?.price);

  const numberOfMale: number = gender.filter((user) => user == "male").length;
  const numberOfUsers: number = gender.length;
  const numberOfFemale: number = numberOfUsers - numberOfMale;
  const percentOfMale: number = Math.floor(
    (numberOfMale * 100) / numberOfUsers
  );
  const percentOfFemale: number = 100 - percentOfMale;

  const add = function (arr: any[]) {
    return arr.reduce((a: any, b: any) => a + b, 0);
  };
  const sumOfAccessibility = add(accessibility);
  const averageAccessibility: string = (
    sumOfAccessibility / accessibility.length
  ).toFixed(2);

  const sumOfPrices = add(prices);
  const averagePrices = (sumOfPrices / prices.length).toFixed(2);

  return (
    <div className={styles.wrapper}>
      <div className={styles.usersInfo}>
        <div className={styles.names}>
          <ol>
            <h4>Names</h4>
            {userNames
              .filter((userName) => userName !== " ")
              .map((userName) => (
                <li key={userName}>{userName}</li>
              ))}
          </ol>
        </div>

        <div className={styles.gender}>
          <ul>
            <h4>Gender</h4>
            {gender.map((gender) => (
              <li key={Math.random()}>{gender}</li>
            ))}
          </ul>
        </div>

        <div className={styles.activity}>
          <ul>
            <h4>Activity</h4>
            {activities.map((activity) => (
              <li key={Math.random()}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className={styles.accessibility}>
          <ul>
            <h4>Accessibility</h4>
            {accessibility.map((accessibility) => (
              <li key={Math.random()}>{accessibility}</li>
            ))}
          </ul>
        </div>

        <div className={styles.price}>
          <ul>
            <h4>Prices</h4>
            {prices.map((price) => (
              <li key={Math.random()}>{price}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.statisticBox}>
        <div className={styles.userStatistic}>
          <h4>User Info</h4>
          <div className={styles.userStatisticNumbers}>
            <div>
              <ul>
                <li>Users : {numberOfUsers}</li>
                <li>Male : {numberOfMale} </li>
                <li>Female : {numberOfFemale} </li>
              </ul>
            </div>
            <div>
              <ul className={styles.percent}>
                <li> - 100%</li>
                <li> - {percentOfMale}%</li>
                <li> - {percentOfFemale}%</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.average}>
          <h4>Average index </h4>
          <div>
            <ul>
              <li className={styles.averageAccessibility}>
                Accessibility : {averageAccessibility}
              </li>
              <li>Prices : {averagePrices}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
