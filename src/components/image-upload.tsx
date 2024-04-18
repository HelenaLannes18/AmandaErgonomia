import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';
import { Button, Flex, FormControl, FormLabel, HStack } from '@chakra-ui/react';
import Gallery from './Galery';
import { FormButton } from './Form';

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    photos: any;
    onClick: any
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
    photos,
    onClick
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    };

    if (!isMounted) {
        return null
    }

    return (
        <>
            <Flex justifyContent="flex-start" marginBottom="1rem">

                {/* <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            width={"20px"}
                            height={"20px"}
                            layout='fill'
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div> */}
                <CldUploadWidget onUpload={onUpload} uploadPreset="zitejvkj">
                    {({ open }) => {
                        const onClick = () => {
                            open();
                        };

                        return (

                            <Button
                                as="button"
                                w={{ md: "23%", xxs: "100%" }}
                                bg={"#296CB3"}
                                borderRadius={"8px"}
                                color={"#fff"}
                                fontSize={"16px"}
                                _hover={{
                                    bg: "#296CB3"
                                }}
                                type="button"
                                disabled={disabled}
                                variant="secondary"
                                onClick={onClick}

                            >
                                {'Adicionar Imagem'}
                            </Button>


                        );
                    }}
                </CldUploadWidget>

            </Flex>

            <HStack
                spacing={{ md: 6, xxs: 0 }}
                flexDir={{ md: "row", xxs: "column" }}
            >
                <Gallery photos={photos} onClick={onClick} />
            </HStack>
        </>
    )
}
export default ImageUpload;