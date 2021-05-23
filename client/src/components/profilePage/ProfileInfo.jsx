import { Box, Center, Text } from "@chakra-ui/react";
import { FiMapPin } from "react-icons/fi";

function ProfileInfo({ userData }) {
  const { fullname, status, city, country } = userData;
  return (
    <Box
      d="flex"
      textAlign="center"
      flexDirection="column"
      justifyContent="center"
      w="full"
      mb="8"
    >
      <Text fontSize="3xl" fontWeight="bold" color="freshBlue">
        {fullname}
      </Text>

      <Center d="flex" mb="5">
        <FiMapPin color="#A9B0C9" />
        <Text fontWeight="normal" pl="1" color="freshGrey">
          {city}, {country}
        </Text>
      </Center>
      <Center>
        <Text fontWeight="normal" w="50%" color="freshGrey">
          "{status}"
        </Text>
      </Center>
    </Box>
  );
}

export default ProfileInfo;
