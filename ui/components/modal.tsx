import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";

import { VideoOptions } from "@/config/options";

export function ConfirmModal({ confirmModal, usedDefaultOptions, advancedOptions, renderVideo }:
    { confirmModal: ReturnType<typeof useDisclosure>, usedDefaultOptions: boolean, advancedOptions: VideoOptions | null, renderVideo: () => void }
) {
    return (
        <Modal isOpen={confirmModal.isOpen} onOpenChange={confirmModal.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Do you want to render the video?</ModalHeader>
                        <ModalBody>
                            <p>The video will be rendered with these settings: </p>
                            {usedDefaultOptions ? <Chip color="danger">No advanced options selected! Using default values!</Chip> : null}
                            <TableAdvancedOptions advancedOptions={advancedOptions} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                No
                            </Button>
                            <Button color="primary" onPress={() => {
                                onClose();
                                renderVideo();
                            }}>
                                Yes
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export const TableAdvancedOptions = ({ advancedOptions }: { advancedOptions: VideoOptions | null }) => {
    if (!advancedOptions) return null;

    const mainRows = Object.entries(advancedOptions)
        .filter(([_, value]) => typeof value !== "object")
        .map(([key, value]) => ({ key, name: key, value }));

    const internalRows = advancedOptions?.internalOptions
        ? Object.entries(advancedOptions.internalOptions).map(([key, value]) => {
            return { key, name: key, value: value.toString() };
        }) : [];

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "value",
            label: "VALUE",
        },
    ];

    return (
        <div>
            <Table shadow="lg" aria-label="Advanced Options">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={mainRows}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Accordion>
                <AccordionItem title="Internal Options" subtitle="Internal options that are not shown by default.">
                    <Table shadow="lg" aria-label="Internal Advanced Options">
                        <TableHeader columns={columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={internalRows}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </AccordionItem>
            </Accordion>
        </div>
    );
}