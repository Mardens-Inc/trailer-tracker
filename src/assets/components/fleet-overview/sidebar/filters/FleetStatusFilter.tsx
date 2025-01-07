import {cn, Select, SelectItem} from "@nextui-org/react";
import {FleetItemStatus} from "../../../../ts/fleet-item-status.ts";

interface FleetStatusFilterProps
{
    onStatusChange: (status: FleetItemStatus | null) => void;
}

export default function FleetStatusFilter(props: FleetStatusFilterProps)
{
    return (
        <Select
            label={"Status"}
            placeholder={"Select"}
            variant={"bordered"}
            className={"w-48"}
            size={"sm"}
            onSelectionChange={value =>
            {
                let values = [...value];
                props.onStatusChange(values.length > 0 ? values[0] as FleetItemStatus : null);
            }}
            classNames={{
                trigger: cn(
                    "border-white/10 border-1",
                    "data-[focus=true]:!border-white/10 data-[open=true]:!border-primary"
                )
            }}
        >
            {Object.keys(FleetItemStatus).map(key => (
                <SelectItem key={key} textValue={key} value={key}>{key}</SelectItem>
            ))}
        </Select>
    );
}