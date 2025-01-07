import FleetStatusFilter from "./filters/FleetStatusFilter.tsx";
import FleetSearchFilter from "./filters/FleetSearchFilter.tsx";
import FleetFilterDropdown from "./filters/FleetFilterDropdown.tsx";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";

interface FleetFiltersProps
{
    onSearch: (value: string) => void;
    onStatusChange: (value: FleetItemStatus | null) => void;
}

export default function FleetFilters(props: FleetFiltersProps)
{
    return (
        <div className={"flex flex-row gap-2"}>
            <FleetSearchFilter onSearchChange={props.onSearch}/>
            <FleetStatusFilter onStatusChange={props.onStatusChange}/>
            <FleetFilterDropdown/>
        </div>
    );
}