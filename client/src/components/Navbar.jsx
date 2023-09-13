import {
  Box, // Importing the Box component for layout
  Flex, // Importing the Flex component for flexible containers
  HStack, // Importing the HStack component for horizontal stacks
  Link, // Importing the Link component for creating links
  IconButton, // Importing IconButton component for buttons with icons
  Icon, // Importing Icon component for displaying icons
  Text, // Importing Text component for displaying text
  Button, // Importing Button component for buttons
  useColorModeValue,
  Stack, // Importing useColorModeValue for color theming
} from "@chakra-ui/react"; // Importing Chakra UI components and hooks

import { Link as ReactLink } from "react-router-dom"; // Importing ReactLink from React Router and aliasing it as ReactLink
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"; // Importing icons from Chakra UI Icons
import { Gi3DGlasses } from "react-icons/gi"; // Importing an icon from React Icons
import { useDisclosure } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const links = [
  { linkName: "Products", path: "/products" }, // Defining a navigation link
  { linkName: "ShoppingCart", path: "/cart" }, // Defining another navigation link
];

const NavLink = (
  { path, children } // Creating a custom NavLink component that takes path and children as props
) => (
  <Link
    as={ReactLink} // Using ReactLink for routing
    to={path} // Specifying the path for the link
    px={2} // Setting horizontal padding
    py={2} // Setting vertical padding
    rounded="md" // Rounding the link with medium border radius
    _hover={{
      // Adding styles on hover
      textDecoration: "none", // Removing text decoration
      bg: useColorModeValue("gray.200", "gray.700"), // Background color depending on the color mode
    }}
  >
    {children} {/* Displaying the children (link text) */}
  </Link>
);

const Navbar = () => {
  // Creating the Navbar component
  const { isOpen, onOpen, onClose } = useDisclosure(); // Initializing state and functions for mobile menu (hamburger menu)
  const { colorMode, toggleColorMode } = useColorMode(); // Initializing state and function for color mode

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      {" "}
      {/* Setting the background color based on the color mode */}
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {" "}
        {/* Creating a flexible container for the navbar */}
        <IconButton
          size="md" // Setting the button size to medium
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} // Displaying either a close icon or hamburger icon based on menu state
          display={{ md: "none" }} // Hiding the button on medium and larger screens
          onClick={isOpen ? onClose : onOpen} // Toggling the menu state on click
        />
        <HStack>
          {" "}
          {/* Creating a horizontal stack for the logo and navigation links */}
          <Link as={ReactLink} to="/">
            {" "}
            {/* Creating a link to the homepage */}
            <Flex alignItems="center">
              {" "}
              {/* Creating a flex container for the logo and text */}
              <Icon as={Gi3DGlasses} h={6} w={6} color="orange.400" /> {/* Displaying an icon */}
              <Text fontWeight="extrabold"> APA</Text> {/* Displaying text with extra bold font weight */}
            </Flex>
          </Link>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {" "}
            {/* Creating a horizontal stack for navigation links */}
            {links.map(
              (
                link // Mapping over the links array to create navigation links
              ) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName} {/* Displaying the link text */}
                </NavLink>
              )
            )}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          {" "}
          {/* Creating a flex container for the color mode toggle */}
          <NavLink path="/">
            {" "}
            {/* Creating a link for the color mode toggle */}
            <Icon
              as={colorMode === "light" ? MoonIcon : SunIcon} // Displaying either a moon or sun icon based on the color mode
              alignSelf="center" // Aligning the icon to the center vertically
              onClick={() => toggleColorMode()} // Toggling the color mode on click
            />
          </NavLink>
          <Button as={ReactLink} to="/login" p={2} fontSize="sm" fontWeight={400} variant="link">
            Sign In
          </Button>
          {/* Creating a Button for "Sign In" with link behavior */}
          <Button
            as={ReactLink}
            to="/registration"
            m={2}
            display={{ base: "none", md: "inline-flex" }}
            fontSize="sm"
            fontWeight={600}
            _hover={{ bi: "orange.400" }}
            bg="orange.500"
            color="white"
          >
            Sign Up
          </Button>{" "}
          {/* Creating a Button for "Sign Up" with link behavior */}
        </Flex>
      </Flex>
      {isOpen ? (
        /* Checking if the mobile menu (hamburger menu) is open */

        <Box pb={4} display={{ md: "none" }}>
          {/* Creating a Box for the mobile menu */}
          <Stack as="nav" spacing={4}>
            {/* Creating a Stack for the navigation links */}
            {links.map(
              (
                link // Mapping over the links array to create navigation links
              ) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName} {/* Displaying the link text */}
                </NavLink>
              )
            )}
            <NavLink key="sign up" path="/registration">
              Sign Up
            </NavLink>
            {/* Creating a NavLink for "Sign Up" */}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar; // Exporting the Navbar component as the default export
