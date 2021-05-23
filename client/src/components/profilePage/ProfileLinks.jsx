import { useRouter } from "next/router";
import Link from "next/link";
import { Box } from "@chakra-ui/react";
import {
  TiSocialGithubCircular,
  TiSocialLinkedinCircular,
  TiSocialTwitterCircular,
} from "react-icons/ti";
import IconBox from "./IconBox";

function ProfileLinks({ github, twitter, linkedin }) {
  const router = useRouter();
  return (
    <Box d="flex" justifyContent="center" w="full" mb="6">
      {github ? (
        <Link href={`https://github.com/${github}`}>
          <IconBox>
            <TiSocialGithubCircular color="#002c3e" size="32" />
          </IconBox>
        </Link>
      ) : (
        <IconBox>
          <TiSocialGithubCircular color="#002c3e" size="32" />
        </IconBox>
      )}

      {linkedin ? (
        <Link href={`https://www.linkedin.com/in/${linkedin}`}>
          <IconBox mx="4">
            <TiSocialLinkedinCircular color="#002c3e" size="32" />
          </IconBox>
        </Link>
      ) : (
        <IconBox mx="4">
          <TiSocialLinkedinCircular color="#002c3e" size="32" />
        </IconBox>
      )}

      {twitter ? (
        <Link href={`https://twitter.com/${twitter}`} shallow={false}>
          <IconBox>
            <TiSocialTwitterCircular color="#002c3e" size="32" />
          </IconBox>
        </Link>
      ) : (
        <IconBox>
          <TiSocialTwitterCircular color="#002c3e" size="32" />
        </IconBox>
      )}
    </Box>
  );
}

export default ProfileLinks;
