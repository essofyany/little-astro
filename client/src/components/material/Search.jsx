import { Box, Input, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { debounce } from "lodash";
import { resetIdCounter, useCombobox } from "downshift";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_BLOGS } from "../../graphql/queries";
import Link from "next/link";
import { useState } from "react";

function Search() {
  resetIdCounter();

  const [expand, setExpand] = useState(false);

  const [findItem, { data, loading, error }] = useLazyQuery(SEARCH_BLOGS, {
    fetchPolicy: "no-cache",
  });
  const findItemButChill = debounce(findItem, 400);

  // console.log(data);
  const { inputValue, isOpen, getComboboxProps, getMenuProps, getInputProps } =
    useCombobox({
      items: [],
      onInputValueChange() {
        // console.log("....input change", inputValue);
        setExpand(true);
        findItemButChill({
          variables: { searchTerm: inputValue },
        });
      },
      onSelectedItemChange() {
        // console.log("....select change");
      },
    });
  return (
    <Box w="full" d="flex" flexDir="column" position="relative">
      <Box {...getComboboxProps()} d="flex" alignItems="center" w="full" mr="5">
        <FiSearch />
        <Input
          {...getInputProps({
            type: "search",
            placeholder: "Search for: Articles, Publishers, .....",
            id: "search",
          })}
          p="1"
          minW="250px"
          variant="filled"
          size="md"
          focusBorderColor="none"
        />
      </Box>
      {inputValue && expand && data && (
        <UnorderedList
          listStyleType="none"
          boxShadow="lg"
          position="absolute"
          top="12"
          w="full"
          py="2"
          pl="2"
          zIndex="dropdown"
          bg="white"
          borderRadius="15"
          spacing="2"
          {...getMenuProps()}
        >
          {data.allBlogs.length > 0 ? (
            data.allBlogs.map((blog) => (
              <Link href={`/blog/${blog.id}`}>
                <ListItem
                  key={blog.id}
                  borderRadius="15"
                  _hover={{ bg: "freshLight" }}
                  pl="2"
                  py="1"
                  w="full"
                  cursor="pointer"
                  onClick={() => setExpand(false)}
                >
                  <Text fontSize="lg" fontWeight="medium" color="freshBlue">
                    {blog.title}
                  </Text>
                </ListItem>
              </Link>
            ))
          ) : (
            <Text
              textAlign="center"
              fontSize="lg"
              fontWeight="medium"
              color="freshBlue"
            >
              Nothing Found!
            </Text>
          )}
        </UnorderedList>
      )}
    </Box>
  );
}

export default Search;
