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
       collection.season==="" )
       {
         setMessage("Please fill in all fields.");
       }
       else{
         console.log(collection);
        addCollectionService(collection).then((ret)=>{
        if(ret==="Collection for this season already exists")
        {
          setMessage(ret);
        }
        else
        {
          //setMessage(ret);/////////////////////////////////////////////////////////////
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
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
              focusBorderColor="#B794F4"
              
            />
          </InputGroup>
        </FormControl>
       <FormControl isRequired>
          <InputGroup>
            <Select
              bg="#F1EFED"
              borderColor="#F1EFED"
              textColor="#F3383F"
              placeholder="Select season"
              onChange={handleChange}
              name="season"
              id="season"
              typeof="number"
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
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
            />
          </InputGroup>
        </FormControl>
        
        <Button  textColor="#FFFFFF" bgColor="#F3383F"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Add
        </Button>
        <Text  textColor="#F3383F">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default AddCollection;
