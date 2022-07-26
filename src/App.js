import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [users, setUser] = useState([]);
  
  useEffect(() => {
    async function getData() {
      const response = axios
        .get(`https://jsonplaceholder.typicode.com/users`)
        .then((response) => {
          const usersData = response.data
          var result = [];
          var keys = Object.keys(usersData);
          keys.forEach(function(key){
          result.push(usersData[key]);
          setUser(result)
    });
        });   
        
    }
    getData();
  }, [{users}]);

  return (
    <div className="usersDetails">
      <h1>Users Details</h1>
        {
          users.map(user => {
            return(
              <div key={user.id} >
                  <div>{user.id}. {user.name}<br/>{user.email}<br/><br/></div>
              </div>
            )
          })
        }
    </div>
  );
}

export default App;
