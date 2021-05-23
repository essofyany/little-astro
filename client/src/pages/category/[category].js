import Link from "next/link";
import { useRouter } from "next/router";
import { GraphQLClient } from "graphql-request";

import { Container, Grid, GridItem, Wrap, WrapItem } from "@chakra-ui/react";
import CategoryBlogCard from "../../components/categoryPage/CategoryBlogCard";
import CategoryHeader from "../../components/categoryPage/categoryHeader";
import { BLOGS_OF_CATEGORY } from "../../graphql/queries";
import { categories } from "../blog/[blogId]/edit";
import Head from "next/head";

function CategoryPage({ categoryBlogs }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{router.query.category} | Articles</title>
      </Head>
      <Grid templateRows="repeat(2, auto)" gap={5}>
        <GridItem rowSpan="1">
          <CategoryHeader>{router.query.category}</CategoryHeader>
        </GridItem>
        <GridItem rowSpan="1">
          <Container maxW="5xl">
            <Wrap spacing="6">
              {categoryBlogs.map((blog) => (
                <WrapItem key={blog.id}>
                  <Link href={`/blog/${blog.id}`}>
                    <a>
                      <CategoryBlogCard blog={blog} />
                    </a>
                  </Link>
                </WrapItem>
              ))}
            </Wrap>
          </Container>
        </GridItem>
      </Grid>
    </>
  );
}

// for making request to GQL endpoint\\
const client = new GraphQLClient("http://localhost:4000/api/graphql");
//query structure  const data = await client.request(query, variables, requestHeaders)

export async function getStaticPaths() {
  // const res = await client.request(GET_CATEGORIES);
  // // array full of deplucation

  // const array = res.allBlogs.map((blog) => blog.category);
  // // remove deplucation
  // const categories = [...new Set(array)];

  //   console.log("array", array);
  //   console.log("===================");
  //   console.log("categories", categories);

  const paths = categories.map((category) => ({
    params: { category: category },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await client.request(BLOGS_OF_CATEGORY, {
    category: params.category, // query variables
  });
  return {
    props: { categoryBlogs: data.allBlogs },
    revalidate: 10,
  };
}

export default CategoryPage;
