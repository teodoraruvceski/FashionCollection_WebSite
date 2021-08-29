import React, {useContext, useState, useEffect } from "react";
// pages

import {
  Box,
  Flex,
  VStack,
  HStack,
  Image,
  Stack,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route,Link,Routes } from "react-router-dom";
//import { ArrowRightIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import {AuthProvider,AuthContext} from "../authProvider";

import logo from "./FashionCollectionLogoBW.jpg";
import Items from "./items";
import Login from "./login";
import Register from "./register";
import AddCollection from './addCollection';
import EditCollection from './editCollection';
import EditProfile from './editProfile';
import CollectionDetails from './collectionDetails';
import EditWear from './editWear';
import AddWear from './addWear';
const Menu = () => {
  const [loginText,setLoginText]=useState("Login");
  const [person, setPerson] =  useState(null);
  const {user,setUser}= useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState("");
  const logout=()=>
  {
     sessionStorage.removeItem("user");
    setUser(null);
    //setPerson(localStorage.getItem("user"));
    console.log("OUT");
    //console.log(JSON.parse(localStorage.getItem("user")  || '{}'));
  }
 
  useEffect(()=>{
      console.log("Menu useEffect");
      console.log(user);
      
      console.log(user?.role);
      
  },[user]);
  return (
    <Box width="100%">
       <Router>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgColor="#FFFFFF"
                     >
              <Stack width="100%" direction="column">
              <HStack width="100%">
                 <Box paddingLeft={500} textColor="#B794F4" fontFamily="initial" fontSize={50} padding={1}  borderColor="transparent" borderRadius="md" margin={2}>
                    <Image
                    //src="E:\Tea\fax\3.godina\2.sem\rva\Projekat\FashionCollection_Project\FashionCollectionLogo.jpg"
                    src={logo}
                    height={140}
                    width={370}
                    alt="Logo"
                    />
                </Box>
              <HStack>
              <Flex alignContent="center">
                   { !user && <Box alignSelf="center" textColor="#FFFFFF" 
                   padding={3} backgroundColor="#F3383F" borderColor="transparent" 
                    borderWidth={1} margin={3} borderRadius="lg" letterSpacing={4} >
                    <Link  to="/login">LOG IN</Link></Box>}
                  
                  {user && <Box alignSelf="center" textAlign="center"   textColor="#FFFFFF" 
                  backgroundColor="#F3383F"   padding={3}  borderWidth={1} borderColor="transparent" 
                  borderRadius="lg"  letterSpacing={6}  margin={3}><Link to="/items">HOME</Link></Box>}
                  
                  { user && <Box  alignSelf="center" textAlign="center" 
                  textColor="#FFFFFF" backgroundColor="#F3383F"n padding={3} borderWidth={1} borderColor="transparent" 
                  borderRadius="lg"  letterSpacing={4} margin={3}><Link to="/addCollection">ADD COLLECTION</Link></Box>}
                  
                  {(user && (user.role + '')==='1') && <Box alignSelf="center" textColor="#FFFFFF" padding={3} 
                  backgroundColor="#F3383F" borderColor="transparent" borderWidth={1} margin={3} 
                  borderRadius="lg" letterSpacing={4}><Link to="/register">REGISTER USER</Link></Box>}
                  
                  { user && <Box alignSelf="center" textColor="#FFFFFF"  padding={3} 
                  backgroundColor="#F3383F" borderColor="transparent" borderWidth={1} margin={3} 
                  borderRadius="lg" fontFamily="" letterSpacing={4}><Link to="/editProfile">EDIT PROFILE</Link></Box>}
                 
                
            </Flex>
            <Flex alignItems="end" marginRight={10}>
               { user && <Box alignSelf="center" textColor="#FFFFFF" 
                  backgroundColor="#F3383F" borderColor="transparent" borderWidth={1} padding={3} margin={3} 
                  borderRadius="lg"  letterSpacing={4}><Link to="/login" onClick={()=>logout()}>LOG OUT</Link></Box>}
                
            </Flex>
            </HStack>
              
            </HStack>
            <Box borderColor="#000000" height={1} padding={0} width='100%' bgColor="#000000" textColor="#000000" > </Box>
            </Stack>
          </Box>
         
          <Box>
            <Routes>
              <Route path="/items">
                <Items/>
                </Route>
              <Route path="/login">
               <Login/>
              </Route>
              <Route path="/register">
               <Register/>
              </Route>
              <Route path="/addCollection">
               <AddCollection/>
              </Route>
              <Route path="/editCollection">
               <EditCollection/>
              </Route>
              <Route path="/editProfile">
               <EditProfile/>
              </Route>
              <Route path="/collectionDetails">
               <CollectionDetails/>
              </Route>
               <Route path="/addWear">
               <AddWear/>
              </Route>
               <Route path="/editWear">
               <EditWear/>
              </Route>
              <Route path="/">
               <Items/>
              </Route>
            </Routes>
          </Box>
        </Router> 
      {/* </Flex> */}
    </Box>
  );
};

export default Menu;