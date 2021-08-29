import * as React from "react";
import {useState,useEffect} from "react";
import '../styles/items.css'
import {useNavigate} from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  VStack,
  Stack,
  Grid,
  theme,
  Text,
  Button,
  FormControl,
  Input,
  InputGroup,
} from "@chakra-ui/react"
import { CopyIcon,EditIcon, AddIcon, DeleteIcon,HamburgerIcon } from '@chakra-ui/icons'

 import axios from "axios";
 const CollectionDetails = () => {
  const [wears,setWears] = React.useState([]);
  const [user,setUser]=useState(null);
  const baseURLdelete="https://localhost:44332/collectionwears/deletewear/?id={id}";
  const baseURLcopy="https://localhost:44332/collectionwears/copy?id={id}";
  const baseURLwears="https://localhost:44332/collectionwears/get?id={colId}";

  const [wearId,setWearId]=useState();
 const deleteItem= async (wearId)=>{
   console.log("delete ");
   console.log(wearId);
  await axios
    .delete(baseURLdelete.replace("{id}",wearId));
    mojServis();
 };
 const copyItem= async (wearId)=>{
   console.log("copy ");
   console.log(wearId);
   console.log(baseURLcopy);
  await axios
    .get(baseURLcopy.replace("{id}",wearId));
    mojServis();
 };
   const nav=useNavigate();
const editItem= async (wearId)=>{//////////////////////////////////
   console.log("edit ");
   console.log(wearId);
   nav('/editWear');
   let obj = wears.find(o => o.id === wearId);
   console.log(obj);
    localStorage.setItem('wear',JSON.stringify(obj));
 };
 useEffect(()=>{
     console.log()
 })
useEffect(() => {
   mojServis();
  const u=sessionStorage.getItem('user');
  setUser(JSON.parse(sessionStorage.getItem("user")));
  console.log(JSON.parse(sessionStorage.getItem("user")));
  },[sessionStorage.getItem("user")]);
 const mojServis =async ()=>{
    var d;
    let cid=JSON.parse(localStorage.getItem('collection')).id;
     await axios
     .get(baseURLwears.replace('{colId}',cid))
     .then((response)=>{setWears(response.data);console.log(wears)});
}
  return <>
  <ChakraProvider theme={theme}>
    <Box bgColor="#ffffff" textAlign="center" fontSize="xl">
     
      <Grid minH="100vh" p={3}>
           <Box height={15}>
                <Button  rounded="lg" padding={3} textColor="#FFFFFF" onClick={()=>{nav('/addWear');}} width={95} height={35}backgroundColor="#F3383F">Add wear</Button>
            </Box>
        {user &&
        <VStack spacing={8}>
          {
          wears.map((wear) => {
            const {id,name, description }=wear;
            return <div key={id}>
               <Box borderRadius="md" textColor="#F3383F" width={600} height={125} borderWidth={2} backgroundColor="#F1EFED">
                  <Stack drection="column">
                    <Stack direction="row">
                       
                        <Box alignContent="start" width={95} marginRight={5}>
                            <Text  as="h4">{name}</Text>
                        </Box>
                        <Box width={185} marginRight={10}>
                            <Text as="p">
                            Description: {description}
                            </Text>
                        </Box>
                    </Stack>
                    <Stack textColor="#FFFFFF" alignSelf="center" spacing={7}  direction="row">
                        <Box  margin={0}>
                            <Button onClick={()=>{copyItem(id);console.log(id+" copy");}} width={65} height={5}backgroundColor="#F3383F"><CopyIcon/></Button>
                        </Box>
                        <Box margin={5}>
                            <Button onClick={()=>{deleteItem(id);console.log(id+" delete");}}  width={95} height={5}backgroundColor="#F3383F"><DeleteIcon/></Button>
                        </Box>
                        <Box marginRight={5}>
                            <Button onClick={()=>{editItem(id);console.log(id+" edit");}} width={65} height={5}backgroundColor="#F3383F"><EditIcon/></Button>
                        </Box>
                    </Stack>
                    
                  </Stack>
                </Box>
            </div>
          })}
        </VStack>}
       
      </Grid>
     
    </Box>
    
  </ChakraProvider>
    </>
 };

export default CollectionDetails;
