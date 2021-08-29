import axios from "axios";
export const editCollectionService = async (collection) => {
  var r;
  console.log(collection);
  return axios
    .post("https://localhost:44332/fashioncollection/editCollection", collection)
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