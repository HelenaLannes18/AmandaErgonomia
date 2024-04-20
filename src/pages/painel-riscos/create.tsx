import { CardControleDosRiscos } from "../../components/Card"
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
import ImageUpload from "../../components/image-upload";

const formSchema = z.object({
    name: z.string(),
    images: z.object({ url: z.string() }).array(),
    sugestacao_recomendacao: z.string(),
    medidas_controle: z.string(),
    necessita_aet: z.boolean().nullable(),
    classificacao_riscos_probabilidade: z.string(),
    classificacao_riscos_continuacao: z.string(),
    classificacao_riscos_severidade: z.string(),
    classificacao_riscos_classificacao: z.string(),
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


export default function ControleDosRiscos() {
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
    const [loading, setLoading] = useState(false)

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

    const [selectedRadioValue, setSelectedRadioValue] = useState("");

    const handleRadioChange = (value: string) => {
        setSelectedRadioValue(value);

    };

    const handleRadioClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sugestacao_recomendacao: "",
            medidas_controle: "",
            necessita_aet: false,
            classificacao_riscos_probabilidade: "",
            classificacao_riscos_continuacao: "",
            classificacao_riscos_severidade: "",
            classificacao_riscos_classificacao: "",
            images: [],
            areaavaliadaName: "",
            unidadeName: "",
        }
    })

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const defaultOptions3 = [
        createOption('Exposição a níveis muito baixos'),
        createOption('Exposição baixa'),
        createOption('Exposição moderada'),
        createOption('Exposição excessiva'),
        createOption('Exposição muito excessiva'),
    ];

    const defaultOptions4 = [
        createOption('Opção 4'),
    ];

    const defaultOptions5 = [
        createOption('Leve'),
        createOption('Menor'),
        createOption('Moderada'),
        createOption('Maior'),
        createOption('Catastrófica'),
    ];

    const defaultOptions6 = [
        createOption('Controle excelente'),
        createOption('Controle em conformidade legal'),
        createOption('Controle com pequenas deficiências'),
        createOption('Controle deficiente'),
        createOption('Controle inexistente'),
    ];


    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [valueSelect, setValueSelect] = useState<Option[] | null>([]);

    //unidade
    const [isLoading2, setIsLoading2] = useState(false);
    const [options2, setOptions2] = useState<Option[]>([]);
    const [valueSelect2, setValueSelect2] = useState<Option[] | null>([]);

    const [isLoading3, setIsLoading3] = useState(false);
    const [options3, setOptions3] = useState<Option[]>([]);
    const [valueSelect3, setValueSelect3] = useState<Option[] | null>([]);

    const [isLoading4, setIsLoading4] = useState(false);
    const [options4, setOptions4] = useState<Option[]>([]);
    const [valueSelect4, setValueSelect4] = useState<Option[] | null>([]);

    const [isLoading5, setIsLoading5] = useState(false);
    const [options5, setOptions5] = useState<Option[]>([]);
    const [valueSelect5, setValueSelect5] = useState<Option[] | null>([]);

    const [isLoading6, setIsLoading6] = useState(false);
    const [options6, setOptions6] = useState<Option[]>([]);
    const [valueSelect6, setValueSelect6] = useState<Option[] | null>([]);

    const [selectedBoolean, setSelectedBoolean] = useState('')

    const handleRadioChange3 = (value: string) => {
        setSelectedBoolean(value);

    };

    const handleRadioClick3 = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };


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

    const handleCreate3 = (inputValue: string) => {
        setIsLoading3(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading3(false);
            setOptions3((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect3((prev) => [...prev, newOption]);
        }, 1000);
    }

    const handleCreate4 = (inputValue: string) => {
        setIsLoading4(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading4(false);
            setOptions4((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect4((prev) => [...prev, newOption]);
        }, 1000);
    }

    const handleCreate5 = (inputValue: string) => {
        setIsLoading5(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading5(false);
            setOptions5((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect5((prev) => [...prev, newOption]);
        }, 1000);
    }

    const handleCreate6 = (inputValue: string) => {
        setIsLoading6(true);
        setTimeout(() => {
            const newOption = createOption(inputValue);
            setIsLoading6(false);
            setOptions6((prev) => [...prev, newOption]);
            //@ts-ignore
            setValueSelect6((prev) => [...prev, newOption]);
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
        // console.log(values)
        try {
            const response = await fetch("/api/risco", {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sugestacao_recomendacao: values.sugestacao_recomendacao,
                    images: values.images,
                    medidas_controle: values.medidas_controle,
                    necessita_aet: selectedBoolean,
                    classificacao_riscos_probabilidade: valueSelect3?.map(item => item.value),
                    classificacao_riscos_continuacao: valueSelect4?.map(item => item.value),
                    classificacao_riscos_severidade: valueSelect5?.map(item => item.value),
                    classificacao_riscos_classificacao: valueSelect6?.map(item => item.value),
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                    empresaId: selectedOption2

                })
            })
            toast.success("Risco Cadastrado!")
            router.back()
            // router.push('/painel-riscos')
            console.log(response.json())

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function deleteFoto(fotoId: string) {
        // setDeletingFoto(true)
        try {
            const response = await fetch(`/api/image?imageId=${fotoId}`, {
                method: HttpMethod.DELETE,
            });
            window.location.reload()

        } catch (error) {
            console.error(error);
        } finally {
            // setDeletingFoto(false)
            window.location.reload()
        }
    }

    const handleDeleteClick = (iba: string) => {
        if (!window.confirm('Tem certeza que deseja excluir esse foto?')) {
            return;
        }
        //@ts-ignore
        deleteFoto(iba);
        toast.success("Foto deletada com sucesso!")
    };


    const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
        console.error(errors)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Main title={""} title2={"Controle dos Riscos"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>
                <CardControleDosRiscos
                    type={"submit"}

                    type1={"sugestacao_recomendacao"}
                    isInvalid1={!!formState.errors.sugestacao_recomendacao}
                    register1={register("sugestacao_recomendacao")}
                    error1={formState.errors.sugestacao_recomendacao?.message}

                    type6={"medidas_controle"}
                    isInvalid6={!!formState.errors.medidas_controle}
                    register6={register("medidas_controle")}
                    error6={formState.errors.medidas_controle?.message}

                    type7={"classificacao_riscos_probabilidade"}
                    isInvalid7={!!formState.errors.classificacao_riscos_probabilidade}
                    register7={register("classificacao_riscos_probabilidade")}
                    error7={formState.errors.classificacao_riscos_probabilidade?.message}

                    isInvalidEmpresa={!!formState.errors.name}
                    registerEmpresa={register("name")}
                    valueEmpresa={selectedOption2}
                    //@ts-ignore
                    onChangeEmpresa={(e) => setSelectedOption2(e.target.value)}
                    empresaOptions={empresaOptions}

                    selectedRadioValue={selectedBoolean}
                    handleRadioChange={handleRadioChange3}
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
                    // handleRadioClick={handleRadioClick}

                    isLoading3={isLoading3}
                    //@ts-ignore
                    onChangeSelect3={(newValue) => setValueSelect3(newValue)}
                    handleCreate3={handleCreate3}
                    options3={defaultOptions3}
                    valueSelect3={valueSelect3}

                    isLoading4={isLoading4}
                    //@ts-ignore
                    onChangeSelect4={(newValue) => setValueSelect4(newValue)}
                    handleCreate4={handleCreate4}
                    options4={defaultOptions4}
                    valueSelect4={valueSelect4}

                    isLoading5={isLoading5}
                    //@ts-ignore
                    onChangeSelect5={(newValue) => setValueSelect5(newValue)}
                    handleCreate5={handleCreate5}
                    options5={defaultOptions5}
                    valueSelect5={valueSelect5}

                    isLoading6={isLoading6}
                    //@ts-ignore
                    onChangeSelect6={(newValue) => setValueSelect6(newValue)}
                    handleCreate6={handleCreate6}
                    options6={defaultOptions6}
                    valueSelect6={valueSelect6}

                    valueImage={form.getValues('images').map((image) => image.url)}
                    disabledImage={loading}
                    onChangeImage={(url: any) => {
                        const updatedImages = [...form.getValues('images'), { url }];
                        form.setValue('images', updatedImages);
                    }}
                    onRemoveImage={(url: any) => {
                        const updatedImages = form.getValues('images').filter((current) => current.url !== url);
                        form.setValue('images', updatedImages);
                    }}
                    photosImage={form.watch('images')}
                    onClickImage={handleDeleteClick}
                />


            </Main>
        </form>
    )
}