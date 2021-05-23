import { Heading } from "@chakra-ui/react";
import { WiStars } from "react-icons/wi";

function CategoryHeader({ children }) {
  return (
    <Heading
      d="flex"
      mt="2"
      mb="3"
      ml="4"
      fontSize="4xl"
      color="freshBlue"
      textTransform="capitalize"
    >
      <WiStars size="45" color="#f7444e" />
      {children}
    </Heading>
  );
}

export default CategoryHeader;
