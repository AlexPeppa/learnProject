import { Routes,Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import styles from './hooks.module.css';
import UseEffect from './useEffect/UseEffect';
import UseState from './useState/UseState';

const Hooks =() => {
    return (
      
        <div className={styles.wrapper} >
          <ul>
            <li><NavLink className={styles.link} to={"*/useState"}>UseState</NavLink></li>
            <li><NavLink className={styles.link} to={'*/useEffect'}>UseEffect</NavLink></li>
          </ul>

          <Routes>
          <Route path='*/useState' element={<UseState/>} /> 
          <Route path='*/useEffect' element={<UseEffect/>} /> 
          </Routes>
         
        </div>
    )
}
export default Hooks