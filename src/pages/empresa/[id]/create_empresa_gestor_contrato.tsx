import { CardCadastroEmpresaElaboradora, CardCadastroEmpresaGestor, CardCadastroInicial } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { HttpMethod } from "../../../../types";

const formSchema = z.object({
    nome_gestor: z.string(),
    telefone_gestor: z.string(),
    email_gestor: z.string(),
})

export default function Home() {
    const router = useRouter()
    const { id: empresaId } = router.query

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome_gestor: "",
            telefone_gestor: "",
            email_gestor: "",

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
                    nome_gestor: values.nome_gestor,
                    telefone_gestor: values.telefone_gestor,
                    email_gestor: values.email_gestor,
                }),
            });
            toast.success("Empresa Cadastrada!")

            const responseData = await response.json();
            // Redireciona para a rota desejada com o id
            router.push(`/empresa`);

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

                <Main title2={"Cadastro Empresa Elaboradora"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

                    <CardCadastroEmpresaGestor type={"submit"}
                        type1={"nome_gestor"} isInvalid1={!!formState.errors.nome_gestor} register1={register("nome_gestor")} error1={formState.errors.nome_gestor?.message}

                        type2={"telefone_gestor"} isInvalid2={!!formState.errors.telefone_gestor} register2={register("telefone_gestor")} error2={formState.errors.telefone_gestor?.message}

                        type7={"email_gestor"} isInvalid7={!!formState.errors.email_gestor} register7={register("email_gestor")} error7={formState.errors.email_gestor?.message}

                    >
                    </CardCadastroEmpresaGestor>
                </Main>
            </form>
        </>
    )
}
