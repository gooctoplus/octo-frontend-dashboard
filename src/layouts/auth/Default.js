import { Flex } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

function AuthIllustration(props) {
  const { children } = props;
  // Chakra color mode
  return (
    <Flex position='relative' h='max-content'>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "100vh",
        }}
        w='100%'
        maxW={{ md: "100%", lg: "100%" }}
        mx='auto'
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent='start'
        alignItems='center'
        direction='column'
        backgroundColor='#e8e8e8'>
        {children}
      </Flex>
    </Flex>
  );
}
// PROPS

AuthIllustration.propTypes = {
  illustrationBackground: PropTypes.string,
  image: PropTypes.any,
};

export default AuthIllustration;
