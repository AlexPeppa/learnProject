import React, { useMemo } from "react";
import styles from "./Statistic.module.css";
import { Total, UserStatistic } from "../models";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface OwnProps {listOfUsers: UserStatistic[]}

export const Statistic: React.FC<OwnProps> = ({ listOfUsers }) => {

  const gender = listOfUsers.map((user) => user.gender);
  const numberOfMale: number = gender.filter((user) => user == "male").length;
  const numberOfUsers: number = gender.length;
  const numberOfFemale: number = numberOfUsers - numberOfMale;
  const percentOfMale: number = Math.floor((numberOfMale * 100) / numberOfUsers);
  const percentOfFemale: number = 100 - percentOfMale;

  const { accessibilityTotal, priceTotal } = useMemo<Total>(
    ()=> listOfUsers.reduce<{ accessibilityTotal: number ; priceTotal:number}>(
        ({ accessibilityTotal,priceTotal },{...user}) => {

          if(user.accessibility && user.price){
           accessibilityTotal = accessibilityTotal + user.accessibility 
           priceTotal= priceTotal + user.price 
            } 
             return {accessibilityTotal , priceTotal}
        }
        
        ,{ accessibilityTotal: 0, priceTotal: 0 }
      ),[]);

  const quantityOfAccessibility= listOfUsers.map((user) => user.accessibility).length;
  const quantityOfPrices = listOfUsers.map((user) => user.price).length;
  const averageAccessibility = (accessibilityTotal / quantityOfAccessibility).toFixed(2)
  const averagePrices =(priceTotal / quantityOfPrices).toFixed(2)  

  return (
    <div className={styles.wrapper}>
      <div className={styles.usersInfo}>
        <TableContainer
          sx={{ bgcolor: "rgba(187, 151, 151, 0.030)" }}
          component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell><h3>Name</h3></TableCell>
                <TableCell align="right"><h3>Gender</h3></TableCell>
                <TableCell align="right"><h3>Activity</h3></TableCell>
                <TableCell align="right"><h3>Accessibility</h3></TableCell>
                <TableCell align="right"><h3>Price</h3></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOfUsers.map((user) => (
                <TableRow key={user.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">{user.name}</TableCell>
                  <TableCell align="right">{user.gender}</TableCell>
                  <TableCell align="right">{user.activity}</TableCell>
                  <TableCell align="right">{user.accessibility}</TableCell>
                  <TableCell align="right">{user.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
                <li> - 100 %</li>
                <li> - {percentOfMale} %</li>
                <li> - {percentOfFemale} %</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.average}>
          <h4>Average index </h4>
          <div>
            <ul>
              <li className={styles.averageAccessibility}> Accessibility : {averageAccessibility}</li>
              <li>Prices : {averagePrices}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
