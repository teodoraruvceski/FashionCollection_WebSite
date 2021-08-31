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
import {addWearService} from '../services/addWearService';
import { LogEvent } from "../services/logEvent"

const AddWear = ()=>{

const [message,setMessage] = useState( "");
const [wear,setWear]=useState(
      {
      name: "",
      description: "",
      fashionCollectionId: -1,
      type:-1
    }
);
const nav=useNavigate();
useEffect(() => {
  if(message==="Added")
  { 
    nav('/collectionDetails');
  }
},[message]);
useEffect(()=>{
    let idc=JSON.parse(localStorage.getItem('collection')).id;
    console.log(idc);
    //  setWear({
    //   name: "",
    //   description: "",
    //   id:-1,
    //   fashionCollectionId:idc,
    // }); 
    setWear({...wear,fashionCollectionId:idc});
     console.log(wear.fashionCollectionId);
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
       LogEvent("tried to add wear, INVALID input.","WARNING");
   }
   else
   {
      addWearService(wear).then((ret)=>{
      if(ret==="Collection already exists")
      {
        setMessage("Wear with this name for this season already exists.");
        LogEvent("tried to add wear, name already exists.","ERROR");
      }
      else
      {
        LogEvent("added new wear.","INFO");
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
        
        <Button  textColor="#FFFFFF" bgColor="#A26734"   loadingText="Adding..." onClick={handleSubmit} width="200 px">
          Add
        </Button>
        <Text  textColor="#794D27">{message}</Text>
      </Stack>
      </Center>
    </form>
    
  )
   
};
      


export default AddWear;
