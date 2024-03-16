import React, { useEffect, useState } from "react";
import { View } from "react-native";



const  data = () => {
    const [mantra, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
          const url = 'https://bugle.co.in/moksh/public/api/get-mantra';
          const response = await fetch(url);
          try {
            const responseJson = response.json()
            // .then(()=>JSON.stringify(responseJson))      
            // console.log(typeof(responseJson))
            .then(data => setUsers(data))
            console.log(typeof(users))              
          } catch (err) {
            console.error(err);     
          }
        };        
      
        getUsers();                   
      }, []);
}

export default data