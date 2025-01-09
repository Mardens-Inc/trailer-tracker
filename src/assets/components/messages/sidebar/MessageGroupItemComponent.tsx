import FleetItem from "../../../ts/fleet-item.ts";
import {Chip, cn} from "@nextui-org/react";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";
import {Icon} from "@iconify-icon/react";

interface FleetItemComponentProps
{
    fleetItem: FleetItem;
    selected: boolean;
    onClick: () => void;
}

export default function MessageGroupItemComponent(props: FleetItemComponentProps)
{
    const {fleetItem} = props;
    return (
        <div
            className={cn(
                "flex flex-col gap-2 p-2 border-b-1 border-foreground/10 cursor-pointer transition-colors",
                "hover:bg-foreground/10 hover:rounded-md hover:border-transparent",
                "data-[selected=true]:bg-primary/10 data-[selected=true]:rounded-md data-[selected=true]:border-transparent",
                "data-[selected=true]:hover:bg-primary/20"
            )}
            onClick={props.onClick}
            data-selected={props.selected}
        >
            <div className={"flex flex-row justify-between"}>
                <Chip radius={"sm"} size={"sm"}>{fleetItem.id}</Chip>
                <StatusIcon status={fleetItem.status}/>
            </div>
            <div className={"flex flex-row gap-2"}>
                <Icon icon="mingcute:send-fill" width="24" className={`text-${getStatusColor(fleetItem.status)}`}/>
                <p className={"text-lg font-normal"}>{fleetItem.name}</p>
                <p className={"text-lg font-light text-white/30"}>CKAR</p>
                <p className={"ml-auto text-white/30"}>26 min ago</p>
            </div>
            <p className={"opacity-50 italic line-clamp-2"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore </p>
        </div>
    );
}


function StatusIcon({status}: { status: FleetItemStatus })
{
    const color = `text-${getStatusColor(status)}`;
    switch (status)
    {
        case FleetItemStatus.Active:
            return <Icon icon={"mage:broadcast-fill"} width={18} className={color}/>;
        case FleetItemStatus.Inactive:
            return <Icon icon="mage:question-mark-circle-fill" width="18" className={color}/>;
        case FleetItemStatus.Danger:
            return <Icon icon={"mage:exclamation-circle-fill"} width={18} className={color}/>;
        case FleetItemStatus.Warning:
            return <Icon icon={"mage:exclamation-triangle-fill"} width={18} className={color}/>;
        case FleetItemStatus.Stationary:
            return <Icon icon={"mage:clock-fill"} width={18} className={color}/>;
        case FleetItemStatus.PickingUp:
            return <Icon icon={"mage:delivery-truck-fill"} width={18} className={color}/>;
        case FleetItemStatus.DroppingOff:
            return <Icon icon={"mage:clock-fill"} width={18} className={color}/>;
    }
}

function getStatusColor(status: FleetItemStatus): string
{
    switch (status)
    {
        case FleetItemStatus.Active:
            return "primary";
        case FleetItemStatus.Inactive:
            return "gray-300";
        case FleetItemStatus.Danger:
            return "danger";
        case FleetItemStatus.Stationary:
        case FleetItemStatus.Warning:
            return "warning";
        case FleetItemStatus.PickingUp:
            return "blue-500";
        case FleetItemStatus.DroppingOff:
            return "emerald-500";
    }
}