
import { type } from "os"
import { Button, Link } from "@chakra-ui/react"
import NextLink from 'next/link'

interface ButtonLoginProps {
    type: any
    label: string
}


export function ButtonLogin({ type, label }: ButtonLoginProps) {
    return (
        <Button
            as="button"
            color={"white"}
            bg={"#296CB3"}
            borderRadius={"8px"}
            py={6}
            px={9}
            fontSize={'16px'}
            type={type}
        >
            {label}
        </Button>
    )
}

interface ButtonActionsProps {
    as: any
    onClick?: any
}

export function ButtonActions({ as, onClick }: ButtonActionsProps) {
    return (
        <Button
            as={as}
            onClick={onClick}
            bg="transparent"
            p={2}
            cursor={"pointer"}
            fontSize={"20px"}
        />
    )
}

interface ButtonAddProps {
    text: string
    mt: string
    onClick?: any
    type?: any
}

export function ButtonAd({ text, mt, onClick, type }: ButtonAddProps) {
    return (
        <Button
            as="button"
            onClick={onClick}
            type={type}
            mt={mt}
            w={{md:"23%", sm:"33%"}}
            bg={"rgba(70, 83, 100, 1.00)"}
            borderRadius={"8px"}
            color={"#fff"}
            fontSize={"16px"}
            _hover={{
                bg: "rgba(70, 83, 100, 1.00)"
            }}
        >
            {text}
        </Button>
    )
}

interface ButtonImgProps {
    text: string
    mt: string
    onClick?: any
}

export function ButtonImg({ text, mt, onClick }: ButtonImgProps) {
    return (
        <Button
            as="button"
            mt={mt}
            w={"95%"}
            bg={"#296CB3"}
            borderRadius={"8px"}
            color={"#fff"}
            fontSize={"16px"}
            _hover={{
                bg: "#296CB3"
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}


interface ButtonPageProps {
    text: string
    mt: any
    href?: string
    w?: any
}

export function ButtonPage({ text, mt, href, w = '18%' }: ButtonPageProps) {
    return (
        <Link
            as={NextLink}
            href={href}
        >
            <Button
                as="button"
                mt={mt}
                w={w}
                bg={"rgba(70, 83, 100, 1.00)"}
                borderRadius={"8px"}
                color={"#fff"}
                fontSize={"16px"}
                _hover={{
                    bg: "rgba(70, 83, 100, 1.00)"
                }}
            >
                {text}
            </Button>
        </Link>
    )
}


interface ButtonImageProps {
    text: string
}

export function ButtonImage({ text }: ButtonImageProps) {
    return (
        <Button
            as="button"
            w={{md:"23%", xxs:"100%"}}
            bg={"#296CB3"}
            borderRadius={"8px"}
            color={"#fff"}
            fontSize={"16px"}
            _hover={{
                bg: "#296CB3"
            }}
        >
            {text}
        </Button>
    )
}

interface ButtonPaginationProps {
    button: any
    fontSize: any

}

export function ButtonPagination({ button, fontSize }: ButtonPaginationProps) {
    return (
        <Button
            color="black"
            bg="#EEEEEE"
            fontSize={fontSize}
            fontWeight={500}
            _hover={{
                bgColor: "#2FACFA",
                color: "white"
            }}
        >
            {button}
        </Button>
    )
}