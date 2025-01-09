import FleetFilterDropdown from "./filters/FleetFilterDropdown.tsx";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";
import FleetSearchFilter from "../../fleet-overview/sidebar/filters/FleetSearchFilter.tsx";
import FleetStatusFilter from "../../fleet-overview/sidebar/filters/FleetStatusFilter.tsx";

interface FleetFiltersProps
{
    onSearch: (value: string) => void;
    onStatusChange: (value: FleetItemStatus | null) => void;
}

export default function MessageGroupFilters(props: FleetFiltersProps)
{
    return (
        <div className={"flex flex-row gap-2"}>
            <FleetSearchFilter onSearchChange={props.onSearch}/>
            <FleetStatusFilter onStatusChange={props.onStatusChange}/>
            <FleetFilterDropdown/>
        </div>
    );
}