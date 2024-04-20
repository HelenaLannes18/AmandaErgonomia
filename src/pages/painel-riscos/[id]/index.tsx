
import { CardControleDosRiscos, CardIdentificacaoDePerigos } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { HttpMethod } from "../../../../types";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../lib/fetcher"
import { useDebounce } from "use-debounce";
import { Loader } from "../../../components/Loader";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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


interface RiscoData {
    nameEmpresa?: string;
    images: object[],
    sugestacao_recomendacao: string,
    medidas_controle: string,
    necessita_aet: boolean,
    classificacao_riscos_probabilidade: string,
    classificacao_riscos_continuacao: string,
    classificacao_riscos_severidade: string,
    classificacao_riscos_classificacao: string,
    areaavaliadaName: string,
    unidadeName: string,
    empresaId?: string;
}

interface ImageData {
    url: string;
    images: any;
}


interface Option {
    readonly label: string;
    readonly value: string;
}

export default function IdentificacaoDeRiscos() {
    const router = useRouter();
    const { id: riscoId } = router.query;
    const { empresaId } = router.query;

    const { data: risco, isValidating } = useSWR<RiscoData>(
        router.isReady && `/api/risco?riscoId=${riscoId}&empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const { data: foto } = useSWR<ImageData>(
        router.isReady && `/api/image?riscoId=08181477-7954-4580-b6b2-1a61c7f48588`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const [selectedOption2, setSelectedOption2] = useState(risco?.empresaId);

    useEffect(() => {
        if (risco?.empresaId !== undefined) {
            setSelectedOption2(risco.empresaId);
        }
    }, [risco?.empresaId]);

    const [data, setData] = useState<RiscoData>({
        images: [], // Initialize as empty array
        sugestacao_recomendacao: "",
        medidas_controle: "",
        necessita_aet: false,
        classificacao_riscos_probabilidade: "",
        classificacao_riscos_continuacao: "",
        classificacao_riscos_severidade: "",
        classificacao_riscos_classificacao: "",
        areaavaliadaName: "",
        unidadeName: "",
    });

    useEffect(() => {
        if (risco) {
            setData({
                ...data,
                images: risco.images ?? [], // Set images from risco data
                sugestacao_recomendacao: risco.sugestacao_recomendacao ?? "",
                medidas_controle: risco.medidas_controle ?? "",
                necessita_aet: risco.necessita_aet ?? false,
                classificacao_riscos_probabilidade: risco.classificacao_riscos_probabilidade ?? "",
                classificacao_riscos_continuacao: risco.classificacao_riscos_continuacao ?? "",
                classificacao_riscos_severidade: risco.classificacao_riscos_severidade ?? "",
                classificacao_riscos_classificacao: risco.classificacao_riscos_classificacao ?? "",
                areaavaliadaName: risco.areaavaliadaName ?? "",
                unidadeName: risco.unidadeName ?? "",
            });
        }
    }, [risco]);

    const [loading, setLoading] = useState(false);
    const [listar, setListar] = useState(false);
    const [empresaOptions, setEmpresaOptions] = useState([]);
    const [necessitaaetString, setNecessitaaetString] = useState("");

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

    const [savedState, setSavedState] = useState(
        risco
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(risco.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(risco.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(risco.updatedAt))}`
            : "Saving changes..."
    );

    const [debouncedData] = useDebounce(data, 1000);

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
        value: label.toLowerCase().replace(/\W/g, ""),
    });

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>([]);
    const [valueSelect, setValueSelect] = useState<Option[] | null>(null);

    //unidade
    const [isLoading2, setIsLoading2] = useState(false);
    const [options2, setOptions2] = useState<Option[]>([]);
    const [valueSelect2, setValueSelect2] = useState<Option[] | null>(null);

    //classificacao_riscos_probabilidade
    const [isLoading3, setIsLoading3] = useState(false);
    const [options3, setOptions3] = useState<Option[]>([]);
    const [valueSelect3, setValueSelect3] = useState<Option[] | null>(null);

    //classificacao_riscos_continuacao
    const [isLoading4, setIsLoading4] = useState(false);
    const [options4, setOptions4] = useState<Option[]>([]);
    const [valueSelect4, setValueSelect4] = useState<Option[] | null>(null);

    //classificacao_riscos_severidade
    const [isLoading5, setIsLoading5] = useState(false);
    const [options5, setOptions5] = useState<Option[]>([]);
    const [valueSelect5, setValueSelect5] = useState<Option[] | null>(null);

    //classificacao_riscos_classificacao
    const [isLoading6, setIsLoading6] = useState(false);
    const [options6, setOptions6] = useState<Option[]>([]);
    const [valueSelect6, setValueSelect6] = useState<Option[] | null>(null);

    const [selectedBoolean, setSelectedBoolean] = useState('')


    const handleRadioClick3 = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation();
    };

    const handleRadioChange3 = (value: boolean) => {
        setData({
            ...data,
            necessita_aet: value,
        });
        setNecessitaaetString(value ? "true" : "false");
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
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.areaavaliadaName.includes(',')) {
                    const areaavaliadaNames = risco.areaavaliadaName.split(',');
                    const newOptions = areaavaliadaNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions(newOptions);
                    setValueSelect(newOptions);
                } else {
                    const option = {
                        label: risco.areaavaliadaName,
                        value: risco.areaavaliadaName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions([option]);
                    setValueSelect([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);

    useEffect(() => {
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.unidadeName.includes(',')) {
                    const unidadeNames = risco.unidadeName.split(',');
                    const newOptions = unidadeNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions2(newOptions);
                    setValueSelect2(newOptions);
                } else {
                    const option = {
                        label: risco.unidadeName,
                        value: risco.unidadeName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions2([option]);
                    setValueSelect2([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);

    useEffect(() => {
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.classificacao_riscos_probabilidade.includes(',')) {
                    const classificacao_riscos_probabilidades = risco.classificacao_riscos_probabilidade.split(',');
                    const newOptions = classificacao_riscos_probabilidades.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions3(newOptions);
                    setValueSelect3(newOptions);
                } else {
                    const option = {
                        label: risco.classificacao_riscos_probabilidade,
                        value: risco.classificacao_riscos_probabilidade.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions3([option]);
                    setValueSelect3([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);

    useEffect(() => {
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.classificacao_riscos_continuacao.includes(',')) {
                    const classificacao_riscos_continuacaos = risco.classificacao_riscos_continuacao.split(',');
                    const newOptions = classificacao_riscos_continuacaos.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions4(newOptions);
                    setValueSelect4(newOptions);
                } else {
                    const option = {
                        label: risco.classificacao_riscos_continuacao,
                        value: risco.classificacao_riscos_continuacao.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions4([option]);
                    setValueSelect4([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);

    useEffect(() => {
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.classificacao_riscos_severidade.includes(',')) {
                    const classificacao_riscos_severidades = risco.classificacao_riscos_severidade.split(',');
                    const newOptions = classificacao_riscos_severidades.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions5(newOptions);
                    setValueSelect5(newOptions);
                } else {
                    const option = {
                        label: risco.classificacao_riscos_severidade,
                        value: risco.classificacao_riscos_severidade.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions5([option]);
                    setValueSelect5([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);

    useEffect(() => {
        if (risco) {
            const timeout = setTimeout(() => {
                if (risco.classificacao_riscos_classificacao.includes(',')) {
                    const classificacao_riscos_classificacaos = risco.classificacao_riscos_classificacao.split(',');
                    const newOptions = classificacao_riscos_classificacaos.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions6(newOptions);
                    setValueSelect6(newOptions);
                } else {
                    const option = {
                        label: risco.classificacao_riscos_classificacao,
                        value: risco.classificacao_riscos_classificacao.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions6([option]);
                    setValueSelect6([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [risco]);


    const saveChanges = useCallback(
        async (data: RiscoData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/risco?riscoId=${riscoId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: riscoId,
                        images: data.images,
                        sugestacao_recomendacao: data.sugestacao_recomendacao,
                        medidas_controle: data.medidas_controle,
                        necessita_aet: selectedBoolean,
                        classificacao_riscos_probabilidade: valueSelect3?.map(item => item.value),
                        classificacao_riscos_continuacao: valueSelect4?.map(item => item.value),
                        classificacao_riscos_severidade: valueSelect5?.map(item => item.value),
                        classificacao_riscos_classificacao: valueSelect6?.map(item => item.value),
                        areaavaliadaName: valueSelect?.map(item => item.value),
                        unidadeName: valueSelect2?.map(item => item.value),
                        empresaId: selectedOption2,
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
                    // toast.error("Failed to save");
                }
            } catch (error) {
                console.error(error);
            }
        },
        [riscoId]
    );

    useEffect(() => {
        if (debouncedData.images) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.sugestacao_recomendacao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.medidas_controle) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.necessita_aet) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.areaavaliadaName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidadeName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.classificacao_riscos_probabilidade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.classificacao_riscos_continuacao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.classificacao_riscos_severidade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.classificacao_riscos_classificacao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (data.necessita_aet == true) {
            setNecessitaaetString("true")
        } else {
            setNecessitaaetString("false")
        }
    }, [data.necessita_aet])


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
            const response = await fetch(`/api/risco?riscoId=${riscoId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: riscoId,
                    images: data.images, // Send the updated images
                    sugestacao_recomendacao: data.sugestacao_recomendacao,
                    medidas_controle: data.medidas_controle,
                    necessita_aet: data.necessita_aet,
                    classificacao_riscos_probabilidade: valueSelect3?.map((item) => item.value),
                    classificacao_riscos_continuacao: valueSelect4?.map((item) => item.value),
                    classificacao_riscos_severidade: valueSelect5?.map((item) => item.value),
                    classificacao_riscos_classificacao: valueSelect6?.map((item) => item.value),
                    areaavaliadaName: valueSelect?.map((item) => item.value),
                    unidadeName: valueSelect2?.map((item) => item.value),
                    empresaId: selectedOption2,
                }),
            });

            if (response.ok) {
                mutate(`/api/risco?riscoId=${riscoId}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPublishing(false);
            toast.success("risco editada com sucesso!");
            // router.back();
        }
    }

    const deleteImage = (url: string) => {
        setData({
            ...data,
            images: data.images.filter((image) => image.url !== url),
        });
    };

    if (isValidating) {
        return <Loader />;
    } return (
        <form>
            <Main title={""} title2={"Identificação dos Riscos"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>
                <CardControleDosRiscos

                    type1={"sugestacao_recomendacao"}
                    onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({
                            ...data,
                            sugestacao_recomendacao: e.target.value,
                        })
                    }
                    name1={"sugestacao_recomendacao"} value1={data.sugestacao_recomendacao}

                    type6={"medidas_controle"}
                    onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({
                            ...data,
                            medidas_controle: e.target.value,
                        })
                    }
                    name6={"medidas_controle"} value6={data.medidas_controle}

                    type7={"classificacao_riscos_probabilidade"}
                    onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                        setData({
                            ...data,
                            classificacao_riscos_probabilidade: e.target.value,
                        })
                    }
                    name7={"classificacao_riscos_probabilidade"} value7={data.classificacao_riscos_probabilidade}

                    valueEmpresa={selectedOption2}
                    onChangeEmpresa={(e: any) => {
                        setSelectedOption2(e.target.value);
                    }}
                    empresaOptions={empresaOptions}


                    selectedRadioValue={necessitaaetString}
                    handleRadioChange={handleRadioChange3}

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

                    isLoading3={isLoading3}
                    //@ts-ignore
                    onChangeSelect3={(newValue) => setValueSelect3(newValue)}
                    handleCreate3={handleCreate3}
                    options3={options3}
                    valueSelect3={valueSelect3}

                    isLoading4={isLoading4}
                    //@ts-ignore
                    onChangeSelect4={(newValue) => setValueSelect4(newValue)}
                    handleCreate4={handleCreate4}
                    options4={options4}
                    valueSelect4={valueSelect4}

                    isLoading5={isLoading5}
                    //@ts-ignore
                    onChangeSelect5={(newValue) => setValueSelect5(newValue)}
                    handleCreate5={handleCreate5}
                    options5={options5}
                    valueSelect5={valueSelect5}

                    isLoading6={isLoading6}
                    //@ts-ignore
                    onChangeSelect6={(newValue) => setValueSelect6(newValue)}
                    handleCreate6={handleCreate6}
                    options6={options6}
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
                    // onClickImage={handleDeleteClick}
                    onClick={async () => {
                        await publish();
                    }}

                />

            </Main>
        </form>
    )
}

