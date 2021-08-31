import * as React from "react";
import {useState,useEffect,useContext} from "react";
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
    Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { Message } from "@material-ui/icons";
import {AuthProvider,AuthContext} from "../authProvider";

 const Logger = () => {
     const [logFiles, setLogFiles] = React.useState(JSON.parse(sessionStorage.getItem("log")));
     const [adminLogFiles, setAdminLogFiles] = React.useState(JSON.parse(localStorage.getItem("adminLog")));
     const {user,setUser}= useContext(AuthContext);
     useEffect(() =>
     {
         setAdminLogFiles(JSON.parse(localStorage.getItem("adminLog")));
         setLogFiles(JSON.parse(sessionStorage.getItem("log")));
     }, [localStorage.getItem("adminLog"), sessionStorage.getItem("log")])
     
  return <>
  <ChakraProvider theme={theme}>
    <Box bgColor="#ffffff" textAlign="center" fontSize="xl">
     
      <Grid minH="100vh" p={3}>
            <Table variant="striped" >
        <TableCaption>Logs</TableCaption>
        <Thead>
            <Tr>
            <Th>Message</Th>
            <Th>Type</Th>
            <Th>Date and time</Th>
            </Tr>
        </Thead>
            <Tbody>
                
            {
                    logFiles.map((f) => {
                        const { message, messageType, time } = f;
                        return <Tr>
                            <Td>{message}</Td>
                            <Td>{messageType}</Td>
                            <Td>{time}</Td>
                        </Tr>
    
                    })}
    </Tbody>
    </Table> 
       
   
      </Grid>
     
    </Box>
    
  </ChakraProvider>
    </>
 };

export default Logger;
