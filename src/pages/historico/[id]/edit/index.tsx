import { CardHistorico } from "../../../../components/Card";
import { Main } from "../../../../components/Main";
import { HttpMethod } from "../../../../types";
import useSWR from "swr";
import { fetcher } from "../../../../lib/fetcher";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface HistoricoData {
    revisao: string;
    data: string;
    executado: string;
    verificado: string;
    descricao: string;
}

const formSchema = z.object({
    revisao: z.string(),
    data: z.string(),
    executado: z.string(),
    verificado: z.string(),
    descricao: z.string(),
});

export default function Home() {
    const router = useRouter();
    const { id: empresaId } = router.query;

    const { data: historicosData } = useSWR<{ historicos: HistoricoData[] }>(
        router.isReady && `/api/historico?empresaId=${empresaId}`,
        fetcher,
        {
            dedupingInterval: 1000,
            revalidateOnFocus: false,
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            revisao: "",
            data: "",
            executado: "",
            verificado: "",
            descricao: "",
        },
    });

    const { register, handleSubmit, formState } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = values.data + ":00Z";
        try {
            const response = await fetch("/api/historico", {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    revisao: values.revisao,
                    data: data,
                    executado: values.executado,
                    verificado: values.verificado,
                    descricao: values.descricao,
                    empresaId: empresaId,
                }),
            });
            toast.success("Histórico cadastrado com sucesso!");
            const responseData = await response.json();
            router.push(`/empresa`);

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function deleteHistorico(historicoId: string) {
        try {
            const response = await fetch(`/api/historico?historicoId=${historicoId}`, {
                method: HttpMethod.DELETE
            })
        } catch (error) {
            console.error(error)
        } finally {
            window.location.reload()
        }
    }

    const handleDeleteClick = (iba: string) => {
        if (!window.confirm('Tem certeza que deseja excluir essa historico?')) {
            return
        }
        //@ts-ignore
        deleteHistorico(iba);
        //toast
    }

    const onError: SubmitErrorHandler<z.infer<typeof formSchema>> = (errors) => {
        console.error(errors);
    };

    useEffect(() => {
        if (historicosData) {
            console.log("Historicos:", historicosData.historicos);
        }
    }, [historicosData]);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Main
                title2={"Painel Administrativo de Empresas"}
                title=""
                w={undefined}
                path={""}
                altText={""}
                tamh={0}
                tamw={0}
            >
                <CardHistorico
                    type={"submit"}
                    type1={"revisao"}
                    isInvalid1={!!formState.errors.revisao}
                    register1={register("revisao")}
                    error1={formState.errors.revisao?.message}
                    type2={"datetime-local"}
                    isInvalid2={!!formState.errors.data}
                    register2={register("data")}
                    error2={formState.errors.data?.message}
                    type3={"executado"}
                    isInvalid3={!!formState.errors.executado}
                    register3={register("executado")}
                    error3={formState.errors.executado?.message}
                    type4={"verificado"}
                    isInvalid4={!!formState.errors.verificado}
                    register4={register("verificado")}
                    error4={formState.errors.verificado?.message}
                    type5={"descricao"}
                    isInvalid5={!!formState.errors.descricao}
                    register5={register("descricao")}
                    error5={formState.errors.descricao?.message}
                    historicosData={historicosData}
                    handleDelete={handleDeleteClick}
                />

            </Main>
        </form>
    );
}
