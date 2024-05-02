

import { CardCadastroEmpresaElaboradora } from "../../../components/Card"
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
    razao_social_elaboradora: string,
    cnpj_elaboradora: string,
    ie_elaboradora: string,
    endereco_elaboradora: string,
    bairro_elaboradora: string,
    cep_elaboradora: string,
    cidade_elaboradora: string,
    uf_elaboradora: string,
    telefone_elaboradora: string,
    email_elaboradora: string
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
        razao_social_elaboradora: "",
        cnpj_elaboradora: "",
        ie_elaboradora: "",
        endereco_elaboradora: "",
        bairro_elaboradora: "",
        cep_elaboradora: "",
        cidade_elaboradora: "",
        uf_elaboradora: "",
        telefone_elaboradora: "",
        email_elaboradora: ""
    })

    useEffect(() => {
        if (empresa)
            setData({
                razao_social_elaboradora: empresa.razao_social_elaboradora ?? "",
                cnpj_elaboradora: empresa.cnpj_elaboradora ?? "",
                ie_elaboradora: empresa.ie_elaboradora ?? "",
                endereco_elaboradora: empresa.endereco_elaboradora ?? "",
                bairro_elaboradora: empresa.bairro_elaboradora ?? "",
                cep_elaboradora: empresa.cep_elaboradora ?? "",
                cidade_elaboradora: empresa.cidade_elaboradora ?? "",
                uf_elaboradora: empresa.uf_elaboradora ?? "",
                telefone_elaboradora: empresa.telefone_elaboradora ?? "",
                email_elaboradora: empresa.email_elaboradora ?? ""
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
                        razao_social_elaboradora: data.razao_social_elaboradora,
                        cnpj_elaboradora: data.cnpj_elaboradora,
                        ie_elaboradora: data.ie_elaboradora,
                        endereco_elaboradora: data.endereco_elaboradora,
                        bairro_elaboradora: data.bairro_elaboradora,
                        cep_elaboradora: data.cep_elaboradora,
                        cidade_elaboradora: data.cidade_elaboradora,
                        uf_elaboradora: data.uf_elaboradora,
                        telefone_elaboradora: data.telefone_elaboradora,
                        email_elaboradora: data.email_elaboradora
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
        if (debouncedData.razao_social_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cnpj_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ie_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.endereco_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.bairro_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cep_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cidade_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.uf_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);


    useEffect(() => {
        if (debouncedData.telefone_elaboradora) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.email_elaboradora) saveChanges(debouncedData);
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
                    razao_social_elaboradora: data.razao_social_elaboradora,
                    cnpj_elaboradora: data.cnpj_elaboradora,
                    ie_elaboradora: data.ie_elaboradora,
                    endereco_elaboradora: data.endereco_elaboradora,
                    bairro_elaboradora: data.bairro_elaboradora,
                    cep_elaboradora: data.cep_elaboradora,
                    cidade_elaboradora: data.cidade_elaboradora,
                    uf_elaboradora: data.uf_elaboradora,
                    telefone_elaboradora: data.telefone_elaboradora,
                    email_elaboradora: data.email_elaboradora
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
            <CardCadastroEmpresaElaboradora
                type1={"razao_social_elaboradora"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        razao_social_elaboradora: e.target.value,
                    })
                } name1={"razao_social_elaboradora"} value1={data.razao_social_elaboradora}

                type2={"cnpj_elaboradora"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cnpj_elaboradora: e.target.value,
                    })
                } name2={"cnpj_elaboradora"} value2={data.cnpj_elaboradora}

                type3={"ie_elaboradora"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ie_elaboradora: e.target.value,
                    })
                } name3={"ie_elaboradora"} value3={data.ie_elaboradora}

                type4={"endereco_elaboradora"} onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        endereco_elaboradora: e.target.value,
                    })
                } name4={"endereco_elaboradora"} value4={data.endereco_elaboradora}

                type5={"bairro_elaboradora"} onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        bairro_elaboradora: e.target.value,
                    })
                } name5={"bairro_elaboradora"} value5={data.bairro_elaboradora}

                type6={"cep_elaboradora"} onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cep_elaboradora: e.target.value,
                    })
                } name6={"cep_elaboradora"} value6={data.cep_elaboradora}

                type7={"cidade_elaboradora"} onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cidade_elaboradora: e.target.value,
                    })
                } name7={"cidade_elaboradora"} value7={data.cidade_elaboradora}

                type20={"uf_elaboradora"} onChange20={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        uf_elaboradora: e.target.value,
                    })
                } name20={"uf_elaboradora"} value20={data.uf_elaboradora}

                type21={"telefone_elaboradora"} onChange21={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        telefone_elaboradora: e.target.value,
                    })
                } name21={"telefone_elaboradora"} value21={data.telefone_elaboradora}

                type22={"email_elaboradora"} onChange22={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        email_elaboradora: e.target.value,
                    })
                } name22={"email_elaboradora"} value22={data.email_elaboradora}

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

                // isLoading={isLoading}
                // //@ts-ignore
                // onChangeSelect={(newValue) => setValueSelect(newValue)}
                // handleCreate={handleCreate}
                // options={options}
                // valueSelect={valueSelect}

                // //unidade
                // isLoading2={isLoading2}
                // //@ts-ignore
                // onChangeSelect2={(newValue) => setValueSelect2(newValue)}
                // handleCreate2={handleCreate2}
                // options2={options2}
                // valueSelect2={valueSelect2}

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
