import {Tab, Tabs} from "@nextui-org/react";

interface ContentSelectorProps
{
    selected?: string;
    onSelectionChange: (value: string) => void;
}


export default function ContentSelector(props: ContentSelectorProps)
{
    return (
        <Tabs
            color={"primary"}
            variant={"light"}
            classNames={{
                tab: "bg-default/20 data-[selected=true]:!bg-default/0 data-[hover]:opacity-100 data-[hover]:bg-default/30 transition-colors",
                tabContent: "group-data-[selected=true]:text-primary",
                cursor: "bg-primary/20"
            }}
            onSelectionChange={value => props.onSelectionChange(value as string)}
            selectedKey={props.selected ?? "map"}
        >
            <Tab key={"map"} title={"Map"}/>
            <Tab key={"vehicles"} title={"Vehicles"}/>
            <Tab key={"drivers"} title={"Drivers"}/>
            <Tab key={"assets"} title={"Assets"}/>
        </Tabs>
    );
}