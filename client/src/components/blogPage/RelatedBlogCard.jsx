import { Box, Image, Text } from "@chakra-ui/react";

function RelatedBlogCard({ blog }) {
  const { title, imageUrl, category } = blog;
  return (
    <Box
      p="2"
      w="300px"
      borderRadius="15px"
      overflow="hidden"
      cursor="pointer"
      bg="#fff"
      _hover={{ bg: "#f6f8ff" }}
    >
      <Box w="full" h="160px" borderRadius="15px">
        <Image
          borderRadius="15px"
          objectFit="cover"
          src={imageUrl}
          alt={title}
        />
      </Box>

      <Text
        color="freshGrey"
        fontWeight="medium"
        fontSize="smaller"
        textTransform="uppercase"
        mt="1"
        mb="0"
      >
        {category}
      </Text>
      <Box>
        <Text fontSize="md" fontWeight="semibold" color="freshBlue">
          {title}
        </Text>
      </Box>
    </Box>
  );
}

export default RelatedBlogCard;
