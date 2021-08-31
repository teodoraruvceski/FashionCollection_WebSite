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
  Select,
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import {editWearService} from '../services/editWearService';
import { LogEvent } from "../services/logEvent"

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
  console.log(JSON.parse(localStorage.getItem('wear')));
},[])
const handleChange = (e) => {
  const name = e.target.name; 
  const value = e.target.value;
  setWear({ ...wear, [name]: value }); 
   
};
  const handleSubmit = (e) => {
    e.preventDefault();
    //setWear({...wear,Type:wear.type+""});
   if(wear.name==="" || wear.description==="")
   {
     setMessage("Please fill in all fields.");
     LogEvent("tried to edit wear id: "+ wear.id+" INVALID input.","ERROR");
   }
   else
   {
     
      editWearService(wear).then((ret)=>{
      if(ret==="wear for this season already exists")
      {
        setMessage("Wear with this name for this season already exists.");
        LogEvent("tried to edit wear id: "+ wear.id+", name already exists.","ERROR");
      }
      else
      {
        LogEvent("edited wear id: "+ wear.id+".","INFO");
        setMessage("Added");
      }
    })}
  };
  return(
    <form >
      <Center>
      <Stack spacing={3} margin={4}>
          <HStack>
         <Text padding={2} textColor="#E2E0E0">Name</Text>
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
              textColor="#794D27"
              bgColor="#E2E0E0"
              width="200 px"
              focusBorderColor="#794D27"
              
            />
          </InputGroup>
        </FormControl>
        </HStack>
          <HStack>
         <Text padding={2} textColor="#E2E0E0">Description</Text>
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
              textColor="#794D27"
              bgColor="#E2E0E0"
                  width="200 px"
                  focusBorderColor="#794D27"
            />
          </InputGroup>
            </FormControl>
          </HStack>
          <HStack>
            <Text padding={2} textColor="#E2E0E0">Type</Text>
             <FormControl isRequired>
          <InputGroup>
            <Select
              bg="#E2E0E0"
              borderColor="#F1EFED"
              textColor="#794D27"
              placeholder="Select type"
              onChange={handleChange}
              name="type"
              id="type"
              typeof="number"
              value={wear.type}
              focusBorderColor="#794D27"
              >
              <option value="1">Bottom</option>
              <option value="2">Shoes</option>
              <option value="3">Accessorise</option>
              <option value="0">Top</option>

              </Select>
          </InputGroup>
        </FormControl>
              </HStack>
       
        
        <Button  textColor="#ffffff" bgColor="#A26734"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Save
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default EditWear;
