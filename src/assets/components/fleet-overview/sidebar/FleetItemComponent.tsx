import FleetItem from "../../../ts/fleet-item.ts";
import {Chip, Divider} from "@nextui-org/react";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";
import {Icon} from "@iconify-icon/react";

interface FleetItemComponentProps
{
    fleetItem: FleetItem;
    onFleetItemClick: (fleetItem: FleetItem) => void;
}

export default function FleetItemComponent(props: FleetItemComponentProps)
{
    const {fleetItem} = props;
    return (
        <div className={"flex flex-col gap-2 p-2 border-b-1 border-white/10"}>
            <div className={"flex flex-row justify-between"}>
                <Chip radius={"sm"} size={"sm"}>{fleetItem.id}</Chip>
                <StatusIcon status={fleetItem.status}/>
            </div>
            <div className={"flex flex-row gap-2"}>
                <Icon icon="mingcute:send-fill" width="24" className={`text-${getStatusColor(fleetItem.status)}`}/>
                <p className={"text-lg font-normal"}>{fleetItem.name}</p>
                <p className={"text-lg font-light text-foreground/30"}>CKAR</p>
                <p className={"ml-auto text-foreground/30"}>56km</p>
            </div>
            <div className={"flex flex-col items-start justify-start w-full opacity-50"}>
                <div className={"flex flex-row items-center gap-2"}>
                    <Icon icon={"mage:double-circle-fill"} width={16}/>
                    <p>1600 US-81, Pocasset, OK 73079</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" width="3" height="16" rx="1.5" fill="#D9D9D9"/>
                </svg>

                <div className={"flex flex-row items-center gap-2"}>
                    <Icon icon={"mage:map-marker-fill"} width={16}/>
                    <p>100 Benton Ave, Winslow, ME 04901</p>
                </div>
            </div>
            <div className={"flex flex-row items-center gap-2"}>
                <p className={"opacity-30"}>ETA: <span className={"font-bold"}>Oct. 4th 2025</span></p>
                <Divider orientation={"vertical"} className={"w-1 h-1"}/>
                <p className={"opacity-30"}>340 miles</p>
                <Divider orientation={"vertical"} className={"w-1 h-1"}/>
                <StatusMessage status={fleetItem.status}/>
            </div>
        </div>
    );
}


function StatusMessage({status}: { status: FleetItemStatus })
{
    const color = `text-${getStatusColor(status)}`;
    switch (status)
    {
        case FleetItemStatus.DroppingOff:
            return <p className={color}>Dropping Off</p>;
        case FleetItemStatus.PickingUp:
            return <p className={color}>Picking Up</p>;
        case FleetItemStatus.Stationary:
            return <p className={color}>Driver Stopped</p>;
        case FleetItemStatus.Warning:
            return <p className={color}>Warning!</p>;
        case FleetItemStatus.Danger:
            return <p className={color}>Danger!</p>;
        case FleetItemStatus.Inactive:
            return <p className={color}>Inactive</p>;
        case FleetItemStatus.Active:
            return <p className={color}>OK!</p>;
        default:
            return null;
    }
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