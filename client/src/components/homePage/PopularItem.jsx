import { Box, Text } from "@chakra-ui/layout";

export default function PopularItem({ category, title }) {
  return (
    <Box p={3} borderRadius="15" _hover={{ bg: "#f6f8ff" }}>
      <Text
        color="freshRed"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="sm"
      >
        {category}
      </Text>
      <Text fontWeight="medium" color="freshBlue" fontSize="md" mt={4}>
        {title}
      </Text>
    </Box>
  );
}
