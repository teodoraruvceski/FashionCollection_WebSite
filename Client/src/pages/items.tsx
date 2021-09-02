import * as React from "react";
import {useState,useEffect,useContext} from "react";
import '../styles/items.css'
import {useNavigate} from 'react-router-dom';
import { CopyIcon,EditIcon, AddIcon, DeleteIcon,HamburgerIcon,StarIcon } from '@chakra-ui/icons'
import {
  ChakraProvider,
  Box,
  VStack,
  Stack,
  HStack,
  Grid,
  theme,
  Text,
  Button,
  FormControl,
  Input,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react"
import axios from "axios";
import { LogEvent } from "../services/logEvent"
import {AuthProvider,AuthContext} from "../authProvider";
 const Items = () => {
  const [collections,setCollections] = React.useState([]);
  const [search,setSearch]=useState("");
  const [message,setMessage]=useState("");
  // const [user, setUser] = useState(null);
   const {user,setUser}= useContext(AuthContext);
  const baseURLdelete="https://localhost:44332/fashioncollection/delete/?id={id}";
  const baseURLcopy="https://localhost:44332/fashioncollection/copy?id={id}";
   const baseURLrate="https://localhost:44332/fashioncollection/rate?id={id}&rate={rate}";
   const { isOpen, onOpen, onClose } = useDisclosure();
  const [rateValue,setRateValue]=useState();
  const [rateId,setRateId]=useState();
//   window.onbeforeunload = () => {
//   localStorage.removeItem('user');
// }
  const handleChange = (e) => {
    const name = e.target.name; 
    const value = e.target.value;
    setSearch(value); 
   console.log(search);
  };
  const handleChangeModal = (e) => {
    const name = e.target.name; 
    const value = e.target.value;
    setRateValue(value); 
   console.log(rateValue);
  };
 const deleteItem= async (collectionId:number)=>{
   console.log("delete ");
   console.log(collectionId);
  await axios
     .delete(baseURLdelete.replace("{id}", collectionId));
  
     mojServis();
     LogEvent("deleted collection with id: " + collectionId, "INFO");
 };
 const copyItem= async (collectionId:number)=>{
   console.log("copy ");
   console.log(collectionId);
   console.log(baseURLcopy);
  await axios
     .get(baseURLcopy.replace("{id}", collectionId));
    
   mojServis();
    LogEvent("copied collection with id: "+collectionId, "INFO");
 };
   const nav=useNavigate();
const editItem= async (collectionId:number)=>{//////////////////////////////////
   console.log("edit ");
   console.log(collectionId);
   nav('/editCollection');
   let obj = collections.find(o => o.id === collectionId);
   console.log(obj);
    localStorage.setItem('collection',JSON.stringify(obj));
 };
 const details=async (collectionId:number)=>{
   console.log("details "+collectionId);
   nav('/collectionDetails');
    let obj = collections.find(o => o.id === collectionId);
   console.log(obj);
    localStorage.setItem('collection',JSON.stringify(obj));

 }
 const rateItem= async ()=>{
   //onClose;
   if(rateValue)
   if(rateValue!<1 || rateValue!>10)
   {
     setMessage("Please insert number from 1 to 10.");
     setRateValue("");
     
     LogEvent("rated collection with id: "+rateId+" INVALID rate value "+rateValue, "ERROR");
   }
   else
   {
      console.log(rateId);
      console.log("rate:"+rateValue);
      console.log(baseURLrate.replace("{id}",rateId+'').replace("{rate}",rateValue));
      await axios
        .get(baseURLrate.replace("{id}",rateId+'').replace("{rate}",rateValue));
    
   
        
     mojServis();
      LogEvent("rated collection with id: "+rateId+", rate value "+rateValue, "INFO");
      setMessage("");
      setRateValue();
      onClose();
   }
   };
  //  useEffect(() =>
  //  {
  //    setCollections(JSON.parse(localStorage.getItem("collections")));
  //  },[JSON.parse(localStorage.getItem("collections"))])
useEffect(() => {
  mojServis();
  console.log(collections);
  const u=sessionStorage.getItem('user');
  setUser(JSON.parse(sessionStorage.getItem("user")));
  console.log(JSON.parse(sessionStorage.getItem("user")));
  },[sessionStorage.getItem("user")]);
 const mojServis =async ()=>{
    var d;
   await axios.get(`https://localhost:44332/fashioncollection/get`).then((response) =>
   {
     setCollections(response.data);
     console.log(response.data);
     localStorage.setItem("collections", JSON.stringify(response.data));
   });
    //setCollections(d);
}

const initialRef = React.useRef()
  return <>
  <ChakraProvider theme={theme}>
    <Box   bgColor="#FFFFFF" textAlign="center" fontSize="xl">
     
      <Grid minH="100vh" p={3}>
        {user &&
        <VStack spacing={8}>
          
            <Box borderRadius="lg" textColor="#000000" width={600}  borderWidth={2} backgroundColor="#E2E0E0">
            <FormControl isRequired>
              <InputGroup>
                <Input
                  type="search"
                  name="search"
                  id="search"
                  value={search}
                  onChange={handleChange}
                  placeholder="Search..."
                  variant="filled"
                  textColor="#794D27"
                    bgColor="#E2E0E0"
                    focusBorderColor="#794D27"
                />
              </InputGroup>
            </FormControl>
            </Box>
          {
            
          collections.filter((val)=>{
            if(search==="")
            {
              return val;
            }else if(val.designer.toLowerCase().includes(search.toLowerCase()))
            {
              return val;
            }
          })
          .map((collection) => {
            const {id,designer, score, season,year }=collection
            return <div key={id}>
              <VStack>
               <Box borderRadius="lg" textColor="#794D27" width={650} borderColor="#D5C4B4"  borderWidth={2}  backgroundColor="#D5C4B4">
               
                <Stack direction="row">
                  <Box alignContent="start" width={115} marginRight={10}>
                     <Text  as="h4">{designer}</Text>
                  </Box>
                  <Box width={95} marginRight={10}>
                      {season==="0" &&(<>
                        <Text as="p">
                      Season: Spring
                    </Text>
                    </>)}
                    {season==="1" &&(<>
                        <Text as="p">
                      Season: Summer
                    </Text>
                    </>)}
                    {season==="2" &&(<>
                        <Text as="p">
                      Season: Fall
                    </Text>
                    </>)}
                    {season==="3" &&(<>
                        <Text as="p">
                      Season: Winter
                    </Text>
                    </>)}
                   
                  </Box>
                  <Box width={95}>
                     <Text>
                      Year: {year}
                    </Text>
                  </Box>
                  <Box width="45%" alignContent="center" textColor="#FCB900" padding={3} borderColor="#000000" fontSize={19}  margin={5}>
                      
                      
                      {
                          score === 10 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> </Text>
                      }
                      {
                          score === 9 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/ ><StarIcon/> <StarIcon/> <StarIcon/> </Text>
                      }
                      {
                          score === 8 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> </Text>
                      }
                      {
                          score === 7 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/></Text>
                      }
                      {
                          score === 6 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> </Text>
                      }
                      {
                          score === 5 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/></Text>
                      }
                      {
                          score === 4 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/> <StarIcon/></Text>
                      }
                      {
                          score === 3 &&
                          <Text><StarIcon/> <StarIcon/> <StarIcon/></Text>
                      }
                      {
                          score === 2 &&
                          <Text><StarIcon/> <StarIcon/></Text>
                      }
                      {
                          score === 1 &&
                          <Text><StarIcon/></Text>
                      }
                      <Text fontSize="15" color="#794D27">{score}/10</Text>
                  </Box>
                </Stack>
               
                </Box>
                <Stack spacing={7}  direction="row">
                  <Box  margin={0}>
                    <Button opacity="80%" onClick={()=>{copyItem(id);console.log(id+" copy");}} 
                     textColor="#FFFFFF" letterSpacing={3} backgroundColor="#A26734"><CopyIcon/></Button>
                  </Box>
                  <Box margin={5}>
                    <Button opacity="80%" onClick={()=>{deleteItem(id);console.log(id+" delete");}} 
                  textColor="#FFFFFF" backgroundColor="#A26734"><DeleteIcon/></Button>
                  </Box>
                  <Box marginRight={5}>
                    <Button opacity="80%" onClick={()=>{editItem(id);console.log(id+" edit");}} 
                    textColor="#FFFFFF" backgroundColor="#A26734"><EditIcon/></Button>
                  </Box>
                  <Box marginRight={5}>
                    <Button opacity="80%" onClick={()=>details(id)}  
                  textColor="#FFFFFF"  backgroundColor="#A26734"><HamburgerIcon/></Button>
                  </Box>
                  <Box marginRight={5}>
                    <Button opacity="80%" onClick={()=>{setRateId(id);onOpen();}} textColor="#FFFFFF" 
                  backgroundColor="#A26734">RATE</Button>
                  </Box>
                </Stack>
                 </VStack>
                   <Text  textColor="#794D27">{message}</Text>
                 
                <Modal  initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Rate collection</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       <FormControl isRequired>
                          <InputGroup>
                            <Input
                              type="number"
                              name="rateValue"
                              id="rateValue"
                              value={rateValue}
                              onChange={handleChangeModal}
                              placeholder="1 - 10"
                              variant="filled"
                              textColor="#794D27"
                              bgColor="#E2E0E0"
                          ref={initialRef}
                            focusBorderColor="#794D27"

                            />
                          </InputGroup>
                        </FormControl>
                        <Text textColor="#794D27">{message}</Text>
                    </ModalBody>
                       
                    <ModalFooter>
                      <Button backgroundColor="#A26734" textColor="#FFFFFF" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button backgroundColor="#A26734"  textColor="#FFFFFF" onClick={()=>{rateItem();}} variant="ghost">Rate</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            </div>
          })}
        </VStack>}
        {!user && <Box>
          <Text textColor="#794D27">Welcome!</Text>
        <Text textColor="#794D27">Log in to see collections</Text>
        </Box>}
      </Grid>
     
    </Box>
    
  </ChakraProvider>
    </>
 };

export default Items;
