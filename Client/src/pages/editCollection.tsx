import React, {useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  Text,
  Input,
  Center,
  HStack,
  Select
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import {editCollectionService} from '../services/editCollectionService';

const Edit = ()=>{

const [message,setMessage] = useState( "");
const [collection,setCollection]=useState(JSON.parse(localStorage.getItem('collection') || '{}'));

const nav=useNavigate();
const handleChange = (e) => {
  const name = e.target.name; 
  const value = e.target.value;
  setCollection({ ...collection, [name]: value }); 
};
const handleChangeNum = (e) => {
  const name = e.target.name; 
  const value = e.target.value;
  console.log(collection);
  const p=parseInt(value);
    setCollection({ ...collection, [name]: p }); 
};
  const handleSubmit = (e) => {
    e.preventDefault();
    if(collection.designer==="" ||
       collection.year==="" ||
       collection.season==="" )
       {
         setMessage("Please fill in all fields.");
       }
       else{
          editCollectionService(collection).then((ret)=>{
          alert('Saved!');
           nav('/items');
           })
       }
        
  };
  return(
    <form >
      <Center>
      <Stack spacing={3} margin={4}>
        <HStack>
         <Text padding={2} textColor="#F3383F">Designer</Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="text"
              name="designer"
              id="designer"
              value={collection.designer}
              onChange={handleChange}
              placeholder="Designer"
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
         <Text padding={4} textColor="#F3383F">Season</Text>
        <FormControl isRequired>
          <InputGroup>
            <Select
              bg="#F1EFED"
              borderColor="#E9D8FD"
              textColor="#F3383F"
              placeholder="Select season"
              onChange={handleChange}
              name="season"
              id="season"
              value={collection.season}
            >
              <option value="Summer">Summer</option>
              <option value="Fall">Fall</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>

              </Select>
          </InputGroup>
        </FormControl>
        </HStack>
        <HStack>
         <Text padding={8} textColor="#F3383F">Year</Text>
        <FormControl isRequired>
          <InputGroup>
            <Input
              type="number"
              name="year"
              id="year"
              value={collection.year}
              onChange={handleChangeNum}
              placeholder="Year"
              variant="filled"
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
            />
          </InputGroup>
        </FormControl>
        </HStack>
       
        <Button  textColor="#FFFFFF" bgColor="#F3383F"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Save
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default Edit;
