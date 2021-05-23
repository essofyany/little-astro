import { Box, Text } from "@chakra-ui/layout";
import React from "react";

function Footer() {
  return (
    <Box mt='5' bg="freshLight" p="10px 0" w="full">
      <Text textAlign="center" fontSize="md" color="freshBlue">
        v2, made with &#129505; by Essofyany Bilal, 2021
      </Text>
    </Box>
  );
}

export default Footer;
