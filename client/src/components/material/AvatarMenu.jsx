import Link from "next/link";
import { signOut } from "next-auth/client";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Center } from "@chakra-ui/layout";

function AvatarMenu({ children, userId, ...changes }) {
  return (
    <Menu>
      <MenuButton {...changes}>
        <Center borderRadius="full" w="52px" h="52px" bg="freshBlue">
          {children}
        </Center>
      </MenuButton>
      <MenuList bg="freshBlue">
        <Link href={`/profile/${userId}`}>
          <a>
            <MenuItem color="white" icon={<FaUserAstronaut />}>
              Profile
            </MenuItem>
          </a>
        </Link>
        <MenuItem color="white" onClick={() => signOut()} icon={<FiLogOut />}>
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default AvatarMenu;
