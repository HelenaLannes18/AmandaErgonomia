import { CardGenerate, CardGenerateExcell } from "../../components/Card"
import { saveAs } from 'file-saver';
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
import { useExcelDownloder } from 'react-xls';

const formSchema = z.object({
    name: z.string(),
    nameAvaliada: z.string(),
    nameUnidade: z.string(),
    namePerigo: z.string(),
    nameRisco: z.string(),
    namePlano: z.string(),
    nameAEP: z.string(),
    fase_levantamento_preliminar: z.string(),
    aspectos_ergonomico: z.string(),
    fator: z.string(),
    fontes: z.string(),
    ha_pergios_externos: z.string(),
    possiveis_lesoes: z.string()
})

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        receiptId: 0,
        price1: 0,
        price2: 0,
    });


    const [loading, setLoading] = useState(false)
    const [unidadeOptions, setUnidadeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [listar, setListar] = useState(false)

    const [empresaOptions, setEmpresaOptions] = useState([]);
    const [selectedOption2, setSelectedOption2] = useState('');

    const [areaOptions, setAreaOptions] = useState([]);
    const [selectedOption3, setSelectedOption3] = useState('');

    const [PlanoOptions, setPlanoOptions] = useState([]);
    const [selectedOption4, setSelectedOption4] = useState('');


    const [PerigoOptions, setPerigoOptions] = useState([]);
    const [selectedOption5, setSelectedOption5] = useState('');

    const [RiscoOptions, setRiscoOptions] = useState([]);
    const [selectedOption6, setSelectedOption6] = useState('');

    const [AEPOptions, setAEPOptions] = useState([]);
    const [selectedOption7, setSelectedOption7] = useState('');

    const [selectedRadioValue, setSelectedRadioValue] = useState("");

    useEffect(() => {
        const fetchUnidadeOptions = async () => {
            try {
                const response = await axios.get("/api/unidade");
                setUnidadeOptions(response.data.unidades);
            } catch (error) {
                console.error("Erro ao obter opções da API unidade:", error);
            }
        };

        fetchUnidadeOptions();
    }, [listar]);

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

    useEffect(() => {
        const fetchAreaOptions = async () => {
            try {
                const response = await axios.get("/api/areaavaliada");
                setAreaOptions(response.data.areaavaliadas);
            } catch (error) {
                console.error("Erro ao obter opções da API area avaliada:", error);
            }
        };

        fetchAreaOptions();
    }, [listar]);

    useEffect(() => {
        const fetchPlanoOptions = async () => {
            try {
                const response = await axios.get("/api/plano");
                setPlanoOptions(response.data.planos);
            } catch (error) {
                console.error("Erro ao obter opções da API plano:", error);
            }
        };

        fetchPlanoOptions();
    }, [listar]);

    useEffect(() => {
        const fetchRiscoOptions = async () => {
            try {
                const response = await axios.get("/api/risco");
                setRiscoOptions(response.data.riscos);
            } catch (error) {
                console.error("Erro ao obter opções da API risco:", error);
            }
        };

        fetchRiscoOptions();
    }, [listar]);

    useEffect(() => {
        const fetchPerigoOptions = async () => {
            try {
                const response = await axios.get("/api/perigo");
                setPerigoOptions(response.data.perigos);
            } catch (error) {
                console.error("Erro ao obter opções da API perigo:", error);
            }
        };

        fetchPerigoOptions();
    }, [listar]);

    useEffect(() => {
        const fetchAEPOptions = async () => {
            try {
                const response = await axios.get("/api/aep");
                setAEPOptions(response.data.aeps);
            } catch (error) {
                console.error("Erro ao obter opções da API aep:", error);
            }
        };

        fetchAEPOptions();
    }, [listar]);

    const createAndDownloadPdf = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create-pdf', formData);
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, 'newPdf.pdf');
        } catch (error) {
            console.error('Error creating or downloading PDF:', error);
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fase_levantamento_preliminar: "",
            aspectos_ergonomico: "",
            fator: "",
            fontes: "",
            ha_pergios_externos: "",
            possiveis_lesoes: ""
        }
    })

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
                    possiveis_lesoes: values.possiveis_lesoes,
                    empresaId: selectedOption2,
                    unidadeId: selectedOption,
                    areaAvaliadaId: selectedOption3,
                    planoId: selectedOption4,
                    riscoId: selectedOption6,
                    perigoId: selectedOption5,
                    aepId: selectedOption7
                })
            })
            toast.success("Perigo Cadastrado!")
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

    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Data1: [
            { identificacao: 'Razão Social', dado: 'ERGOGROUP-Segurança do Trabalho Ltda.' },
            { identificacao: 'CNPJ', dado: '21.135.906/00019' },
            { identificacao: 'Endereço', dado: 'Rua Santo Antônio, n145' },
            { identificacao: 'Bairro', dado: 'Centro' },
            { identificacao: 'CEP', dado: '38010-160' },
            { identificacao: 'Cidade', dado: 'Uberaba' },
            { identificacao: 'UF', dado: 'MG' },
            { identificacao: 'Telefone', dado: '(34) 3333-9987' },
            { identificacao: 'Email', dado: 'contato@ergogroup.com.br' },
        ],

        Data2: [
            { responsavel: 'Nome', info: 'Amanda Viviane Muniz Rodrigues' },
            { responsavel: 'Habilatação', info: 'Fisioterapeuta / Especialista em Ergonomia' },
            { responsavel: 'Registro', info: 'CREFITO 4/127866F' },
        ],

        Data3: [
            { Rev: 'Nome', DATA: 'Amanda Viviane Muniz Rodrigues', Executado: 'ERGOGROUP', Verificado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda', DESCRICAOEOUFOLHASATINGIDAS: 'Emissão Inicial' },
        ],

        Data4: [
            { identificacao: 'Razão Social', dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda' },
            { identificacao: 'Nome Fantasia', dado: 'Usina Colorado' },
            { identificacao: 'CNPJ', dado: '21.135.906/00019' },
            { identificacao: 'Endereço', dado: 'Fazenda São José da Glória' },
            { identificacao: 'Bairro', dado: 'Zona Rural' },
            { identificacao: 'CEP', dado: '14.790-000' },
            { identificacao: 'UF', dado: 'MG' },
            { identificacao: 'Cidade', dado: 'Guaíra' },
            { identificacao: 'UF', dado: 'SP' },

            { identificacao: 'Telefone', dado: '017 3330-3385' },
            { identificacao: 'Ramo de Atividade', dado: 'Produção de Álcool' },
            { identificacao: 'CNAE', dado: '19.31-4-00' },

            { identificacao: 'Email', dado: 'valeria.jorge@colorado.com.br' },
            { identificacao: 'Atividade Principal', dado: 'Produção de Açúcar, Álcool e Energia Elétrica' },
            { identificacao: 'Grau de Risco', dado: '3' },

        ],

        Data5: [
            { Gestor: 'Nome', Dado: 'Valéria Cristina Lellis Jorge' },
            { Gestor: 'Telefone', Dado: '(17) 3330.3385' },
            { Gestor: 'Email', Dado: 'valeria.jorge@colorado.com.br' },

        ],

        Data6: [
            { Titulo: 'Empresa', Dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda.' },
            { Titulo: 'Unidade', Dado: 'Guaira-SP' },
            { Titulo: 'Área Avaliada', Dado: 'Agricola' },
            { Titulo: 'Data da Elaboração', Dado: '14/03/2023' },
            { Titulo: 'Revisão do Codumento', Dado: '00/2023' },

            { Titulo: 'Setor', Dado: 'Administração' },
            { Titulo: 'Cargo/Função', Dado: 'Almoxarife Jr.' },
            { Titulo: 'Tipo de Atividade', Dado: 'Operacional' },

            { Titulo: 'Jornada de Trabalho', Dado: 'De segunda a sexta das 07h as 17h' },
            { Titulo: 'Variação de Turno', Dado: 'Sim' },
            { Titulo: 'Trabalho Noturno', Dado: 'Não' },
            { Titulo: 'N de Trab. Expostos', Dado: '01 (um)' },
            { Titulo: 'Descrição do Ambiente de Trabalho', Dado: 'Lorem Ipsum' },

            { Titulo: 'Tarefa Prescrita', Dado: 'Lorem Ipsum' },
            { Titulo: 'Tarefa Real', Dado: 'Lorem Ipsum' },

            { Titulo: 'Considerações do(a) Avaliador(a)', Dado: 'Lorem Ipsum' },
            { Titulo: 'Ergonomista Responsavel/Função', Dado: 'Lorem Ipsum' },
        ],
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Main title2={"Painel Administrativo Excell"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
                <CardGenerateExcell
                    isInvalidUnidade={!!formState.errors.nameUnidade}
                    registerUnidade={register("nameUnidade")}
                    valueUnidade={selectedOption}
                    onChangeUnidade={(e: any) => setSelectedOption(e.target.value)}
                    unidadeOptions={unidadeOptions}

                    isInvalidEmpresa={!!formState.errors.name}
                    registerEmpresa={register("name")}
                    valueEmpresa={selectedOption2}
                    onChangeEmpresa={(e: any) => setSelectedOption2(e.target.value)}
                    empresaOptions={empresaOptions}

                    isInvalidArea={!!formState.errors.nameAvaliada}
                    registerArea={register("nameAvaliada")}
                    valueArea={selectedOption3}
                    onChangeArea={(e: any) => setSelectedOption3(e.target.value)}
                    areaOptions={areaOptions}
                    onClick={createAndDownloadPdf}

                    isInvalidPlano={!!formState.errors.namePlano}
                    registerPlano={register("namePlano")}
                    valuePlano={selectedOption4}
                    onChangePlano={(e: any) => setSelectedOption4(e.target.value)}
                    PlanoOptions={PlanoOptions}

                    isInvalidPerigo={!!formState.errors.namePerigo}
                    registerPerigo={register("namePerigo")}
                    valuePerigo={selectedOption5}
                    onChangePerigo={(e: any) => setSelectedOption5(e.target.value)}
                    PerigoOptions={PerigoOptions}

                    isInvalidRisco={!!formState.errors.nameRisco}
                    registerRisco={register("nameRisco")}
                    valueRisco={selectedOption6}
                    onChangeRisco={(e: any) => setSelectedOption6(e.target.value)}
                    RiscoOptions={RiscoOptions}

                    isInvalidAEP={!!formState.errors.nameAEP}
                    registerAEP={register("nameAEP")}
                    valueAEP={selectedOption7}
                    onChangeAEP={(e: any) => setSelectedOption7(e.target.value)}
                    AEPOptions={AEPOptions}

                />

            </Main>
        </form>
    )
}
