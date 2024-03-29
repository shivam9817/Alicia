import React, { useEffect, useState } from 'react';
import { Box, Flex, Avatar, HStack, Link, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure, useColorModeValue, Image, useToast } from '@chakra-ui/react';
import { VStack, Icon, Drawer, DrawerContent, Text } from '@chakra-ui/react';
import { FiHome, FiCompass, FiMenu, FiBell, FiChevronDown, FiPlus, FiUser } from 'react-icons/fi';
import logoAlicia from "../asset/logo.jpg"
import person from "../asset/person.png"
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProductPage from './ProductPage';
import AddProducts from './AddProduct';
import { IoClose } from 'react-icons/io5';
import SampleUserData from './SampleData';
import UserDetails from './UserDetails';

const LinkItems = [
    { name: 'Dashboard', compName: 'Dashboard', heading: 'Dashboard', icon: FiHome },
    { name: 'Add Products', compName: 'AddProducts', heading: 'Add Products', icon: FiPlus },
    { name: 'Products', compName: 'Products', heading: ' Products', icon: FiCompass },
    { name: 'Sample Data', compName: 'SampleData', heading: ' Sample User Data', icon: FiUser },
    { name: 'User Details', compName: 'UserDetails', heading: ' Sample User Data', icon: FiUser },
];

function SidebarWithHeader({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [comp, setComp] = useState("Dashboard");
    const [admin, setadmin] = useState({});
    const navigate = useNavigate();
    const toast = useToast();
    const handleLogout = () => {
        navigate("/");
        toast({
            title: "Admin logged out successfully !!!",
            description: `Please visit us again !!! `,
            status: "error",
            duration: 3000,
            position: "top",
            isClosable: true,
        });
    };


    const componentChange = (compName = comp) => {
        if (compName === 'Dashboard') return <Dashboard />
        else if (compName === 'Products') return <ProductPage />
        else if (compName === 'AddProducts') return <AddProducts />
        else if (compName === 'SampleData') return <SampleUserData />
        else if (compName === 'UserDetails') return <UserDetails />
    }



    const SidebarContent = ({ onClose, ...rest }) => {
        return (
            <Box transition="3s ease" bg={useColorModeValue('blue.900', 'gray.900')} borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')} w={{ base: 'full', md: 60 }} pos="fixed" h={"full"} {...rest}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="close menu"
                    icon={<IoClose />}
                    color={'white'}
                    _hover={{
                        bg: 'white',
                        color: 'black',
                    }}
                    onClick={onClose}
                />
                <Box h="20" alignItems={"center"} justifyContent="center" margin={"auto"} mb={10} mt={6}>
                    <Image margin={"auto"} src={logoAlicia} h={28} ml={"20px"} />
                </Box>
                {LinkItems.map((link) => (
                    <NavItem onClick={() => setComp(link.compName)} key={link.name} icon={link.icon} color={"white"}>{link.name}</NavItem>
                ))}
            </Box>
        );
    };

    return (
        <Box>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
                <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
                    <DrawerContent><SidebarContent onClose={onClose} /></DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <MobileNav admin={admin} handleLogout={handleLogout} onOpen={onOpen} onClose={onClose} />
                <Flex className='main-content' justifyContent={'center'} ml={{ md: '100' }}>
                    {componentChange()}
                </Flex>
                <Box ml={{ base: 0, md: 60 }} p="4">{children}</Box>
            </Box>
        </Box>
    );
}

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (<Icon mr="4" fontSize="16" _groupHover={{ color: 'white', }} as={icon} />)}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ admin, handleLogout, onOpen, ...rest }) => {
    const navigate = useNavigate()
    const toast = useToast();
    return (
        <Flex
            ml={{ base: 0, md: 10 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('blue.900', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                color={'white'}
                _hover={{
                    bg: 'white',
                    color: 'black',
                    border: "2px solid black"
                }}
                icon={<FiMenu />}
            />
            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                    color={"white"}
                    _hover={{
                        bg: 'white',
                        color: 'black',
                    }}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <Avatar size={'sm'} src={person} bg={'#fff'} />
                                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                                    <Text fontSize="sm">{admin.name}</Text>
                                    <Text fontSize="xs" color={"white"}>Admin</Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem>Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => {
                                navigate("/")
                                toast({
                                    title: "Moved to Home Page ...",
                                    description: `Welcome to home page !!!`,
                                    status: "success",
                                    duration: 3000,
                                    position: "top",
                                    isClosable: true,
                                });
                            }}>Home</MenuItem>
                            <MenuDivider />
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

export default SidebarWithHeader;