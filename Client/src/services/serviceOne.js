import axios from "axios";
import React from "react";

export const mojServis =async ()=>{
    var data;
     await axios.get(`https://localhost:44332/fashioncollection`).then(val=>data  = val.data);

    console.log(data);
    return data;
}

