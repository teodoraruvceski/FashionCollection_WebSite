import React, { useEffect,useState } from "react";
import {
  Button,
  Stack,
  FormControl,
  InputGroup,
  Text,
  Input,
  Center,
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import {addWearService} from '../services/addWearService';

const AddWear = ()=>{

const [message,setMessage] = useState( "");
const [wear,setWear]=useState(
      {
      name: "",
      description: "",
      fashionCollectionId:-1
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
   }
   else
   {
      addWearService(wear).then((ret)=>{
      if(ret==="wear for this season already exists")
      {
        setMessage("Wear with this name for this season already exists.");
      }
      else
      {
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
              textColor="#F3383F"
              bgColor="#F1EFED"
              width="200 px"
              focusBorderColor="#B794F4"
              
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
      


export default AddWear;
