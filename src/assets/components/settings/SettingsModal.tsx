import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs} from "@nextui-org/react";
import {TTButton} from "../variants/TTButton.tsx";
import {useState} from "react";
import InterfaceSettings from "./InterfaceSettings.tsx";
import About from "./About.tsx";

enum SettingsTab
{
    Interface = "interface",
    About = "about"
}

interface SettingsModalProps
{
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps)
{
    const [tab, setTab] = useState<SettingsTab>(SettingsTab.Interface);
    return (
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            size={"5xl"}
            scrollBehavior={"inside"}
            classNames={{
                wrapper: "z-[9999]",
                backdrop: "z-[9999]"
            }}
        >
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader
                            className={"flex flex-row items-center"}
                        >
                            Settings
                            <Tabs
                                variant={"underlined"}
                                color={"primary"}
                                onSelectionChange={key => setTab(key as SettingsTab)}
                                selectedKey={tab}
                            >
                                {Object.values(SettingsTab).map(tab => (
                                    <Tab key={tab} title={tab} className={"capitalize"}/>
                                ))}
                            </Tabs>
                        </ModalHeader>
                        <ModalBody>
                            {(() =>
                            {
                                switch (tab)
                                {
                                    case SettingsTab.Interface:
                                        return <InterfaceSettings/>;
                                    case SettingsTab.About:
                                        return <About/>;
                                }
                            })()}
                        </ModalBody>
                        <ModalFooter>
                            <TTButton onPress={onClose}>Save</TTButton>
                            <TTButton onPress={onClose} color={"danger"}>Cancel</TTButton>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}