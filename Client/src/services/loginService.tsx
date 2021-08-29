import axios from "axios";
export const loginService = async (person) => {
  var r;
  return axios
    .post("https://localhost:44332/user/login", person )
    .then((val) => {
        (r = val.data);
        return r;
    })
        .catch((err)=>{
            console.log(err.response.data);
            return err.response.data;
        });
 
};