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
import { LogEvent } from "../services/logEvent"

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
       LogEvent("tried to edit collection id: "+ collection.id+" INVALID input.","ERROR");
       }
       else{
      editCollectionService(collection).then((ret) => {
        if (ret === "ok")
        {
          alert('Saved!');
          LogEvent("edited collection id: "+ collection.id+".","INFO");
         nav('/items');
        }
        else {
          setMessage(ret);}
       })
       }
        
  };
  return(
    <form >
      <Center>
      <Stack spacing={3} margin={4}>
        <HStack>
         <Text padding={2} textColor="#794D27">Designer</Text>
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
              textColor="#794D27"
              bgColor="#E2E0E0"
              width="200 px"
              focusBorderColor="#794D27"
              
            />
          </InputGroup>
        </FormControl>
        </HStack>
        <HStack>
         <Text padding={4} textColor="#794D27">Season</Text>
        <FormControl isRequired>
          <InputGroup>
            <Select
              bg="#E2E0E0"
              borderColor="#E9D8FD"
              textColor="#794D27"
              placeholder="Select season"
              onChange={handleChange}
              name="season"
              id="season"
                  value={collection.season}
              focusBorderColor="#794D27"
            >
              <option value="1">Summer</option>
              <option value="2">Fall</option>
              <option value="3">Winter</option>
              <option value="0">Spring</option>

              </Select>
          </InputGroup>
        </FormControl>
        </HStack>
        <HStack>
         <Text padding={8} textColor="#794D27">Year</Text>
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
              textColor="#794D27"
              bgColor="#E2E0E0"
                  width="200 px"
                  focusBorderColor="#794D27"
            />
          </InputGroup>
        </FormControl>
        </HStack>
       
        <Button  textColor="#FFFFFF" bgColor="#A26734"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Save
        </Button>
        <Text  textColor="#794D27">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default Edit;
