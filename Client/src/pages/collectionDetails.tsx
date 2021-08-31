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
import { LogEvent } from "../services/logEvent"
 import axios from "axios";
 const CollectionDetails = () => {
  const [wears,setWears] = React.useState([]);
  const [user,setUser]=useState(null);
  const baseURLdelete="https://localhost:44332/collectionwears/deletewear/?id={id}";
  const baseURLcopy="https://localhost:44332/collectionwears/copy?id={id}";
  const baseURLwears="https://localhost:44332/collectionwears/get?id={colId}";

  const [wearId,setWearId]=useState();
 const deleteItem= async (wearId:number)=>{
   console.log("delete ");
   console.log(wearId);
  await axios
    .delete(baseURLdelete.replace("{id}",wearId.toString()));
   mojServis();
   LogEvent("deleted wear with id: " + wearId, "INFO");
 };
 const copyItem= async (wearId:number)=>{
   console.log("copy ");
   console.log(wearId);
   console.log(baseURLcopy);
  await axios
    .get(baseURLcopy.replace("{id}",wearId.toString()));
   mojServis();
    LogEvent("copied wear with id: " + wearId, "INFO");
 };
   const nav=useNavigate();
const editItem= async (wearId:number)=>{//////////////////////////////////
   console.log("edit ");
   console.log(wearId);
   nav('/editWear');
   let obj = wears.find(o => o.id === wearId);
   console.log(obj);
    localStorage.setItem('wear',JSON.stringify(obj));
 };
//  useEffect(()=>{
//    setWears(JSON.parse(localStorage.getItem("wears")));
//  }, [JSON.parse(localStorage.getItem("wears"))])
   useEffect(() =>
   {
     mojServis();
   },[])
   
useEffect(() => {
   mojServis();
  const u=sessionStorage.getItem('user');
  setUser(JSON.parse(sessionStorage.getItem("user")));
  console.log(JSON.parse(sessionStorage.getItem("user")));
}, [sessionStorage.getItem("user")]);
   
 const mojServis =async ()=>{
    var d;
    let cid=JSON.parse(localStorage.getItem('collection')).id;
     await axios
     .get(baseURLwears.replace('{colId}',cid))
       .then((response) => {
         setWears(response.data);
         localStorage.setItem("wears",JSON.stringify(response.data));
         console.log(wears)
       });
}
  return <>
  <ChakraProvider theme={theme}>
    <Box bgColor="#ffffff" textAlign="center" fontSize="xl">
     
      <Grid minH="100vh" p={3}>
            
        {user &&
            <VStack spacing={8}>
             <Box height={15}>
                <Button  rounded="lg" padding={3} opacity="80%" textColor="#FFFFFF" onClick={()=>{nav('/addWear');}} width={95} height={35}backgroundColor="#A26734">Add wear</Button>
            </Box>
          {
          wears.map((wear) => {
            const {id,name, description,type }=wear;
            return <div key={id}>
               <Box borderRadius="md" textColor="#794D27" >
                <Stack drection="column">
                  <Box borderRadius="lg" textColor="#794D27" width={600} minHeight={85} borderColor="#D5C4B4"  borderWidth={2}  backgroundColor="#D5C4B4">
                    <Stack backgroundColor="#D5C4B4" borderColor="#D5C4B4" direction="row">
                       
                        <Box alignContent="start" width={95} marginRight={5}>
                            <Text  as="h4">{name}</Text>
                        </Box>
                        <Box width={185} marginRight={10}>
                            <Text as="p">
                            Description: {description}
                            </Text>
                    </Box>{
                      type === "0" &&
                      <Box width={185} marginRight={10}>
                          <Text as="p">
                          Type: Top
                          </Text>
                      </Box>
                      
                    }
                    {
                      type === "1" &&
                      <Box width={185} marginRight={10}>
                          <Text as="p">
                          Type: Bottom
                          </Text>
                      </Box>
                      
                    }
                    {
                      type === "2" &&
                      <Box width={185} marginRight={10}>
                          <Text as="p">
                          Type: Shoes
                          </Text>
                      </Box>
                      
                    }
                    {
                      type === "3" &&
                      <Box width={185} marginRight={10}>
                          <Text as="p">
                          Type: Accessories
                          </Text>
                      </Box>
                      
                    }
                  </Stack>
                  </Box>
                    <Stack textColor="#FFFFFF" alignSelf="center" spacing={7}  direction="row">
                        <Box  margin={0}>
                            <Button opacity="80%" onClick={()=>{copyItem(id);console.log(id+" copy");}}backgroundColor="#A26734"><CopyIcon/></Button>
                        </Box>
                        <Box margin={5}>
                            <Button opacity="80%" onClick={()=>{deleteItem(id);console.log(id+" delete");}} backgroundColor="#A26734"><DeleteIcon/></Button>
                        </Box>
                        <Box marginRight={5}>
                            <Button opacity="80%" onClick={()=>{editItem(id);console.log(id+" edit");}}backgroundColor="#A26734"><EditIcon/></Button>
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
