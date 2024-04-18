

import { CardCadastroInicial } from "../../../components/Card"
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
    name: string;
    email: string;
    responsavel_tecnico: string;
    registro_responsavel_tecnico: string;
    ramo_atividade: string;
    cidade: string;
    estado: string;
    habilitacao_responsavel_tecnico: string;
    areaavaliadaName: string;
    unidadeName: string;
    atividade_principal: string;
    cnae: string;
    grau_risco: string;
    nome_gestor_contrato: string;
    telefone_gestor_contrato: string;
    email_gestor_contrato: string;
    razao_social: string;
    ergonomista: string;
    ie: string;
    cep: string;
    setor: string;
    endereco: string;
    bairro: string;
    telefone: string;
    cnpj: string;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export default function Home() {
    const router = useRouter()
    const { id: empresaId } = router.query


    const { data: empresa, isValidating } = useSWR<EmpresaData>(
        router.isReady && `/api/empresa?empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );


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
        name: "",
        email: "",
        responsavel_tecnico: "",
        registro_responsavel_tecnico: "",
        ramo_atividade: "",
        cidade: "",
        estado: "",
        habilitacao_responsavel_tecnico: "",
        unidadeName: "",
        areaavaliadaName: "",
        atividade_principal: "",
        cnae: "",
        grau_risco: "",
        nome_gestor_contrato: "",
        telefone_gestor_contrato: "",
        email_gestor_contrato: "",
        razao_social: "",
        ergonomista: "",
        ie: "",
        cep: "",
        setor: "",
        endereco: "",
        bairro: "",
        telefone: "",
        cnpj: "",
    })

    useEffect(() => {
        if (empresa)
            setData({
                name: empresa.name ?? "",
                email: empresa.email ?? "",
                responsavel_tecnico: empresa.responsavel_tecnico ?? "",
                registro_responsavel_tecnico: empresa.registro_responsavel_tecnico ?? "",
                ramo_atividade: empresa.ramo_atividade ?? "",
                cidade: empresa.cidade ?? "",
                estado: empresa.estado ?? "",
                habilitacao_responsavel_tecnico: empresa.habilitacao_responsavel_tecnico ?? "",
                areaavaliadaName: empresa.areaavaliadaName ?? "",
                unidadeName: empresa.unidadeName ?? "",
                atividade_principal: empresa.atividade_principal ?? "",
                cnae: empresa.cnae ?? "",
                grau_risco: empresa.grau_risco ?? "",
                nome_gestor_contrato: empresa.nome_gestor_contrato ?? "",
                telefone_gestor_contrato: empresa.telefone_gestor_contrato ?? "",
                email_gestor_contrato: empresa.email_gestor_contrato ?? "",
                razao_social: empresa.razao_social ?? "",
                ergonomista: empresa.ergonomista ?? "",
                ie: empresa.ie ?? "",
                cep: empresa.cep ?? "",
                setor: empresa.setor ?? "",
                endereco: empresa.endereco ?? "",
                bairro: empresa.bairro ?? "",
                telefone: empresa.telefone ?? "",
                cnpj: empresa.cnpj ?? "",
                // cidade: empresa.cidade ?? "",
                // estado: empresa.estado ?? "",
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

    const handleCreate = (inputValue: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect((prev) => [...prev, newOption]);
        }, 1000);
    }

    const handleCreate2 = (inputValue: string) => {
        setIsLoading2(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading2(false);
            setOptions2((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect2((prev) => [...prev, newOption]);
        }, 1000);
    }

    useEffect(() => {
        if (empresa) {
            const timeout = setTimeout(() => {
                if (empresa.areaavaliadaName.includes(',')) {
                    const areaavaliadaNames = empresa.areaavaliadaName.split(',');
                    const newOptions = areaavaliadaNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions(newOptions);
                    setValueSelect(newOptions);
                } else {
                    const option = {
                        label: empresa.areaavaliadaName,
                        value: empresa.areaavaliadaName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions([option]);
                    setValueSelect([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [empresa]);

    useEffect(() => {
        if (empresa) {
            const timeout = setTimeout(() => {
                if (empresa.unidadeName.includes(',')) {
                    const unidadeNames = empresa.unidadeName.split(',');
                    const newOptions = unidadeNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions2(newOptions);
                    setValueSelect2(newOptions);
                } else {
                    const option = {
                        label: empresa.unidadeName,
                        value: empresa.unidadeName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions2([option]);
                    setValueSelect2([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [empresa]);


    console.log(valueSelect)

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
                        name: data.name,
                        email: data.email,
                        responsavel_tecnico: data.responsavel_tecnico,
                        registro_responsavel_tecnico: data.registro_responsavel_tecnico,
                        ramo_atividade: data.ramo_atividade,
                        cidade: data.cidade,
                        estado: data.estado,
                        habilitacao_responsavel_tecnico: data.habilitacao_responsavel_tecnico,
                        atividade_principal: data.atividade_principal,
                        cnae: data.cnae,
                        grau_risco: data.grau_risco,
                        nome_gestor_contrato: data.nome_gestor_contrato,
                        telefone_gestor_contrato: data.telefone_gestor_contrato,
                        email_gestor_contrato: data.email_gestor_contrato,
                        razao_social: data.razao_social,
                        ergonomista: data.ergonomista,
                        ie: data.ie,
                        cep: data.cep,
                        setor: data.setor,
                        endereco: data.endereco,
                        bairro: data.bairro,
                        telefone: data.telefone,
                        cnpj: data.cnpj,
                        areaavaliadaName: valueSelect?.map(item => item.value),
                        unidadeName: valueSelect2?.map(item => item.value),
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
        if (debouncedData.name) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.email) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.responsavel_tecnico) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.registro_responsavel_tecnico) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ramo_atividade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cidade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.estado) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.habilitacao_responsavel_tecnico) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidadeName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.areaavaliadaName) saveChanges(debouncedData);
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
        if (debouncedData.nome_gestor_contrato) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.telefone_gestor_contrato) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.email_gestor_contrato) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.razao_social) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ergonomista) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ie) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cep) saveChanges(debouncedData);
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
                    name: data.name,
                    email: data.email,
                    responsavel_tecnico: data.responsavel_tecnico,
                    registro_responsavel_tecnico: data.registro_responsavel_tecnico,
                    ramo_atividade: data.ramo_atividade,
                    cidade: data.cidade,
                    estado: data.estado,
                    habilitacao_responsavel_tecnico: data.habilitacao_responsavel_tecnico,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    cnae: data.cnae,
                    grau_risco: data.grau_risco,
                    nome_gestor_contrato: data.nome_gestor_contrato,
                    telefone_gestor_contrato: data.telefone_gestor_contrato,
                    email_gestor_contrato: data.email_gestor_contrato,
                    razao_social: data.razao_social,
                    ergonomista: data.ergonomista,
                    ie: data.ie,
                    cep: data.cep,
                    setor: data.setor,
                    endereco: data.endereco,
                    bairro: data.bairro,
                    telefone: data.telefone,
                    unidadeName: valueSelect2?.map(item => item.value),
                    cnpj: data.cnpj,
                    // cidade:data.cidade,
                    // estado:data.estado,
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
            router.back();
        }
    }

    if (isValidating)
        return (

            <Loader />

        );


    return (

        <Main title2={"Painel Administrativo de Empresas"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardCadastroInicial
                type1={"name"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        name: e.target.value,
                    })
                } name1={"name"} value1={data.name}

                type2={"cnpj"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cnpj: e.target.value,
                    })
                } name2={"cnpj"} value2={data.cnpj}

                type3={"razao_social"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        razao_social: e.target.value,
                    })
                } name3={"razao_social"} value3={data.razao_social}

                type4={"ergonomista"} onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ergonomista: e.target.value,
                    })
                } name4={"ergonomista"} value4={data.ergonomista}

                type5={"ie"} onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ie: e.target.value,
                    })
                } name5={"ie"} value5={data.ie}

                type6={"cep"} onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cep: e.target.value,
                    })
                } name6={"cep"} value6={data.cep}

                type7={"endereco"} onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        endereco: e.target.value,
                    })
                } name7={"endereco"} value7={data.endereco}

                type8={"telefone"} onChange8={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        telefone: e.target.value,
                    })
                } name8={"telefone"} value8={data.telefone}

                type9={"email"} onChange9={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        email: e.target.value,
                    })
                } name9={"email"} value9={data.email}

                type10={"responsavel_tecnico"} onChange10={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        responsavel_tecnico: e.target.value,
                    })
                } name10={"responsavel_tecnico"} value10={data.responsavel_tecnico}

                type11={"habilitacao_responsavel_tecnico"} onChange11={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        habilitacao_responsavel_tecnico: e.target.value,
                    })
                } name11={"habilitacao_responsavel_tecnico"} value11={data.habilitacao_responsavel_tecnico}

                type12={"registro_responsavel_tecnico"} onChange12={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        registro_responsavel_tecnico: e.target.value,
                    })
                } name12={"registro_responsavel_tecnico"} value12={data.registro_responsavel_tecnico}

                type13={"ramo_atividade"} onChange13={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ramo_atividade: e.target.value,
                    })
                } name13={"ramo_atividade"} value13={data.ramo_atividade}

                type14={"atividade_principal"} onChange14={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        atividade_principal: e.target.value,
                    })
                } name14={"atividade_principal"} value14={data.atividade_principal}

                type15={"cnae"} onChange15={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cnae: e.target.value,
                    })
                } name15={"cnae"} value15={data.cnae}

                type16={"grau_risco"} onChange16={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        grau_risco: e.target.value,
                    })
                } name16={"grau_risco"} value16={data.grau_risco}

                type17={"unidadeName"} onChange17={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        unidadeName: e.target.value,
                    })
                } name17={"unidadeName"} value17={data.unidadeName}


                type18={"setor"} onChange18={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        setor: e.target.value,
                    })
                } name18={"setor"} value18={data.setor}

                type19={"areaavaliadaName"} onChange19={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        areaavaliadaName: e.target.value,
                    })
                } name19={"areaavaliadaName"} value19={data.areaavaliadaName}

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

                type20={"bairro"} onChange20={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        bairro: e.target.value,
                    })
                } name20={"bairro"} value20={data.bairro}

                type21={"cidade"} onChange21={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cidade: e.target.value,
                    })
                } name21={"cidade"} value21={data.cidade}

                type22={"estado"} onChange22={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        estado: e.target.value,
                    })
                } name22={"estado"} value22={data.estado}

                type23={"nome_gestor_contrato"} onChange23={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        nome_gestor_contrato: e.target.value,
                    })
                } name23={"nome_gestor_contrato"} value23={data.nome_gestor_contrato}

                type24={"telefone_gestor_contrato"} onChange24={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        telefone_gestor_contrato: e.target.value,
                    })
                } name24={"telefone_gestor_contrato"} value24={data.telefone_gestor_contrato}

                type25={"email_gestor_contrato"} onChange25={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        email_gestor_contrato: e.target.value,
                    })
                } name25={"email_gestor_contrato"} value25={data.email_gestor_contrato}

                onClick={async () => {
                    await publish();
                }}
            />


        </Main>

    )
}
