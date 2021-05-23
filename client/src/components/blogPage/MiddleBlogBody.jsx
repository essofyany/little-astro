import { useSession } from "next-auth/client";
import { Grid } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { Container } from "@chakra-ui/layout";
import { GridItem } from "@chakra-ui/layout";
import { BsBookmarkFill, BsStarFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import {
  RiEditCircleFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from "react-icons/ri";
import { createMarkup } from "../../utils/createMarkup";
import { IconWrapper } from "../wrappers/IconWrapper";
import { useMutation, useLazyQuery } from "@apollo/client";
import {
  DELETE_BLOG,
  DISLIKE_A_BLOG,
  LIKE_A_BLOG,
  SAVE_A_BLOG,
  UNSAVE_A_BLOG,
} from "../../graphql/mutations";
import { useToast } from "@chakra-ui/toast";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IS_LIKED_BY_USER, IS_SAVED_BY_USER } from "../../graphql/queries";

function MiddleBlogBody({ blogData }) {
  const router = useRouter();
  const [session] = useSession();
  const { body, id } = blogData;
  const toast = useToast();

  const [starsList, setStarsList] = useState([]);
  const [bookmarksList, setBookmarksList] = useState([]);
  const [starsCounter, setStarsCounter] = useState(0);
  const [savesCounter, setSavesCounter] = useState(0);

  // check if user is already like a blog
  const [queryLikesList, { refetch: refetchLikes }] = useLazyQuery(
    IS_LIKED_BY_USER,
    {
      onCompleted: (data) => {
        console.log("queryLikesList", data);
        setStarsList(data.Blog.stars);
      },
    }
  );
  // check if user is already bookmark a blog
  const [queryBookmarkList, { refetch: refetchSaves }] = useLazyQuery(
    IS_SAVED_BY_USER,
    {
      onCompleted: (data) => {
        console.log("queryBookmarkList", data);
        setBookmarksList(data.Blog.bookmarks);
      },
    }
  );

  useEffect(() => {
    if (session) {
      queryLikesList({
        variables: { blogId: id, currentUserId: session.user.image },
      });

      queryBookmarkList({
        variables: { blogId: id, currentUserId: session.user.image },
      });
    }
  }, []);
  // const { data: likesList, refetch: refetchLikes } = useQuery(
  //   IS_LIKED_BY_USER,
  //   {
  //     variables: { blogId: id, currentUserId: session.user.image },
  //     onCompleted: () => setStarsList(likesList.Blog.stars),
  //   }
  // );

  // check if user is already bookmark a blog
  // const { data: saveList, refetch: refetchSaves } = useQuery(IS_SAVED_BY_USER, {
  //   variables: { blogId: id, currentUserId: session.user.image },
  //   onCompleted: () => setBookmarksList(saveList.Blog.bookmarks),
  // });

  useEffect(() => {
    async function func() {
      try {
        if (session) {
          const res = await refetchLikes({
            variables: { blogId: id, currentUserId: session.user.image },
          });
          if (res) {
            setStarsList(res.data.Blog.stars);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    func();
  }, [starsCounter]);

  //  likes mutations
  const [likeBlog] = useMutation(LIKE_A_BLOG);
  const [dislikeBlog] = useMutation(DISLIKE_A_BLOG);

  async function handleLike() {
    try {
      if (session && starsList.length < 1) {
        await likeBlog({
          variables: { userId: session.user.image, blogId: id },
        });
        setStarsCounter(starsCounter + 1);
        toast({
          position: "bottom-right",
          duration: "1500",
          title: "Star Added",
          status: "success",
        });
      }

      if (!session) {
        toast({
          title: "Sign In first!",
          position: "bottom-right",
          duration: 2000,
          status: "info",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDislike() {
    try {
      if (session && starsList.length > 0) {
        await dislikeBlog({
          variables: { userId: session.user.image, blogId: id },
        });
        setStarsCounter(starsCounter - 1);
        toast({
          position: "bottom-right",
          duration: "1500",
          title: "Star Removed",
          status: "success",
        });
      }
      if (!session) {
        toast({
          title: "Sign In first!",
          position: "bottom-right",
          duration: 2000,
          status: "info",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //  bookmarks mutations
  const [saveBlog] = useMutation(SAVE_A_BLOG);
  const [unSaveBlog] = useMutation(UNSAVE_A_BLOG);

  async function handleSave() {
    try {
      if (session && bookmarksList.length < 1) {
        await saveBlog({
          variables: { userId: session.user.image, blogId: id },
        });
        setSavesCounter(savesCounter + 1);
        toast({
          position: "bottom-right",
          duration: "1500",
          title: "Added to your Bookmark",
          status: "success",
        });
      }
      if (!session) {
        toast({
          title: "Sign In first!",
          position: "bottom-right",
          duration: 2000,
          status: "info",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function handleUnsave() {
    try {
      if (session && bookmarksList.length > 0) {
        await unSaveBlog({
          variables: { userId: session.user.image, blogId: id },
        });
        setSavesCounter(savesCounter - 1);
        toast({
          position: "bottom-right",
          duration: "1500",
          title: "Removed from your Bookmarks",
          status: "success",
        });
      }
      if (!session) {
        toast({
          title: "Sign In first!",
          position: "bottom-right",
          duration: 2000,
          status: "info",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function func() {
      try {
        if (session) {
          const res = await refetchSaves({
            variables: { blogId: id, currentUserId: session.user.image },
          });
          if (res) setBookmarksList(res.data.Blog.bookmarks);
        }
      } catch (error) {
        console.log(error);
      }
    }
    func();
  }, [savesCounter]);

  //  delete blog mutations
  const [deleteBlog] = useMutation(DELETE_BLOG, {
    onCompleted: () => {
      toast({
        position: "bottom-right",
        title: "Article deleted Successfuly.",
        description: "You've deleted an article.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // window.scrollTo(0, 0);
      router.replace(`/profile/${session.user.image}`);
    },
    update: (cache, payload) => {
      cache.evict(cache.identify(payload.data.deleteBlog));
    },
  });

  async function handleDelete() {
    try {
      if (session && confirm("Are you sure!")) {
        await deleteBlog({
          variables: { id: blogData.id },
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  //  for sving blog draft to localestorage
  function handleClick() {
    window.localStorage.setItem("BlogToEdit", JSON.stringify(blogData));
    router.push(`/blog/${blogData.id}/edit`);
  }

  return (
    <GridItem rowSpan="2" w="full">
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        {/* left Icons */}
        <GridItem p="10" colSpan="1" h="full" w="full" position="relative">
          <Box position="sticky" top="10" right="0">
            {/* for authorized user */}
            {session && session.user.image === blogData.author.id && (
              <>
                <IconWrapper>
                  <RiEditCircleFill
                    onClick={handleClick}
                    cursor="pointer"
                    size="22"
                    color="#002c3e"
                  />
                </IconWrapper>
                <IconWrapper>
                  <MdDeleteForever
                    onClick={handleDelete}
                    size="22"
                    color="#002c3e"
                    cursor="pointer"
                  />
                </IconWrapper>
              </>
            )}
            <IconWrapper>
              {starsList.length < 1 ? (
                <BsStarFill
                  onClick={handleLike}
                  cursor="pointer"
                  size="20"
                  color="#002c3e"
                />
              ) : (
                <BsStarFill
                  onClick={handleDislike}
                  cursor="pointer"
                  size="20"
                  color="#ffcc00"
                />
              )}
            </IconWrapper>
            <IconWrapper>
              {bookmarksList.length < 1 ? (
                <BsBookmarkFill
                  onClick={handleSave}
                  cursor="pointer"
                  size="20"
                  color="#002c3e"
                />
              ) : (
                <BsBookmarkFill
                  onClick={handleUnsave}
                  cursor="pointer"
                  size="20"
                  color="#f7444e"
                />
              )}
            </IconWrapper>
            <IconWrapper>
              <RiTwitterFill cursor="pointer" size="22" color="#002c3e" />
            </IconWrapper>
            <IconWrapper>
              <RiLinkedinBoxFill cursor="pointer" size="22" color="#002c3e" />
            </IconWrapper>
          </Box>
        </GridItem>
        {/* main blog content */}
        <GridItem colSpan="4" w="full">
          <Container maxW="3xl">
            <Text
              fontSize="20px"
              color="freshBlue"
              lineHeight="8"
              dangerouslySetInnerHTML={createMarkup(body)}
            ></Text>
          </Container>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default MiddleBlogBody;
