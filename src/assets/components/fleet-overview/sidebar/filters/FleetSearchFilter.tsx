import {cn, Input} from "@nextui-org/react";
import {Icon} from "@iconify-icon/react";

interface FleetSearchFilterProps
{
    onSearchChange: (search: string) => void;
}

export default function FleetSearchFilter(props: FleetSearchFilterProps)
{
    return (
        <Input
            label={"Search"}
            variant={"bordered"}
            startContent={<Icon icon={"mage:search"} width={20} className={"text-white/40"}/>}
            className={"w-full"}
            size={"sm"}
            onValueChange={props.onSearchChange}
            classNames={{
                inputWrapper: cn(
                    "border-white/10 border-1 !transition-all !duration-[250ms]",
                    "data-[focus=true]:!border-primary"
                ),
                input: "placeholder:text-white/40"
            }}
            placeholder={"Trailer CXZK"}
            isClearable
        />
    );
}