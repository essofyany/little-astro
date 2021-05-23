import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Center, Avatar, useToast } from "@chakra-ui/react";
import { MdAddCircle, MdCheckCircle } from "react-icons/md";
import { RiEditCircleFill } from "react-icons/ri";
import { GET_USER_FOLLOWS } from "../../graphql/queries";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../graphql/mutations";

function ProfileAvatar({
  toggleEditBtn,
  profileId,
  fullname,
  photo,
  photoUrl,
}) {
  const toast = useToast();
  const [followsList, setFollowsList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [session] = useSession();

  //############
  //TOdo : case where no one signing in and try to follow someone
  const [queryFollowersList] = useLazyQuery(GET_USER_FOLLOWS, {
    onCompleted: (data) => {
      setFollowsList(data.User.follows);
      if (data.User.follows.length > 0) {
        setChecked(true);
      }
      // console.log("follow list is set");
    },
  });

  useEffect(() => {
    if (session) {
      queryFollowersList({
        variables: {
          currentUserId: session?.user.image,
          userId: profileId,
        },
      });
    }
  }, []);

  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {
      userToFollowId: profileId,
      currentUserId: session?.user.image,
    },
    update(cache, { data: { updateUser } }) {
      cache.modify({
        fields: {
          followers(existingFollowers = []) {
            const newFollower = cache.writeQuery({
              query: gql`
                query updateUser(
                  id: $userToFollowId
                  data: { followers: { connect: { id: $currentUserId } } }
                ) {
                  id
                  fullname
                  follows {
                    fullname
                  }
                  followers {
                    fullname
                  }
                }
              }`,
              data: updateUser,
              variables: {
                userToFollowId: profileId,
                currentUserId: session?.user.image,
              },
            });
            return [...existingFollowers, newFollower];
          },
        },
      });
    },
    onCompleted: () => {
      toast({
        status: "success",
        duration: "1000",
        title: "follow",
        position: "bottom-right",
      });
      setChecked(true);
    },
  });

  const [unFollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {
      userToUnFollowId: profileId,
      currentUserId: session?.user.image,
    },
    update(cache, { data: { updateUser } }) {
      cache.modify({
        fields: {
          followers(existingUnFollowers = []) {
            const newUnFollower = cache.writeQuery({
              query: gql`
                query updateUser(
                  id: $userToUnFollowId
                  data: { followers: { disconnect: { id: $currentUserId } } }
                ) {
                  id
                  fullname
                  follows {
                    fullname
                  }
                  followers {
                    fullname
                  }
                }
              }`,
              data: updateUser,
              variables: {
                userToUnFollowId: profileId,
                currentUserId: session?.user.image,
              },
            });
            return [...existingUnFollowers, newUnFollower];
          },
        },
      });
    },
    onCompleted: () => {
      toast({
        status: "success",
        duration: "1000",
        title: "unfollow",
        position: "bottom-right",
      });
      setChecked(false);
    },
  });

  async function handleFollow() {
    if (session) {
      await followUser();
    } else {
      toast({
        title: "Sign In first!",
        position: "bottom-right",
        duration: 2000,
        status: "info",
      });
    }
  }
  async function handleUnFollow() {
    if (session) {
      await unFollowUser();
    }
  }

  return (
    <Box d="flex" justifyContent="center" w="full">
      <Center
        position="relative"
        mb="2"
        borderRadius="full"
        w="135px"
        h="135px"
        bg="freshBlue"
      >
        <Avatar
          border="3px solid white"
          size="2xl"
          mr="3"
          src={photoUrl || photo.photo.publicUrlTransformed}
          name={fullname}
        />
        <Box
          position="absolute"
          bg="white"
          borderRadius="full"
          right="1"
          bottom="0"
          cursor="pointer"
        >
          {session && session.user.image === profileId && (
            <RiEditCircleFill
              onClick={() => toggleEditBtn()}
              size="38"
              color="#f7444e"
            />
          )}
          {session && session.user.image !== profileId && checked && (
            <MdCheckCircle onClick={handleUnFollow} size="38" color="#f7444e" />
          )}
          {session && session.user.image !== profileId && !checked && (
            <MdAddCircle onClick={handleFollow} size="38" color="#f7444e" />
          )}
          {!session && (
            <MdAddCircle onClick={handleFollow} size="38" color="#f7444e" />
          )}
        </Box>
      </Center>
    </Box>
  );
}

export default ProfileAvatar;
