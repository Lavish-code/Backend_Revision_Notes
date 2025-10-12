/*
bhaiya baat hai aesi ki jab bhi hum industry standards mein code karte hai 
we have to maintain in such a way that others can also examine and undertand 
code properly ..... isliye we try to make the server.js as free as we can 

*/

import connectDB from "./db/index.js";
import dotenv from "dotenv";
import {app} from "./app.js";

dotenv.config({
  path: `./.env`
});
const PORT = process.env.PORT || 8000;

connectDB()
  /*just like try and catch we're using then and cath
   isliye if the connection is estalished by mongo db then we'll head for server
  otherwise simply we'll move to cath part stating bhaiya mongodb run hi nii hua hai LALA.... 
  phle mongodb ka error hatao and then after worry ki tumahar code server pe run kar rah hai ya nahi..*/
  .then(() => {
    app.on("error", (error) => {
      console.log("Error:-", error);
      throw error;
    });
    // yaha simply we are making our server run at desired port
    app.listen(PORT || 8000, () => {
      console.log(`Server is running on the port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION FAIILED !!1", error);
  });
