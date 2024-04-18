import { useState } from 'react';

import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import * as z from "zod";
import { FormControl, FormLabel, Icon, IconButton, Input } from "@chakra-ui/react";
import { HttpMethod } from "../../types";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { MdAdd, MdMinimize } from 'react-icons/md';

const formSchema = z.object({
    name: z.string()
})

export default function Teste() {
    const [inputValue, setInputValue] = useState('');
    const [ativado, setAtivado] = useState(false)
    const [listar, setListar] = useState(false)
    const [names, setValues] = useState([]);
    const [unidadeOptions, setUnidadeOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

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
    //@ts-ignore
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddValue = () => {
        if (inputValue.trim() !== '') {
            //@ts-ignore
            setValues([...names, inputValue]);
            setInputValue('');
            setListar(!listar);
        }
    };

    const ativarBotao = () => {
        setAtivado(!ativado)
    }

    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });


    const { register, handleSubmit, formState } = form;
    const { isSubmitting, isValid } = formState;


    const teste = async () => {
        try {
            setListar(!listar)
            const response = await fetch("/api/unidade", {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    names: names,
                }),
            });

            toast.success("Unidades Cadastradas!");

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }

        } catch (error) {
            console.error(error);
        }
    };

    const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
        console.error(errors);
    };

    return (
        <>
            <div>
                <FormControl w={"50%"} isInvalid={!!formState.errors.name}>
                    {/* Substitua o input pelo select */}
                    <select {...register("name")} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="" disabled>Selecione uma unidade</option>
                        {unidadeOptions.map((option, index) => (
                            //@ts-ignore
                            <option key={index} value={option.id}>
                                {/* @ts-ignore */}
                                {option.name}
                            </option>
                        ))}
                    </select>
                </FormControl>

                <IconButton
                    icon={ativado ? <MdMinimize /> : <MdAdd />}
                    onClick={() => ativarBotao()}
                    fontSize={{ '2xl': "32px", xl: "28px", lg: "24px", xxs: "22px" }}
                    display="flex"
                    alignItems="center"
                    justifyContent={"start"}
                    variant="unstyled"
                    aria-label='Conta do usuário'
                    color="#78828B"
                    cursor="pointer"
                    zIndex={2}

                >
                </IconButton>


                {/* <form onSubmit={handleSubmit(onSubmit, onError)}> */}
                <FormControl
                    w={"50%"}
                    isInvalid={!!formState.errors.name}
                >
                    {ativado ?
                        <input
                            type="name"
                            placeholder='name'
                            value={inputValue}
                            {...register("name")}
                            onChange={handleInputChange} /> : ""

                    }
                </FormControl>
                {formState.errors.name?.message && (
                    <span style={{ color: "red" }}>{formState.errors.name?.message}</span>
                )}
                <button type="button" onClick={handleAddValue}>Adicionar</button>



                <div>
                    <h2>Valores Adicionados:</h2>
                    <ul>
                        {names.map((value, index) => (
                            <li key={index}>{value}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={() => teste()}>Enviar</button>
                {/* </form > */}
            </div>
        </>
    );
}
