import { Box, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

function BestBlog({ bestBlog }) {
  const { id, title, category, imageUrl } = bestBlog;
  return (
    <Link href={`/blog/${id}`}>
      <a>
        <Box
          p="10px 5px"
          borderRadius="15px"
          boxShadow="0px 5px 10px #eee"
          overflow="hidden"
          cursor="pointer"
          bg="#fff"
          minH="448px"
        >
          <Image
            borderRadius="15px"
            w="full"
            minH="340px"
            objectFit="fill"
            src={imageUrl}
            alt={title}
          />

          <Text
            mt="5"
            pl="5"
            color="freshGrey"
            fontWeight="medium"
            fontSize="sm"
            textTransform="uppercase"
          >
            {category}
          </Text>

          <Text
            mb="5"
            pl="5"
            fontSize="2xl"
            fontWeight="bold"
            color="freshBlue"
          >
            {title}
          </Text>
        </Box>
      </a>
    </Link>
  );
}

export default BestBlog;
