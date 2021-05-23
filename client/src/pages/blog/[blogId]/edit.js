import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";

import { Box, Center, Grid, useToast } from "@chakra-ui/react";
import UpperPreviewArea from "../../../components/writingPage/UpperPreviewArea";
import LowerPreviewArea from "../../../components/writingPage/LowerPreviewArea";
import useForm from "../../../hooks/useForm";
import RichTextEditor from "../../../components/RichTextEditor";
import InputWrapper from "../../../components/writingPage/InputWrapper";
import SelectInput from "../../../components/writingPage/SelectInput";
import Btn from "../../../components/material/Btn";
import { FETCH_SINGLE_BLOG } from "../../../graphql/queries";
import { UPDATE_BLOG } from "../../../graphql/mutations";
import Head from "next/head";

function editBlogPage() {
  const router = useRouter();
  const toast = useToast();

  if (typeof window !== "undefined") {
    const blogToUpdate = JSON.parse(window.localStorage.getItem("BlogToEdit"));
    const { input, handleChange, handleEditorChange } = useForm(
      existingBlogData(blogToUpdate) //this generate an blog blueprint
    );
    const { id, title, category, body, imageUrl, author } = input;

    const [updateBlog, { data }] = useMutation(UPDATE_BLOG, {
      variables: {
        blogId: id,
        title,
        imageUrl,
        body,
        category,
        authorId: author.id,
      },
      onCompleted: () => {
        toast({
          position: "bottom-right",
          title: "Article updated Successfuly.",
          description: "You've updated an article.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      refetchQueries: [{ query: FETCH_SINGLE_BLOG, variables: { id } }],
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      await updateBlog();
      window.localStorage.removeItem("BlogToEdit");
      // window.scrollTo(0, 0);
      router.replace(`/blog/${id}`);
    };

    return (
      <>
        <Head>
          <title>Edit Article</title>
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
                  Update
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
  } else return <p>something went wrong....</p>;
}

function existingBlogData(blogToUpdate) {
  if (blogToUpdate) {
    const { id, title, category, body, imageUrl, author } = blogToUpdate; // TO FIX :show error when reload writing page
    return {
      id,
      title,
      category,
      imageUrl,
      body,
      createdAt: new Date(),
      author,
    };
  }
}

export const categories = [
  "Lifestyle",
  "Students",
  "Development",
  "Education",
  "Technology",
  "Sports",
  "Sciences",
  "Astro",
  "Nature",
  "Politics",
  "Economy",
  "Global",
  "Entertaiment",
];

export default editBlogPage;
