import { Box , Image ,Text } from '@chakra-ui/react'
import React from 'react'
import btc from "../Assets/image.png"
function Home() {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Image w={"full"} h={"full"} objectFit={"contain"} src={btc} filter={"grayscale(1)"}></Image>
      <Text fontSize={"6xl"}
      textAlign={"center"}
      fontWeight={"thin"}
      mt={"-6"}
      color={"whiteAlpha.900"}> Crpyto-Codex</Text>
    </Box>
  )
}

export default Home