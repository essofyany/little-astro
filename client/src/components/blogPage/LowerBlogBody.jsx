import { gql, useQuery } from "@apollo/client";
import {
  GridItem,
  Heading,
  Wrap,
  WrapItem,
  Container,
  Center,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { RELATED_BLOGS } from "../../graphql/queries";
import RelatedBlogCard from "./RelatedBlogCard";

function LowerBlogBody({ blogData }) {
  const { data, loading, error } = useQuery(RELATED_BLOGS, {
    variables: { category: blogData.category, title: blogData.title },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>error need to be handled....</h1>;

  if (data) {
    // console.log(data);
    const blogs = data.allBlogs;
    return (
      <GridItem rowSpan="1" w="full" py="10">
        <Heading d="flex" mt="2" mb="4" ml="4" fontSize="2xl" color="freshBlue">
          Related Articles
        </Heading>
        <Container pl="10" maxW="5xl">
          <Wrap spacing="6">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <WrapItem key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    <a>
                      <RelatedBlogCard blog={blog} />
                    </a>
                  </Link>
                </WrapItem>
              ))
            ) : (
              <Center w="full" h="full">
                <Text textTransform="capitalize" color="freshGrey">
                  no related blogs found
                </Text>
              </Center>
            )}
          </Wrap>
        </Container>
      </GridItem>
    );
  }
}

export default LowerBlogBody;
