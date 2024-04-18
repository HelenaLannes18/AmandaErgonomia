import { Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import { ReactNode } from 'react'

export function TextLinkLogin() {
    return (
        <Text
            color={"#fff"}
            fontSize={"14px"}
        >
            <Link
                as={NextLink}
                href={"/esqueci-a-senha"}
            >
                Esqueceu a senha?
            </Link>
        </Text>
    )
}


interface LinksProps {
    href: string
    children: ReactNode
}

export function Links({ href, children }: LinksProps) {
    return (
        <Link
            as={NextLink}
            href={href}
            _hover={{
                textDecoration: 'none'
            }}
        >
            {children}
        </Link>
    )
}