import {
    Divider,
    HStack,
    Select as SelectChackra,
    Stack,
} from '@chakra-ui/react';

import {
    FormAvaliacao,
    FormAvaliacaoInput,
    FormAvaliacaoInput2,
    FormAvaliacaoInputThree,
    FormAvaliacaoMulti,
    FormLogin,
    FormMultiSelect,
    FormOneInput,
    FormRadio2,
    FormTextArea,
    FormTextDateInput,
    FormVariavel,
    FormVariavel3,
    FormVariavelNumber,
} from '../Form';
import { ButtonAd, ButtonLogin } from '../Button';
import { TextLinkLogin } from '../Link';
import { TableIndex } from '../Table';
import { UseFormRegisterReturn } from 'react-hook-form';
import { ReactNode } from 'react';

import {
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import ImageUpload from '../image-upload';
import { useExcelDownloder } from 'react-xls';

interface CardLoginProps {
    //Tipar certo depois
    onChangeEmail: any;
    onChangePassword: any;
    valueEmail: string;
    valuePassword: string;
}

export function CardLogin({
    onChangeEmail,
    onChangePassword,
    valueEmail,
    valuePassword,
}: CardLoginProps) {
    return (
        <Stack
            bg={'#465364'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            py={{ lg: 20, xxs: 6 }}
            w={{ lg: '60%', xxs: '100%' }}
            px={{ lg: 28, xxs: 8 }}
        >
            <Stack w="100%" align={{ md: 'end', xxs: 'center' }} spacing={4}>
                <FormLogin
                    id={'email'}
                    name={'email'}
                    label={'Email'}
                    type={'email'}
                    placeholder={''}
                    onChange={onChangeEmail}
                    value={valueEmail}
                />
                <FormLogin
                    id={'password'}
                    name={'password'}
                    label={'Senha'}
                    type={'password'}
                    placeholder={''}
                    onChange={onChangePassword}
                    value={valuePassword}
                />
                <TextLinkLogin />
            </Stack>
            <ButtonLogin type="submit" label={'Login'} />
        </Stack>
    );
}

interface CardCadastroProps {
    mt?: string;
}

export function CardCadastro({ mt = '1%' }: CardCadastroProps) {
    return (
        <Stack
            bg={'#fff'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={mt}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <TableIndex />
        </Stack>
    );
}
//22
interface CardCadastroInicialProps {
    name1?: any;
    type1?: any;
    isInvalid1?: any;
    register1?: UseFormRegisterReturn;
    error1?: any;
    value1?: any;
    onChange1?: any;
    name2?: any;
    type2?: any;
    isInvalid2?: any;
    register2?: UseFormRegisterReturn;
    error2?: any;
    value2?: any;
    onChange2?: any;
    name3?: any;
    type3?: any;
    isInvalid3?: any;
    register3?: UseFormRegisterReturn;
    error3?: any;
    value3?: any;
    onChange3?: any;
    name4?: any;
    type4?: any;
    isInvalid4?: any;
    register4?: UseFormRegisterReturn;
    error4?: any;
    value4?: any;
    onChange4?: any;
    name5?: any;
    type5?: any;
    isInvalid5?: any;
    register5?: UseFormRegisterReturn;
    error5?: any;
    value5?: any;
    onChange5?: any;
    name6?: any;
    type6?: any;
    isInvalid6?: any;
    register6?: UseFormRegisterReturn;
    error6?: any;
    value6?: any;
    onChange6?: any;
    name7?: any;
    type7?: any;
    isInvalid7?: any;
    register7?: UseFormRegisterReturn;
    error7?: any;
    value7?: any;
    onChange7?: any;
    name8?: any;
    type8?: any;
    isInvalid8?: any;
    register8?: UseFormRegisterReturn;
    error8?: any;
    value8?: any;
    onChange8?: any;
    name9?: any;
    type9?: any;
    isInvalid9?: any;
    register9?: UseFormRegisterReturn;
    error9?: any;
    value9?: any;
    onChange9?: any;
    name10?: any;
    type10?: any;
    isInvalid10?: any;
    register10?: UseFormRegisterReturn;
    error10?: any;
    value10?: any;
    onChange10?: any;
    name11?: any;
    type11?: any;
    isInvalid11?: any;
    register11?: UseFormRegisterReturn;
    error11?: any;
    value11?: any;
    onChange11?: any;
    name12?: any;
    type12?: any;
    isInvalid12?: any;
    register12?: UseFormRegisterReturn;
    error12?: any;
    value12?: any;
    onChange12?: any;
    name13?: any;
    type13?: any;
    isInvalid13?: any;
    register13?: UseFormRegisterReturn;
    error13?: any;
    value13?: any;
    onChange13?: any;
    name14?: any;
    type14?: any;
    isInvalid14?: any;
    register14?: UseFormRegisterReturn;
    error14?: any;
    value14?: any;
    onChange14?: any;
    name15?: any;
    type15?: any;
    isInvalid15?: any;
    register15?: UseFormRegisterReturn;
    error15?: any;
    value15?: any;
    onChange15?: any;
    name16?: any;
    type16?: any;
    isInvalid16?: any;
    register16?: UseFormRegisterReturn;
    error16?: any;
    value16?: any;
    onChange16?: any;
    name17?: any;
    type17?: any;
    isInvalid17?: any;
    register17?: UseFormRegisterReturn;
    error17?: any;
    value17?: any;
    onChange17?: any;
    name18?: any;
    type18?: any;
    isInvalid18?: any;
    register18?: UseFormRegisterReturn;
    error18?: any;
    value18?: any;
    onChange18?: any;
    name19?: any;
    type19?: any;
    isInvalid19?: any;
    register19?: UseFormRegisterReturn;
    error19?: any;
    value19?: any;
    onChange19?: any;
    name20?: any;
    type20?: any;
    isInvalid20?: any;
    register20?: UseFormRegisterReturn;
    error20?: any;
    value20?: any;
    onChange20?: any;
    name21?: any;
    type21?: any;
    isInvalid21?: any;
    register21?: UseFormRegisterReturn;
    error21?: any;
    value21?: any;
    onChange21?: any;
    name22?: any;
    type22?: any;
    isInvalid22?: any;
    register22?: UseFormRegisterReturn;
    error22?: any;
    value22?: any;
    onChange22?: any;
    type?: any;
    onClick?: any;
    handle?: any;
    children?: ReactNode;
    type23?: any;
    value23?: any;
    error23?: any;
    isInvalid23?: any;
    register23?: UseFormRegisterReturn;
    onChange23?: any;
    name23?: any;
    type24?: any;
    value24?: any;
    error24?: any;
    isInvalid24?: any;
    register24?: UseFormRegisterReturn;
    onChange24?: any;
    name24?: any;
    type25?: any;
    value25?: any;
    error25?: any;
    isInvalid25?: any;
    register25?: UseFormRegisterReturn;
    onChange25?: any;
    name25?: any;
    isLoading?: any;
    options?: any;
    handleCreate?: any;
    onChangeSelect?: any;
    valueSelect?: any;
    isLoading2?: any;
    options2?: any;
    handleCreate2?: any;
    onChangeSelect2?: any;
    valueSelect2?: any;
    defaultOptions?: any;
    onDeleteOption?: any;
}

export function CardCadastroInicial({
    type1,
    isInvalid1,
    register1,
    error1,
    type2,
    isInvalid2,
    register2,
    error2,
    type3,
    isInvalid3,
    register3,
    error3,
    type4,
    isInvalid4,
    register4,
    error4,
    type5,
    isInvalid5,
    register5,
    error5,
    type6,
    isInvalid6,
    register6,
    error6,
    type7,
    isInvalid7,
    register7,
    error7,
    type8,
    isInvalid8,
    register8,
    error8,
    type9,
    isInvalid9,
    register9,
    error9,
    isInvalid10,
    register10,
    error10,
    type11,
    isInvalid11,
    register11,
    error11,
    type12,
    isInvalid12,
    register12,
    error12,
    type13,
    isInvalid13,
    register13,
    error13,
    type14,
    isInvalid14,
    register14,
    error14,
    type15,
    isInvalid15,
    register15,
    error15,
    type16,
    isInvalid16,
    register16,
    error16,
    type17,
    isInvalid17,
    register17,
    error17,
    type18,
    isInvalid18,
    register18,
    error18,
    type19,
    isInvalid19,
    register19,
    error19,
    value1,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    value17,
    value18,
    value19,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    onChange1,
    onChange10,
    onChange11,
    onChange12,
    onChange13,
    onChange15,
    onChange17,
    onChange14,
    onChange16,
    onChange18,
    onChange19,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
    onChange7,
    onChange8,
    onChange9,
    name10,
    name11,
    name12,
    name13,
    name14,
    name15,
    name16,
    name17,
    name18,
    name19,
    name1,
    name20,
    name21,
    name22,
    name2,
    name3,
    name4,
    name5,
    name6,
    name7,
    name8,
    name9,
    type,
    children,
    type20,
    value20,
    error20,
    isInvalid20,
    register20,
    onChange20,
    type21,
    value21,
    error21,
    isInvalid21,
    register21,
    onChange21,
    type22,
    value22,
    error22,
    isInvalid22,
    register22,
    onChange22,
    type23,
    value23,
    error23,
    isInvalid23,
    name23,
    name24,
    name25,
    register23,
    onChange23,
    type24,
    value24,
    error24,
    isInvalid24,
    register24,
    onChange24,
    type25,
    value25,
    error25,
    isInvalid25,
    register25,
    onChange25,
    onClick,
    isLoading,
    options,
    handleCreate,
    onChangeSelect,
    valueSelect,
    isLoading2,
    valueSelect2,
    onChangeSelect2,
    handleCreate2,
    options2,
}: CardCadastroInicialProps) {
    return (
        <Stack
            bg={'#F7FAFC'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <FormAvaliacaoInput
                label1={'Empresa'}
                placeholder1={'Digite o Nome da Empresa'}
                label2={'CNPJ'}
                placeholder2={'Digite o CNPJ'}
                type1={type1}
                type2={type2}
                value1={value1}
                value2={value2}
                error1={error1}
                error2={error2}
                isInvalid1={isInvalid1}
                isInvalid2={isInvalid2}
                register1={register1}
                register2={register2}
                onChange1={onChange1}
                onChange2={onChange2}
                name1={name1}
                name2={name2}
            />
            <Divider />
            <FormAvaliacaoInput
                label1={'Razão Social'}
                placeholder1={'Digite a Razão Social'}
                label2={'Ergonomista'}
                placeholder2={'Digite o Nome do Ergonomista'}
                type1={type3}
                type2={type4}
                value1={value3}
                value2={value4}
                error1={error3}
                error2={error4}
                isInvalid1={isInvalid3}
                isInvalid2={isInvalid4}
                register1={register3}
                register2={register4}
                onChange1={onChange3}
                onChange2={onChange4}
                name1={name3}
                name2={name4}
            />

            <FormAvaliacaoInput
                label1={'I.E'}
                placeholder1={'Digite a I.E'}
                label2={'CEP'}
                placeholder2={'Digite o CEP'}
                type1={type5}
                type2={type6}
                value1={value5}
                value2={value6}
                error1={error5}
                error2={error6}
                isInvalid1={isInvalid5}
                isInvalid2={isInvalid6}
                register1={register5}
                register2={register6}
                onChange1={onChange5}
                onChange2={onChange6}
                name1={name5}
                name2={name6}
            />

            <FormOneInput
                label={'Endereço'}
                placeholder={'Digite o Endereço'}
                type={type7}
                value={value7}
                error={error7}
                isInvalid={isInvalid7}
                register={register7}
                onChange={onChange7}
                name={name7}
            />

            <FormAvaliacaoInputThree
                label1={'Bairro'}
                placeholder1={'Digite o Bairro'}
                label2={'Cidade'}
                placeholder2={'Digite a Cidade'}
                type1={type20}
                type2={type21}
                value1={value20}
                value2={value21}
                error1={error20}
                error2={error21}
                isInvalid1={isInvalid20}
                isInvalid2={isInvalid21}
                register1={register20}
                register2={register21}
                onChange1={onChange20}
                onChange2={onChange21}
                name1={name20}
                name2={name21}
                label3={'UF'}
                placeholder3={'Digite a UF'}
                type3={type22}
                value3={value22}
                error3={error22}
                onChange3={onChange22}
                register3={register22}
                isInvalid3={isInvalid22}
                name3={name22}
            />

            <FormAvaliacaoInput
                label1={'Telefone'}
                placeholder1={'Digite o Telefone'}
                label2={'Email'}
                placeholder2={'Digite o Email'}
                type1={type8}
                type2={type9}
                value1={value8}
                value2={value9}
                error1={error8}
                error2={error9}
                isInvalid1={isInvalid8}
                isInvalid2={isInvalid9}
                register1={register8}
                register2={register9}
                onChange1={onChange8}
                onChange2={onChange9}
                name1={name8}
                name2={name9}
            />

            <FormOneInput
                label={'Responsável Técnico'}
                placeholder={'Digite o Nome do Responsável Técnico'}
                type={'area_avaliadas'}
                value={value10}
                error={error10}
                isInvalid={isInvalid10}
                register={register10}
                onChange={onChange10}
                name={name10}
            />

            <FormAvaliacaoInput
                label1={'Habilitação do Responsável Técnico'}
                placeholder1={'Digite a Habilitação do Responsável Técnico'}
                label2={'Registro do Responsável Técnico'}
                placeholder2={'Digite o Registro do Responsável Técnico'}
                type1={type11}
                type2={type12}
                value1={value11}
                value2={value12}
                error1={error11}
                error2={error12}
                isInvalid1={isInvalid11}
                isInvalid2={isInvalid12}
                register1={register11}
                register2={register12}
                onChange1={onChange11}
                onChange2={onChange12}
                name1={name11}
                name2={name12}
            />

            <FormAvaliacaoInput
                label1={'Ramo de Atividade'}
                placeholder1={'Digite o Ramo de Atividade'}
                label2={'Atividade Principal'}
                placeholder2={'Digite a Atividade Principal'}
                type1={type13}
                type2={type14}
                value1={value13}
                value2={value14}
                error1={error13}
                error2={error14}
                isInvalid1={isInvalid13}
                isInvalid2={isInvalid14}
                register1={register13}
                register2={register14}
                onChange1={onChange13}
                onChange2={onChange14}
                name1={name13}
                name2={name14}
            />

            <FormAvaliacaoInput
                label1={'CNAE'}
                placeholder1={'Digite o CNAE'}
                label2={'Grau de Risco'}
                placeholder2={'Digite o Grau de Risco'}
                type1={type15}
                type2={type16}
                value1={value15}
                value2={value16}
                error1={error15}
                error2={error16}
                isInvalid1={isInvalid15}
                isInvalid2={isInvalid16}
                register1={register15}
                register2={register16}
                onChange1={onChange15}
                onChange2={onChange16}
                name1={name15}
                name2={name16}
            />

            <FormAvaliacaoInputThree
                label1={'Nome do Gestor do Contrato'}
                placeholder1={'Digite o Nome do Gestor do Contrato'}
                label2={'Telefone do Gestor do Contrato'}
                placeholder2={'Digite o Telefone do Gestor do Contrato'}
                type1={type23}
                type2={type24}
                value1={value23}
                value2={value24}
                error1={error23}
                error2={error24}
                isInvalid1={isInvalid23}
                isInvalid2={isInvalid24}
                register1={register23}
                register2={register24}
                onChange1={onChange23}
                onChange2={onChange24}
                name1={name23}
                name2={name24}
                label3={'Email do Gestor do Contrato'}
                placeholder3={'Digite o Email do Gestor do Contrato'}
                type3={type25}
                value3={value25}
                error3={error25}
                onChange3={onChange25}
                register3={register25}
                isInvalid3={isInvalid25}
                name3={name25}
            />

            <FormAvaliacaoMulti
                label1={'Unidade'}
                placeholder1={'Digite a Unidade'}
                label2={'Setor'}
                placeholder2={'Digite o Setor'}
                type1={type17}
                type2={type18}
                value1={value17}
                value2={value18}
                error1={error17}
                error2={error18}
                isInvalid1={isInvalid17}
                isInvalid2={isInvalid18}
                register1={register17}
                register2={register18}
                onChange1={onChange17}
                onChange2={onChange18}
                name1={name17}
                name2={name18}
                isLoading={isLoading2}
                onChangeSelect={onChangeSelect2}
                handleCreate={handleCreate2}
                options={options2}
                valueSelect={valueSelect2}
            />

            <FormMultiSelect
                label={'Área Avaliada'}
                placeholder={'Digite a Área Avaliada'}
                type={type19}
                value={value19}
                error={error19}
                isInvalid={isInvalid19}
                register={register19}
                onChange={onChange19}
                name={name19}
                isLoading={isLoading}
                onChangeSelect={onChangeSelect}
                handleCreate={handleCreate}
                options={options}
                valueSelect={valueSelect}
            />

            {/* 
            <CreatableSelect
                isMulti
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                onChange={onChangeSelect}
                onCreateOption={handleCreate}
                options={options}
                value={valueSelect}
            /> */}

            {/* <Select
                isMulti
                name="colors"
                options={defaultOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={onChangeSelect}
                value={valueSelect} /> */}

            {children}

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Salvar'} mt={'0'} type={type} onClick={onClick} />
            </Stack>
        </Stack>
    );
}

interface CardHistoricoProps {
    type1?: any;
    type2?: any;
    type3?: any;
    type4?: any;
    type5?: any;
    onChange1?: any;
    onChange2?: any;
    onChange3?: any;
    onChange4?: any;
    onChange5?: any;
    name1?: any;
    name2?: any;
    name3?: any;
    name4?: any;
    name5?: any;
    value1?: any;
    value2?: any;
    value3?: any;
    value4?: any;
    value5?: any;
    error1?: any;
    error2?: any;
    error3?: any;
    error4?: any;
    error5?: any;
    isInvalid1?: any;
    isInvalid2?: any;
    isInvalid3?: any;
    isInvalid4?: any;
    isInvalid5?: any;
    register1?: UseFormRegisterReturn;
    register2?: UseFormRegisterReturn;
    register3?: UseFormRegisterReturn;
    register4?: UseFormRegisterReturn;
    register5?: UseFormRegisterReturn;
    onClick?: any;
    type?: any;
}

export function CardHistorico({
    type1,
    type2,
    type3,
    type4,
    type5,
    onChange2,
    onChange1,
    onChange3,
    onChange4,
    onChange5,
    name1,
    name2,
    name3,
    name4,
    name5,
    value1,
    value2,
    value3,
    value4,
    value5,
    onClick,
    type,
    error1,
    error2,
    error3,
    error4,
    error5,
    isInvalid1,
    isInvalid2,
    isInvalid3,
    isInvalid4,
    isInvalid5,
    register1,
    register2,
    register3,
    register4,
    register5,
}: CardHistoricoProps) {
    return (
        <Stack
            bg={'#F7FAFC'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <FormAvaliacaoInput
                label1={'Revisão'}
                placeholder1={'Digite a Revisão'}
                label2={'Data'}
                placeholder2={'Digite a Data'}
                type1={type1}
                value1={value1}
                error1={error1}
                isInvalid1={isInvalid1}
                register1={register1}
                onChange1={onChange1}
                name1={name1}
                type2={type2}
                value2={value2}
                error2={error2}
                isInvalid2={isInvalid2}
                register2={register2}
                onChange2={onChange2}
                name2={name2}
            />

            <FormOneInput
                label={'Executado por'}
                placeholder={'Digite o Nome do(a) Executor(a)'}
                type={type3}
                value={value3}
                error={error3}
                isInvalid={isInvalid3}
                register={register3}
                onChange={onChange3}
                name={name3}
            />

            <FormAvaliacaoInput
                label1={'Verificado por'}
                placeholder1={'Digite o Nome do(a) Revisor(a)'}
                label2={'Descrição e/ou Folhas Atingidas'}
                placeholder2={'Digite a Descrição e/ou Folhas Atingidas'}
                type1={type4}
                value1={value4}
                error1={error4}
                isInvalid1={isInvalid4}
                register1={register4}
                onChange1={onChange4}
                name1={name4}
                type2={type5}
                value2={value5}
                error2={error5}
                isInvalid2={isInvalid5}
                register2={register5}
                onChange2={onChange5}
                name2={name5}
            />

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Salvar'} mt={'0'} onClick={onClick} type={type} />
            </Stack>
        </Stack>
    );
}

interface CardPerfilProps {
    name1?: any;
    name2?: any;
    name3?: any;
    onInput1?: any;
    onInput2?: any;
    onInput3?: any;
    value1?: any;
    value2?: any;
    value3?: any;
    onClick?: any;
    type?: any;
    children?: ReactNode;
}

export function CardPerfil({
    name1,
    name2,
    name3,
    onInput1,
    onInput2,
    onInput3,
    value1,
    value2,
    value3,
    onClick,
    type,
    children,
}: CardPerfilProps) {
    return (
        <Stack
            bg={'#F7FAFC'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <FormOneInput
                label={'Nome'}
                placeholder={'Digite o Nome'}
                type={'text'}
                name={name1}
                onInput={onInput1}
                value={value1}
            />

            <FormAvaliacaoInput
                label1={'Email'}
                placeholder1={'Digite o Email'}
                label2={'Senha'}
                placeholder2={'Digite a Senha'}
                type1={'text'}
                type2={'password'}
                name1={name2}
                onInput1={onInput2}
                value1={value2}
                name2={name3}
                onInput2={onInput3}
                value2={value3}
            />
            {children}
            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Salvar'} mt={'0'} type={type} onClick={onClick} />
            </Stack>
        </Stack>
    );
}

interface CardAvaliacaoProps {
    type1?: any;
    type2?: any;
    type3?: any;
    type4?: any;
    type5?: any;
    type6?: any;
    type7?: any;
    type8?: any;
    type9?: any;
    type10?: any;
    type11?: any;
    type12?: any;
    type13?: any;
    type14?: any;
    onChange1?: any;
    onChange2?: any;
    onChange3?: any;
    onChange4?: any;
    onChange5?: any;
    onChange6?: any;
    onChange7?: any;
    onChange8?: any;
    onChange9?: any;
    onChange10?: any;
    onChange11?: any;
    onChange12?: any;
    onChange13?: any;
    onChange14?: any;
    name1?: any;
    name2?: any;
    name3?: any;
    name4?: any;
    name5?: any;
    name6?: any;
    name7?: any;
    name8?: any;
    name9?: any;
    name10?: any;
    name11?: any;
    name12?: any;
    name13?: any;
    name14?: any;
    value1?: any;
    value2?: any;
    value3?: any;
    value4?: any;
    value5?: any;
    value6?: any;
    value7?: any;
    value8?: any;
    value9?: any;
    value10?: any;
    value11?: any;
    value12?: any;
    value13?: any;
    value14?: any;
    onClick?: any;
    isInvalid1?: any;
    isInvalid2?: any;
    isInvalid3?: any;
    isInvalid4?: any;
    isInvalid5?: any;
    isInvalid6?: any;
    isInvalid7?: any;
    isInvalid8?: any;
    isInvalid9?: any;
    isInvalid10?: any;
    isInvalid11?: any;
    isInvalid12?: any;
    isInvalid13?: any;
    isInvalid14?: any;
    error1?: any;
    error2?: any;
    error3?: any;
    error4?: any;
    error5?: any;
    error6?: any;
    error7?: any;
    error8?: any;
    error9?: any;
    error10?: any;
    error11?: any;
    error12?: any;
    error13?: any;
    error14?: any;
    register1?: any;
    register2?: any;
    register3?: any;
    register4?: any;
    register5?: any;
    register6?: any;
    register7?: any;
    register8?: any;
    register9?: any;
    register10?: any;
    register11?: any;
    register12?: any;
    register13?: any;
    register14?: any;
    type?: any;
    setValue?: any;
    value?: any;
    isInvalidEmpresa?: any;
    isInvalidUnidade?: any;
    registerUnidade?: UseFormRegisterReturn;
    valueUnidade?: any;
    onChangeUnidade?: any;
    isInvalidArea?: any;
    unidadeOptions?: any;
    registerEmpresa?: any;
    valueEmpresa?: any;
    onChangeEmpresa?: any;
    empresaOptions?: any;
    registerArea?: any;
    valueArea?: any;
    onChangeArea?: any;
    areaOptions?: any;
    setValue2?: any;
    handleRadioChange?: any;
    handleRadioClick?: any;
    setValue3?: any;
    handleRadioChange3?: any;
    handleRadioClick3?: any;
    selectedRadioValue?: any;
    selectedRadioValue2?: any;
    handleRadioChange2?: any;
    isLoading?: any,
    onChangeSelect?: any,
    handleCreate?: any,
    options?: any,
    valueSelect?: any,
    isLoading2?: any,
    onChangeSelect2?: any,
    handleCreate2?: any,
    options2?: any,
    valueSelect2?: any,
    defaultValue1?: any,
    defaultValue2?: any
}

export function CardAvaliacao({
    type10,
    type11,
    type12,
    type13,
    type14,
    type2,
    type3,
    type4,
    type5,
    type6,
    type7,
    type8,
    type9,
    name10,
    name11,
    name12,
    name13,
    name14,
    name2,
    name3,
    name4,
    name5,
    name6,
    name7,
    name8,
    name9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    onChange10,
    onChange11,
    onChange12,
    onChange13,
    onChange14,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
    onChange7,
    onChange8,
    onChange9,
    onClick,
    isInvalid10,
    isInvalid11,
    isInvalid12,
    isInvalid13,
    isInvalid14,
    isInvalid2,
    isInvalid3,
    isInvalid4,
    isInvalid5,
    isInvalid6,
    isInvalid7,
    isInvalid8,
    isInvalid9,
    register10,
    register11,
    register12,
    register13,
    register14,
    register2,
    register3,
    register4,
    register5,
    register6,
    register7,
    register8,
    register9,
    error10,
    error11,
    error12,
    error13,
    error14,
    error2,
    error3,
    error4,
    error5,
    error6,
    error7,
    error8,
    error9,
    type,
    isInvalidEmpresa,
    isInvalidUnidade,
    registerUnidade,
    valueUnidade,
    onChangeUnidade,
    isInvalidArea,
    unidadeOptions,
    registerEmpresa,
    valueEmpresa,
    onChangeEmpresa,
    empresaOptions,
    registerArea,
    valueArea,
    onChangeArea,
    areaOptions,
    setValue2,
    handleRadioChange,
    handleRadioClick,
    setValue3,
    handleRadioClick3,
    selectedRadioValue,
    selectedRadioValue2,
    handleRadioChange2,
    isLoading,
    onChangeSelect,
    handleCreate,
    options,
    valueSelect,
    isLoading2,
    onChangeSelect2,
    handleCreate2,
    options2,
    valueSelect2,
    defaultValue1,
    defaultValue2
}: CardAvaliacaoProps) {
    //14
    return (
        <Stack
            bg={'#fff'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>
                    <SelectChackra
                        {...registerEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectChackra>
                </FormControl>
                <HStack w={'100%'} spacing={7} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidUnidade}>
                        <FormMultiSelect
                            label={'Unidade'}
                            placeholder={'Digite a Unidade'}
                            isLoading={isLoading2}
                            onChangeSelect={onChangeSelect2}
                            handleCreate={handleCreate2}
                            options={options2}
                            valueSelect={valueSelect2}
                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidArea}>
                        <FormMultiSelect
                            label={'Área Avaliada'}
                            placeholder={'Digite a Área Avaliada'}
                            isLoading={isLoading}
                            onChangeSelect={onChangeSelect}
                            handleCreate={handleCreate}
                            options={options}
                            valueSelect={valueSelect}
                        />
                    </FormControl>
                </HStack>
            </Stack>

            <FormTextDateInput
                label={'Data de Elaboração'}
                placeholder={'Digite a Data de Elaboração'}
                type={type2}
                name={name2}
                onChange={onChange2}
                value={value2}
                error={error2}
                register={register2}
                isInvalid={isInvalid2}
                defaultValue={defaultValue1}
            />


            <Divider />

            <FormTextDateInput
                label={'Revisão do Documento'}
                placeholder={'Digite a Revisão do Documento'}
                type={type3}
                name={name3}
                onChange={onChange3}
                value={value3}
                isInvalid={isInvalid3}
                register={register3}
                error={error3}
                defaultValue={defaultValue2}
            />

            <FormAvaliacaoInput
                label1={'Cargo/Função'}
                placeholder1={'Digite o Cargo/Função'}
                label2={'Tipo de Atividade'}
                placeholder2={'Digite o Tipo de Atividade'}
                type1={type4}
                name1={name4}
                onChange1={onChange4}
                value1={value4}
                isInvalid1={isInvalid4}
                register1={register4}
                error1={error4}
                type2={type5}
                name2={name5}
                onChange2={onChange5}
                value2={value5}
                isInvalid2={isInvalid5}
                register2={register5}
                error2={error5}
            />

            <FormVariavel3
                label={'Jornada de Trabalho'}
                placeholder={'Digite a Jornada de Trabalho'}
                label2={'Variação de Turno'}
                setValue2={setValue2}
                handleRadioClick={handleRadioClick}
                type={type6}
                name={name6}
                onChange={onChange6}
                value={value6}
                isInvalid={isInvalid6}
                register={register6}
                error={error6}
                selectedRadioValue={selectedRadioValue}
                handleRadioChange={handleRadioChange}
            ></FormVariavel3>

            <FormVariavelNumber
                label={'Número de Trabalhadores Expostos'}
                placeholder={'Digite o Número de Trabalhadores Expostos'}
                label2={'Trabalho Noturno'}
                setValue2={setValue3}
                handleRadioClick={handleRadioClick3}
                type={type7}
                name={name7}
                onChange={onChange7}
                value={value7}
                isInvalid={isInvalid7}
                register={register7}
                error={error7}
                selectedRadioValue={selectedRadioValue2}
                handleRadioChange={handleRadioChange2}
            ></FormVariavelNumber>

            <FormTextArea
                label={'Descrição do Ambiente de Trabalho'}
                placeholder={'Digite a Descrição do Ambiente de Trabalho'}
                type={type8}
                name={name8}
                onChange={onChange8}
                value={value8}
                isInvalid={isInvalid8}
                register={register8}
                error={error8}
            />

            <FormAvaliacaoInput
                label1={'Tarefa Prescrita'}
                placeholder1={'Digite a Tarefa Prescrita'}
                label2={'Tarefa Real'}
                placeholder2={'Digite a Tarefa Real'}
                type1={type9}
                name1={name9}
                onChange1={onChange9}
                value1={value9}
                isInvalid1={isInvalid9}
                register1={register9}
                error1={error9}
                type2={type10}
                name2={name10}
                onChange2={onChange10}
                value2={value10}
                isInvalid2={isInvalid10}
                register2={register10}
                error2={error10}
            />

            <Divider />

            <FormTextArea
                label={'Considerações'}
                placeholder={'Digite a Considerações'}
                type={type11}
                name={name11}
                onChange={onChange11}
                value={value11}
                isInvalid={isInvalid11}
                register={register11}
                error={error11}
            />

            {/* <FormTextArea
                label={'Tipo de Atividade'}
                placeholder={'Digite o Tipo de Atividade'}
                type={type12}
                name={name12}
                onChange={onChange12}
                value={value12}
                isInvalid={isInvalid12}
                register={register12}
                error={error12}
            /> */}

            <FormTextArea
                label={'Posto de Trabalho'}
                placeholder={'Digite o Posto de Trabalho'}
                type={type13}
                name={name13}
                onChange={onChange13}
                value={value13}
                isInvalid={isInvalid13}
                register={register13}
                error={error13}
            />

            <FormOneInput
                label={'Ergonomista Responsável'}
                placeholder={'Digite o Nome do(a) Ergonomista Responsável'}
                type={type14}
                name={name14}
                onChange={onChange14}
                value={value14}
                isInvalid={isInvalid14}
                register={register14}
                error={error14}
            />

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Salvar'} mt={'0'} type={type} onClick={onClick} />
            </Stack>
        </Stack>
    );
}
interface CardControleDosRiscosProps {
    handleRadioClick3?: any;
    type1?: any;
    type2?: any;
    type3?: any;
    type4?: any;
    type5?: any;
    type6?: any;
    type7?: any;
    name1?: any;
    name2?: any;
    name3?: any;
    name4?: any;
    name5?: any;
    name6?: any;
    name7?: any;
    onChange1?: any;
    onChange2?: any;
    onChange3?: any;
    onChange4?: any;
    onChange5?: any;
    onChange6?: any;
    onChange7?: any;
    value1?: any;
    value2?: any;
    value3?: any;
    value4?: any;
    value5?: any;
    value6?: any;
    value7?: any;
    type?: any;
    isInvalid6?: any;
    isInvalid7?: any;
    register6?: any;
    register7?: any;
    error6?: any;
    error7?: any;
    isInvalidEmpresa?: any;
    isInvalidUnidade?: any;
    registerUnidade?: UseFormRegisterReturn;
    valueUnidade?: any;
    onChangeUnidade?: any;
    isInvalidArea?: any;
    unidadeOptions?: any;
    registerEmpresa?: any;
    valueEmpresa?: any;
    onChangeEmpresa?: any;
    empresaOptions?: any;
    registerArea?: any;
    valueArea?: any;
    onChangeArea?: any;
    areaOptions?: any;
    valueImage?: any;
    loadingImage?: any;
    onChangeImage?: any;
    onRemoveImage?: any;
    onClick?: any;
    error1?: any;
    register1?: UseFormRegisterReturn;
    isInvalid1?: any;
    selectedRadioValue?: any;
    handleRadioChange?: any;
    isInvalidSeveridade?: any;
    probabilidadeOptions?: any;
    continuacaoOptions?: any;
    severidadeOptions?: any;
    classificacaoOptions?: any;
    isInvalidProbabilidade?: any;
    registerProbabilidade?: UseFormRegisterReturn;
    registerContinuacao?: UseFormRegisterReturn;
    registerClassificacao?: UseFormRegisterReturn;
    registerSeveridade?: UseFormRegisterReturn;
    valueProbabilidade?: any;
    onChangeProbabilidade?: any;
    isInvalidContinuacao?: any;
    onChangeSeveridade?: any;
    onChangeContinuacao?: any;
    valueContinuacao?: any;
    valueSeveridade?: any;
    isInvalidClassificacao?: any;
    onChangeClassificacao?: any;
    valueClassificacao?: any;
    isLoading?: any,
    onChangeSelect?: any,
    handleCreate?: any,
    options?: any,
    valueSelect?: any,
    isLoading2?: any,
    onChangeSelect2?: any,
    handleCreate2?: any,
    options2?: any,
    valueSelect2?: any,
    disabledImage?: any,
    photosImage?: any,
    onClickImage?: any,
    isLoading3?: any,
    onChangeSelect3?: any,
    handleCreate3?: any,
    options3?: any,
    valueSelect3?: any,
    isLoading4?: any,
    onChangeSelect4?: any,
    handleCreate4?: any,
    options4?: any,
    valueSelect5?: any,
    isLoading5?: any,
    onChangeSelect5?: any,
    handleCreate5?: any,
    options5?: any,
    valueSelect6?: any,
    isLoading6?: any,
    onChangeSelect6?: any,
    handleCreate6?: any,
    options6?: any,
    valueSelect4?: any,
    handleRadioClick?: any
}

export function CardControleDosRiscos({
    type6,
    type7,
    name6,
    name7,
    onChange6,
    onChange7,
    value6,
    value7,
    type,
    isInvalid6,
    isInvalid7,
    register6,
    register7,
    error6,
    error7,
    isInvalidEmpresa,
    isInvalidUnidade,
    registerUnidade,
    valueUnidade,
    onChangeUnidade,
    isInvalidArea,
    unidadeOptions,
    registerEmpresa,
    valueEmpresa,
    onChangeEmpresa,
    empresaOptions,
    registerArea,
    valueArea,
    onChangeArea,
    areaOptions,
    onClick,
    type1,
    error1,
    name1,
    onChange1,
    register1,
    isInvalid1,
    value1,
    selectedRadioValue,
    handleRadioChange,
    isInvalidSeveridade,
    probabilidadeOptions,
    continuacaoOptions,
    severidadeOptions,
    classificacaoOptions,
    isInvalidProbabilidade,
    registerProbabilidade,
    registerContinuacao,
    registerClassificacao,
    registerSeveridade,
    valueProbabilidade,
    onChangeProbabilidade,
    isInvalidContinuacao,
    onChangeSeveridade,
    onChangeContinuacao,
    valueContinuacao,
    valueSeveridade,
    isInvalidClassificacao,
    onChangeClassificacao,
    valueClassificacao,
    isLoading,
    onChangeSelect,
    handleCreate,
    options,
    valueSelect,
    isLoading2,
    onChangeSelect2,
    handleCreate2,
    options2,
    valueSelect2,
    valueImage,
    disabledImage,
    onChangeImage,
    onRemoveImage,
    photosImage,
    onClickImage,
    isLoading3,
    onChangeSelect3,
    handleCreate3,
    options3,
    valueSelect3,
    isLoading4,
    onChangeSelect4,
    handleCreate4,
    valueSelect4,
    options4,
    valueSelect5,
    isLoading5,
    onChangeSelect5,
    handleCreate5,
    options5,
    valueSelect6,
    isLoading6,
    onChangeSelect6,
    handleCreate6,
    options6,
    handleRadioClick3
}: CardControleDosRiscosProps) {
    // 7
    return (
        <Stack
            bg={'#fff'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>
                    <SelectChackra
                        {...registerEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectChackra>
                </FormControl>
                <HStack w={'100%'} spacing={7} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidUnidade}>
                        <FormMultiSelect
                            label={'Unidade'}
                            placeholder={'Digite a Unidade'}
                            isLoading={isLoading2}
                            onChangeSelect={onChangeSelect2}
                            handleCreate={handleCreate2}
                            options={options2}
                            valueSelect={valueSelect2}
                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidArea}>
                        <FormMultiSelect
                            label={'Área Avaliada'}
                            placeholder={'Digite a Área Avaliada'}
                            isLoading={isLoading}
                            onChangeSelect={onChangeSelect}
                            handleCreate={handleCreate}
                            options={options}
                            valueSelect={valueSelect}
                        />
                    </FormControl>
                </HStack>
            </Stack>

            <FormVariavel
                label={'Sugestão de Recomendação'}
                placeholder={'Digite a Sugestão de Recomendação'}
                label2={'Necessita de AET'}
                type={type1}
                value={value1}
                error={error1}
                isInvalid={isInvalid1}
                register={register1}
                onChange={onChange1}
                name={name1}
                setValue2={selectedRadioValue}
                handleRadioChange={handleRadioChange}
            // handleRadioClick={handleRadioClick3}
            />

            <Divider />

            <FormAvaliacaoInput2
                label1={'Medidas de Controle'}
                placeholder1={'Digite as Medidas de Controle'}
                type1={type6}
                value1={value6}
                name1={name6}
                onChange1={onChange6}
                isInvalid1={isInvalid6}
                register1={register6}
                error1={error6}
            />

            {/* <FormAvaliacaoInput2
                label1={'Classificação dos Riscos'}
                placeholder1={'Digite a Classificação dos Riscos'}
                type1={type7}
                value1={value7}
                name1={name7}
                onChange1={onChange7}
                isInvalid1={isInvalid7}
                register1={register7}
                error1={error7}
            /> */}

            <FormControl w={'100%'}>
                <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                    {'Classificação dos Riscos'}
                </FormLabel>
                <HStack w={'100%'} spacing={7} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidProbabilidade}>
                        {/* <SelectChackra
                            {...registerProbabilidade}
                            value={valueProbabilidade}
                            onChange={onChangeProbabilidade}
                        > */}
                        {/* <option value="" disabled>
                                Probabilidade
                            </option> */}
                        {/* @ts-ignore */}
                        {/* {probabilidadeOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameProbabilidade}
                                </option>
                            ))} */}
                        {/* </SelectChackra> */}
                        <FormMultiSelect
                            label={'Probabilidade'}
                            placeholder={'Digite a Probabilidade'}
                            isLoading={isLoading3}
                            onChangeSelect={onChangeSelect3}
                            handleCreate={handleCreate3}
                            options={options3}
                            valueSelect={valueSelect3}

                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidContinuacao}>
                        {/* <SelectChackra
                            {...registerContinuacao}
                            value={valueContinuacao}
                            onChange={onChangeContinuacao}
                        >
                            <option value="" disabled>
                                Continuação
                            </option> */}
                        {/* @ts-ignore */}
                        {/* {continuacaoOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameContinuacao}
                                </option>
                            ))}
                        </SelectChackra> */}
                        <FormMultiSelect
                            label={'Continuação'}
                            placeholder={'Digite a Continuação'}
                            isLoading={isLoading4}
                            onChangeSelect={onChangeSelect4}
                            handleCreate={handleCreate4}
                            options={options4}
                            valueSelect={valueSelect4}
                        />
                    </FormControl>
                </HStack>

                <HStack w={'100%'} spacing={7} mt={4} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidSeveridade}>
                        {/* <SelectChackra
                            {...registerSeveridade}
                            value={valueSeveridade}
                            onChange={onChangeSeveridade}
                        >
                            <option value="" disabled>
                                Severidade
                            </option> */}
                        {/* @ts-ignore */}
                        {/* {severidadeOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameSeveridade}
                                </option>
                            ))} */}
                        {/* </SelectChackra> */}
                        <FormMultiSelect
                            label={'Severidade'}
                            placeholder={'Digite a Severidade'}
                            isLoading={isLoading5}
                            onChangeSelect={onChangeSelect5}
                            handleCreate={handleCreate5}
                            options={options5}
                            valueSelect={valueSelect5}
                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidClassificacao}>
                        {/* <SelectChackra
                            {...registerClassificacao}
                            value={valueClassificacao}
                            onChange={onChangeClassificacao}
                        >
                            <option value="" disabled>
                                Classificação
                            </option> */}
                        {/* @ts-ignore */}
                        {/* {classificacaoOptions.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameClassificacao}
                                </option>
                            ))}
                        </SelectChackra> */}
                        <FormMultiSelect
                            label={'Classificação'}
                            placeholder={'Digite a Classificação'}
                            isLoading={isLoading6}
                            onChangeSelect={onChangeSelect6}
                            handleCreate={handleCreate6}
                            options={options6}
                            valueSelect={valueSelect6}
                        />
                    </FormControl>
                </HStack>
            </FormControl>

            {/* <FormButton label1={'Adicionar Registro Fotográfico'} /> */}

            <FormControl w={"100%"}>
                <FormLabel color={"#525F7F"} fontWeight={700} fontSize={"16px"}>
                    Registro Fotografico
                </FormLabel>
                <ImageUpload
                    value={valueImage}
                    disabled={disabledImage}
                    onChange={onChangeImage}
                    onRemove={onRemoveImage}
                    photos={photosImage}
                    onClick={onClickImage}
                />

            </FormControl>

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Cadastrar'} type={type} mt={'0'} onClick={onClick} />
            </Stack>
        </Stack>
    );
}

interface CardIdentificacaoDePerigosProps {
    type1?: any;
    type2?: any;
    type3?: any;
    type4?: any;
    type5?: any;
    type6?: any;
    type7?: any;
    type8?: any;
    type9?: any;
    onChange1?: any;
    onChange2?: any;
    onChange3?: any;
    onChange4?: any;
    onChange5?: any;
    onChange6?: any;
    onChange7?: any;
    onChange8?: any;
    onChange9?: any;
    name1?: any;
    name2?: any;
    name3?: any;
    name4?: any;
    name5?: any;
    name6?: any;
    name7?: any;
    name8?: any;
    name9?: any;
    value1?: any;
    value2?: any;
    value3?: any;
    value4?: any;
    value5?: any;
    value6?: any;
    value7?: any;
    value8?: any;
    value9?: any;
    onClick?: any;
    type?: any;
    isInvalid6?: any;
    isInvalid9?: any;
    register6?: any;
    register9?: any;
    error6?: any;
    error9?: any;
    isInvalidEmpresa?: any;
    isInvalidUnidade?: any;
    registerUnidade?: UseFormRegisterReturn;
    valueUnidade?: any;
    onChangeUnidade?: any;
    isInvalidArea?: any;
    unidadeOptions?: any;
    registerEmpresa?: any;
    valueEmpresa?: any;
    onChangeEmpresa?: any;
    empresaOptions?: any;
    registerArea?: any;
    valueArea?: any;
    onChangeArea?: any;
    areaOptions?: any;
    register?: UseFormRegisterReturn;
    onChange?: any;
    isInvalid?: any;
    value?: any;
    radioOptions?: any;
    selectedRadioValue?: any;
    handleRadioChange?: any;
    handleRadioClick?: any;
    selectedRadioValue2?: any;
    handleRadioChange2?: any;
    handleRadioClick2?: any;
    type10?: any;
    value10?: any;
    error10?: any;
    isInvalid10?: any;
    register10?: any;
    onChange10?: any;
    name10?: any;
    setValue2?: any;
    handleRadioChange3?: any;
    handleRadioClick3?: any;
    isLoading?: any;
    onChangeSelect?: any;
    handleCreate?: any;
    options?: any;
    valueSelect?: any;
    isLoading2?: any;
    onChangeSelect2?: any;
    handleCreate2?: any;
    options2?: any;
    valueSelect2?: any;
    perigoempresaId?: any
}

export function CardIdentificacaoDePerigos({
    type6,
    type9,
    name6,
    name9,
    value6,
    value9,
    onChange6,
    onChange9,
    onClick,
    type,
    isInvalid6,
    isInvalid9,
    register6,
    register9,
    error6,
    error9,
    isInvalidEmpresa,
    isInvalidUnidade,
    isInvalidArea,
    register,
    value,
    isInvalid,
    selectedRadioValue,
    handleRadioChange,
    handleRadioClick,
    selectedRadioValue2,
    handleRadioChange2,
    handleRadioClick2,
    type10,
    value10,
    error10,
    isInvalid10,
    register10,
    onChange10,
    name10,
    setValue2,
    handleRadioChange3,
    handleRadioClick3,
    isLoading,
    onChangeSelect,
    handleCreate,
    options,
    valueSelect,
    isLoading2,
    onChangeSelect2,
    handleCreate2,
    options2,
    valueSelect2,
    registerEmpresa,
    valueEmpresa,
    onChangeEmpresa,
    empresaOptions,
    perigoempresaId
}: CardIdentificacaoDePerigosProps) {
    return (
        <Stack
            bg={'#fff'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>

                    <SelectChackra
                        {...registerEmpresa}
                        // value={valueEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}


                    </SelectChackra>

                </FormControl>
                <HStack w={'100%'} spacing={7} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidUnidade}>

                        <FormMultiSelect
                            label={'Unidade'}
                            placeholder={'Digite a Unidade'}
                            isLoading={isLoading2}
                            onChangeSelect={onChangeSelect2}
                            handleCreate={handleCreate2}
                            options={options2}
                            valueSelect={valueSelect2}
                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidArea}>

                        <FormMultiSelect
                            label={'Área Avaliada'}
                            placeholder={'Digite a Área Avaliada'}
                            isLoading={isLoading}
                            onChangeSelect={onChangeSelect}
                            handleCreate={handleCreate}
                            options={options}
                            valueSelect={valueSelect}
                        />
                    </FormControl>
                </HStack>
            </Stack>

            <FormRadio2
                label1={'Fase do Levantamento Preliminar de Perigo'}
                label2={'Aspectos Ergonômicos'}
                radio1={
                    'Antes do início do funcionamento do estabelicimento ou novas instalações'
                }
                radio2={'Atividades Existentes'}
                radio3={
                    'Mudanças e introdução de novos processos ou atividades de trabalho'
                }
                radio4={'Físico'}
                radio5={'Organizacional'}
                radio6={'Cognitivo / Psicossocial'}
                register={register}
                isInvalid={isInvalid}
                value={value}
                selectedRadioValue={selectedRadioValue}
                handleRadioChange={handleRadioChange}
                handleRadioClick={handleRadioClick}
                selectedRadioValue2={selectedRadioValue2}
                handleRadioChange2={handleRadioChange2}
                handleRadioClick2={handleRadioClick2}
            />

            <FormOneInput
                label={'Perigo/Fator de Risco Ergonômico'}
                placeholder={'Digite o Perigo/Fator de Risco Ergonômico'}
                type={type6}
                value={value6}
                name={name6}
                onChange={onChange6}
                isInvalid={isInvalid6}
                register={register6}
                error={error6}
            />

            <Divider />

            <FormVariavel
                label={'Fontes e Circunstâncias para o Perigo'}
                placeholder={'Digite as Fontes e Circunstâncias para o Perigo'}
                label2={'Há perigos externos relacionados ao trabalho?'}
                type={type10}
                value={value10}
                name={name10}
                onChange={onChange10}
                isInvalid={isInvalid10}
                register={register10}
                error={error10}
                setValue2={setValue2}
                handleRadioChange={handleRadioChange3}
                handleRadioClick={handleRadioClick3}
            />

            <FormOneInput
                label={'Possíveis Lesões e Agravos'}
                placeholder={'Digite as Possíveis Lesões e Agravos'}
                type={type9}
                value={value9}
                name={name9}
                onChange={onChange9}
                isInvalid={isInvalid9}
                register={register9}
                error={error9}
            />

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Salvar'} mt={'0'} type={type} onClick={onClick} />
            </Stack>
        </Stack>
    );
}

interface CardPlanodeAcaoProps {
    type1?: any;
    value1?: any;
    error1?: any;
    isInvalid1?: any;
    register1?: UseFormRegisterReturn;
    onChange1?: any;
    name1?: any;
    type2?: any;
    value2?: any;
    error2?: any;
    isInvalid2?: any;
    register2?: UseFormRegisterReturn;
    onChange2?: any;
    name2?: any;
    type3?: any;
    value3?: any;
    error3?: any;
    isInvalid3?: any;
    register3?: UseFormRegisterReturn;
    onChange3?: any;
    name3?: any;
    type4?: any;
    value4?: any;
    error4?: any;
    isInvalid4?: any;
    register4?: UseFormRegisterReturn;
    onChange4?: any;
    name4?: any;
    type5?: any;
    value5?: any;
    error5?: any;
    isInvalid5?: any;
    register5?: UseFormRegisterReturn;
    onChange5?: any;
    name5?: any;
    type6?: any;
    value6?: any;
    error6?: any;
    isInvalid6?: any;
    register6?: UseFormRegisterReturn;
    onChange6?: any;
    name6?: any;
    type7?: any;
    value7?: any;
    error7?: any;
    isInvalid7?: any;
    register7?: UseFormRegisterReturn;
    onChange7?: any;
    name7?: any;
    type8?: any;
    value8?: any;
    error8?: any;
    isInvalid8?: any;
    register8?: UseFormRegisterReturn;
    onChange8?: any;
    name8?: any;
    type9?: any;
    value9?: any;
    error9?: any;
    isInvalid9?: any;
    register9?: UseFormRegisterReturn;
    onChange9?: any;
    name9?: any;
    type10?: any;
    value10?: any;
    error10?: any;
    isInvalid10?: any;
    register10?: UseFormRegisterReturn;
    onChange10?: any;
    name10?: any;
    type11?: any;
    value11?: any;
    error11?: any;
    isInvalid11?: any;
    register11?: UseFormRegisterReturn;
    onChange11?: any;
    name11?: any;
    type12?: any;
    value12?: any;
    error12?: any;
    isInvalid12?: any;
    register12?: UseFormRegisterReturn;
    onChange12?: any;
    name12?: any;
    isInvalidEmpresa?: any;
    registerEmpresa?: UseFormRegisterReturn;
    valueEmpresa?: any;
    onChangeEmpresa?: any;
    isInvalidUnidade?: any;
    registerUnidade?: UseFormRegisterReturn;
    valueUnidade?: any;
    onChangeUnidade?: any;
    isInvalidArea?: any;
    valueArea?: any;
    onChangeArea?: any;
    registerArea?: UseFormRegisterReturn;
    type?: any;
    unidadeOptions?: any;
    empresaOptions?: any;
    areaOptions?: any;
    onClick?: any;
    isLoading2?: any,
    onChangeSelect2?: any,
    handleCreate2?: any,
    options2?: any,
    valueSelect2?: any,
    isLoading?: any,
    onChangeSelect?: any,
    handleCreate?: any,
    options?: any,
    valueSelect?: any,
}

interface CardGenerateProps {
    onClick?: any;
    typeEmpresa?: any;
    valueEmpresa?: any;
    errorEmpresa?: any;
    isInvalidEmpresa?: any;
    registerEmpresa?: UseFormRegisterReturn;
    onChangeEmpresa?: any;
    nameEmpresa?: any;
    typeUnidade?: any;
    valueUnidade?: any;
    errorUnidade?: any;
    isInvalidUnidade?: any;
    registerUnidade?: UseFormRegisterReturn;
    onChangeUnidade?: any;
    nameUnidade?: any;
    typeArea?: any;
    valueArea?: any;
    errorArea?: any;
    isInvalidArea?: any;
    registerArea?: UseFormRegisterReturn;
    onChangeArea?: any;
    nameArea?: any;
    unidadeOptions?: any;
    areaOptions?: any;
    empresaOptions?: any;
    isInvalidAEP?: any;
    nameAEP?: any;
    AEPOptions?: any;
    registerAEP?: any;
    onChangeAEP?: any;
    valueAEP?: any;
    isInvalidPerigo?: any;
    namePerigo?: any;
    PerigoOptions?: any;
    registerPerigo?: any;
    onChangePerigo?: any;
    valuePerigo?: any;
    isInvalidRisco?: any;
    nameRisco?: any;
    RiscoOptions?: any;
    registerRisco?: any;
    onChangeRisco?: any;
    valueRisco?: any;
    isInvalidPlano?: any;
    namePlano?: any;
    PlanoOptions?: any;
    registerPlano?: any;
    onChangePlano?: any;
    valuePlano?: any;
}

export function CardGenerate({
    onClick,
    valueEmpresa,
    isInvalidEmpresa,
    registerEmpresa,
    onChangeEmpresa,
    empresaOptions,
}: CardGenerateProps) {
    return (
        <Stack
            bg={'#F7FAFC'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>
                    <SelectChackra
                        {...registerEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectChackra>
                </FormControl>
            </Stack>

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Gerar'} mt={'0'} onClick={onClick} />
            </Stack>
        </Stack>
    );
}

export function CardGenerateExcell({
    valueEmpresa,
    isInvalidEmpresa,
    registerEmpresa,
    onChangeEmpresa,
    empresaOptions,
}: CardGenerateProps) {
    const { ExcelDownloder, Type } = useExcelDownloder();
    const data = {
        Data1: [
            {
                identificacao: 'Razão Social',
                dado: 'ERGOGROUP-Segurança do Trabalho Ltda.',
            },
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
            {
                responsavel: 'Habilatação',
                info: 'Fisioterapeuta / Especialista em Ergonomia',
            },
            { responsavel: 'Registro', info: 'CREFITO 4/127866F' },
        ],

        Data3: [
            {
                Rev: 'Nome',
                DATA: 'Amanda Viviane Muniz Rodrigues',
                Executado: 'ERGOGROUP',
                Verificado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda',
                DESCRICAOEOUFOLHASATINGIDAS: 'Emissão Inicial',
            },
        ],

        Data4: [
            {
                identificacao: 'Razão Social',
                dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda',
            },
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
            {
                identificacao: 'Atividade Principal',
                dado: 'Produção de Açúcar, Álcool e Energia Elétrica',
            },
            { identificacao: 'Grau de Risco', dado: '3' },
        ],

        Data5: [
            { Gestor: 'Nome', Dado: 'Valéria Cristina Lellis Jorge' },
            { Gestor: 'Telefone', Dado: '(17) 3330.3385' },
            { Gestor: 'Email', Dado: 'valeria.jorge@colorado.com.br' },
        ],

        Data6: [
            {
                Titulo: 'Empresa',
                Dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda.',
            },
            { Titulo: 'Unidade', Dado: 'Guaira-SP' },
            { Titulo: 'Área Avaliada', Dado: 'Agricola' },
            { Titulo: 'Data da Elaboração', Dado: '14/03/2023' },
            { Titulo: 'Revisão do Codumento', Dado: '00/2023' },

            { Titulo: 'Setor', Dado: 'Administração' },
            { Titulo: 'Cargo/Função', Dado: 'Almoxarife Jr.' },
            { Titulo: 'Tipo de Atividade', Dado: 'Operacional' },

            {
                Titulo: 'Jornada de Trabalho',
                Dado: 'De segunda a sexta das 07h as 17h',
            },
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
        <Stack
            bg={'#F7FAFC'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={'9%'}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>
                    <SelectChackra
                        {...registerEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectChackra>
                </FormControl>
            </Stack>
            <Stack w={'100%'} align={'end'}>
                <ExcelDownloder
                    data={data}
                    filename={'tabelas'}
                    type={Type.Button} // or type={'button'}
                >
                    {/* <ButtonAd text={"Gerar"} mt={"0"} onClick={onClick} /> */}
                    Gerar
                </ExcelDownloder>
            </Stack>
        </Stack>
    );
}

export function CardPlanodeAcao({
    type10,
    type11,
    type12,
    type1,
    type2,
    type3,
    type4,
    type5,
    type6,
    type7,
    type8,
    type9,
    value10,
    value11,
    value12,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    valueEmpresa,
    error10,
    error11,
    error12,
    error1,
    error2,
    error3,
    error4,
    error5,
    error6,
    error7,
    error8,
    error9,
    isInvalid10,
    isInvalid11,
    isInvalid12,
    isInvalid1,
    isInvalid2,
    isInvalid3,
    isInvalid4,
    isInvalid5,
    isInvalid6,
    isInvalid7,
    isInvalid8,
    isInvalid9,
    isInvalidEmpresa,
    isInvalidUnidade,
    register10,
    register11,
    register12,
    register1,
    register2,
    register3,
    register4,
    register5,
    register6,
    register7,
    register8,
    register9,
    registerEmpresa,
    onChange10,
    onChange11,
    onChange12,
    onChange1,
    onChange2,
    onChange3,
    onChange4,
    onChange5,
    onChange6,
    onChange7,
    onChange8,
    onChange9,
    onChangeEmpresa,
    name10,
    name11,
    name12,
    name1,
    name2,
    name3,
    name4,
    name5,
    name6,
    name7,
    name8,
    name9,
    isInvalidArea,
    type,
    empresaOptions,
    onClick,
    isLoading2,
    onChangeSelect2,
    handleCreate2,
    options2,
    valueSelect2,
    isLoading,
    onChangeSelect,
    handleCreate,
    options,
    valueSelect,
}: CardPlanodeAcaoProps) {
    return (
        <Stack
            bg={'#fff'}
            borderRadius={'8px'}
            align={'start'}
            spacing={9}
            mt={{ xl: '9%', lg: '12%', md: '3%', xxs: '3%' }}
            px={10}
            py={9}
            boxShadow={'0px 0px 32px 0px rgba(136, 152, 170, 0.15)'}
        >
            <Stack w={'100%'} spacing={7}>
                <FormControl w={'100%'} isInvalid={isInvalidEmpresa}>
                    <FormLabel color={'#525F7F'} fontWeight={700} fontSize={'16px'}>
                        {'Empresa'}
                    </FormLabel>
                    <SelectChackra
                        {...registerEmpresa}
                        value={valueEmpresa}
                        onChange={onChangeEmpresa}
                    >
                        <option value="" disabled>
                            Selecione uma empresa
                        </option>
                        {/* @ts-ignore */}
                        {empresaOptions.map((option, index) => (
                            <option key={index} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </SelectChackra>
                </FormControl>
                <HStack w={'100%'} spacing={7} align={'start'}>
                    <FormControl w={'50%'} isInvalid={isInvalidUnidade}>
                        <FormMultiSelect
                            label={'Unidade'}
                            placeholder={'Digite a Unidade'}
                            isLoading={isLoading2}
                            onChangeSelect={onChangeSelect2}
                            handleCreate={handleCreate2}
                            options={options2}
                            valueSelect={valueSelect2}
                        />
                    </FormControl>
                    <FormControl w={'50%'} isInvalid={isInvalidArea}>
                        <FormMultiSelect
                            label={'Area Avaliada'}
                            placeholder={'Digite a Area Avaliada'}
                            isLoading={isLoading}
                            onChangeSelect={onChangeSelect}
                            handleCreate={handleCreate}
                            options={options}
                            valueSelect={valueSelect}
                        />

                    </FormControl>
                </HStack>
            </Stack>

            <FormAvaliacao
                label1={'O que fazer?'}
                placeholder1={'Digite a Ação necessária'}
                label2={'Legislação'}
                placeholder2={'Digite a Legislação pertinente'}
                type1={type1}
                value1={value1}
                error1={error1}
                isInvalid1={isInvalid1}
                register1={register1}
                onChange1={onChange1}
                name1={name1}
                type2={type2}
                value2={value2}
                error2={error2}
                isInvalid2={isInvalid2}
                register2={register2}
                onChange2={onChange2}
                name2={name2}
            />

            <FormAvaliacao
                label1={'Origem da Demanda'}
                placeholder1={'Digite a Origem da demanda'}
                label2={'Onde?'}
                placeholder2={'Digite o Cargo/Função'}
                type1={type3}
                value1={value3}
                error1={error3}
                isInvalid1={isInvalid3}
                register1={register3}
                onChange1={onChange3}
                name1={name3}
                type2={type4}
                value2={value4}
                error2={error4}
                isInvalid2={isInvalid4}
                register2={register4}
                onChange2={onChange4}
                name2={name4}
            />

            <Divider />

            <FormAvaliacao
                label1={'Por que?'}
                placeholder1={'Digite o Risco Econômico'}
                label2={'Responsável'}
                placeholder2={'Digite o Responsável'}
                type1={type5}
                value1={value5}
                error1={error5}
                isInvalid1={isInvalid5}
                register1={register5}
                onChange1={onChange5}
                name1={name5}
                type2={type6}
                value2={value6}
                error2={error6}
                isInvalid2={isInvalid6}
                register2={register6}
                onChange2={onChange6}
                name2={name6}
            />

            <FormAvaliacaoInput
                label1={'Quando?'}
                placeholder1={'Digite quando deverá ser executado'}
                label2={'Prazo'}
                placeholder2={'Digite o prazo em dias'}
                type1={type7}
                value1={value7}
                error1={error7}
                isInvalid1={isInvalid7}
                register1={register7}
                onChange1={onChange7}
                name1={name7}
                type2={type8}
                value2={value8}
                error2={error8}
                isInvalid2={isInvalid8}
                register2={register8}
                onChange2={onChange8}
                name2={name8}
            />

            <FormAvaliacaoInput
                label1={'Previsão de Término'}
                placeholder1={'Digite a previsão do término'}
                label2={'Término Real'}
                placeholder2={'Digite a data do término real'}
                type1={type9}
                value1={value9}
                error1={error9}
                isInvalid1={isInvalid9}
                register1={register9}
                onChange1={onChange9}
                name1={name9}
                type2={type10}
                value2={value10}
                error2={error10}
                isInvalid2={isInvalid10}
                register2={register10}
                onChange2={onChange10}
                name2={name10}
            />

            <Divider />

            <FormTextArea
                label={'Status'}
                placeholder={'Digite o status'}
                type={type11}
                value={value11}
                error={error11}
                isInvalid={isInvalid11}
                register={register11}
                onChange={onChange11}
                name={name11}
            />

            <FormTextArea
                label={'Evidência'}
                placeholder={'Digite a evidência encontrada'}
                type={type12}
                value={value12}
                error={error12}
                isInvalid={isInvalid12}
                register={register12}
                onChange={onChange12}
                name={name12}
            />

            <Stack w={'100%'} align={'end'}>
                <ButtonAd text={'Cadastrar'} mt={'0'} type={type} onClick={onClick} />
            </Stack>
        </Stack>
    );
}
