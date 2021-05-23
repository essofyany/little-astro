import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Center, Grid } from "@chakra-ui/react";

import LowerProfile from "../../components/profilePage/LowerProfile";
import ProfileInfoCard from "../../components/profilePage/ProfileInfoCard";
import { ALL_USER_BLOGS_COUNT, GET_USER_PROFILE } from "../../graphql/queries";
import ProfileSket from "../../components/skeletons/ProfileSket";
import Btn from "../../components/material/Btn";

function ProfilePage() {
  const router = useRouter();
  const userId = router.query.userId;
  const { data, loading, error, fetchMore } = useQuery(GET_USER_PROFILE, {
    variables: { userId, first: 6 },
  });

  const { data: blogCount } = useQuery(ALL_USER_BLOGS_COUNT, {
    variables: { userId },
  });

  if (loading) return <ProfileSket />;
  if (error) return <h1>Error Occure</h1>;

  async function handleFetchMore() {
    try {
      if (data) {
        fetchMore({
          variables: {
            first: 6,
            skip: data.User.blogs.length - 1, // todo make it flexible
          },
          updateQuery: (prevResults, { fetchMoreResult }) => {
            fetchMoreResult.User.blogs = [
              ...prevResults.User.blogs,
              ...fetchMoreResult.User.blogs,
            ];

            fetchMoreResult.User.blogs = [
              ...new Map(
                fetchMoreResult.User.blogs.map((item) => [item.id, item])
              ).values(),
            ];

            console.log(fetchMoreResult.User.blogs);
            return fetchMoreResult;
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const blogList = data.User.blogs;

  return (
    <>
      <Head>
        <title>{data.User.fullname}</title>
      </Head>

      <Grid gridTemplateRows="repeat(2, auto)" gap={8}>
        {/* upper profile area */}
        <ProfileInfoCard
          numOfBlogs={blogCount._allBlogsMeta.count}
          userInfo={data.User}
        />
        {/* lower profile area */}
        <LowerProfile userName={data.User.fullname} blogList={blogList} />
        {/* Todo: fetch more button */}
        {data.User.blogs.length < blogCount._allBlogsMeta.count && (
          <Center mb="8">
            <Btn type="submit" onClick={handleFetchMore} fontSize="md">
              Read More
            </Btn>
          </Center>
        )}
      </Grid>
    </>
  );
}

export default ProfilePage;
