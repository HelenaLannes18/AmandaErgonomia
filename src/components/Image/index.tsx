import { Link, Stack } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import NextLink from 'next/link'
import { ReactNode } from "react"

interface FigureImageProps {
    src: any
    alt: any
    w: any
    h: any
    width?: any
    children?: ReactNode
}

export function FigureImage({ src, alt, w, h, width, children }: FigureImageProps) {
    return (
        <Stack
            as="picture"
            w={width}
        >
            <Image src={src} alt={alt} width={w} height={h} />
        </Stack>
    )
}

interface FigureImageLinkProps {
    src: any
    alt: any
    w: any
    h: any
    width?: any
}

export function FigureImageLink({ src, alt, w, h, width }: FigureImageLinkProps) {
    return (
        <Link
            as={NextLink}
            href={"/perfil"}
        >
            <Stack
                as="picture"
                cursor={"pointer"}
                w={width}
            >
                <Image src={src} alt={alt} width={w} height={h} borderRadius={'full'} boxSize='40px' />
            </Stack>
        </Link>
    )
}