import { Stack } from "@chakra-ui/react"
import { ReactNode } from "react"

import { Navbar } from "../Navbar"
import { Sidebar, Sidebar2 } from "../Sidebar"

interface MainProps {
    children: ReactNode
    title: string
    button?: any
    title2: string
    w: any
    path: string
    altText: string
    tamh: number
    tamw: number

}

export function Main({ children, title, button, w, path, altText, tamh, tamw, title2 }: MainProps) {
    return (
        <Stack
            as="main"
            spacing={0}
        >
            <Navbar title={title2} />
            <Sidebar title={title} button={button} w={w} path={path} altText={altText} tamh={tamh} tamw={tamw}>
                {children}
            </Sidebar>
        </Stack>
    )
}


interface MainProps2 {
    children: ReactNode
    title: string
    button?: any
    title2: string
    w: any
    path: string
    altText: string
    tamh: number
    tamw: number

}

export function Main2({ children, title, button, w, path, altText, tamh, tamw, title2 }: MainProps2) {
    return (
        <Stack
            as="main"
            spacing={0}
        >

            {children}

        </Stack>
    )
}