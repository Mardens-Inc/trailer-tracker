import MessageGroupFilters from "./MessageGroupFilters.tsx";
import MessagesGroupList from "./MessagesGroupList.tsx";
import FleetItem from "../../../ts/fleet-item.ts";
import {useState} from "react";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";

interface FleetSidebarProps
{
    selectedMessageGroup: FleetItem | null;
    onMessageGroupSelected: (messageGroup: FleetItem | null) => void;
}

export default function MessagesSidebar(props: FleetSidebarProps)
{
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<FleetItemStatus | null>(null);

    return (
        <div className={"flex flex-col w-[500px] h-full gap-6 p-8 z-[1001] bg-background/80 backdrop-blur-sm backdrop-contrast-150"}>
            <h1 className={"text-3xl border-b-1 border-b-foreground/10 pb-2"}>Messages</h1>
            <MessageGroupFilters
                onSearch={query =>
                {
                    setSearch(query);
                }}
                onStatusChange={status =>
                {
                    setStatus(status);
                }}
            />

            <MessagesGroupList
                selectedMessageGroup={props.selectedMessageGroup}
                onMessageGroupSelected={props.onMessageGroupSelected}
                searchFilter={search}
                statusFilter={status}
            />

        </div>
    );
}