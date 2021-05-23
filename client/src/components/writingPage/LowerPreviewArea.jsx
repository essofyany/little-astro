import { Text, Grid, Container, GridItem } from "@chakra-ui/react";
import { createMarkup } from "../../utils/createMarkup";

function LowerPreviewArea({ input }) {
  const { body } = input;
  return (
    <GridItem rowSpan="2" w="full">
      <Grid templateColumns="repeat(5, 1fr)" gap={5}>
        {/* left Icons */}
        <GridItem
          p="10"
          colSpan="1"
          h="full"
          w="full"
          position="relative"
        ></GridItem>
        {/* main blog content */}
        <GridItem colSpan="4" w="full">
          <Container maxW="3xl">
            <Text
              fontSize="20px"
              color="freshBlue"
              lineHeight="8"
              dangerouslySetInnerHTML={createMarkup(
                body || "<p>type something</p>"
              )}
            ></Text>
          </Container>
        </GridItem>
      </Grid>
    </GridItem>
  );
}

export default LowerPreviewArea;
