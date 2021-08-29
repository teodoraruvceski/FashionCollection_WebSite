import axios from "axios";
export const editWearService = async (wear) => {
  var r;
  console.log(wear);
  return axios
    .post("https://localhost:44332/collectionwears/editWear", wear)
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