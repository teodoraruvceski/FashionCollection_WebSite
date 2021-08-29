import React, { useEffect,useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  Text,
  Input,
  Center,
  HStack,
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import {editWearService} from '../services/editWearService';

const EditWear = ()=>{

const [message,setMessage] = useState( "");
const [wear,setWear]=useState(JSON.parse(localStorage.getItem('wear')));
const nav=useNavigate();
useEffect(() => {
  if(message==="Added")
  { 
    nav('/collectionDetails');
  }
},[message]);
useEffect(()=>{
   
},[])
const handleChange = (e) => {
  const name = e.target.name; 
  const value = e.target.value;
  setWear({ ...wear, [name]: value }); 
   
};
  const handleSubmit = (e) => {
    e.preventDefault();
   if(wear.name==="" || wear.description==="")
   {
      setMessage("Please fill in all fields.");
   }
   else
   {
      editWearService(wear).then((ret)=>{
      if(ret==="wear for this season already exists")
      {
        setMessage("Wear with this name for this season already exists.");
      }
      else
      {
        setMessage("Added");
      }
    })}
  };
  return(
    <form >
      <Center>
      <Stack spacing={3} margin={4}>
          <HStack>
         <Text padding={2} textColor="#F3383F">Name</Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              name="name"
              id="name"
              value={wear.name}
              onChange={handleChange}
              placeholder="Name"
              variant="filled"
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
              focusBorderColor="#B794F4"
              
            />
          </InputGroup>
        </FormControl>
        </HStack>
          <HStack>
         <Text padding={2} textColor="#F3383F">Description</Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              name="description"
              id="description"
              value={wear.description}
              onChange={handleChange}
              placeholder="Description"
              variant="filled"
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
            />
          </InputGroup>
        </FormControl>
        </HStack>
       
        
        <Button  textColor="#ffffff" bgColor="#F3383F"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Save
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default EditWear;
