

import { CardCadastroEmpresaElaboradora, CardCadastroEmpresaResponsavel } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { HttpMethod } from "../../../../types";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../lib/fetcher"
import { useDebounce } from "use-debounce";
import { Loader } from "../../../components/Loader";

interface EmpresaData {
    nome_responsavel: String,
    habilitacao_responsavel: String,
    registro_responsavel: String
}

interface HistoricoData {
    id: string;
    revisao: string;
    data: string;
    executado: string;
    verificado: string;
    descricao: string;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export default function Home() {
    const router = useRouter()
    const { id: empresaId } = router.query
    const [historicoId, setHistoricoId] = useState<string | null>(null);



    const { data: empresa, isValidating } = useSWR<EmpresaData>(
        router.isReady && `/api/empresa?empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const { data: historicosData } = useSWR<{ historicos: HistoricoData[] }>(
        router.isReady && `/api/historico?empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );


    useEffect(() => {
        if (historicosData && historicosData.historicos.length > 0) {
            setHistoricoId(historicosData.historicos[0].id);
        }
    }, [historicosData]);

    const [savedState, setSavedState] = useState(
        empresa
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(empresa.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(empresa.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(empresa.updatedAt))}`
            : "Saving changes..."
    );



    const [data, setData] = useState<EmpresaData>({
        nome_responsavel: "",
        habilitacao_responsavel: "",
        registro_responsavel: ""
    })

    useEffect(() => {
        if (empresa)
            setData({
                nome_responsavel: empresa.nome_responsavel ?? "",
                habilitacao_responsavel: empresa.habilitacao_responsavel ?? "",
                registro_responsavel: empresa.registro_responsavel ?? ""
            });
    }, [empresa]);

    const [debouncedData] = useDebounce(data, 1000)




    const saveChanges = useCallback(
        async (data: EmpresaData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/empresa?empresaId=${empresaId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: empresaId,
                        nome_responsavel: data.nome_responsavel,
                        habilitacao_responsavel: data.habilitacao_responsavel,
                        registro_responsavel: data.registro_responsavel
                    }),
                });

                if (response.ok) {
                    const responseData = await response.json();
                    setSavedState(
                        `Last save ${Intl.DateTimeFormat("en", { month: "short" }).format(
                            new Date(responseData.updatedAt)
                        )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                            new Date(responseData.updatedAt)
                        )} at ${Intl.DateTimeFormat("en", {
                            hour: "numeric",
                            minute: "numeric",
                        }).format(new Date(responseData.updatedAt))}`
                    );
                } else {
                    setSavedState("Failed to save.");
                    //@ts-ignore
                    toast.error("Failed to save");
                }
            } catch (error) {
                console.error(error);
            }
        },
        [empresaId]
    );

    useEffect(() => {
        if (debouncedData.nome_responsavel) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.habilitacao_responsavel) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.registro_responsavel) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);


    const [publishing, setPublishing] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        function clickedSave(e: KeyboardEvent) {
            let charCode = String.fromCharCode(e.which).toLowerCase();

            if ((e.ctrlKey || e.metaKey) && charCode === "s") {
                e.preventDefault();
                saveChanges(data);
            }
        }

        window.addEventListener("keydown", clickedSave);

        return () => window.removeEventListener("keydown", clickedSave);
    }, [data, saveChanges]);


    async function publish() {
        setPublishing(true);

        try {
            const response = await fetch(`/api/empresa?empresaId=${empresaId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: empresaId,
                    nome_responsavel: data.nome_responsavel,
                    habilitacao_responsavel: data.habilitacao_responsavel,
                    registro_responsavel: data.registro_responsavel
                }),

            }
            );

            if (response.ok) {
                mutate(`/api/empresa?empresaId=${empresaId}`);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setPublishing(false);
            toast.success("Empresa editada com sucesso!")
            router.push(`/empresa/${empresaId}/create_empresa_responsavel_edit`);
        }
    }

    if (isValidating)
        return (

            <Loader />

        );


    return (

        <Main title2={"Painel Administrativo de Empresas"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardCadastroEmpresaResponsavel
                type1={"nome_responsavel"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        nome_responsavel: e.target.value,
                    })
                } name1={"nome_responsavel"} value1={data.nome_responsavel}

                type2={"habilitacao_responsavel"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        habilitacao_responsavel: e.target.value,
                    })
                } name2={"habilitacao_responsavel"} value2={data.habilitacao_responsavel}

                type3={"registro_responsavel"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        registro_responsavel: e.target.value,
                    })
                } name3={"registro_responsavel"} value3={data.registro_responsavel}

                onClick={async () => {
                    await publish();
                }}
            />


        </Main>

    )
}
