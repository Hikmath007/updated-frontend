import { Input } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";


function MyComponent() {

    const [file, setFile] = useState(null);

const onFileChange = async (event:any) => {
    const file = event.target.files[0];
    setFile(file);
  };


  const sendDataToBackend = async () => {
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const response = await axios.post('http://localhost:8080/creditdebit/api/v1/grn/data', formData);
                // Handle response if needed
              } else {
                console.error('No file selected.');
              }
          } catch (error) {
            console.error('An error occurred while validating:', error);
          }
        };

        useEffect(()=>{
            console.log("file is sending")  
        })
   

  return (
    <>
      <div>
        <Input
          type="file"
          inputProps={{ accept: ".xls,.xlsx" }}
          onChange={onFileChange}
        />
      </div>

      <div>
        {/* Your component JSX */}
        <button onClick={sendDataToBackend}>Send Data</button>
      </div>
    </>
  );
}

export default MyComponent;