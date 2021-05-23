import Link from "next/link";
import { useSession } from "next-auth/client";
import { useQuery } from "@apollo/client";

import { Avatar, Box, Grid, GridItem, Text } from "@chakra-ui/react";
import Btn from "../material/Btn";
import AvatarMenu from "../material/AvatarMenu";
import { GET_CURRENT_USER } from "../../graphql/queries";
import Search from "../material/Search";

function Header() {
  const [session] = useSession();
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { userId: session?.user.image },
  });

  // if (error) return <p>error need to be handled.....</p>;

  return (
    <Grid mb="5" templateColumns="repeat(5, 1fr)" gap={5} px="6">
      <GridItem colSpan={1} h="16">
        <Link href="/">
          <a>
            <Box w="full" h="full" d="flex" alignItems="center">
              <Text fontSize="2xl" fontWeight="medium" color="freshRed">
                Little Astro
              </Text>
            </Box>
          </a>
        </Link>
      </GridItem>
      <GridItem colStart={2} colEnd={6} h="16">
        <Grid templateColumns="repeat(8, 1fr)" gap={5}>
          <GridItem colSpan={8} h="16">
            <Box
              w="full"
              h="full"
              d="flex"
              // bg="red.200"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box
                justifyContent="center"
                w="full"
                h="full"
                d="flex"
                flexDir="column"
              >
                <Search />
              </Box>
              {data && !loading && (
                <>
                  <Link href="/writing">
                    <a>
                      <Btn textTransform="uppercase">Start Writing</Btn>
                    </a>
                  </Link>
                  <AvatarMenu userId={data.User.id} mx="3">
                    <Avatar
                      border="2px solid white"
                      m="3"
                      src={
                        data.User.photoUrl ||
                        data.User.photo.photo.publicUrlTransformed
                      }
                      name={data.User.fullname}
                    />
                  </AvatarMenu>
                </>
              )}
              {!data && !loading && (
                <>
                  <Link href="/signIn">
                    <a>
                      <Btn _hover={{ bg: "#002c30" }} bg="freshBlue" mx="2">
                        Sign In
                      </Btn>
                    </a>
                  </Link>

                  <Link href="/signUp">
                    <a>
                      <Btn _hover={{ bg: "#f74450" }}>Sign Up</Btn>
                    </a>
                  </Link>
                </>
              )}
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default Header;
