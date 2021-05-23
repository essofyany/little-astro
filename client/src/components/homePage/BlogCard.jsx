import { Box, Image, Text } from "@chakra-ui/react";

function BlogCard({ blog }) {
  const { id, title, imageUrl, category } = blog;
  return (
    <Box
      p="2"
      w="350px"
      borderRadius="15px"
      overflow="hidden"
      cursor="pointer"
      bg="#fff"
      _hover={{ bg: "#f6f8ff" }}
    >
      <Box w="full" minH="80%" borderRadius="15px">
        <Image
          borderRadius="15px"
          objectFit="fill"
          src={imageUrl}
          alt={title}
        />
      </Box>

      <Text
        color="freshGrey"
        fontWeight="medium"
        fontSize="smaller"
        textTransform="uppercase"
        mt="3"
        mb="1"
      >
        {category}
      </Text>
      <Box>
        <Text fontSize="lg" fontWeight="semibold" color="freshBlue">
          {title}
        </Text>
      </Box>
    </Box>
  );
}

export default BlogCard;
