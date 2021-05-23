import Link from "next/link";
import {
  Center,
  Container,
  GridItem,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import CategoryBlogCard from "../categoryPage/CategoryBlogCard";
import Btn from "../material/Btn";

function LowerProfile({ userName, blogList }) {
  return (
    <GridItem
      rowSpan="1"
      w="full"
      py="5"
      borderRadius="15"
      border="1px solid #F1F2FA"
    >
      <Container maxW="5xl">
        <Wrap spacing="10">
          {/* handle case of empty blog list */}
          {blogList.length > 0 ? (
            blogList.map((blog) => (
              <WrapItem key={blog.id}>
                <Link href={`/blog/${blog.id}`}>
                  <a>
                    <CategoryBlogCard blog={blog} />
                  </a>
                </Link>
              </WrapItem>
            ))
          ) : (
            <Center w="full" h="full">
              <Text textTransform="capitalize" color="freshGrey">
                {userName} didn't publish any blog yet
              </Text>
            </Center>
          )}
        </Wrap>
      </Container>
      {!blogList ? (
        <Center mt="10">
          <Btn>Fetch More</Btn>
        </Center>
      ) : (
        ""
      )}
    </GridItem>
  );
}

export default LowerProfile;
