import { useState } from 'react'
import { IconButton, Drawer, DrawerOverlay, DrawerContent, Stack, Heading, HStack } from '@chakra-ui/react'
import { MdHome, MdEvent, MdGroup, MdAssignment, MdAccountBalanceWallet, MdEditCalendar, MdQuestionAnswer, MdPerson, MdOutlineLogout, MdMenu, MdClose } from 'react-icons/md'
import { FaRegFilePdf } from "react-icons/fa6"
import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi"
import { useRouter } from 'next/router';

// import { FigureImage } from '../FigureImage'
import { SideSection, SideSection2 } from './sidesection'
import { FigureImage } from '../Image'
import { TitleSidebar } from '../Title'
import { useClerk } from "@clerk/clerk-react";

interface SidebarProps {
    children: React.ReactNode
    title: string
    button?: React.ReactNode
    w: string
    path: string
    altText: string
    tamh: number
    tamw: number
}

export function Sidebar({ children, title, button, w, path, altText, tamh, tamw }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter();
    const { signOut } = useClerk();
    const handleOpen = () => {
        setIsOpen(true)
    };

    const handleClose = () => {
        setIsOpen(false)
    };

    return (
        <HStack align="strech" spacing={0} zIndex={100}>
            <Stack w={{ lg: "25vw", xxs: "0" }} display={{ lg: "flex", xxs: "none" }} py={12} bg="white" spacing={8} px={2}>
                <Stack
                    align={"center"}
                >
                    <FigureImage src={"/logo.png"} alt={undefined} w={98} h={41} width={'40%'} />
                </Stack>
                <Stack>
                    <TitleSidebar title={'Área Administrativa'} />
                    <SideSection href="/" text="Painel Administrativo" icone={MdHome} />
                    <SideSection href="/painel-aep" text="AEP" icone={MdEvent} />
                    <SideSection href="/painel-perigos" text="Cadastro de Perigos e Riscos" icone={MdGroup} />
                    <SideSection href="/painel-plano-de-acao" text="Plano de Ação" icone={MdAssignment} />
                    <SideSection href="/painel-pdf" text="PDF" icone={FaRegFilePdf} />
                    <SideSection href="/painel-excell" text="Excell" icone={PiMicrosoftExcelLogoDuotone} />
                </Stack>
                <Stack>
                    <TitleSidebar title={'Autenticação'} />
                    <SideSection href="/" text="Login" icone={MdPerson} />
                    <SideSection2 onClick={() => signOut(() => router.push("/"))} text="Logout" icone={MdOutlineLogout} />
                </Stack>
            </Stack>
            <HStack as="section" w={{ lg: "79vw", md: "100vw", xxs: "100vw" }} bg="#EDF1F2" pb={5} pt={10} spacing={0} px={{ md: 7, xxs: 0 }} align="start">
                <Stack w={{ lg: "75vw", md: "100vw", xxs: "100vw" }} spacing={6}>
                    <HStack
                        justify="space-between"
                        flexDir={{ md: "row", xxs: "column" }}
                        align={{ md: "none", xxs: "start" }}
                        spacing={0}
                    >
                        {button}
                    </HStack>
                    <Stack px={{ md: 0, xxs: 8 }}>{children}</Stack>
                </Stack>
            </HStack>
            <IconButton
                display={{ lg: "none", xxs: "flex" }}
                icon={isOpen ? <MdClose /> : <MdMenu />}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                onClick={isOpen ? handleClose : handleOpen}
                position="fixed"
                top={{ md: "20px", sm: "13px", xs: "10px", xxs: "7px" }}
                left="20px"
                zIndex={999}
                fontSize={"20px"}
                bg="transparent"
                color="white"
            />
            {isOpen && (
                <Drawer placement="left" size={{ xxs: "xs" }} onClose={handleClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent bg="#01233C" color="#FFF">
                        <IconButton
                            icon={<MdClose />}
                            aria-label="Close sidebar"
                            onClick={handleClose}
                            bg="transparent"
                            alignSelf="flex-end"
                        />
                        <Stack>
                            <TitleSidebar title={'Área Administrativa'} />
                            <SideSection href="/" text="Painel Administrativo" icone={MdHome} />
                            <SideSection href="/painel-aep" text="AEP" icone={MdEvent} />
                            <SideSection href="/painel-perigos" text="Cadastro de Perigos e Riscos" icone={MdGroup} />
                            <SideSection href="/painel-plano-de-acao" text="Plano de Ação" icone={MdAssignment} />
                            <SideSection href="/painel-pdf" text="PDF" icone={FaRegFilePdf} />
                            <SideSection href="/painel-excell" text="Excell" icone={PiMicrosoftExcelLogoDuotone} />
                        </Stack>
                        <Stack>
                            <TitleSidebar title={'Autenticação'} />
                            <SideSection href="/" text="Login" icone={MdPerson} />
                            <SideSection2 onClick={() => signOut(() => router.push("/"))} text="Logout" icone={MdOutlineLogout} />
                        </Stack>
                    </DrawerContent>
                </Drawer>
            )}
        </HStack>
    )
}

interface SidebarProps2 {
    children: React.ReactNode
    title: string
    button?: React.ReactNode
    w: string
    path: string
    altText: string
    tamh: number
    tamw: number
}

export function Sidebar2({ children, title, button, w, path, altText, tamh, tamw }: SidebarProps2) {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    };

    const handleClose = () => {
        setIsOpen(false)
    };

    return (
        <HStack align="strech" spacing={0} zIndex={100}>
            <Stack w={{ lg: "25vw", xxs: "0" }} display={{ lg: "flex", xxs: "none" }} py={12} bg="white" spacing={8} px={2}>


            </Stack>
            <HStack as="section" w={{ lg: "83vw", xxs: "100vw" }} bg="#EDF1F2" pb={5} pt={10} spacing={0} px={7} align="start">
                <Stack w={{ lg: "75vw", xxs: "90vw" }} spacing={6}>
                    <HStack
                        justify="space-between"
                        flexDir={{ md: "row", xxs: "column" }}
                        align={{ md: "none", xxs: "start" }}
                        spacing={0}
                    >
                        {button}
                    </HStack>
                    <Stack>{children}</Stack>
                </Stack>
            </HStack>
            <IconButton
                display={{ lg: "none", xxs: "flex" }}
                icon={isOpen ? <MdClose /> : <MdMenu />}
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
                onClick={isOpen ? handleClose : handleOpen}
                position="fixed"
                top={{ md: "20px", sm: "13px", xs: "10px", xxs: "7px" }}
                left="20px"
                zIndex={999}
                fontSize={"20px"}
                bg="transparent"
                color="white"
            />
            {isOpen && (
                <Drawer placement="left" size={{ xxs: "xs" }} onClose={handleClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent bg="#01233C" color="#FFF">
                        <IconButton
                            icon={<MdClose />}
                            aria-label="Close sidebar"
                            onClick={handleClose}
                            bg="transparent"
                            alignSelf="flex-end"
                        />

                    </DrawerContent>
                </Drawer>
            )}
        </HStack>
    )
}
