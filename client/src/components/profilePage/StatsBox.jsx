import { Center, Text } from "@chakra-ui/layout";

function StatsBox({ number, label, ...edits }) {
  return (
    <Center w="32" h="24" flexDirection="column" {...edits}>
      <Text color="freshBlue" fontSize="3xl" fontWeight="bold">
        {number}
      </Text>
      <Text textTransform="capitalize" color="freshGrey">
        {label}
      </Text>
    </Center>
  );
}

export default StatsBox;
