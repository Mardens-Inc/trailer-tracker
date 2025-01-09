import {useEffect, useState} from "react";
import FleetItem from "../../../ts/fleet-item.ts";
import FleetManagement from "../../../ts/fleet-management.ts";
import {Pagination, Spinner} from "@nextui-org/react";
import MessageGroupItemComponent from "./MessageGroupItemComponent.tsx";
import {FleetItemStatus} from "../../../ts/fleet-item-status.ts";

interface MessagesGroupListProps
{
    searchFilter: string;
    statusFilter: FleetItemStatus | null;
    onMessageGroupSelected: (messageGroup: FleetItem | null) => void;
    selectedMessageGroup: FleetItem | null;
}


export default function MessagesGroupList(props: MessagesGroupListProps)
{
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<FleetItem[]>([]);
    const [pageItems, setPageItems] = useState<FleetItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;


    useEffect(() =>
    {
        setLoading(true);
        FleetManagement.fleet().then(fleet =>
        {
            console.log(fleet);
            setPageItems(fleet.slice(0, itemsPerPage));
            setTotalPages(Math.floor(fleet.length / itemsPerPage));
            setItems(fleet);
        }).catch(error =>
        {
            console.log(error);
        }).finally(() =>
        {
            setLoading(false);
        });
    }, []);

    useEffect(() =>
    {
        setPageItems(items.slice((page - 1) * itemsPerPage, page * itemsPerPage));
    }, [page]);

    return (
        <div className={"w-full h-full overflow-y-hidden flex flex-col gap-2"}>
            {loading ? <div className={"flex justify-center"}><Spinner label={"Loading Fleet..."} size={"lg"} color={"primary"}/></div> : null}
            <div className={"w-full h-full overflow-y-auto flex flex-col gap-2 overflow-x-hidden"}>
                {pageItems.map(item => (
                    <MessageGroupItemComponent
                        key={item.id}
                        fleetItem={item}
                        selected={props.selectedMessageGroup === item}
                        onClick={() => props.selectedMessageGroup === item ? props.onMessageGroupSelected(null) : props.onMessageGroupSelected(item)}
                    />
                ))}
            </div>
            <Pagination
                total={totalPages}
                initialPage={1}
                page={page}
                onChange={setPage}
                showControls
                showShadow
                className={"mx-auto mt-4 py-3"}
            />
        </div>
    );
}