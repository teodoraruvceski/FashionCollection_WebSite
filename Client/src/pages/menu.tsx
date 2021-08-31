import React, {useContext, useState, useEffect ,} from "react";
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

import logo from "../image2.jpg";
import Items from "./items";
import Login from "./login";
import Register from "./register";
import AddCollection from './addCollection';
import Logger from './logger';
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
    localStorage.removeItem("log");
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
                <HStack  width="100%">
                  <Box width="15%" paddingLeft={500} textColor="#B794F4" fontFamily="initial" fontSize={50} padding={1} borderColor="transparent" borderRadius="md">
                      <Image
                      //src="E:\Tea\fax\3.godina\2.sem\rva\Projekat\FashionCollection_Project\FashionCollectionLogo.jpg"
                      src={logo}
                      height={45}
                      width={155}
                      alt="Logo"
                      />
                  </Box>
                  <Flex width="75%" alignSelf="right" alignContent="center">
                      {  !user && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="#A26734" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} > 
                        <Link  to="/login">Log in</Link></Box>}
                      
                      
                      {user && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} >
                        <Link to="/items">Home</Link></Box>}
                      
                      { user && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} >
                        <Link to="/addCollection">Add collection</Link></Box>}
                      
                      {(user && (user.role + '')==='1') && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} >
                        <Link to="/register">Register user</Link></Box>}
                      
                      { user && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} >
                  <Link to="/editProfile">Edit profile</Link></Box>}
                { user && <Box  alignSelf="center" textColor="#794D27" 
                      padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                        borderWidth={1} margin={3} borderRadius="lg" letterSpacing={2} >
                      <Link to="/logs">Logs</Link></Box>}
                    
                   
                    
                    
                </Flex>
              <Flex width="10%" alignItems="end" marginRight={10}>
                { user && <Box  alignSelf="center" textColor="#794D27" 
                    padding={2} backgroundColor="#ffffff" borderColor="transparent" fontSize={15} fontWeight="semibold"
                      borderWidth={1}  margin={3} borderRadius="lg" letterSpacing={2} >
                      <Link to="/items" onClick={() => logout()}>Log out</Link></Box>}
                  
              </Flex>
            
              
            </HStack>
            <Box margin={0} opacity="70%" borderColor="#A26734" height={0.5} padding={0} width='100%' bgColor="#A26734"> </Box>
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
             <Route path="/logs">
               <Logger/>
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