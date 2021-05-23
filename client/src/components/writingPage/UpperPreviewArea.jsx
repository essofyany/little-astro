import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Center } from "@chakra-ui/layout";
import { Grid } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import Link from "next/link";
import formateDate from "../../utils/formateDate";

function UpperPreviewArea({ input }) {
  const { author, title, category, createdAt, imageUrl } = input;
  return (
    <GridItem rowSpan="1" w="full" pb="16">
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        {/* Avatar */}
        <GridItem colSpan="1" w="full" p="10">
          <Center mb="2" borderRadius="full" w="68px" h="68px" bg="freshRed">
            <Link href={`/profile/${author.id}`}>
              <a>
                <Avatar
                  border="2px solid white"
                  size="lg"
                  m="2"
                  src={
                    author.photoUrl || author.photo.photo.publicUrlTransformed
                  }
                  name={author.fullname}
                />
              </a>
            </Link>
          </Center>

          <Link href={`/profile/${author.id}`}>
            <a>
              <Text fontSize="md" fontWeight="medium" color="freshBlue">
                {author.fullname}
              </Text>
            </a>
          </Link>

          <Text
            my="1"
            maxW="24"
            fontSize="sm"
            fontWeight="normal"
            color="freshGrey"
          >
            Updated on {formateDate(createdAt)}
          </Text>
          <Link href={`/category/${category}`}>
            <a>
              <Text fontSize="sm" fontWeight="medium" color=" ">
                {category}
              </Text>
            </a>
          </Link>
        </GridItem>
        {/* Blog image & title */}
        <GridItem colSpan="4" w="full">
          <Center flexDirection="column">
            <Text my="5" color="freshBlue" fontWeight="semibold" fontSize="3xl">
              {title}
            </Text>
            <Box maxW="700px" maxH="370px">
              <Image objectFit="fill" borderRadius="15" src={imageUrl} />
            </Box>
          </Center>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default UpperPreviewArea;
