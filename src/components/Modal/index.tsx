import { Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react"
import { ReactNode } from "react"

interface BasicModalProps {
    isOpen: any
    onClose: any
    onOpen: any
    children: ReactNode
}

export function BasicModal({ isOpen, onClose, onOpen, children }: BasicModalProps) {
    return (
        <>
            <Button
                p={2}
                cursor={"pointer"}
                fontSize={"20px"}
                bg={"transparent"}
                onClick={onOpen}
            >
                {children}
            </Button>

            <Modal size={"30%"} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w={"60%"} h={"228px"} alignItems={"center"} py={8}>
                    <ModalCloseButton />
                    <ModalBody
                        fontSize={"24px"}
                        color={'black'}
                        fontWeight={600}
                    >
                        Você tem certeza que deseja deletar esse registro?
                    </ModalBody>
                    <ModalFooter w="100%" justifyContent={"center"}>
                        <Button colorScheme='red' w={"13%"} mr={3} onClick={onClose}>
                            Não
                        </Button>
                        <Button colorScheme="blue"  w={"13%"}>Sim</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}