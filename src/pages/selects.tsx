import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
    createOption('One'),
    createOption('Two'),
    createOption('Three'),
];

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default () => {
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
        console.log(value)
    };

    const handleMultiChange = (newValue: Option[] | null) => {
        setValue(newValue);
        // Aqui você pode enviar os dados da API
        console.log(newValue); // Substitua por sua lógica de envio para a API
    };

    return (
        <>
            <CreatableSelect
                isMulti
                isClearable
                isDisabled={isLoading}
                isLoading={isLoading}
                //@ts-ignore
                onChange={(newValue) => setValue(newValue)}
                onCreateOption={handleCreate}
                options={options}
                value={value} />

            <Select
                isMulti
                name="colors"
                options={defaultOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                //@ts-ignore
                onChange={handleMultiChange}
                value={value} />
        </>
    );
};
