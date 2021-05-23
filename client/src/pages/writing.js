import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import { useMutation } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import { Box, Center, Grid, useToast } from "@chakra-ui/react";

import UpperPreviewArea from "../components/writingPage/UpperPreviewArea";
import LowerPreviewArea from "../components/writingPage/LowerPreviewArea";
import useForm from "../hooks/useForm";
import RichTextEditor from "../components/RichTextEditor";
import InputWrapper from "../components/writingPage/InputWrapper";
import SelectInput from "../components/writingPage/SelectInput";
import Btn from "../components/material/Btn";
import { GET_CURRENT_USER, GET_USER_PROFILE } from "../graphql/queries";
import { CREATE_BLOG } from "../graphql/mutations";
import { categories } from "./blog/[blogId]/edit";
import Head from "next/head";

function writingPage({ categories, currentUser }) {
  const router = useRouter();
  const toast = useToast();

  const { input, handleChange, handleEditorChange } = useForm(
    generateDraftArticle(currentUser) //this generate an blog blueprint
  );

  const { title, category, body, imageUrl, author } = input;

  const [createBlog] = useMutation(CREATE_BLOG, {
    variables: { title, imageUrl, body, category, authorId: author.id },
    update: (cache, { data: { createBlog } }) => {
      const newBlog = createBlog;
      // update cache profile page after creating a blog
      const existingDataProfile = cache.readQuery({
        query: GET_USER_PROFILE,
        variables: { userId: author.id },
      });

      console.log(existingDataProfile);
      cache.writeQuery({
        query: GET_USER_PROFILE,
        data: { User: { blogs: { newBlog, ...existingDataProfile } } },
        variables: { userId: author.id },
      });
    },
    onCompleted: (data) => {
      toast({
        position: "bottom-right",
        title: "Article created Successfuly.",
        description: "You've created an article.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      window.scrollTo(0, 0);
      // push to created blog page
      router.replace(`/blog/${data.createBlog.id}`);
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createBlog();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Start Writing</title>
      </Head>
      {/* Preview area */}
      <Box p="5" mb="72" w="full">
        <Grid templateRows="repeat(4, auto)" gap={5}>
          {/* first row */}
          <UpperPreviewArea input={input} />
          {/* middle row */}
          <LowerPreviewArea input={input} />
        </Grid>
      </Box>
      {/* Edit area #FORM# */}
      <Box
        position="fixed"
        bottom="10"
        borderRadius="15"
        border="2px solid #F1F2FA"
        px="2"
        py="2"
        bg="white"
        mt="5"
        h="45vh"
        w="1120px"
      >
        <form onSubmit={handleSubmit}>
          {/* inputs fields */}
          <Box d="flex" justifyContent="space-evenly" w="full" h="20%">
            <Center w="30%">
              <InputWrapper
                value={input.title}
                name="title"
                handleChange={handleChange}
                checked={false}
                placeholder="Add the title here"
              />
            </Center>
            <Center w="30%">
              <InputWrapper
                value={input.imageUrl}
                name="imageUrl"
                handleChange={handleChange}
                checked={false}
                placeholder="Add image Url here"
              />
            </Center>
            <Center w="auto">
              <SelectInput
                name="category"
                value={input.category}
                handleChange={handleChange}
                placeholder="Select a category"
                list={categories}
              />
            </Center>
            <Center w="auto">
              <Btn type="submit" bg="freshBlue" py="0" px="5">
                Publish
              </Btn>
            </Center>
          </Box>
          {/* Rich Text Editor */}
          <Box mt="2" w="full" h="80%">
            <Center w="full" h="full">
              <RichTextEditor
                initialValue={input.body}
                handleEditorChange={(e) => handleEditorChange(e)}
              />
            </Center>
          </Box>
        </form>
      </Box>
    </>
  );
}

function generateDraftArticle(currentUser) {
  const { id, fullname, photo, photoUrl } = currentUser; // TO FIX :show error when reload writing page
  return {
    title: "Add a Title",
    category: "Category",
    imageUrl: "./images/placeholder-image.jpg",
    body: "Start Writing",
    createdAt: new Date(),
    author: {
      id,
      fullname,
      photo,
      photoUrl,
    },
  };
}

const client = new GraphQLClient("http://localhost:4000/api/graphql");

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    // const res = await client.request(GET_CATEGORIES);
    const currentUser = await client.request(GET_CURRENT_USER, {
      userId: session.user.image,
    });
    // // array full of deplucation
    // const array = res.allBlogs.map((blog) => blog.category);
    // // remove deplucation
    // const categories = [...new Set(array)];
    return {
      props: {
        session,
        categories,
        currentUser: currentUser.User,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/signIn",
        permanent: false,
      },
    };
  }
}

export default writingPage;
