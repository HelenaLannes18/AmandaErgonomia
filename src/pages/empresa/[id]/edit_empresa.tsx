

import { CardCadastroEmpresaElaboradora, CardCadastroInicial } from "../../../components/Card"
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
    nome_fantasia: string,
    email: string,
    ramo_atividade: string,
    atividade_principal: string,
    cnae: string,
    grau_risco: string,
    razao_social: string,
    ie: string,
    setor: string,
    endereco: string,
    bairro: string,
    telefone: string,
    cnpj: string,
    cidade: string,
    estado: string,
    unidade: string,
    area_avaliada: string,
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


    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            //@ts-ignore
            setValue((prev) => [...prev, newOption]);
        }, 1000);
    };

    const handleCreate2 = (inputValue: string) => {
        setIsLoading2(true);
        setTimeout(() => {
            const newOption2 = createOption(inputValue);
            setIsLoading2(false);
            setOptions((prev) => [...prev, newOption2]);
            //@ts-ignore
            setValue2((prev) => [...prev, newOption2]);
        }, 1000);
    };


    const [data, setData] = useState<EmpresaData>({
        nome_fantasia: "",
        email: "",
        ramo_atividade: "",
        atividade_principal: "",
        cnae: "",
        grau_risco: "",
        razao_social: "",
        ie: "",
        setor: "",
        endereco: "",
        bairro: "",
        telefone: "",
        cnpj: "",
        cidade: "",
        estado: "",
        unidade: "",
        area_avaliada: "",
    })

    useEffect(() => {
        if (empresa)
            setData({
                nome_fantasia: empresa.nome_fantasia ?? "",
                email: empresa.email ?? "",
                ramo_atividade: empresa.ramo_atividade ?? "",
                atividade_principal: empresa.atividade_principal ?? "",
                cnae: empresa.cnae ?? "",
                grau_risco: empresa.grau_risco ?? "",
                razao_social: empresa.razao_social ?? "",
                ie: empresa.ie ?? "",
                setor: empresa.setor ?? "",
                endereco: empresa.endereco ?? "",
                bairro: empresa.bairro ?? "",
                telefone: empresa.telefone ?? "",
                cnpj: empresa.cnpj ?? "",
                cidade: empresa.cidade ?? "",
                estado: empresa.estado ?? "",
                unidade: empresa.unidade ?? "",
                area_avaliada: empresa.area_avaliada ?? "",
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
                        nome_fantasia: data.nome_fantasia,
                        email: data.email,
                        ramo_atividade: data.ramo_atividade,
                        atividade_principal: data.atividade_principal,
                        cnae: data.cnae,
                        grau_risco: data.grau_risco,
                        razao_social: data.razao_social,
                        ie: data.ie,
                        setor: data.setor,
                        endereco: data.endereco,
                        bairro: data.bairro,
                        telefone: data.telefone,
                        cnpj: data.cnpj,
                        cidade: data.cidade,
                        estado: data.estado,
                        unidade: data.unidade,
                        area_avaliada: data.area_avaliada,
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
        if (debouncedData.nome_fantasia) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.email) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ramo_atividade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.atividade_principal) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cnae) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.grau_risco) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.razao_social) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ie) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);


    useEffect(() => {
        if (debouncedData.setor) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.endereco) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.bairro) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.telefone) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cnpj) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cidade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.estado) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.area_avaliada) saveChanges(debouncedData);
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
                    nome_fantasia: data.nome_fantasia,
                    email: data.email,
                    ramo_atividade: data.ramo_atividade,
                    atividade_principal: data.atividade_principal,
                    cnae: data.cnae,
                    grau_risco: data.grau_risco,
                    razao_social: data.razao_social,
                    ie: data.ie,
                    setor: data.setor,
                    endereco: data.endereco,
                    bairro: data.bairro,
                    telefone: data.telefone,
                    cnpj: data.cnpj,
                    cidade: data.cidade,
                    estado: data.estado,
                    unidade: data.unidade,
                    area_avaliada: data.area_avaliada,
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

            <CardCadastroInicial
                type1={"razao_social"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        razao_social: e.target.value,
                    })
                } name1={"razao_social"} value1={data.razao_social}

                type2={"nome_fantasia"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        nome_fantasia: e.target.value,
                    })
                } name2={"nome_fantasia"} value2={data.nome_fantasia}

                type3={"cnpj"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cnpj: e.target.value,
                    })
                } name3={"cnpj"} value3={data.cnpj}

                type4={"ie"} onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ie: e.target.value,
                    })
                } name4={"ie"} value4={data.ie}

                type5={"endereco"} onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        endereco: e.target.value,
                    })
                } name5={"endereco"} value5={data.endereco}

                type6={"bairro"} onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        bairro: e.target.value,
                    })
                } name6={"bairro"} value6={data.bairro}

                type7={"cidade"} onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cidade: e.target.value,
                    })
                } name7={"cidade"} value7={data.cidade}

                type20={"estado"} onChange20={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        estado: e.target.value,
                    })
                } name20={"estado"} value20={data.estado}

                type21={"telefone"} onChange21={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        telefone: e.target.value,
                    })
                } name21={"telefone"} value21={data.telefone}

                type22={"email"} onChange22={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        email: e.target.value,
                    })
                } name22={"email"} value22={data.email}

                //

                type8={"ramo_atividade"} onChange8={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ramo_atividade: e.target.value,
                    })
                } name8={"ramo_atividade"} value8={data.ramo_atividade}

                type9={"atividade_principal"} onChange9={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        atividade_principal: e.target.value,
                    })
                } name9={"atividade_principal"} value9={data.atividade_principal}

                type11={"cnae"} onChange11={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cnae: e.target.value,
                    })
                } name11={"cnae"} value11={data.cnae}

                type12={"grau_risco"} onChange12={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        grau_risco: e.target.value,
                    })
                } name12={"grau_risco"} value12={data.grau_risco}
                //

                type17={"unidade"} onChange17={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        unidade: e.target.value,
                    })
                } name17={"unidade"} value17={data.unidade}

                type18={"setor"} onChange18={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        setor: e.target.value,
                    })
                } name18={"setor"} value18={data.setor}

                type19={"area_avaliada"} onChange19={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        area_avaliada: e.target.value,
                    })
                } name19={"area_avaliada"} value19={data.area_avaliada}

                // type11={"habilitacao_responsavel_tecnico"} onChange11={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         habilitacao_responsavel_tecnico: e.target.value,
                //     })
                // } name11={"habilitacao_responsavel_tecnico"} value11={data.habilitacao_responsavel_tecnico}

                // type12={"registro_responsavel_tecnico"} onChange12={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         registro_responsavel_tecnico: e.target.value,
                //     })
                // } name12={"registro_responsavel_tecnico"} value12={data.registro_responsavel_tecnico}

                // type13={"ramo_atividade"} onChange13={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         ramo_atividade: e.target.value,
                //     })
                // } name13={"ramo_atividade"} value13={data.ramo_atividade}

                // type14={"atividade_principal"} onChange14={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         atividade_principal: e.target.value,
                //     })
                // } name14={"atividade_principal"} value14={data.atividade_principal}

                // type15={"cnae"} onChange15={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         cnae: e.target.value,
                //     })
                // } name15={"cnae"} value15={data.cnae}

                // type16={"grau_risco"} onChange16={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         grau_risco: e.target.value,
                //     })
                // } name16={"grau_risco"} value16={data.grau_risco}

                // type17={"unidadeName"} onChange17={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         unidadeName: e.target.value,
                //     })
                // } name17={"unidadeName"} value17={data.unidadeName}


                // type18={"setor"} onChange18={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         setor: e.target.value,
                //     })
                // } name18={"setor"} value18={data.setor}

                // type19={"areaavaliadaName"} onChange19={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         areaavaliadaName: e.target.value,
                //     })
                // } name19={"areaavaliadaName"} value19={data.areaavaliadaName}

                isLoading={isLoading}
                //@ts-ignore
                onChangeSelect={(newValue) => setValueSelect(newValue)}
                handleCreate={handleCreate}
                options={options}
                valueSelect={valueSelect}

                //unidade
                isLoading2={isLoading2}
                //@ts-ignore
                onChangeSelect2={(newValue) => setValueSelect2(newValue)}
                handleCreate2={handleCreate2}
                options2={options2}
                valueSelect2={valueSelect2}

                // type20={"bairro"} onChange20={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         bairro: e.target.value,
                //     })
                // } name20={"bairro"} value20={data.bairro}

                // type21={"cidade"} onChange21={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         cidade: e.target.value,
                //     })
                // } name21={"cidade"} value21={data.cidade}

                // type22={"estado"} onChange22={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         estado: e.target.value,
                //     })
                // } name22={"estado"} value22={data.estado}

                // type23={"nome_gestor_contrato"} onChange23={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         nome_gestor_contrato: e.target.value,
                //     })
                // } name23={"nome_gestor_contrato"} value23={data.nome_gestor_contrato}

                // type24={"telefone_gestor_contrato"} onChange24={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         telefone_gestor_contrato: e.target.value,
                //     })
                // } name24={"telefone_gestor_contrato"} value24={data.telefone_gestor_contrato}

                // type25={"email_gestor_contrato"} onChange25={(e: ChangeEvent<HTMLInputElement>) =>
                //     setData({
                //         ...data,
                //         email_gestor_contrato: e.target.value,
                //     })
                // } name25={"email_gestor_contrato"} value25={data.email_gestor_contrato}

                onClick={async () => {
                    await publish();
                }}
            />


        </Main>

    )
}
