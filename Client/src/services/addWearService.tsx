import axios from "axios";
export const addWearService = async (wear) => {
  var r;
  console.log(wear);
  return axios
    .post("https://localhost:44332/collectionwears/addWear", wear)
    .then((val) => {
        (r = val.data);
        console.log(r);
        return r;
    })
    .catch((err)=>{
        console.log(err.response.data);
        return err.response.data;
    });
 
};