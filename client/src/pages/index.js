import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/client";
import { GraphQLClient } from "graphql-request";

import { Center, Grid, GridItem, Wrap, WrapItem } from "@chakra-ui/react";
import Btn from "../components/material/Btn";
import BestBlog from "../components/homePage/BestBlog";
import BlogCard from "../components/homePage/BlogCard";
import PopularBlogs from "../components/homePage/PopularBlogs";
import { FETCH_BLOGS } from "../graphql/queries";
import { gql, useQuery } from "@apollo/client";
import HomePageSket from "../components/skeletons/HomePageSket";

const HomePage = ({ allBlogs, count }) => {
  const { data, loading, error, fetchMore } = useQuery(FETCH_BLOGS, {
    variables: {
      first: 11,
    },
  });

  if (loading) return <HomePageSket />;
  // if (!loading) return <HomePageSket />;
  if (error) return <p>error ......</p>;

  // console.log("from home page", data);
  const bestBlogs = data.allBlogs.slice(0, 5);
  const blogs = data.allBlogs.slice(5);

  function handleFetchMore() {
    if (data) {
      fetchMore({
        variables: {
          first: 6,
          skip: data.allBlogs.length - 2, // todo make it flexible
        },
        updateQuery: (prevResults, { fetchMoreResult }) => {
          fetchMoreResult.allBlogs = [
            ...prevResults.allBlogs,
            ...fetchMoreResult.allBlogs,
          ];

          fetchMoreResult.allBlogs = [
            ...new Map(
              fetchMoreResult.allBlogs.map((item) => [item.id, item])
            ).values(),
          ];

          // console.log(fetchMoreResult.allBlogs);
          return fetchMoreResult;
        },
      });
    }
  }

  console.log(count);
  return (
    <>
      <Head>
        <title>Little Astro | share the passion of writing </title>
      </Head>
      {/* best or popular blogs */}
      <Grid templateColumns="repeat(5, 1fr)" gap={4} mb="5">
        <GridItem colSpan="3" w="full" h="lg">
          <BestBlog bestBlog={allBlogs[0]} />
        </GridItem>
        <GridItem colSpan="2" w="full" h="lg">
          <PopularBlogs bestBlogs={bestBlogs} />
        </GridItem>
      </Grid>
      {/* here published blogs */}
      <Wrap spacing="8" mb="10">
        {blogs.map((blog) => (
          <WrapItem key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>
                <BlogCard blog={blog} />
              </a>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
      {/* Todo: fetch more button */}
      {data.allBlogs.length < count && (
        <Center mb="8">
          <Btn type="submit" onClick={handleFetchMore} fontSize="md">
            Read More
          </Btn>
        </Center>
      )}
    </>
  );
};

const client = new GraphQLClient("http://localhost:4000/api/graphql");

export const ALL_BLOGS_COUNT = gql`
  query {
    _allBlogsMeta {
      count
    }
  }
`;

// export async function getStaticProps(context) {
export async function getServerSideProps(context) {
  const session = await getSession(context);

  const data = await client.request(FETCH_BLOGS, { first: 11 });
  const allBlogsCount = await client.request(ALL_BLOGS_COUNT);

  return {
    props: {
      allBlogs: data.allBlogs,
      count: allBlogsCount._allBlogsMeta.count,
      session,
    },
  };
}

export default HomePage;
