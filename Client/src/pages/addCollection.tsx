import React, { useEffect,useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  Text,
  Input,
  Center,
  Select,
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import {addCollectionService} from '../services/addCollectionService';
import { LogEvent } from "../services/logEvent"

const AddCollection = ()=>{

const [message,setMessage] = useState( "");
const [collection,setCollection]=useState(
      {
      designer: "",
      year: "",
      season: -1,
    }
);
const nav=useNavigate();
useEffect(() => {
  if(message==="Added")
  { 
    nav('/items');
  }
},[message]);
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
       collection.season===-1 )
       {
       setMessage("Please fill in all fields.");
       LogEvent("tried to add collection, INVALID input.","WARNING");
       }
       else{
         console.log(collection);
        addCollectionService(collection).then((ret)=>{
        if(ret==="Collection for this season already exists")
        {
          setMessage(ret);
          LogEvent("tried to add collection, collection already exists.","ERROR");
        }
        else
        {
          //setMessage(ret);/////////////////////////////////////////////////////////////
          LogEvent("added new collection.","INFO");
          setMessage("Added");
        }
        })
    }
  };
  return(
    <form >
      <Center>
      <Stack spacing={3} margin={4}>
        
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
       <FormControl isRequired>
          <InputGroup>
            <Select
              bg="#E2E0E0"
              borderColor="#F1EFED"
              textColor="#794D27"
              placeholder="Select season"
              onChange={handleChange}
              name="season"
              id="season"
                typeof="number"
                focusBorderColor="#794D27"
              value={collection.season}
            >
              <option value="1">Summer</option>
              <option value="2">Fall</option>
              <option value="3">Winter</option>
              <option value="0">Spring</option>

              </Select>
          </InputGroup>
        </FormControl>
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
        
        <Button  textColor="#FFFFFF" bgColor="#A26734"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Add
        </Button>
        <Text  textColor="#794D27">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default AddCollection;
