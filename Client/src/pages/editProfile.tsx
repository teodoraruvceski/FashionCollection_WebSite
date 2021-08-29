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
  HStack
} from "@chakra-ui/react";
import { InfoIcon, LockIcon } from "@chakra-ui/icons";
import axios from "axios";
import { MailRounded, PersonAddRounded, PersonRounded } from "@material-ui/icons";
import {useNavigate} from 'react-router-dom';

const Register = ()=>{
const [message,setMessage] = useState("");
const[valid,setValid]=useState(false);
 const [person, setPerson] = useState(JSON.parse(sessionStorage.getItem('user')));
const nav=useNavigate();
useEffect(() => {
  if(message==="changes saved ")
  {
    nav('/items');
    setMessage('');
  }
}, [message])
const FunCall = async () => {
  var r;
  console.log(person);
  sessionStorage.setItem('user',JSON.stringify(person));
  await axios
    .post("https://localhost:44332/user/editProfile", person )
    .then((val) => {(r = val.data);console.log(r);setMessage(r)}).catch((err)=>{console.log(err.response.data);setMessage(err.response.data)});

  };
  
 
  const handleChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;

    setPerson({ ...person, [name]: value }); 
   // console.log(person);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(person.name==="" ||
       person.lastName==="" )
       {
         setMessage("Please fill in all fields.");
       }
       else {
      FunCall();
    }
  };

  return(
    <form >
      <Center>

      <Stack spacing={3} margin={4}>
        <HStack>
         <Text padding={2} textColor="#F3383F">Name</Text>
          <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<Icon as={InfoIcon} />} />
            <Input
              type="name"
              name="name"
              id="name"
              value={person.name}
              onChange={handleChange}
              placeholder="Name"
              variant="filled"
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
            />
          </InputGroup>
        </FormControl>
        </HStack><HStack>
         <Text padding={2} textColor="#F3383F">Lastname</Text>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<Icon as={InfoIcon} />} />
            <Input
              type="lastaname"
              name="lastName"
              id="lastName"
              value={person.lastName}
              onChange={handleChange}
              placeholder="Lastname"
              variant="filled"
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
            />
          </InputGroup>
        </FormControl>
        </HStack>
        <Button  textColor="#ffffff" bgColor="#F3383F" onClick={handleSubmit} width="200 px">
          Save
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default Register;
