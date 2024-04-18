import { Heading } from "@chakra-ui/react"

interface TitleSidebarProps {
    title: string
}

export function TitleSidebar({ title }:TitleSidebarProps) {
    return(
        <Heading
            as="h3"
            color={"#000"}
            fontWeight={600}
            fontSize={"20px"}
            pl={5}
        >
            {title}
        </Heading>
    )
}