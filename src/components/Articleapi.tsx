import { Divider } from "@chakra-ui/react";
import { CardIdentificacaoDePerigos } from "./Card";
import { FormRadio, FormTextArea, FormVariavel } from "./Form";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher"
import { Empresa, User } from "@prisma/client";
import { FigureImageLink } from "./Image";

interface EmpresaData {
    empresas: Array<Empresa>
}

//@ts-ignore
export default function Article() {
    const { data: settings } = useSWR<Empresa | null>(
        `/api/empresa?empresaId=8674459a-a453-4f7b-894c-48283e6c6757`,
        fetcher,
        {
            revalidateOnFocus: false
        }
    )

    return (
        <>
            <h1>Ola</h1>
            {settings?.name && (
                <>
                    <h2>{settings.name}</h2>
                </>
            )}
        </>
    )
}