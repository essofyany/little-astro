import { useRouter } from "next/router";
import { Grid } from "@chakra-ui/layout";
import LowerBlogBody from "../../../components/blogPage/LowerBlogBody";
import MiddleBlogBody from "../../../components/blogPage/MiddleBlogBody";
import UpperBlogBody from "../../../components/blogPage/UpperBlogBody";
import { useQuery } from "@apollo/client";
import { FETCH_SINGLE_BLOG } from "../../../graphql/queries";
import BlogPageSket from "../../../components/skeletons/BlogPageSket";
import Head from "next/head";

function BlogPage() {
  const router = useRouter();
  const { blogId } = router.query;
  // console.log(blogId);

  const { data, loading, error } = useQuery(FETCH_SINGLE_BLOG, {
    variables: { id: blogId },
  });
  if (loading) return <BlogPageSket />;
  if (error) return <p>error need to be handled</p>;

  const blogData = data.Blog;

  // console.log(blogData);
  return (
    <>
      <Head>
        <title>{data.Blog.title}</title>
      </Head>
      <Grid templateRows="repeat(4, auto)" gap={5}>
        {/* first row */}
        <UpperBlogBody blogData={blogData} />
        {/* middle row */}
        <MiddleBlogBody blogData={blogData} />
        {/* last row */}
        <LowerBlogBody blogData={blogData} />
      </Grid>
    </>
  );
}

export default BlogPage;
