import { CardCadastroInicial, CardPlanodeAcao } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { useRouter } from "next/router"

import toast from "react-hot-toast";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { HttpMethod } from "../../../../types";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../lib/fetcher"
import { useDebounce } from "use-debounce";
import { Loader } from "../../../components/Loader";
import axios from "axios";

interface PlanoData {
    o_que_fazer: string,
    legislacao: string,
    origem_demanda: string,
    onde: string,
    porque: string,
    responsavel: string,
    quando: string,
    prazo: string,
    previsao_termino: string,
    termino_real: string,
    status: string,
    evidencia: string,
    areaavaliadaName: string,
    unidadeName: string,
    nameEmpresa?: string,
    empresaId?: string;
}

interface Option {
    readonly label: string;
    readonly value: string;
}


export default function Home() {
    const router = useRouter()
    const { id: planoId } = router.query
    const { empresaId } = router.query;

    const { data: plano, isValidating } = useSWR<PlanoData>(
        router.isReady && `/api/plano?planoId=${planoId}&empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const [selectedOption2, setSelectedOption2] = useState(plano?.empresaId);

    useEffect(() => {
        if (plano?.empresaId !== undefined) {
            setSelectedOption2(plano.empresaId);
        }
    }, [plano?.empresaId]);

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
        plano
            ? `Last saved at ${Intl.DateTimeFormat("en", { month: "short" }).format(
                //@ts-ignore
                new Date(plano.updatedAt)
            )} ${Intl.DateTimeFormat("en", { day: "2-digit" }).format(
                //@ts-ignore
                new Date(plano.updatedAt)
            )} ${Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
                //@ts-ignore
            }).format(new Date(plano.updatedAt))}`
            : "Saving changes..."
    );

    const [data, setData] = useState<PlanoData>({
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
    })

    useEffect(() => {
        if (plano)
            setData({
                o_que_fazer: plano.o_que_fazer ?? "",
                legislacao: plano.legislacao ?? "",
                origem_demanda: plano.origem_demanda ?? "",
                onde: plano.onde ?? "",
                porque: plano.porque ?? "",
                responsavel: plano.responsavel ?? "",
                quando: plano.quando ?? "",
                prazo: plano.prazo ?? "",
                previsao_termino: plano.previsao_termino ?? "",
                termino_real: plano.termino_real ?? "",
                status: plano.status ?? "",
                evidencia: plano.evidencia ?? "",
                areaavaliadaName: plano.areaavaliadaName ?? "",
                unidadeName: plano.unidadeName ?? "",
            });
    }, [plano]);

    const [debouncedData] = useDebounce(data, 1000)

    const createOption = (label: string) => ({
        label,
        value: label.toLowerCase().replace(/\W/g, ''),
    });

    const formatDateForAPI = (dateString: any) => {
        const [date, time] = dateString.split('T');
        const [year, month, day] = date.split('-');
        const [hour, minute] = time.split(':');
        return `${year}-${month}-${day}T${hour}:${minute}:00Z`;
    }

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
        if (plano) {
            const timeout = setTimeout(() => {
                if (plano.areaavaliadaName.includes(',')) {
                    const areaavaliadaNames = plano.areaavaliadaName.split(',');
                    const newOptions = areaavaliadaNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions(newOptions);
                    setValueSelect(newOptions);
                } else {
                    const option = {
                        label: plano.areaavaliadaName,
                        value: plano.areaavaliadaName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions([option]);
                    setValueSelect([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [plano]);

    useEffect(() => {
        if (plano) {
            const timeout = setTimeout(() => {
                if (plano.unidadeName.includes(',')) {
                    const unidadeNames = plano.unidadeName.split(',');
                    const newOptions = unidadeNames.map(name => ({
                        label: name.trim(),
                        value: name.toLowerCase().replace(/\W/g, ""),
                    }));
                    setOptions2(newOptions);
                    setValueSelect2(newOptions);
                } else {
                    const option = {
                        label: plano.unidadeName,
                        value: plano.unidadeName.toLowerCase().replace(/\W/g, ""),
                    };
                    setOptions2([option]);
                    setValueSelect2([option]);
                }
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [plano]);

    const saveChanges = useCallback(
        async (data: PlanoData) => {
            setSavedState("Saving changes...");

            try {
                const response = await fetch(`/api/plano?planoId=${planoId}`, {
                    method: HttpMethod.PUT,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: planoId,
                        o_que_fazer: data.o_que_fazer,
                        legislacao: data.legislacao,
                        origem_demanda: data.origem_demanda,
                        onde: data.onde,
                        porque: data.porque,
                        responsavel: data.responsavel,
                        quando: data.quando,
                        prazo: data.prazo,
                        previsao_termino: formatDateForAPI(data.previsao_termino),
                        termino_real: formatDateForAPI(data.termino_real),
                        status: data.status,
                        evidencia: data.evidencia,
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
        [planoId]
    );

    useEffect(() => {
        if (debouncedData.o_que_fazer) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.legislacao) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.origem_demanda) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.onde) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.porque) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.areaavaliadaName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.unidadeName) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.responsavel) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.quando) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.prazo) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.previsao_termino) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.termino_real) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.status) saveChanges(debouncedData);
    }, [debouncedData, saveChanges]);

    useEffect(() => {
        if (debouncedData.evidencia) saveChanges(debouncedData);
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
        if (plano) {
            // Formatando a data de elaboração
            const formattedDataElaboracao = new Date(plano.termino_real).toISOString().slice(0, 16);
            setData(prevData => ({ ...prevData, termino_real: formattedDataElaboracao }));

            // Formatando a data de revisão
            const formattedRevisaoDocumento = new Date(plano.previsao_termino).toISOString().slice(0, 16);
            setData(prevData => ({ ...prevData, previsao_termino: formattedRevisaoDocumento }));
        }
    }, [plano]);


    async function publish() {
        setPublishing(true);

        try {
            const response = await fetch(`/api/plano?planoId=${planoId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id: planoId,
                    o_que_fazer: data.o_que_fazer,
                    legislacao: data.legislacao,
                    origem_demanda: data.origem_demanda,
                    onde: data.onde,
                    porque: data.porque,
                    responsavel: data.responsavel,
                    quando: data.quando,
                    prazo: data.prazo,
                    previsao_termino: formatDateForAPI(data.previsao_termino),
                    termino_real: formatDateForAPI(data.termino_real),
                    status: data.status,
                    evidencia: data.evidencia,
                    areaavaliadaName: valueSelect?.map(item => item.value),
                    unidadeName: valueSelect2?.map(item => item.value),
                    empresaId: selectedOption2,
                }),

            }
            );

            if (response.ok) {
                mutate(`/api/plano?planoId=${planoId}`);

            }
        } catch (error) {
            console.error(error);

        } finally {
            setPublishing(false);
            toast.success("Plano editada com sucesso!")
            router.push(`/plano-de-acao/painel?empresaId=${empresaId}`);
        }
    }

    if (isValidating)
        return (

            <Loader />

        );


    return (

        <Main title2={"Painel Administrativo de Planos"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <CardPlanodeAcao
                type1={"o_que_fazer"} onChange1={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        o_que_fazer: e.target.value,
                    })
                } name1={"o_que_fazer"} value1={data.o_que_fazer}

                type2={"legislacao"} onChange2={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        legislacao: e.target.value,
                    })
                } name2={"legislacao"} value2={data.legislacao}

                type3={"origem_demanda"} onChange3={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        origem_demanda: e.target.value,
                    })
                } name3={"origem_demanda"} value3={data.origem_demanda}

                type4={"onde"} onChange4={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        onde: e.target.value,
                    })
                } name4={"onde"} value4={data.onde}

                type5={"porque"} onChange5={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        porque: e.target.value,
                    })
                } name5={"porque"} value5={data.porque}

                type6={"responsavel"} onChange6={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        responsavel: e.target.value,
                    })
                } name6={"responsavel"} value6={data.responsavel}

                type7={"quando"} onChange7={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        quando: e.target.value,
                    })
                } name7={"quando"} value7={data.quando}

                type8={"prazo"} onChange8={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        prazo: e.target.value,
                    })
                } name8={"prazo"} value8={data.prazo}

                type9={"datetime-local"} onChange9={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        previsao_termino: e.target.value,
                    })
                } name9={"previsao_termino"} value9={data.previsao_termino}

                type10={"datetime-local"} onChange10={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        termino_real: e.target.value,
                    })
                } name10={data.termino_real} value10={data.termino_real}

                type11={"status"} onChange11={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        status: e.target.value,
                    })
                } name11={"status"} value11={data.status}

                type12={"evidencia"} onChange12={(e: ChangeEvent<HTMLInputElement>) =>
                    setData({
                        ...data,
                        evidencia: e.target.value,
                    })
                } name12={"evidencia"} value12={data.evidencia}

                valueEmpresa={selectedOption2}
                onChangeEmpresa={(e: any) => {
                    setSelectedOption2(e.target.value);
                }}
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

                onClick={async () => {
                    await publish();
                }}
            />
        </Main>

    )
}
