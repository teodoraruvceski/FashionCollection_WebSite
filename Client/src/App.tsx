import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import Menu from "./pages/menu";
import {AuthProvider} from "./authProvider";
export const App = () => (
  <ChakraProvider theme={theme}>
    <Box fontSize="xl">
      <AuthProvider>
        <Menu></Menu>
      </AuthProvider>
    </Box>
  </ChakraProvider>
);