import { CardCadastroEmpresaElaboradora, CardCadastroInicial } from "../../components/Card"
import { Main } from "../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { HttpMethod } from "../../../types";

const formSchema = z.object({
  razao_social_elaboradora: z.string(),
  cnpj_elaboradora: z.string(),
  ie_elaboradora: z.string(),
  endereco_elaboradora: z.string(),
  bairro_elaboradora: z.string(),
  cep_elaboradora: z.string(),
  cidade_elaboradora: z.string(),
  uf_elaboradora: z.string(),
  telefone_elaboradora: z.string(),
  email_elaboradora: z.string()
})

export default function Home() {
  const [empresaId, setEmpresaId] = useState("");

  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razao_social_elaboradora: "ERGOGROUP – Segurança do Trabalho Ltda",
      cnpj_elaboradora: "21.135.906/00019",
      ie_elaboradora: "Isento",
      endereco_elaboradora: "Rua Santo Antônio, nº145",
      bairro_elaboradora: "Centro",
      cep_elaboradora: "38010-160",
      cidade_elaboradora: "Uberaba",
      uf_elaboradora: "MG",
      telefone_elaboradora: "(34) 3333-9987",
      email_elaboradora: "contato@ergogroup.com.br"

    },
  });

  const { register, handleSubmit, formState } = form;


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values)
    try {
      const response = await fetch("/api/empresa", {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razao_social_elaboradora: values.razao_social_elaboradora,
          cnpj_elaboradora: values.cnpj_elaboradora,
          ie_elaboradora: values.ie_elaboradora,
          endereco_elaboradora: values.endereco_elaboradora,
          bairro_elaboradora: values.bairro_elaboradora,
          cep_elaboradora: values.cep_elaboradora,
          cidade_elaboradora: values.cidade_elaboradora,
          uf_elaboradora: values.uf_elaboradora,
          telefone_elaboradora: values.telefone_elaboradora,
          email_elaboradora: values.email_elaboradora
        }),
      });
      toast.success("Empresa Elaboradora Cadastrada!")
      const responseData = await response.json();

      // Extrai o id do JSON
      const empresaId = responseData.empresaId;

      // Atualiza o estado com o id
      setEmpresaId(empresaId);

      // Redireciona para a rota desejada com o id
      router.push(`/empresa/${empresaId}/create_empresa_responsavel`);

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

        <Main title2={"Cadastro da Empresa Elaboradora da AEP"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

          <CardCadastroEmpresaElaboradora type={"submit"}

            type1={"razao_social_elaboradora"} isInvalid1={!!formState.errors.razao_social_elaboradora} register1={register("razao_social_elaboradora")} error1={formState.errors.razao_social_elaboradora?.message}

            type2={"cnpj_elaboradora"} isInvalid2={!!formState.errors.cnpj_elaboradora} register2={register("cnpj_elaboradora")} error2={formState.errors.cnpj_elaboradora?.message}

            type3={"ie_elaboradora"} isInvalid3={!!formState.errors.ie_elaboradora} register3={register("ie_elaboradora")} error3={formState.errors.ie_elaboradora?.message}

            type4={"endereco_elaboradora"} isInvalid4={!!formState.errors.endereco_elaboradora} register4={register("endereco_elaboradora")} error4={formState.errors.endereco_elaboradora?.message}

            type5={"bairro_elaboradora"} isInvalid5={!!formState.errors.bairro_elaboradora} register5={register("bairro_elaboradora")} error5={formState.errors.bairro_elaboradora?.message}

            type6={"cep_elaboradora"} isInvalid6={!!formState.errors.cep_elaboradora} register6={register("cep_elaboradora")} error6={formState.errors.cep_elaboradora?.message}

            type7={"cidade_elaboradora"} isInvalid7={!!formState.errors.cidade_elaboradora} register7={register("cidade_elaboradora")} error7={formState.errors.cidade_elaboradora?.message}

            type20={"uf_elaboradora"} isInvalid20={!!formState.errors.uf_elaboradora} register20={register("uf_elaboradora")} error20={formState.errors.uf_elaboradora?.message}

            type21={"telefone_elaboradora"} isInvalid21={!!formState.errors.telefone_elaboradora} register21={register("telefone_elaboradora")} error21={formState.errors.telefone_elaboradora?.message}

            type22={"email_elaboradora"} isInvalid22={!!formState.errors.email_elaboradora} register22={register("email_elaboradora")} error22={formState.errors.email_elaboradora?.message}
          >
          </CardCadastroEmpresaElaboradora>
        </Main>
      </form>
    </>
  )
}
