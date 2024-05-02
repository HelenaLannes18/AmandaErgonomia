import { CardCadastroEmpresaElaboradora, CardCadastroEmpresaResponsavel, CardCadastroInicial } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { HttpMethod } from "../../../../types";

const formSchema = z.object({
    nome_responsavel: z.string(),
    habilitacao_responsavel: z.string(),
    registro_responsavel: z.string()
})

export default function Home() {

    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { id: empresaId } = router.query

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome_responsavel: "Amanda Viviane Muniz Rodrigues",
            habilitacao_responsavel: "Fisioterapeuta / Especialista em Ergonomia",
            registro_responsavel: "CREFITO 4/127866F",

        },
    });

    const { register, handleSubmit, formState } = form;


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // console.log(values)
        try {
            const response = await fetch(`/api/empresa?empresaId=${empresaId}`, {
                method: HttpMethod.PUT,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome_responsavel: values.nome_responsavel,
                    habilitacao_responsavel: values.habilitacao_responsavel,
                    registro_responsavel: values.registro_responsavel,
                }),
            });
            toast.success("Responsavel Tecnico Cadastrado!")
            const responseData = await response.json();

            // Redireciona para a rota desejada com o id
            router.push(`/historico/${empresaId}`);

            if (!response.ok) {
                const error = await response.text()
                throw new Error(error)
            }

        } catch (error) {
            console.error(error);
        }
    }

    const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
        console.error(errors);
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onError)}>

                <Main title2={"Cadastro do Responsavel Técnico"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

                    <CardCadastroEmpresaResponsavel type={"submit"}
                        type1={"nome_responsavel"} isInvalid1={!!formState.errors.nome_responsavel} register1={register("nome_responsavel")} error1={formState.errors.nome_responsavel?.message}

                        type2={"habilitacao_responsavel"} isInvalid2={!!formState.errors.habilitacao_responsavel} register2={register("habilitacao_responsavel")} error2={formState.errors.habilitacao_responsavel?.message}

                        type7={"registro_responsavel"} isInvalid7={!!formState.errors.registro_responsavel} register7={register("registro_responsavel")} error7={formState.errors.registro_responsavel?.message}

                    >
                    </CardCadastroEmpresaResponsavel>
                </Main>
            </form>
        </>
    )
}
