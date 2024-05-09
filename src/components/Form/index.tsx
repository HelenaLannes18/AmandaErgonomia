import { FormControl, FormLabel, HStack, Input, Radio, RadioGroup, Select, Stack, Textarea } from "@chakra-ui/react"
import React, { ReactNode, useEffect, useState } from "react"
import { ButtonImage } from "../Button"
import { UseFormRegisterReturn } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import CreatableSelect from "react-select/creatable";

interface SelectOneProps {
    label1: string
}

export function SelectOne({ label1 }: SelectOneProps) {
    return (
        <FormControl
            w={"100%"}
        >
            <FormLabel
                color={"#525F7F"}
                fontWeight={700}
                fontSize={"16px"}
            >
                {label1}
            </FormLabel>
            <Select
                bg={"white"}
                borderRadius={"6px"}
                fontSize={"16px"}
                fontWeight={400}
                boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}

            />
        </FormControl>

    )
}


interface FormLoginProps {
    label?: string;
    type: string;
    placeholder: string;
    onChange: any;
    value?: string;
    name?: string;
    id?: string;

}

export function FormLogin({ label, type, placeholder, onChange, value, id, name }: FormLoginProps) {

    return (
        <FormControl
            w={"100%"}
        >
            <FormLabel color={"white"} fontSize={"14px"}>{label}</FormLabel>
            <Input name={name} id={id} bg={"white"} fontSize={"16px"} border="none" type={type} placeholder={placeholder} onChange={onChange} value={value} />
        </FormControl>
    )
}

interface FormOneInputProps {
    label?: string
    placeholder?: string
    type?: string
    isInvalid?: any
    register?: UseFormRegisterReturn
    error?: any
    value?: any
    onChange?: any
    name?: any
    onInput?: any
    isLoading?: any
    handleCreate?: any
    onChangeSelect?: any
    options?: any
    valueSelect?: any
}

export function FormOneInput({ label, placeholder, type, isInvalid, register, error, value, onChange, name, onInput, }: FormOneInputProps) {
    return (
        <>
            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                    onInput={onInput}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
        </>

    )
}


export function FormMultiSelect({ label, isLoading, handleCreate, onChangeSelect, options, valueSelect }: FormOneInputProps) {
    return (
        <>
            <FormControl
                w={"100%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <CreatableSelect
                    isMulti
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={onChangeSelect}
                    onCreateOption={handleCreate}
                    options={options}
                    value={valueSelect}
                />
            </FormControl>

        </>

    )
}

interface FormAvaliacaoProps {
    label1: string
    placeholder1: string
    label2: string
    placeholder2: string
    type1?: any
    value1?: any
    error1?: any
    isInvalid1?: any
    register1?: UseFormRegisterReturn
    onChange1?: any
    name1?: any
    type2?: any
    value2?: any
    error2?: any
    isInvalid2?: any
    register2?: UseFormRegisterReturn
    onChange2?: any
    name2?: any

}

export function FormAvaliacao({ label1, placeholder1, label2, placeholder2, type1, type2, value1, value2, error1, error2, isInvalid1, isInvalid2, onChange1, onChange2, name1, name2, register1, register2 }: FormAvaliacaoProps) {
    return (
        <HStack
            spacing={7}
            w={"100%"}
            align={"end"}

        >
            <FormControl
                w={"50%"}
                isInvalid={isInvalid1}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type1}
                    name={name1}
                    value={value1}
                    placeholder={placeholder1}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register1}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange1}
                />
            </FormControl>
            {error1 && (
                <span style={{ color: "red" }}>{error1}</span>
            )}


            <FormControl
                w={"50%"}
                isInvalid={isInvalid2}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type2}
                    name={name2}
                    value={value2}
                    placeholder={placeholder2}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register2}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange2}

                />
            </FormControl>
            {error2 && (
                <span style={{ color: "red" }}>{error2}</span>
            )}
        </HStack>
    )
}

interface SelectAvaliacaoProps {
    label1: string
    label2: string
    label3: string
}

export function SelectAvaliacao({ label1, label2, label3 }: SelectAvaliacaoProps) {
    return (
        <Stack
            w={"100%"}
            spacing={7}
        >
            <FormControl
                w={"100%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>
                <Select />
            </FormControl>
            <HStack
                w={"100%"}
                spacing={7}
                align={"start"}
            >
                <FormControl
                    w={"50%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label2}
                    </FormLabel>
                    <Select />
                </FormControl>
                <FormControl
                    w={"50%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label3}
                    </FormLabel>
                    <Select />
                </FormControl>



            </HStack>
        </Stack>
    )
}

interface FormAvaliacaoInputProps {
    label1?: string
    type1?: string
    value1?: any
    placeholder1?: string
    label2?: string
    type2?: string
    value2?: any
    placeholder2?: string
    isInvalid1?: any
    isInvalid2?: any
    register1?: UseFormRegisterReturn
    register2?: UseFormRegisterReturn
    error1?: any
    error2?: any
    onChange1?: any
    onChange2?: any
    name1?: any
    name2?: any
    onInput1?: any
    onInput2?: any
    isLoading?: any
    onChangeSelect?: any
    handleCreate?: any
    options?: any
    valueSelect?: any
}

export function FormAvaliacaoInput({ label1, type1, placeholder1, label2, type2, placeholder2, isInvalid1, isInvalid2, value1, value2, error1, error2, register1, register2, onChange1, onChange2, name1, name2 }: FormAvaliacaoInputProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >
            <FormControl
                w={"50%"}
                isInvalid={isInvalid1}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>
                <Input
                    type={type1}
                    value={value1}
                    name={name1}
                    placeholder={placeholder1}
                    {...register1}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange1}
                />
            </FormControl>
            {error1 && (
                <span style={{ color: "red" }}>{error1}</span>
            )}
            <FormControl
                w={"50%"}
                isInvalid={isInvalid2}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <Input
                    type={type2}
                    name={name2}
                    value={value2}
                    placeholder={placeholder2}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register2}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange2}
                />
            </FormControl>
            {error2 && (
                <span style={{ color: "red" }}>{error2}</span>
            )}
        </HStack>

    )
}



export function FormAvaliacaoInputDate({ label, placeholder, type, name, value, error, register, isInvalid, onChange, defaultValue, label2, placeholder2, type2, name2, value2, error2, register2, isInvalid2, onChange2, defaultValue2 }: FormTextAreaProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >
            <FormControl
                w={"50%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                    defaultValue={defaultValue}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}

            <FormControl
                w={"50%"}
                isInvalid={isInvalid2}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <Input
                    type={type2}
                    name={name2}
                    value={value2}
                    placeholder={placeholder2}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register2}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange2}
                    defaultValue={defaultValue2}
                />
            </FormControl>
            {error2 && (
                <span style={{ color: "red" }}>{error2}</span>
            )}
        </HStack>

    )
}



export function FormAvaliacaoMulti({ label1, label2, type2, placeholder2, isInvalid1, isInvalid2, value2, error1, error2, register2, onChange2, name2, isLoading, onChangeSelect, handleCreate, options, valueSelect }: FormAvaliacaoInputProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >
            <FormControl
                w={"50%"}
                isInvalid={isInvalid1}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>

                <CreatableSelect
                    isMulti
                    isClearable
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    onChange={onChangeSelect}
                    onCreateOption={handleCreate}
                    options={options}
                    value={valueSelect}
                />
            </FormControl>
            {error1 && (
                <span style={{ color: "red" }}>{error1}</span>
            )}
            <FormControl
                w={"50%"}
                isInvalid={isInvalid2}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <Input
                    type={type2}
                    name={name2}
                    value={value2}
                    placeholder={placeholder2}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register2}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange2}
                />
            </FormControl>
            {error2 && (
                <span style={{ color: "red" }}>{error2}</span>
            )}
        </HStack>

    )
}



interface FormAvaliacaoInputThreeProps {
    label1?: string
    type1?: string
    value1?: any
    placeholder1?: string
    isInvalid1?: any
    register1?: UseFormRegisterReturn
    onChange1?: any
    onInput1?: any
    name1?: any
    error1?: any
    label2?: string
    type2?: string
    value2?: any
    placeholder2?: string
    isInvalid2?: any
    register2?: UseFormRegisterReturn
    error2?: any
    onChange2?: any
    name2?: any
    onInput2?: any
    label3?: string
    type3?: string
    value3?: any
    placeholder3?: string
    isInvalid3?: any
    register3?: UseFormRegisterReturn
    onChange3?: any
    onInput3?: any
    name3?: any
    error3?: any
}

export function FormAvaliacaoInputThree({ label1, type1, placeholder1, label2, type2, placeholder2, isInvalid1, isInvalid2, value1, value2, error1, error2, register1, register2, onChange1, onChange2, name1, name2, label3, type3, value3, placeholder3, register3, isInvalid3, onChange3, name3, error3 }: FormAvaliacaoInputThreeProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >
            <FormControl
                w={"40%"}
                isInvalid={isInvalid1}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>
                <Input
                    type={type1}
                    value={value1}
                    name={name1}
                    placeholder={placeholder1}
                    {...register1}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange1}
                />
            </FormControl>
            {error1 && (
                <span style={{ color: "red" }}>{error1}</span>
            )}
            <FormControl
                w={"40%"}
                isInvalid={isInvalid2}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <Input
                    type={type2}
                    name={name2}
                    value={value2}
                    placeholder={placeholder2}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register2}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange2}
                />
            </FormControl>
            {error2 && (
                <span style={{ color: "red" }}>{error2}</span>
            )}

            <FormControl
                w={"40%"}
                isInvalid={isInvalid3}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label3}
                </FormLabel>
                <Input
                    type={type3}
                    name={name3}
                    value={value3}
                    placeholder={placeholder3}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register3}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange3}
                />
            </FormControl>
            {error3 && (
                <span style={{ color: "red" }}>{error3}</span>
            )}
        </HStack>

    )
}





export function FormAvaliacaoInput2({ label1, type1, placeholder1, isInvalid1, value1, error1, register1, onChange1, name1 }: FormAvaliacaoInputProps) {
    return (
        <>
            <FormControl
                w={"100%"}
                isInvalid={isInvalid1}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label1}
                </FormLabel>
                <Input
                    type={type1}
                    value={value1}
                    name={name1}
                    placeholder={placeholder1}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register1}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange1}
                />


            </FormControl>

            {error1 && (
                <span style={{ color: "red" }}>{error1}</span>
            )}

        </>

    )
}


interface FormTextAreaProps {
    label: string
    placeholder: string
    type?: any
    onChange?: any
    name?: any
    value?: any
    error?: any
    isInvalid?: any
    register?: UseFormRegisterReturn
    defaultValue?: any
    label2?: string
    placeholder2?: string
    type2?: any
    onChange2?: any
    name2?: any
    value2?: any
    error2?: any
    isInvalid2?: any
    register2?: UseFormRegisterReturn
    defaultValue2?: any
}

interface FormThreeInputProps {
    label: string
    placeholder: string
    type: string
    label2: string
    placeholder2: string
    type2: string
    label3: string
    placeholder3: string
    type3: string


}

export function FormThreeInput({ label, placeholder, type, label2, placeholder2, type2, label3, placeholder3, type3 }: FormThreeInputProps) {
    return (
        <>
            <HStack
                display={{ md: "flex", xxs: "none" }}
            >
                <FormControl
                    w={"30%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label}
                    </FormLabel>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
                <FormControl
                    w={"30%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label2}
                    </FormLabel>
                    <Input
                        type={type2}
                        placeholder={placeholder2}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
                <FormControl
                    w={"30%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label3}
                    </FormLabel>
                    <Input
                        type={type3}
                        placeholder={placeholder3}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
            </HStack>
            <Stack
                display={{ md: "none", xxs: "flex" }}
                w={"100%"}
            >
                <FormControl
                    w={"100%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label}
                    </FormLabel>
                    <Input
                        type={type}
                        placeholder={placeholder}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
                <FormControl
                    w={"100%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label2}
                    </FormLabel>
                    <Input
                        type={type2}
                        placeholder={placeholder2}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
                <FormControl
                    w={"100%"}
                >
                    <FormLabel
                        color={"#525F7F"}
                        fontWeight={700}
                        fontSize={"16px"}
                    >
                        {label3}
                    </FormLabel>
                    <Input
                        type={type3}
                        placeholder={placeholder3}
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                    />
                </FormControl>
            </Stack>
        </>
    )
}

export function FormTextArea({ label, placeholder, type, name, value, error, register, isInvalid, onChange }: FormTextAreaProps) {
    return (
        <>
            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
        </>

    )
}

export function FormTextDateInput({ label, placeholder, type, name, value, error, register, isInvalid, onChange, defaultValue }: FormTextAreaProps) {
    return (
        <>
            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                    defaultValue={defaultValue}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
        </>

    )
}

interface FormVariavelProps {
    label?: string
    placeholder?: string
    label2: string
    label3?: string
    children?: ReactNode
    setValue2?: any
    setValue3?: any
    valueRadio?: any
    isInvalid?: any
    type?: any
    onChange?: any
    error?: any
    register?: UseFormRegisterReturn
    name?: any
    value?: any
    handleRadioClick?: any
    handleRadioClick2?: any
    handleRadioChange?: any
    handleRadioChange2?: any
    selectedRadioValue?: any
    selectedRadioValue2?: any
}

export function FormVariavel({ label, placeholder, label2, children, setValue2, register, error, onChange, type, isInvalid, name, value, handleRadioClick, handleRadioChange }: FormVariavelProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >

            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={setValue2} onChange={handleRadioChange}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick}>Não</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
        </HStack>

    )
}



export function FormVariavel2({ label, placeholder, label2, children, setValue2, register, error, onChange, type, isInvalid, name, value, handleRadioClick, handleRadioChange, }: FormVariavelProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >

            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={setValue2} onChange={(value) => handleRadioChange(value)}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick}>Não</Radio>
                        <Radio value='outros'>Outros</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
        </HStack>

    )
}


export function FormVariavel3({ label, placeholder, label2, children, register, error, onChange, type, isInvalid, name, value, handleRadioClick, handleRadioChange, selectedRadioValue }: FormVariavelProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >

            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Textarea
                    //@ts-ignore
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={selectedRadioValue} onChange={handleRadioChange}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick}>Não</Radio>
                        <Radio value='outros'>Outros</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
        </HStack>

    )
}

export function FormVariavelInputMulti({ label2, children, handleRadioClick, handleRadioChange, selectedRadioValue, label3, handleRadioChange2, handleRadioClick2, selectedRadioValue2 }: FormVariavelProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >

            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label3}
                </FormLabel>
                <RadioGroup value={selectedRadioValue2} onChange={handleRadioChange2}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick2}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick2}>Não</Radio>
                        <Radio value='outros'>Outros</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={selectedRadioValue} onChange={handleRadioChange}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick}>Não</Radio>
                        <Radio value='outros'>Outros</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
        </HStack>

    )
}


export function FormVariavelNumber({ label, placeholder, label2, children, register, error, onChange, isInvalid, name, value, handleRadioClick, handleRadioChange, selectedRadioValue }: FormVariavelProps) {

    return (
        <HStack
            w={"100%"}
            spacing={7}
            align={"start"}
        >

            <FormControl
                w={"100%"}
                isInvalid={isInvalid}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label}
                </FormLabel>
                <Input
                    type={"number"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    bg={"white"}
                    borderRadius={"6px"}
                    fontSize={"16px"}
                    fontWeight={400}
                    boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                    {...register}
                    _placeholder={{
                        color: "#8898AA",
                    }}
                    onChange={onChange}
                />
            </FormControl>
            {error && (
                <span style={{ color: "red" }}>{error}</span>
            )}
            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={selectedRadioValue} onChange={handleRadioChange}>
                    <Stack >
                        <Radio value='true' onClick={handleRadioClick}>Sim</Radio>
                        <Radio value='false' onClick={handleRadioClick}>Não</Radio>
                        <Radio value='outros'>Outros</Radio>
                        {children}
                    </Stack>
                </RadioGroup>


            </FormControl>
        </HStack>

    )
}



interface FormButtonProps {
    label1: string
}

export function FormButton({ label1 }: FormButtonProps) {
    return (
        <FormControl
            w={"100%"}
        >
            {/* <FormLabel
                color={"#525F7F"}
                fontWeight={700}
                fontSize={"16px"}
            >
                {label1}
            </FormLabel> */}
            <ButtonImage text={"Adicionar Imagem"} />
        </FormControl>

    )
}

interface FormRadioProps {
    label1: string
    label2: string
    radio1: string
    radio2: string
    radio3?: string
    radio4?: string
    radio5?: string
    radio6?: string
    register?: any
    isInvalid?: any
    onChange?: any
    radioOptions?: any
    value?: any
    register1?: any
    isInvalid1?: any
    onChange1?: any
    radioOptions1?: any
    value1?: any
    selectedRadioValue?: any
    handleRadioChange?: any
    handleRadioClick?: any
    selectedRadioValue2?: any
    handleRadioChange2?: any
    handleRadioClick2?: any
}


export function FormRadio({ label1, label2, radio1, radio2, radio3, radio4, radio5, radio6, isInvalid, selectedRadioValue, handleRadioChange, handleRadioClick, selectedRadioValue2, handleRadioChange2, handleRadioClick2 }: FormRadioProps) {



    return (
        <HStack w={"100%"} spacing={7} align={"start"}>
            <FormControl w={"50%"} isInvalid={isInvalid}>
                <FormLabel color={"#525F7F"} fontWeight={700} fontSize={"16px"}>
                    {label1}
                </FormLabel>
                <RadioGroup value={selectedRadioValue} onChange={(value) => handleRadioChange(value)}>
                    <Stack>
                        <Radio value={radio1} onClick={handleRadioClick}>
                            {radio1}
                        </Radio>
                        <Radio value={radio2} onClick={handleRadioClick}>
                            {radio2}
                        </Radio>
                        <Radio value={radio3} onClick={handleRadioClick}>
                            {radio3}
                        </Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl
                w={"50%"}
            >
                <FormLabel
                    color={"#525F7F"}
                    fontWeight={700}
                    fontSize={"16px"}
                >
                    {label2}
                </FormLabel>
                <RadioGroup value={selectedRadioValue2} onChange={(value) => handleRadioChange2(value)}>
                    <Stack >
                        <Radio value={radio4} onClick={handleRadioClick2}>{radio4}</Radio>
                        <Radio value={radio5} onClick={handleRadioClick2}>{radio5}</Radio>
                        <Radio value={radio6} onClick={handleRadioClick2}>{radio6}</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </HStack>
    )
}


export function FormRadio2({ label1, radio1, radio2, radio3, selectedRadioValue, handleRadioChange, selectedRadioValue2, handleRadioChange2, radio4, radio5, radio6, label2 }: FormRadioProps) {
    return (
        <HStack w={"100%"} spacing={7} align={"start"}>
            <FormControl w={"50%"}>
                <FormLabel color={"#525F7F"} fontWeight={700} fontSize={"16px"}>
                    {label1}
                </FormLabel>
                <RadioGroup value={selectedRadioValue} onChange={handleRadioChange}>
                    <Stack spacing={3}>
                        <Radio value={radio1} >{radio1}</Radio>
                        <Radio value={radio2} >{radio2}</Radio>
                        <Radio value={radio3} >{radio3}</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>

            <FormControl w={"50%"}>
                <FormLabel color={"#525F7F"} fontWeight={700} fontSize={"16px"}>
                    {label2}
                </FormLabel>
                <RadioGroup value={selectedRadioValue2} onChange={handleRadioChange2}>
                    <Stack spacing={3}>
                        <Radio value={radio4} >{radio4}</Radio>
                        <Radio value={radio5} >{radio5}</Radio>
                        <Radio value={radio6} >{radio6}</Radio>
                    </Stack>
                </RadioGroup>
            </FormControl>
        </HStack>
    );
}



