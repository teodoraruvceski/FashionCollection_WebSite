import React, { useState, useEffect } from "react";
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
  Select
} from "@chakra-ui/react";
import { InfoIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { MailRounded, PersonAddRounded, PersonRounded } from "@material-ui/icons";
import {useNavigate} from 'react-router-dom';
import { LogEvent } from "../services/logEvent"

const Register = ()=>{
const [message,setMessage] = useState("");
const[valid,setValid]=useState(false);
const nav=useNavigate();
useEffect(() => {
  if(message==="Registered")
  {
    nav('/items');
  }
  else if (message === "Invalid input.")
  {
   LogEvent("tried to register new user, INVALID input." , "ERROR");
  }
  else if (message === "User already exists.")
  {
    LogEvent("tried to register new user, user already exists." , "ERROR");
    }
}, [message])

const FunCall = async () => {
  var r;
  console.log(person);
  await axios
    .post("https://localhost:44332/user/register", person )
    .then((val) => {(r = val.data);console.log(r);setMessage(r)}).catch((err)=>{console.log(err.response.data);setMessage(err.response.data)});
    setPerson({
      name: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role:-1
    });
  };
  
  const [person, setPerson] = useState({
      name: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      role:-1
    });
  const handleChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;

    setPerson({ ...person, [name]: value }); 
   // console.log(person);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(person.username==="" ||
       person.password==="" ||
       person.name==="" ||
       person.lastName==="" ||
       person.role==="" ||
       person.email==="")
       {
         setMessage("Please fill in all fields.");
       }
       else if(!person.email.includes("@") || !person.email.includes("."))
       {
      setMessage("Invalid email format.");
      LogEvent("tried to register new user, INVALID email format." , "ERROR");
       }
       else {
         console.log(person);
      FunCall();
      LogEvent("registered new user." , "INFO");
     
    }
  };

  return(<Box  bgColor="FFFFFF">
    <form >
      <Center>

      <Stack spacing={3} margin={4}>
          <FormControl isRequired>
          <InputGroup>
            <InputLeftElement color="#A26734" children={<Icon as={InfoIcon} />} />
            <Input
              type="name"
              name="name"
              id="name"
              value={person.name}
              onChange={handleChange}
              placeholder="Name"
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
            <InputLeftElement color="#A26734" children={<Icon as={InfoIcon} />} />
            <Input
              type="lastaname"
              name="lastName"
              id="lastName"
              value={person.lastName}
              onChange={handleChange}
              placeholder="Lastname"
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
            <InputLeftElement color="#A26734" children={<Icon as={PersonRounded} />} />
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
           <InputLeftElement color="#A26734"  children={<Icon as={LockIcon} />} />
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
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement color="#A26734" children={<Icon as={MailRounded} />} />
            <Input
              type="email"
              name="email"
              id="email"
              value={person.email}
              onChange={handleChange}
              placeholder="Email"
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
            <Select
              bg="#E2E0E0"
              borderColor="#E2E0E0"
              textColor="#794D27"
              placeholder="Select role"
              onChange={handleChange}
              name="role"
              id="role"
              typeof="number"
                value={person.role}
                focusBorderColor="#794D27"
            >
              <option value="0">User</option>
              <option value="1">Admin</option>
              </Select>
          </InputGroup>
        </FormControl>
        <Button  textColor="#ffffff" bgColor="#A26734" onClick={handleSubmit} width="200 px">
          Register
        </Button>
        <Text  textColor="#794D27">{message}</Text>
      </Stack>
      </Center>
    </form>
    </Box>
  )
   
};
      


export default Register;
