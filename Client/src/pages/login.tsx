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



const Login = ()=>{
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
      }
      else
      {
        setMessage("Logged in");
        setPerson(ret);
        setUser(ret);
        //localStorage.setItem("user",JSON.stringify(ret));
        sessionStorage.setItem("user",JSON.stringify(ret));
        console.log("User logged in");
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
            <InputLeftElement children={<Icon as={InfoIcon} />} />
            <Input
              type="name"
              name="username"
              id="username"
              value={person.username}
              onChange={handleChange}
              placeholder="Username"
              variant="filled"
              textColor="#F3383F"
              bgColor="#E9D8FD"
              width="200 px"
              focusBorderColor="#E9D8FD"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
           <InputLeftElement  children={<Icon as={LockIcon} />} />
            <Input
              type="password"
              name="password"
              id="password"
              value={person.password}
              onChange={handleChange}
              placeholder="Password"
              variant="filled"
              textColor="#F3383F"
              bgColor="#E9D8FD"
              width="200 px"
              focusBorderColor="#E9D8FD"
              
            />
          </InputGroup>
        </FormControl>
        <Button  textColor="#FFFFFF" bgColor="#F3383F"   loadingText="Logging in..." onClick={handleSubmit} width="200 px">
          Log in
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    </Box>
   
    
  )
   
};
      


export default Login;
