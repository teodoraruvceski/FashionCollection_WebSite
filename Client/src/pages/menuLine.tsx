import React, { useState } from "react";
// pages
import {
  Box,
  Button,
  Flex,
  Spacer,
  Image,
  Stack,
  Center,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Items from "./items";
import Login from "./login";

const MenuLine=()=>
{
    return(

        <Flex
        align="center"
        boxShadow="dark-lg"
        p="2"
        mb="2"
        bgColor="DodgerBlue">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bgColor="DodgerBlue"
          padding={2}
        >
          <Button
            onClick={() => (window.location.href = "./items")}
            variant="ghost"
            textColor="gray.200"
            colorScheme="blue"
          >
            Home
          </Button>
          <Button
            onClick={() => (window.location.href = "./login")}
            variant="ghost"
            textColor="gray.200"
            colorScheme="blue"
          >
            Login
          </Button>
        </Box>
        <Spacer />
        <Box>
          <ColorModeSwitcher />
        </Box>
      </Flex>
    )
    

}



export default MenuLine;