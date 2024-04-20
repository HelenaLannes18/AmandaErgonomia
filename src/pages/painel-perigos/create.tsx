
import { CardIdentificacaoDePerigos } from "../../components/Card"
import { Main } from "../../components/Main"
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { HttpMethod } from "../../../types";
import { useRouter } from "next/router";
import React from "react";
import { fetcher } from "../../lib/fetcher"
import useSWR, { mutate } from "swr";

const formSchema = z.object({
    name: z.string(),
    fase_levantamento_preliminar: z.string(),
    aspectos_ergonomico: z.string(),
    fator: z.string(),
    fontes: z.string(),
    ha_pergios_externos: z.string(),
    possiveis_lesoes: z.string(),
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

export default function IdentificacaoDeRiscos() {
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

    const [selectedRadioValue, setSelectedRadioValue] = useState("");

    const handleRadioChange = (value: string) => {
        setSelectedRadioValue(value);

    };

    const handleRadioClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };


    const [selectedRadioValue2, setSelectedRadioValue2] = useState("");

    const handleRadioChange2 = (value: string) => {
        setSelectedRadioValue2(value);

    };

    const handleRadioClick2 = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };


    const [selectedBoolean, setSelectedBoolean] = useState('')

    const handleRadioChange3 = (value: string) => {
        setSelectedBoolean(value);

    };

    const handleRadioClick3 = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };


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
            fase_levantamento_preliminar: "",
            aspectos_ergonomico: "",
            fator: "",
            fontes: "",
            ha_pergios_externos: "",
            possiveis_lesoes: "",
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


    console.log(valueSelect)

    const { register, handleSubmit, formState } = form;
    const { isSubmitting, isValid } = formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)
        try {
            const response = await fetch("/api/perigo", {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fase_levantamento_preliminar: selectedRadioValue,
                    aspectos_ergonomico: selectedRadioValue2,
                    fator: values.fator,
                    fontes: values.fontes,
                    ha_pergios_externos: selectedBoolean,
                    possiveis_lesoes: values.possiveis_lesoes,
                    empresaId: selectedOption2,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                })
            })
            toast.success("Perigo Cadastrado!")
            router.back()
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
                <Main title={""} title2={"Identificação dos Perigos"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>
                    <CardIdentificacaoDePerigos
                        type={"submit"}

                        type6={"fator"}
                        isInvalid6={!!formState.errors.fator}
                        register6={register("fator")}
                        error6={formState.errors.fator?.message}

                        type9={"possiveis_lesoes"}
                        isInvalid9={!!formState.errors.possiveis_lesoes}
                        register9={register("possiveis_lesoes")}
                        error9={formState.errors.possiveis_lesoes?.message}

                        type10={"fontes"}
                        isInvalid10={!!formState.errors.fontes}
                        register10={register("fontes")}
                        error10={formState.errors.fontes?.message}


                        isInvalidEmpresa={!!formState.errors.name}
                        registerEmpresa={register("name")}
                        valueEmpresa={selectedOption2}
                        onChangeEmpresa={(e: any) => setSelectedOption2(e.target.value)}
                        empresaOptions={empresaOptions}


                        isInvalid={!!formState.errors.fase_levantamento_preliminar}
                        value={selectedRadioValue}

                        selectedRadioValue={selectedRadioValue}
                        handleRadioChange={handleRadioChange}
                        handleRadioClick={handleRadioClick}

                        selectedRadioValue2={selectedRadioValue2}
                        handleRadioChange2={handleRadioChange2}
                        handleRadioClick2={handleRadioClick2}

                        setValue2={selectedBoolean}
                        handleRadioChange3={handleRadioChange3}
                        handleRadioClick3={handleRadioClick3}

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


