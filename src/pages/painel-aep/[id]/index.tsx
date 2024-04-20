import { CardAvaliacao } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { HttpMethod } from "../../../../types";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../lib/fetcher"
import { useDebounce } from "use-debounce";
import { Loader } from "../../../components/Loader";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import axios from "axios";

interface ErgonomicaData {
    nameEmpresa?: string
    data_elaboracao: string
    revisao_documento: string
    jornada_trabalho: string
    cargo: string
    tipo_atividade: string
    variacao_turno: string
    trabalho_noturno: string
    descricao_ambiente_trabalho: string
    numero_trabalhadores_expostos: string
    tarefa_prescrita: string
    tarefa_real: string
    consideracoes_avaliador: string
    posto_trabalho: string
    ergonomista_responsavel: string
    areaavaliadaName: string;
    unidadeName: string;
    empresaId?: string;
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export default function AvaliacaoPreliminar() {
    const router = useRouter()
    const { id: ergonomicaId } = router.query
    const { empresaId } = router.query;

    const { data: ergonomica, isValidating } = useSWR<ErgonomicaData>(
        router.isReady && `/api/aep?ergonomicaId=${ergonomicaId}&empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    )

    const [selectedOption2, setSelectedOption2] = useState(ergonomica?.empresaId);

    useEffect(() => {
        if (ergonomica?.empresaId !== undefined) {
            setSelectedOption2(ergonomica.empresaId);
        }
    }, [ergonomica?.empresaId]);


    const handleRadioChange = (value: string) => {
        setData({
            ...data,
            variacao_turno: value,
        });
    };



    const handleRadioChange2 = (value: string) => {
        setData({
            ...data,
            trabalho_noturno: value,
        });
    };

    const [listar, setListar] = useState(false)
    const [empresaOptions, setEmpresaOptions] = useState([]);

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
        ergonomica
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(ergonomica.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(ergonomica.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(ergonomica.updatedAt))}`
            : "Saving changes..."
    );


    const [data, setData] = useState<ErgonomicaData>({
        data_elaboracao: "",
        revisao_documento: "",
        jornada_trabalho: "",
        cargo: "",
        tipo_atividade: "",
        variacao_turno: "",
        trabalho_noturno: "",
        descricao_ambiente_trabalho: "",
        numero_trabalhadores_expostos: "",
        tarefa_prescrita: "",
        tarefa_real: "",
        consideracoes_avaliador: "",
        posto_trabalho: "",
        ergonomista_responsavel: "",
        areaavaliadaName: "",
        unidadeName: "",
    })

    useEffect(() => {
        if (ergonomica)
            setData({
                data_elaboracao: ergonomica.data_elaboracao ?? "",
                revisao_documento: ergonomica.revisao_documento ?? "",
                jornada_trabalho: ergonomica.jornada_trabalho ?? "",
                cargo: ergonomica.cargo ?? "",
                tipo_atividade: ergonomica.tipo_atividade ?? "",
                variacao_turno: ergonomica.variacao_turno ?? "",
                trabalho_noturno: ergonomica.trabalho_noturno ?? "",
                descricao_ambiente_trabalho: ergonomica.descricao_ambiente_trabalho ?? "",
                numero_trabalhadores_expostos: ergonomica.numero_trabalhadores_expostos ?? "",
                tarefa_prescrita: ergonomica.tarefa_prescrita ?? "",
                tarefa_real: ergonomica.tarefa_real ?? "",
                consideracoes_avaliador: ergonomica.consideracoes_avaliador ?? "",
                posto_trabalho: ergonomica.posto_trabalho ?? "",
                ergonomista_responsavel: ergonomica.ergonomista_responsavel ?? "",
                areaavaliadaName: ergonomica.areaavaliadaName ?? "",
                unidadeName: ergonomica.unidadeName ?? "",
            });
    }, [ergonomica]);

    const [debouncedData] = useDebounce(data, 1000)

    const formatDateForAPI = (dateString: any) => {
        const [date, time] = dateString.split('T');
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
    }

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
        if (ergonomica) {
            const timeout = setTimeout(() => {
                if (ergonomica.areaavaliadaName.includes(',')) {
                    const areaavaliadaNames = ergonomica.areaavaliadaName.split(',');
                    const newOptions = areaavaliadaNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions(newOptions);
                    setValueSelect(newOptions);
                } else {
                    const option = {
                        label: ergonomica.areaavaliadaName,
                        value: ergonomica.areaavaliadaName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions([option]);
                    setValueSelect([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [ergonomica]);

    useEffect(() => {
        if (ergonomica) {
            const timeout = setTimeout(() => {
                if (ergonomica.unidadeName.includes(',')) {
                    const unidadeNames = ergonomica.unidadeName.split(',');
                    const newOptions = unidadeNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions2(newOptions);
                    setValueSelect2(newOptions);
                } else {
                    const option = {
                        label: ergonomica.unidadeName,
                        value: ergonomica.unidadeName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions2([option]);
                    setValueSelect2([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [ergonomica]);


    const saveChanges = useCallback(
        async (data: ErgonomicaData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/aep?ergonomicaId=${ergonomicaId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: ergonomicaId,
                        data_elaboracao: formatDateForAPI(data.data_elaboracao),
                        revisao_documento: formatDateForAPI(data.revisao_documento),
                        jornada_trabalho: data.jornada_trabalho,
                        cargo: data.cargo,
                        tipo_atividade: data.tipo_atividade,
                        variacao_turno: data.variacao_turno,
                        trabalho_noturno: data.trabalho_noturno,
                        descricao_ambiente_trabalho: data.descricao_ambiente_trabalho,
                        numero_trabalhadores_expostos: data.numero_trabalhadores_expostos,
                        tarefa_prescrita: data.tarefa_prescrita,
                        tarefa_real: data.tarefa_real,
                        consideracoes_avaliador: data.consideracoes_avaliador,
                        posto_trabalho: data.posto_trabalho,
                        ergonomista_responsavel: data.ergonomista_responsavel,
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
        [ergonomicaId]
    );

    useEffect(() => {
        if (debouncedData.data_elaboracao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.revisao_documento) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.jornada_trabalho) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.cargo) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.tipo_atividade) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.variacao_turno) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);


    useEffect(() => {
        if (debouncedData.trabalho_noturno) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.descricao_ambiente_trabalho) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.tarefa_prescrita) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.tarefa_real) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.consideracoes_avaliador) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.posto_trabalho) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.ergonomista_responsavel) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.areaavaliadaName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidadeName) saveChanges(debouncedData);
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

    useEffect(() => {
        if (ergonomica) {
            // Formatando a data de elaboração
            const formattedDataElaboracao = new Date(ergonomica.data_elaboracao).toISOString().slice(0, 16);
            setData(prevData => ({ ...prevData, data_elaboracao: formattedDataElaboracao }));

            // Formatando a data de revisão
            const formattedRevisaoDocumento = new Date(ergonomica.revisao_documento).toISOString().slice(0, 16);
            setData(prevData => ({ ...prevData, revisao_documento: formattedRevisaoDocumento }));
        }
    }, [ergonomica]);

    async function publish() {
        setPublishing(true);

        try {
            const response = await fetch(`/api/aep?ergonomicaId=${ergonomicaId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: ergonomicaId,
                    data_elaboracao: formatDateForAPI(data.data_elaboracao),
                    revisao_documento: formatDateForAPI(data.revisao_documento),
                    jornada_trabalho: data.jornada_trabalho,
                    cargo: data.cargo,
                    tipo_atividade: data.tipo_atividade,
                    variacao_turno: data.variacao_turno,
                    trabalho_noturno: data.trabalho_noturno,
                    descricao_ambiente_trabalho: data.descricao_ambiente_trabalho,
                    numero_trabalhadores_expostos: data.numero_trabalhadores_expostos,
                    tarefa_prescrita: data.tarefa_prescrita,
                    tarefa_real: data.tarefa_real,
                    consideracoes_avaliador: data.consideracoes_avaliador,
                    posto_trabalho: data.posto_trabalho,
                    ergonomista_responsavel: data.ergonomista_responsavel,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                    empresaId: selectedOption2,
                }),

            }
            );

            if (response.ok) {
                mutate(`/api/empresa?ergonomica=${ergonomicaId}`);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setPublishing(false);
            toast.success("Empresa editada com sucesso!")
            router.push(`/painel-aep/painel?empresaId=${empresaId}`)
        }
    }

    if (isValidating)
        return (

            <Loader />

        );



    return (
        <Main title={""} title2={"Avaliação Ergonômica Preliminar"} w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardAvaliacao
                type1={"datetime-local"}
                onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        data_elaboracao: e.target.value,
                    })
                }
                name1={"data_elaboracao"}
                value1={data.data_elaboracao}
                // Definindo a data inicial
                defaultValue1={data.data_elaboracao}

                type2={"datetime-local"}
                onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        data_elaboracao: e.target.value,
                    })
                }
                name2={"data_elaboracao"}
                value2={data.data_elaboracao}
                // Definindo a data inicial


                type3={"datetime-local"}
                onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        revisao_documento: e.target.value,
                    })
                }
                name3={"revisao_documento"}
                value3={data.revisao_documento}
                defaultValue2={data.revisao_documento}

                type4={"cargo"}
                onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        cargo: e.target.value,
                    })
                }
                name4={"cargo"}
                value4={data.cargo}

                type5={"tipo_atividade"}
                onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        tipo_atividade: e.target.value,
                    })
                }
                name5={"tipo_atividade"}
                value5={data.tipo_atividade}

                type6={"jornada_trabalho"}
                onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        jornada_trabalho: e.target.value,
                    })
                }
                name6={"jornada_trabalho"}
                value6={data.jornada_trabalho}

                type7={"numero_trabalhadores_expostos"}
                onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        numero_trabalhadores_expostos: e.target.value,
                    })
                }
                name7={"numero_trabalhadores_expostos"}
                value7={data.numero_trabalhadores_expostos}

                type8={"descricao_ambiente_trabalho"}
                onChange8={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        descricao_ambiente_trabalho: e.target.value,
                    })
                }
                name8={"descricao_ambiente_trabalho"}
                value8={data.descricao_ambiente_trabalho}

                type9={"tarefa_prescrita"}
                onChange9={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        tarefa_prescrita: e.target.value,
                    })
                }
                name9={"tarefa_prescrita"}
                value9={data.tarefa_prescrita}

                type10={"tarefa_real"}
                onChange10={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        tarefa_real: e.target.value,
                    })
                }
                name10={"tarefa_real"}
                value10={data.tarefa_real}

                type11={"consideracoes_avaliador"}
                onChange11={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        consideracoes_avaliador: e.target.value,
                    })
                }
                name11={"consideracoes_avaliador"}
                value11={data.consideracoes_avaliador}

                type12={"tipo_atividade"}
                onChange12={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        tipo_atividade: e.target.value,
                    })
                }
                name12={"tipo_atividade"}
                value12={data.tipo_atividade}

                type13={"posto_trabalho"}
                onChange13={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        posto_trabalho: e.target.value,
                    })
                }
                name13={"posto_trabalho"}
                value13={data.posto_trabalho}

                type14={"ergonomista_responsavel"}
                onChange14={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        ergonomista_responsavel: e.target.value,
                    })
                }
                name14={"ergonomista_responsavel"}
                value14={data.ergonomista_responsavel}

                valueEmpresa={selectedOption2}
                onChangeEmpresa={(e: any) => {
                    setSelectedOption2(e.target.value);
                }}
                empresaOptions={empresaOptions}

                selectedRadioValue={data.variacao_turno}
                handleRadioChange={handleRadioChange}

                selectedRadioValue2={data.trabalho_noturno}
                handleRadioChange2={handleRadioChange2}

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