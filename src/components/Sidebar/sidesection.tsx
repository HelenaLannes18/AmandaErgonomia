import { HStack, IconButton, Icon, Text, Button } from "@chakra-ui/react"

import { Links } from "../Link"

interface SideSectionProps {
    text: string
    href: string
    icone: any
    onClick?: any
}

export function SideSection({ text, href, icone, onClick }: SideSectionProps) {
    return (
        <Links href={href}>
            <HStack
                pl={4}
                py={{ lg: "3", xxs: "2" }}
                w="100%"
                spacing={{ '2xl': 4, lg: 0 }}
                cursor="pointer"
                _hover={{
                    bg: "linear-gradient(90deg, rgba(41,108,179,0.3253676470588235) 0%, rgba(255,255,255,1) 100%)",
                    borderRadius: "20px 0 0 20px"
                }}
            >
                <IconButton
                    icon={<Icon justify="end" as={icone} />}
                    onClick={onClick}
                    fontSize={{ '2xl': "32px", xl: "28px", lg: "24px", xxs: "22px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent={"start"}
                    variant="unstyled"
                    aria-label='Conta do usuário'
                    color="#78828B"
                    cursor="pointer"
                    zIndex={2}

                >
                </IconButton>
                <Text color="#78828B" w="70%" cursor="pointer" fontSize={{ '2xl': "24px", xl: "20px", lg: "16px" }} fontWeight="medium">{text}</Text>
            </HStack>
        </Links>
    )
}

interface SideSection2Props {
    text: string
    icone: any
    onClick?: any
}

export function SideSection2({ text, icone, onClick }: SideSection2Props) {
    return (
        <HStack
            as={Button}
            onClick={onClick}
            pl={4}
            py={{ lg: "3", xxs: "2" }}
            w="100%"
            spacing={{ '2xl': 4, lg: 0 }}
            cursor="pointer"
            _hover={{
                bg: "linear-gradient(90deg, rgba(41,108,179,0.3253676470588235) 0%, rgba(255,255,255,1) 100%)",
                borderRadius: "20px 0 0 20px"
            }}
            variant="unstyled"
        >
            <IconButton
                icon={<Icon justify="end" as={icone} />}
                fontSize={{ '2xl': "32px", xl: "28px", lg: "24px", xxs: "22px" }}
                display="flex"
                alignItems="center"
                justifyContent={"start"}
                variant="unstyled"
                aria-label='Conta do usuário'
                color="#78828B"
                cursor="pointer"
                zIndex={2}
            />
            <Text
                color="#78828B"
                w="70%"
                cursor="pointer"
                fontSize={{ '2xl': "24px", xl: "20px", lg: "16px" }}
                fontWeight="medium"
                textAlign="left" // Adicionando textAlign aqui
            >
                {text}
            </Text>
        </HStack>
    );
}
