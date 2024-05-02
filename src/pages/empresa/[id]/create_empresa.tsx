import { CardCadastroInicial } from "../../../components/Card"
import { Main } from "../../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { HttpMethod } from "../../../../types";
import CreatableSelect from 'react-select/creatable';

interface Option {
  readonly label: string;
  readonly value: string;
}


interface Option2 {
  readonly label: string;
  readonly value2: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const createOption2 = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('Opção 1'),
];

const defaultOptions2 = [
  createOption2('Opção 1'),
];

const formSchema = z.object({
  nome_fantasia: z.string().min(1, {
    message: "É preciso preencher o nome da empresa"
  }),
  email: z.string(),
  ramo_atividade: z.string(),
  atividade_principal: z.string(),
  cnae: z.string(),
  grau_risco: z.string(),
  razao_social: z.string(),
  ie: z.string(),
  setor: z.string(),
  endereco: z.string(),
  bairro: z.string(),
  telefone: z.string(),
  cnpj: z.string().min(1, {
    message: "É preciso preencher o cnpj da empresa"
  }),
  cidade: z.string(),
  estado: z.string(),
  unidade: z.string(),
  area_avaliada: z.string(),

})

export default function Home() {
  //teste
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState<Option[] | null>([]);

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      //@ts-ignore
      setValue((prev) => [...prev, newOption]);
    }, 1000);
  };


  const [isLoading2, setIsLoading2] = useState(false);
  const [options2, setOptions2] = useState(defaultOptions2);
  const [value2, setValue2] = useState<Option[] | null>([]);
  const router = useRouter();
  const { id: empresaId } = router.query

  const handleCreate2 = (inputValue: string) => {
    setIsLoading2(true);
    setTimeout(() => {
      const newOption2 = createOption(inputValue);
      setIsLoading2(false);
      setOptions((prev) => [...prev, newOption2]);
      //@ts-ignore
      setValue2((prev) => [...prev, newOption2]);
    }, 1000);
  };


  //teste
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razao_social: "",
      nome_fantasia: "",
      cnpj: "",
      ie: "",
      endereco: "",
      bairro: "",
      cidade: "",
      estado: "",
      telefone: "",
      email: "",
      ramo_atividade: "",
      atividade_principal: "",
      cnae: "",
      grau_risco: "",
      setor: "",
      unidade: "",
      area_avaliada: "",
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
          nome_fantasia: values.nome_fantasia,
          email: values.email,
          ramo_atividade: values.ramo_atividade,
          atividade_principal: values.atividade_principal,
          cnae: values.cnae,
          grau_risco: values.grau_risco,
          razao_social: values.razao_social,
          ie: values.ie,
          setor: values.setor,
          unidade: value?.map(item => item.value),
          area_avaliada: value2?.map(item => item.value),
          endereco: values.endereco,
          bairro: values.bairro,
          telefone: values.telefone,
          cnpj: values.cnpj,
          cidade: values.cidade,
          estado: values.estado,
        }),
      });
      toast.success("Empresa Cadastrada!")

      const responseData = await response.json();

      // Redireciona para a rota desejada com o id
      router.push(`/empresa/${empresaId}/create_empresa_gestor_contrato`);

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

        <Main title2={"Painel Administrativo de Empresas"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

          <CardCadastroInicial type={"submit"}

            type1={"razao_social"} isInvalid1={!!formState.errors.razao_social} register1={register("razao_social")} error1={formState.errors.razao_social?.message}

            type2={"nome_fantasia"} isInvalid2={!!formState.errors.nome_fantasia} register2={register("nome_fantasia")} error2={formState.errors.nome_fantasia?.message}

            type3={"cnpj"} isInvalid3={!!formState.errors.cnpj} register3={register("cnpj")} error3={formState.errors.cnpj?.message}

            type4={"ie"} isInvalid4={!!formState.errors.ie} register4={register("ie")} error4={formState.errors.ie?.message}

            type5={"endereco"} isInvalid5={!!formState.errors.endereco} register5={register("endereco")} error5={formState.errors.endereco?.message}

            type6={"bairro"} isInvalid6={!!formState.errors.bairro} register6={register("bairro")} error6={formState.errors.bairro?.message}

            type7={"cidade"} isInvalid7={!!formState.errors.cidade} register7={register("cidade")} error7={formState.errors.cidade?.message}

            type20={"estado"} isInvalid20={!!formState.errors.estado} register20={register("estado")} error20={formState.errors.estado?.message}

            type21={"telefone"} isInvalid21={!!formState.errors.telefone} register21={register("telefone")} error21={formState.errors.telefone?.message}

            type22={"email"} isInvalid22={!!formState.errors.email} register22={register("email")} error22={formState.errors.email?.message}

            type8={"ramo_atividade"} isInvalid8={!!formState.errors.ramo_atividade} register8={register("ramo_atividade")} error8={formState.errors.ramo_atividade?.message}

            type9={"atividade_principal"} isInvalid9={!!formState.errors.atividade_principal} register9={register("atividade_principal")} error9={formState.errors.atividade_principal?.message}

            type11={"cnae"} isInvalid11={!!formState.errors.cnae} register11={register("cnae")} error11={formState.errors.cnae?.message}

            type12={"grau_risco"} isInvalid12={!!formState.errors.grau_risco} register12={register("grau_risco")} error12={formState.errors.grau_risco?.message}

            // type12={"registro_responsavel_tecnico"} isInvalid12={!!formState.errors.registro_responsavel_tecnico} register12={register("registro_responsavel_tecnico")} error12={formState.errors.registro_responsavel_tecnico?.message}

            // type13={"ramo_atividade"} isInvalid13={!!formState.errors.ramo_atividade} register13={register("ramo_atividade")} error13={formState.errors.ramo_atividade?.message}

            // type14={"atividade_principal"} isInvalid14={!!formState.errors.atividade_principal} register14={register("atividade_principal")} error14={formState.errors.atividade_principal?.message}

            // type15={"cnae"} isInvalid15={!!formState.errors.cnae} register15={register("cnae")} error15={formState.errors.cnae?.message}

            // type16={"grau_risco"} isInvalid16={!!formState.errors.grau_risco} register16={register("grau_risco")} error16={formState.errors.grau_risco?.message}

            // type23={"nome_gestor_contrato"} isInvalid23={!!formState.errors.nome_gestor_contrato} register23={register("nome_gestor_contrato")} error23={formState.errors.nome_gestor_contrato?.message}

            // type24={"telefone_gestor_contrato"} isInvalid24={!!formState.errors.telefone_gestor_contrato} register24={register("telefone_gestor_contrato")} error24={formState.errors.telefone_gestor_contrato?.message}

            // type25={"email_gestor_contrato"} isInvalid25={!!formState.errors.email_gestor_contrato} register25={register("email_gestor_contrato")} error25={formState.errors.email_gestor_contrato?.message}

            // // Esses abaixo precisam ser aquele select que inclue
            type17={"unidade"} isInvalid17={!!formState.errors.unidade} register17={register("unidade")} error17={formState.errors.unidade?.message}

            type18={"setor"} isInvalid18={!!formState.errors.setor} register18={register("setor")} error18={formState.errors.setor?.message}

            type19={"area_avaliada"} isInvalid19={!!formState.errors.area_avaliada} register19={register("area_avaliada")} error19={formState.errors.area_avaliada?.message}

            isLoading2={isLoading2}
            //@ts-ignore
            onChangeSelect2={(newValue2) => setValue2(newValue2)}
            handleCreate2={handleCreate2}
            options2={options2}
            valueSelect2={value2}

            isLoading={isLoading}
            //@ts-ignore
            onChangeSelect={(newValue) => setValue(newValue)}
            handleCreate={handleCreate}
            options={options}
            valueSelect={value}
            // onChangeSelect={handleMultiChange}
            defaultOptions={defaultOptions}

          >


          </CardCadastroInicial>
        </Main>
      </form>
    </>
  )
}
