import { useState } from "react";
import {
  Box,
  Center,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  TiSocialGithubCircular,
  TiSocialLinkedinCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";
import ProfileAvatar from "./ProfileAvatar";
import StatsBox from "./StatsBox";
import ProfileInfo from "./ProfileInfo";
import ProfileLinks from "./ProfileLinks";
import Btn from "../material/Btn";
import useForm from "../../hooks/useForm";
import { UPDATE_USER } from "../../graphql/mutations";
import { GET_CURRENT_USER } from "../../graphql/queries";
import { useMutation } from "@apollo/client";

function ProfileInfoCard({ numOfBlogs, userInfo }) {
  const toast = useToast();
  const [clicked, setClicked] = useState(true);
  const {
    id,
    fullname,
    photoUrl,
    photo,
    status,
    city,
    country,
    githubLink,
    tiwtterLink,
    linkedinLink,
    followers,
    follows,
  } = userInfo;
  const userData = { fullname, status, city, country };
  const { input, handleChange } = useForm({
    id,
    fullname: fullname,
    photoUrl: photoUrl || photo.photo.publicUrlTransformed,
    status: status,
    city: city,
    country: country,
    githubLink,
    tiwtterLink,
    linkedinLink,
  });

  const [updateUser] = useMutation(UPDATE_USER);

  function toggleEditBtn() {
    setClicked(!clicked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await updateUser({
      variables: input,
    });
    toast({
      status: "success",
      duration: "2000",
      title: "Update success",
      position: "bottom-right",
    });
    setClicked(!clicked);
  }

  return (
    <GridItem rowSpan="1" w="full" borderRadius="15" border="1px solid #F1F2FA">
      {/* edite area */}
      {/* <Box
        d="flex"
        justifyContent="flex-end"
        h="10"
        w="full"
        px="2"
        py="3"
        cursor="pointer"
      >
        <BsThreeDotsVertical size="25" color="#A9B0C9" />
      </Box> */}
      {/* edit area */}
      {!clicked && (
        <form onSubmit={handleSubmit}>
          <Center flexDir="column" mb="10">
            <Input
              type="text"
              onChange={handleChange}
              value={input.photoUrl}
              mt="5"
              name="photoUrl"
              maxW="700px"
              placeholder="new image url"
            />
            <Input
              type="text"
              onChange={handleChange}
              value={input.fullname}
              mt="5"
              name="fullname"
              maxW="700px"
              placeholder="new username"
            />
            {/* location */}
            <Box mt="5" d="flex">
              <Input
                type="text"
                onChange={handleChange}
                value={input.city}
                name="city"
                placeholder="new city"
                w="345px"
                mr="5px"
              />
              <Input
                ml="5px"
                type="text"
                w="345px"
                value={input.country}
                onChange={handleChange}
                name="country"
                placeholder="new country"
              />
            </Box>
            <Input
              type="text"
              onChange={handleChange}
              value={input.status}
              my="5"
              name="status"
              maxW="700px"
              placeholder="new status"
            />
            <Box my="5" d="flex">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<TiSocialTwitterCircular size="26" />}
                />
                <Input
                  type="text"
                  onChange={handleChange}
                  value={input.tiwtterLink}
                  name="tiwtterLink"
                  maxW="700px"
                  placeholder="@username"
                />
              </InputGroup>
              <InputGroup px="2">
                <InputLeftElement
                  pointerEvents="none"
                  children={<TiSocialGithubCircular size="26" />}
                />
                <Input
                  type="text"
                  onChange={handleChange}
                  value={input.githubLink}
                  name="githubLink"
                  maxW="700px"
                  placeholder="@username"
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<TiSocialLinkedinCircular size="26" />}
                />
                <Input
                  type="text"
                  onChange={handleChange}
                  value={input.linkedinLink}
                  name="linkedinLink"
                  maxW="700px"
                  placeholder="@username-123456"
                />
              </InputGroup>
            </Box>
            <Box>
              <Btn type="submit" px="20" py="1.5" mx="2" mx="2">
                Save
              </Btn>
              <Btn
                _hover={{ bg: "freshBlue" }}
                bg="freshBlue"
                px="20"
                py="1.5"
                mx="2"
                onClick={toggleEditBtn}
              >
                Cancel
              </Btn>
            </Box>
          </Center>
        </form>
      )}

      {/* avatar area */}
      {clicked && (
        <ProfileAvatar
          toggleEditBtn={toggleEditBtn}
          photo={photo}
          photoUrl={photoUrl}
          profileId={id}
        />
      )}
      {/* Info area */}
      {clicked && <ProfileInfo editToggle={clicked} userData={userData} />}
      {/* social media icons area */}
      <ProfileLinks
        github={githubLink}
        twitter={tiwtterLink}
        linkedin={linkedinLink}
      />
      {/* Icons stats area */}
      <Box d="flex" justifyContent="center" w="full" mb="6">
        <StatsBox number={numOfBlogs} label="articles" />
        <StatsBox
          number={followers.length}
          label="followers"
          borderRight="2px solid #F1F2FA"
          borderLeft="2px solid #F1F2FA"
        />
        <StatsBox number={follows.length} label="follows" />
      </Box>
    </GridItem>
  );
}

export default ProfileInfoCard;
