import { CardCadastroInicial } from "../../components/Card"
import { Main } from "../../components/Main"
import { useRouter } from "next/router"

import { useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import * as z from "zod";
import { useState } from "react";
import { HttpMethod } from "../../../types";
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
  name: z.string().min(1, {
    message: "É preciso preencher o nome da empresa"
  }),
  email: z.string(),
  habilitacao_responsavel_tecnico: z.string(),
  responsavel_tecnico: z.string(),
  registro_responsavel_tecnico: z.string(),
  ramo_atividade: z.string(),
  atividade_principal: z.string(),
  cnae: z.string(),
  grau_risco: z.string(),
  nome_gestor_contrato: z.string(),
  telefone_gestor_contrato: z.string(),
  email_gestor_contrato: z.string(),
  razao_social: z.string(),
  ergonomista: z.string(),
  ie: z.string(),
  cep: z.string(),
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
  const [empresaId, setEmpresaId] = useState("");

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
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      responsavel_tecnico: "",
      registro_responsavel_tecnico: "",
      ramo_atividade: "",
      atividade_principal: "",
      cnae: "",
      habilitacao_responsavel_tecnico: "",
      grau_risco: "",
      nome_gestor_contrato: "",
      telefone_gestor_contrato: "",
      email_gestor_contrato: "",
      razao_social: "",
      ergonomista: "",
      ie: "",
      cep: "",
      setor: "",
      unidade: "",
      area_avaliada: "",
      endereco: "",
      bairro: "",
      telefone: "",
      cnpj: "",
      cidade: "",
      estado: "",
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
          name: values.name,
          email: values.email,
          responsavel_tecnico: values.responsavel_tecnico,
          registro_responsavel_tecnico: values.registro_responsavel_tecnico,
          ramo_atividade: values.ramo_atividade,
          atividade_principal: values.atividade_principal,
          cnae: values.cnae,
          habilitacao_responsavel_tecnico: values.habilitacao_responsavel_tecnico,
          grau_risco: values.grau_risco,
          nome_gestor_contrato: values.nome_gestor_contrato,
          telefone_gestor_contrato: values.telefone_gestor_contrato,
          email_gestor_contrato: values.email_gestor_contrato,
          razao_social: values.razao_social,
          ergonomista: values.ergonomista,
          ie: values.ie,
          cep: values.cep,
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

      // Extrai o id do JSON
      const empresaId = responseData.empresaId;

      // Atualiza o estado com o id
      setEmpresaId(empresaId);

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

        <Main title2={"Painel Administrativo de Empresas"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

          <CardCadastroInicial type={"submit"}

            type1={"name"} isInvalid1={!!formState.errors.name} register1={register("name")} error1={formState.errors.name?.message}

            type2={"cnpj"} isInvalid2={!!formState.errors.cnpj} register2={register("cnpj")} error2={formState.errors.cnpj?.message}

            type3={"razao_social"} isInvalid3={!!formState.errors.razao_social} register3={register("razao_social")} error3={formState.errors.razao_social?.message}

            type4={"ergonomista"} isInvalid4={!!formState.errors.ergonomista} register4={register("ergonomista")} error4={formState.errors.ergonomista?.message}

            type5={"ie"} isInvalid5={!!formState.errors.ie} register5={register("ie")} error5={formState.errors.ie?.message}

            type6={"cep"} isInvalid6={!!formState.errors.cep} register6={register("cep")} error6={formState.errors.cep?.message}

            type7={"endereco"} isInvalid7={!!formState.errors.endereco} register7={register("endereco")} error7={formState.errors.endereco?.message}

            type20={"bairro"} isInvalid20={!!formState.errors.bairro} register20={register("bairro")} error20={formState.errors.bairro?.message}

            type21={"cidade"} isInvalid21={!!formState.errors.cidade} register21={register("cidade")} error21={formState.errors.cidade?.message}

            type22={"estado"} isInvalid22={!!formState.errors.estado} register22={register("estado")} error22={formState.errors.estado?.message}

            type8={"telefone"} isInvalid8={!!formState.errors.telefone} register8={register("telefone")} error8={formState.errors.telefone?.message}

            type9={"email"} isInvalid9={!!formState.errors.email} register9={register("email")} error9={formState.errors.email?.message}

            type10={"responsavel_tecnico"} isInvalid10={!!formState.errors.responsavel_tecnico} register10={register("responsavel_tecnico")} error10={formState.errors.responsavel_tecnico?.message}

            type11={"habilitacao_responsavel_tecnico"} isInvalid11={!!formState.errors.habilitacao_responsavel_tecnico} register11={register("habilitacao_responsavel_tecnico")} error11={formState.errors.habilitacao_responsavel_tecnico?.message}

            type12={"registro_responsavel_tecnico"} isInvalid12={!!formState.errors.registro_responsavel_tecnico} register12={register("registro_responsavel_tecnico")} error12={formState.errors.registro_responsavel_tecnico?.message}

            type13={"ramo_atividade"} isInvalid13={!!formState.errors.ramo_atividade} register13={register("ramo_atividade")} error13={formState.errors.ramo_atividade?.message}

            type14={"atividade_principal"} isInvalid14={!!formState.errors.atividade_principal} register14={register("atividade_principal")} error14={formState.errors.atividade_principal?.message}

            type15={"cnae"} isInvalid15={!!formState.errors.cnae} register15={register("cnae")} error15={formState.errors.cnae?.message}

            type16={"grau_risco"} isInvalid16={!!formState.errors.grau_risco} register16={register("grau_risco")} error16={formState.errors.grau_risco?.message}

            type23={"nome_gestor_contrato"} isInvalid23={!!formState.errors.nome_gestor_contrato} register23={register("nome_gestor_contrato")} error23={formState.errors.nome_gestor_contrato?.message}

            type24={"telefone_gestor_contrato"} isInvalid24={!!formState.errors.telefone_gestor_contrato} register24={register("telefone_gestor_contrato")} error24={formState.errors.telefone_gestor_contrato?.message}

            type25={"email_gestor_contrato"} isInvalid25={!!formState.errors.email_gestor_contrato} register25={register("email_gestor_contrato")} error25={formState.errors.email_gestor_contrato?.message}

            // Esses abaixo precisam ser aquele select que inclue
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
