import React, {useContext, useEffect,useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Icon,
  Text,
  Input,
  Center,
  Box,
} from "@chakra-ui/react";
import { InfoIcon, LockIcon } from "@chakra-ui/icons";
import {useNavigate} from 'react-router-dom';
import {loginService} from '../services/loginService';
import {AuthProvider,AuthContext} from "../authProvider";



const Login = () => {
  var logFiles = JSON.parse(sessionStorage.getItem("log"));
  var adminLogFiles = JSON.parse(localStorage.getItem("adminLog"));
const [message,setMessage] = useState("");
 const {user,setUser}= useContext(AuthContext);
const nav=useNavigate();
useEffect(() => {
  if(message==="Logged in")
  { 
    nav('/items');
  }
}, [message])
  
  const [person, setPerson] = useState({
      name: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role:"",
      id:-1
    });
  const handleChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;

    setPerson({ ...person, [name]: value }); 
   // console.log(person);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.username && person.password) {
      loginService(person).then((ret)=>{
      if(ret==="Incorrect username or password")
      {
        setMessage(ret);
        let info = {
          message: "User " + person.username + " failed to logged in.",
          time: new Date(),
          messageType: "ERROR"
        }
        console.log(logFiles);
        logFiles.push(info);
        sessionStorage.setItem("log", JSON.stringify(logFiles));
      }
      else
      {
        setMessage("Logged in");
        setPerson(ret);
        setUser(ret);
        //localStorage.setItem("user",JSON.stringify(ret));
        sessionStorage.setItem("user",JSON.stringify(ret));
        console.log("User logged in");
        let info = {
          message: "User " + person.username + " logged in.",
          time: new Date(),
          messageType: "INFO"
        }
        logFiles = [];
        logFiles.push(info);
        console.log(logFiles);
        sessionStorage.setItem("log", JSON.stringify(logFiles));
      }
    })
  }
  else
  {
    setMessage("Please fill in all fields.");
  }
  };

  return(
    <Box  bgColor="#FFFFFF"> 
    <form >
      <Center>

      <Stack spacing={3} margin={4}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement color="#A26734" children={<Icon as={InfoIcon} />} />
            <Input
              type="name"
              name="username"
              id="username"
              value={person.username}
              onChange={handleChange}
              placeholder="Username"
              variant="filled"
              textColor="#794D27"
              bgColor="#E2E0E0"
              width="200 px"
              focusBorderColor="#794D27"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
           <InputLeftElement color="#A26734" children={<Icon as={LockIcon} />} />
            <Input
              type="password"
              name="password"
              id="password"
              value={person.password}
              onChange={handleChange}
              placeholder="Password"
              variant="filled"
              textColor="#794D27"
              bgColor="#E2E0E0"
              width="200 px"
                  focusBorderColor="#794D27"
              
            />
          </InputGroup>
        </FormControl>
        <Button  textColor="#FFFFFF" bgColor="#A26734"   loadingText="Logging in..." onClick={handleSubmit} width="200 px">
          Log in
        </Button>
        <Text  textColor="#794D27">{message}</Text>
      </Stack>
      </Center>
    </form>
    </Box>
   
    
  )
   
};
      


export default Login;
