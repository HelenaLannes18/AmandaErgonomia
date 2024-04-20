import { Drawer, DrawerContent, DrawerOverlay, HStack, Heading, IconButton, Stack } from "@chakra-ui/react"
import { ReactNode, useState } from "react"

import { FigureImageLink } from "../Image"
import { FaRegFilePdf } from "react-icons/fa6"
import { MdClose, MdMenu, MdHome, MdEvent, MdGroup, MdAssignment, MdPerson, MdOutlineLogout } from "react-icons/md"
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi"
import { SideSection } from "../Sidebar/sidesection"
import { TitleSidebar } from "../Title"
import { useRouter } from "next/router"
import useSWR, { mutate } from "swr";
import fetcher from "../../lib/fetcher"
import { User } from "@prisma/client"
import { Loader } from "../Loader"
import { Avatar, Box, Flex, keyframes } from '@chakra-ui/react'

interface NavbarProps {
    title: string
    children?: ReactNode
}

export function Navbar({ title, children }: NavbarProps) {
    const router = useRouter()
    const { id } = router.query

    const { data: settings } = useSWR<User | null>(
        `/api/user?userId=qwdq`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    )

    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    };

    const handleClose = () => {
        setIsOpen(false)
    };

    // const session = useRequireAuth()
    // if (!session) return <Loader />

    const size = '40px'
    const color = 'teal'

    const pulseRing = keyframes`
            0% {
                transform: scale(1.1));
            }
            40%,
            50% {
                opacity: 40%;
            }
            100% {
                opacity: 50%;
            }
    `
    return (
        <>
            <HStack
                as="section"
                bg="#296CB3"
                w={{ lg: "79vw", md: "100vw", xxs: "100vw" }}
                position={"absolute"}
                top={0}
                right={0}
                zIndex={1000}
                py={12}
                px={10}
                justify={"space-between"}
            >
                <HStack
                    as="article"
                    pl={{ lg: 0, md: 10, xxs: 10 }}
                    justify={"end"}
                >
                    <Heading
                        as="h1"
                        fontSize={{ md: "24px", sm: "20px" }}
                        color={"white"}
                    >
                        {title}
                    </Heading>
                    {children}
                </HStack>
                {settings?.image && (
                    <>
                        <Stack
                            as="picture"
                            cursor={"pointer"}
                            w={"40px"}
                        >
                            <Box
                                as="div"
                                w={size}
                                h={size}
                                __css={{
                                    animation: 'none', // Remover a animação inicial
                                    transition: 'transform 0.3s ease-in-out', // Adicionar uma transição suave
                                    '&:hover': {
                                        animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                                        transform: 'scale(1.1)' // Aumentar o tamanho no hover
                                    }
                                }}
                                _before={{
                                    content: "''",
                                    boxSizing: 'border-box',
                                    borderRadius: '50%',
                                    bgColor: color,
                                    animation: `5.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.s infinite`,
                                }}>
                                <Avatar src={settings.image} size="full" />
                            </Box>

                        </Stack>
                    </>
                )}

            </HStack>
            <HStack display={{ lg: "none", xxs: "flex" }} as="section" w={{ md: "100vw" }} bg="#EDF1F2" pb={5} pt={10} spacing={0} px={7} align="start">
                <Stack w={{ md: "90vw" }} spacing={6}>
                    <HStack
                        justify="space-between"
                        flexDir={{ md: "row", xxs: "column" }}
                        align={{ md: "none", xxs: "start" }}
                        spacing={0}
                    >
                    </HStack>
                    <Stack>{children}</Stack>
                </Stack>
                <IconButton
                    display={{ lg: "none", xxs: "flex" }}
                    icon={isOpen ? <MdClose color="black" /> : <MdMenu color={"white"} />}
                    aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                    onClick={isOpen ? handleClose : handleOpen}
                    position="absolute"
                    top={{ md: "2.7%", sm: "1.8%", xs: "10px", xxs: "7px" }}
                    left="20px"
                    zIndex={100000}
                    _hover={{
                        bg: "transparent"
                    }}
                    fontSize={"32px"}
                    bg="transparent"
                />
                {isOpen && (
                    <Drawer placement="left" size={{ xxs: "xs" }} onClose={handleClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent bg="#fff" color="#FFF">
                            <Stack mt={"45%"}>
                                <TitleSidebar title={'Área Administrativa'} />
                                <SideSection href="/" text="Painel Administrativo" icone={MdHome} />
                                <SideSection href="/painel-aep/painel" text="AEP" icone={MdEvent} />
                                <SideSection href="/painel-perigos/painel" text="Cadastro de Perigos e Riscos" icone={MdGroup} />
                                <SideSection href="/painel-plano-de-acao/painel" text="Plano de Ação" icone={MdAssignment} />
                                <SideSection href="/painel-pdf" text="PDF" icone={FaRegFilePdf} />
                                <SideSection href="/painel-excell" text="Excell" icone={PiMicrosoftExcelLogoDuotone} />
                            </Stack>
                            <Stack>
                                <TitleSidebar title={'Autenticação'} />
                                <SideSection href="/" text="Login" icone={MdPerson} />
                                <SideSection href="/" text="Logout" icone={MdOutlineLogout} />
                            </Stack>
                        </DrawerContent>
                    </Drawer>
                )}
            </HStack>
        </>
    )
}