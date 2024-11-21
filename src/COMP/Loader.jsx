import React from "react";
import { Spinner, Text, VStack } from "@chakra-ui/react"

function Loader() {
  return (
    <VStack colorPalette="teal">
      <Spinner color="colorPalette.600" boxSize="100px" />

      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  );
}

export default Loader;
