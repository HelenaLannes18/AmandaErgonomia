
import { CardIdentificacaoDePerigos } from "../../../components/Card"
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

interface PerigoData {
    fase_levantamento_preliminar: string
    aspectos_ergonomico: string
    fator: string
    fontes: string
    ha_pergios_externos: string
    possiveis_lesoes: string
    nameEmpresa?: string
    areaavaliadaName: string;
    unidadeName: string;
    empresaId?: string;
}


interface Option {
    readonly label: string;
    readonly value: string;
}

export default function IdentificacaoDePerigos() {
    const router = useRouter()
    const { id: perigoId } = router.query

    const { data: perigo, isValidating } = useSWR<PerigoData>(
        router.isReady && `/api/perigo?perigoId=${perigoId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );


    const [selectedOption2, setSelectedOption2] = useState(perigo?.empresaId);

    useEffect(() => {
        if (perigo?.empresaId !== undefined) {
            setSelectedOption2(perigo.empresaId);
        }
    }, [perigo?.empresaId]);

    const [savedState, setSavedState] = useState(
        perigo
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(perigo.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(perigo.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(perigo.updatedAt))}`
            : "Saving changes..."
    );

    const [data, setData] = useState<PerigoData>({
        fase_levantamento_preliminar: "",
        aspectos_ergonomico: "",
        fator: "",
        fontes: "",
        ha_pergios_externos: "",
        possiveis_lesoes: "",
        areaavaliadaName: "",
        unidadeName: "",
    })

    useEffect(() => {
        if (perigo) {
            setData({
                fase_levantamento_preliminar: perigo.fase_levantamento_preliminar ?? "",
                aspectos_ergonomico: perigo.aspectos_ergonomico ?? "",
                fator: perigo.fator ?? "",
                fontes: perigo.fontes ?? "",
                ha_pergios_externos: perigo.ha_pergios_externos ?? "",
                possiveis_lesoes: perigo.possiveis_lesoes ?? "",
                areaavaliadaName: perigo.areaavaliadaName ?? "",
                unidadeName: perigo.unidadeName ?? "",
            });

        }
    }, [perigo]);

    const handleRadioChange3 = (value: string) => {
        setData({
            ...data,
            ha_pergios_externos: value,
        });
    };


    const handleRadioChange = (value: string) => {
        setData({
            ...data,
            fase_levantamento_preliminar: value,
        });
    };



    const handleRadioChange2 = (value: string) => {
        setData({
            ...data,
            aspectos_ergonomico: value,
        });
    };

    const [listar, setListar] = useState(false)
    const [empresaOptions, setEmpresaOptions] = useState([]);


    console.log("selectedOption", selectedOption2)

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
        if (perigo) {
            const timeout = setTimeout(() => {
                if (perigo.areaavaliadaName.includes(',')) {
                    const areaavaliadaNames = perigo.areaavaliadaName.split(',');
                    const newOptions = areaavaliadaNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions(newOptions);
                    setValueSelect(newOptions);
                } else {
                    const option = {
                        label: perigo.areaavaliadaName,
                        value: perigo.areaavaliadaName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions([option]);
                    setValueSelect([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [perigo]);

    useEffect(() => {
        if (perigo) {
            const timeout = setTimeout(() => {
                if (perigo.unidadeName.includes(',')) {
                    const unidadeNames = perigo.unidadeName.split(',');
                    const newOptions = unidadeNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions2(newOptions);
                    setValueSelect2(newOptions);
                } else {
                    const option = {
                        label: perigo.unidadeName,
                        value: perigo.unidadeName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions2([option]);
                    setValueSelect2([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [perigo]);

    const saveChanges = useCallback(
        async (data: PerigoData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/perigo?perigoId=${perigoId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: perigoId,
                        fase_levantamento_preliminar: data.fase_levantamento_preliminar,
                        aspectos_ergonomico: data.aspectos_ergonomico,
                        fator: data.fator,
                        fontes: data.fontes,
                        ha_pergios_externos: data.ha_pergios_externos,
                        possiveis_lesoes: data.possiveis_lesoes,
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
                    toast.error("Failed to save");
                }
            } catch (error) {
                console.error(error);
            }
        },
        [perigoId]
    );

    useEffect(() => {
        if (debouncedData.fase_levantamento_preliminar) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.aspectos_ergonomico) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.fator) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.areaavaliadaName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidadeName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ha_pergios_externos) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.possiveis_lesoes) saveChanges(debouncedData);
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
            const response = await fetch(`/api/perigo?perigoId=${perigoId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: perigoId,
                    fase_levantamento_preliminar: data.fase_levantamento_preliminar,
                    aspectos_ergonomico: data.aspectos_ergonomico,
                    fator: data.fator,
                    fontes: data.fontes,
                    ha_pergios_externos: data.ha_pergios_externos,
                    possiveis_lesoes: data.possiveis_lesoes,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                    empresaId: selectedOption2,

                }),

            }
            );

            if (response.ok) {
                mutate(`/api/perigo?perigoId=${perigoId}`);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setPublishing(false);
            toast.success("perigo editada com sucesso!")
            router.back();
        }
    }

    if (isValidating)
        return (

            <Loader />

        );
    return (
        <Main title={""} title2={"Identificação dos Perigos"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardIdentificacaoDePerigos
                type={"submit"}


                type6={"fator"}
                onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        fator: e.target.value,
                    })
                }
                name6={"fator"} value6={data.fator}

                type9={"possiveis_lesoes"}
                onChange9={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        possiveis_lesoes: e.target.value,
                    })
                }
                name9={"possiveis_lesoes"} value9={data.possiveis_lesoes}

                type10={"fontes"}
                onChange10={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        fontes: e.target.value,
                    })
                }
                name10={"fontes"} value10={data.fontes}

                valueEmpresa={selectedOption2}
                onChangeEmpresa={(e: any) => {
                    setSelectedOption2(e.target.value);
                }}
                empresaOptions={empresaOptions}
                perigoempresaId={selectedOption2}

                selectedRadioValue={data.fase_levantamento_preliminar}
                handleRadioChange={handleRadioChange}

                selectedRadioValue2={data.aspectos_ergonomico}
                handleRadioChange2={handleRadioChange2}

                setValue2={data.ha_pergios_externos}
                handleRadioChange3={handleRadioChange3}

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

                onClick={async () => {
                    await publish();
                }}
            />
        </Main>
    )
}

