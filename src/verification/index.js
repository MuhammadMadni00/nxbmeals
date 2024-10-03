import React from "react";
import Sidebar from "../navbar/Sidebar";
import './Verification.css';
import MenuCard from "../Cards/MenuCard";
function Verification() {
return(
    <div className="verification-container">
    <Sidebar/>
    <div className="verification-content">
  
    <h1>Verification</h1>
    <hr/>
    <div className="ver-content">
    <h2>Please Scan QR using NXB Meals App</h2>
    <div style={styles.qrContainer}>
    <img className="qr-code" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEUAAAD///+l2Z/dAAACj0lEQVR4nO3Yy27kQAxD0c7//3SAbMutIiXaBcRXy2o9eJzNYD6fWf18L6t5nSr2PFoI1WaE5wqh2ozwXCFUm58QKueLHFYg63MMEyJEiBAhQoQI643W1fvSDxMiRIgQIUKECO8QNs+HbiFEiNAOHb+FECFCO3T81hPCYk/RPNyMECFChAgRInSFSllXFY+StZcQIUKECBEiRDgvxZx6OVMIky9nCmHy5UwhTL6cKYTJl2nEYRUL7zsqBYstQojwrkKoL0KI8K56gXC9ugYqSlldXRU2D/PkNyJEmM6T34gQYTpPfiPCc0JrddFjjSuBlE9W9CBEiBAhQoQIzX8wSMcsmHfeCRZbhPB6HGEgWGwRwutxhIFgsUUIr8fPCK30Sta1x5qygknfDiFChAgRIkT47H9eFFmL8d7RacThOMJA5mnE4TjCQOZpxOE4wkDmacThOMJAZmm+SDbMoQiV682ECBEiRIgQ4fuEKU+PMbz16F/M2tzM2ptCiLC1uZm1N4UQYWtzM2tv6o3CYmwYurhlfV8rM0KECBEiRIiwzlGkV8zWHquUbyd1W8cQJgshQoTXxxAmC+HfT+tTryy8Mh5r9hzOVYSb8Viz53CuItyMx5o9h3MV4WY81uw5nKsIN+P3NXs1XF1M9V7yhdAeX3+yXvKF0B5ff7Je8oXQHl9/sl7yhdAeX3+yXppZrRxKICt9MaVsRogQIUKECBHWgazQ3rFQedcRbjZKN9KFEKG1UbqRLoQIrY3SjXSdESpTRaAi4vSTIbzuQbjpQYjQKoTXPQg3Pf9N2GtW8FIehAgRIkSIEGF3tTWlRPRCWx8RIUKECBEiRNgtxWztGX6OfCFE+H0K4VOFEOH3KYRq/QL+d1XAP3Q+SQAAAABJRU5ErkJggg=="/>
   </div>
   </div>
    </div>
    </div>    
);
}
const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    qrContainer: {
      display: 'flex',
      justifyContent: 'center',  
      alignItems: 'center',     
      height: '300px',           
    },
    qrImage: {
      width: '200px',            
      height: '200px',          
    },
    menuSection: {
      marginTop: '20px',
    },
  };
  
export default Verification;
