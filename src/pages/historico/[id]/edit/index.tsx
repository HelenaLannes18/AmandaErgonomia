

import { CardCadastroInicial } from "../../../../components/Card"
import { Main } from "../../../../components/Main"
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
import { fetcher } from "../../../../lib/fetcher"
import { useDebounce } from "use-debounce";
import { Loader } from "../../../../components/Loader";

interface HistoricoData {
    revisao: string;
    data: string;
    executado: string;
    verificado: string;
    descricao: string;
}


export default function Home() {
    const router = useRouter()
    const { id: historicoId } = router.query;


    const { data: historico, isValidating } = useSWR<HistoricoData>(
        router.isReady && `/api/historico?historicoId=${historicoId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );


    const [savedState, setSavedState] = useState(
        historico
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(historico.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(historico.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(historico.updatedAt))}`
            : "Saving changes..."
    );



    const [data, setData] = useState<HistoricoData>({
        revisao: "",
        data: "",
        executado: "",
        verificado: "",
        descricao: "",
    })

    useEffect(() => {
        if (historico)
            setData({
                revisao: historico.revisao ?? "",
                data: historico.data ?? "",
                executado: historico.executado ?? "",
                verificado: historico.verificado ?? "",
                descricao: historico.descricao ?? "",
            });
    }, [historico]);

    const [debouncedData] = useDebounce(data, 1000)


    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });



    const saveChanges = useCallback(
        async (data: HistoricoData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/historico?historicoId=${historicoId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: historicoId,
                        revisao: data.revisao,
                        data: data.data,
                        executado: data.executado,
                        verificado: data.verificado,
                        descricao: data.descricao,
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
        [historicoId]
    );


    useEffect(() => {
        if (debouncedData.revisao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.data) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.executado) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.descricao) saveChanges(debouncedData);
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
            const response = await fetch(`/api/historico?historicoId=${historicoId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: historicoId,
                    revisao: data.revisao,
                    data: data.data,
                    executado: data.executado,
                    verificado: data.verificado,
                    descricao: data.descricao,
                }),

            }
            );

            if (response.ok) {
                mutate(`/api/historico?historicoId=${historicoId}`);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setPublishing(false);
            toast.success("Historico editada com sucesso!")
            router.back();
        }
    }

    if (isValidating)
        return (

            <Loader />

        );


    return (

        <Main title2={"Painel Administrativo de Historicos"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardCadastroInicial
                type1={"revisao"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        revisao: e.target.value,
                    })
                } name1={"revisao"} value1={data.revisao}

                type2={"datetime-local"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        data: e.target.value,
                    })
                } name2={"data"} value2={data.data}

                type3={"executado"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        executado: e.target.value,
                    })
                } name3={"executado"} value3={data.executado}

                type4={"verificado"} onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        verificado: e.target.value,
                    })
                } name4={"verificado"} value4={data.verificado}

                type5={"descricao"} onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        descricao: e.target.value,
                    })
                } name5={"descricao"} value5={data.descricao}


                onClick={async () => {
                    await publish();
                }}
            />


        </Main>

    )
}
