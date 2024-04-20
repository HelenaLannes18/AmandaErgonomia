
import { CardIdentificacaoDePerigos, CardPlanodeAcao } from "../../components/Card"
import { Main } from "../../components/Main"
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { useEffect, useState } from "react";
import { HttpMethod } from "../../../types";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/fetcher"
import useSWR, { mutate } from "swr";

const formSchema = z.object({
    name: z.string(),
    o_que_fazer: z.string(),
    legislacao: z.string(),
    origem_demanda: z.string(),
    onde: z.string(),
    porque: z.string(),
    responsavel: z.string(),
    quando: z.string(),
    prazo: z.string(),
    previsao_termino: z.string(),
    termino_real: z.string(),
    status: z.string(),
    evidencia: z.string(),
    areaavaliadaName: z.string(),
    unidadeName: z.string(),
})

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

export default function PlanodeAcao() {
    const router = useRouter()

    const { data: empresa, isValidating } = useSWR<EmpresaData>(
        router.isReady && `/api/empresa?empresaId=918e87c2-8246-4825-8506-fbce0357bad0`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const [listar, setListar] = useState(false)

    const [empresaOptions, setEmpresaOptions] = useState([]);
    const [selectedOption2, setSelectedOption2] = useState('');

    useEffect(() => {
        const fetchEmpresaOptions = async () => {
            try {
                const response = await axios.get("/api/empresa");
                setEmpresaOptions(response.data.empresas);
            } catch (error) {
                console.error("Erro ao obter opções da API empresa:", error);
            }
        };

        fetchEmpresaOptions();
    }, [listar]);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            o_que_fazer: "",
            legislacao: "",
            origem_demanda: "",
            onde: "",
            porque: "",
            responsavel: "",
            quando: "",
            prazo: "",
            previsao_termino: "",
            termino_real: "",
            status: "",
            evidencia: "",
            areaavaliadaName: "",
            unidadeName: "",
        }
    })

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });


    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [valueSelect, setValueSelect] = useState<Option[] | null>([]);

    //unidade
    const [isLoading2, setIsLoading2] = useState(false);
    const [options2, setOptions2] = useState<Option[]>([]);
    const [valueSelect2, setValueSelect2] = useState<Option[] | null>([]);

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
                    // setValueSelect(newOptions);
                    setValueSelect(null);
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
                    // setValueSelect2(newOptions);
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

    const { register, handleSubmit, formState } = form;
    const { isSubmitting, isValid } = formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const dataTerminoReal = values.termino_real + ':00Z';
        const dataPrevisaoTermino = values.previsao_termino + ':00Z';
        try {
            const response = await fetch("/api/plano", {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    o_que_fazer: values.o_que_fazer,
                    legislacao: values.legislacao,
                    origem_demanda: values.origem_demanda,
                    onde: values.onde,
                    porque: values.porque,
                    responsavel: values.responsavel,
                    quando: values.quando,
                    prazo: values.prazo,
                    previsao_termino: dataPrevisaoTermino,
                    termino_real: dataTerminoReal,
                    status: values.status,
                    evidencia: values.evidencia,
                    empresaId: selectedOption2,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                })
            })
            toast.success("Plano Cadastrado!")
            router.push('/painel-plano-de-acao/painel')
            console.log(response.json())

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
        console.error(errors)
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Main title={""} title2={"Cadastro de Plano de Ação"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>

                    <CardPlanodeAcao
                        type={"submit"}

                        type1={"o_que_fazer"}
                        isInvalid1={!!formState.errors.o_que_fazer}
                        register1={register("o_que_fazer")}
                        error1={formState.errors.o_que_fazer?.message}

                        type2={"legislacao"}
                        isInvalid2={!!formState.errors.legislacao}
                        register2={register("legislacao")}
                        error2={formState.errors.legislacao?.message}


                        type3={"origem_demanda"}
                        isInvalid3={!!formState.errors.origem_demanda}
                        register3={register("origem_demanda")}
                        error3={formState.errors.origem_demanda?.message}


                        type4={"onde"}
                        isInvalid4={!!formState.errors.onde}
                        register4={register("onde")}
                        error4={formState.errors.onde?.message}


                        type5={"porque"}
                        isInvalid5={!!formState.errors.porque}
                        register5={register("porque")}
                        error5={formState.errors.porque?.message}


                        type6={"responsavel"}
                        isInvalid6={!!formState.errors.responsavel}
                        register6={register("responsavel")}
                        error6={formState.errors.responsavel?.message}


                        type7={"quando"}
                        isInvalid7={!!formState.errors.quando}
                        register7={register("quando")}
                        error7={formState.errors.quando?.message}


                        type8={"prazo"}
                        isInvalid8={!!formState.errors.prazo}
                        register8={register("prazo")}
                        error8={formState.errors.prazo?.message}


                        type9={"datetime-local"}
                        isInvalid9={!!formState.errors.previsao_termino}
                        register9={register("previsao_termino")}
                        error9={formState.errors.previsao_termino?.message}


                        type10={"datetime-local"}
                        isInvalid10={!!formState.errors.termino_real}
                        register10={register("termino_real")}
                        error10={formState.errors.termino_real?.message}


                        type11={"status"}
                        isInvalid11={!!formState.errors.status}
                        register11={register("status")}
                        error11={formState.errors.status?.message}


                        type12={"evidencia"}
                        isInvalid12={!!formState.errors.evidencia}
                        register12={register("evidencia")}
                        error12={formState.errors.evidencia?.message}

                        isInvalidEmpresa={!!formState.errors.name}
                        registerEmpresa={register("name")}
                        valueEmpresa={selectedOption2}
                        onChangeEmpresa={(e: any) => setSelectedOption2(e.target.value)}
                        empresaOptions={empresaOptions}

                        isLoading={isLoading}
                        //@ts-ignore
                        onChangeSelect={(newValue) => setValueSelect(newValue)}
                        handleCreate={handleCreate}
                        options={options}
                        valueSelect={valueSelect}

                        isLoading2={isLoading2}
                        //@ts-ignore
                        onChangeSelect2={(newValue) => setValueSelect2(newValue)}
                        handleCreate2={handleCreate2}
                        options2={options2}
                        valueSelect2={valueSelect2}
                    />


                </Main>
            </form>
        </>
    )
}

