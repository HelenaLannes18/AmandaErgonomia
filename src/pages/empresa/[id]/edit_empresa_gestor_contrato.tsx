

import { CardCadastroEmpresaElaboradora, CardCadastroEmpresaGestor } from "../../../components/Card"
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
    nome_gestor: string,
    telefone_gestor: string,
    email_gestor: string,
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
        nome_gestor: "",
        telefone_gestor: "",
        email_gestor: "",

    })

    useEffect(() => {
        if (empresa)
            setData({
                nome_gestor: empresa.nome_gestor ?? "",
                telefone_gestor: empresa.telefone_gestor ?? "",
                email_gestor: empresa.email_gestor ?? "",
            });
    }, [empresa]);

    const [debouncedData] = useDebounce(data, 1000)


    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });


    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [valueSelect, setValueSelect] = useState<Option[] | null>(null);

    //unidade
    const [isLoading2, setIsLoading2] = useState(false);
    const [options2, setOptions2] = useState<Option[]>([]);
    const [valueSelect2, setValueSelect2] = useState<Option[] | null>(null);


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
                        nome_gestor: data.nome_gestor,
                        telefone_gestor: data.telefone_gestor,
                        email_gestor: data.email_gestor,
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
        if (debouncedData.nome_gestor) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.telefone_gestor) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.email_gestor) saveChanges(debouncedData);
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
                    nome_gestor: data.nome_gestor,
                    telefone_gestor: data.telefone_gestor,
                    email_gestor: data.email_gestor,
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
            <CardCadastroEmpresaGestor
                type1={"nome_gestor"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        nome_gestor: e.target.value,
                    })
                } name1={"nome_gestor"} value1={data.nome_gestor}

                type2={"telefone_gestor"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        telefone_gestor: e.target.value,
                    })
                } name2={"telefone_gestor"} value2={data.telefone_gestor}

                type3={"email_gestor"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        email_gestor: e.target.value,
                    })
                } name3={"email_gestor"} value3={data.email_gestor}



                onClick={async () => {
                    await publish();
                }}
            />


        </Main>

    )
}
