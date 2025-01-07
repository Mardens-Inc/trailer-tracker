import {useEffect, useState} from "react";
import FleetItem from "../../../ts/fleet-item.ts";
import FleetManagement from "../../../ts/fleet-management.ts";
import {Spinner} from "@nextui-org/react";

export default function FleetList()
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
            setTotalPages(Math.ceil(fleet.length / itemsPerPage));
            setItems(fleet);
        }).catch(error =>
        {
            console.log(error);
        }).finally(() =>
        {
            // setLoading(false);
        });
    }, []);
    return (
        <div className={"w-full"}>
            {loading ? <div className={"flex justify-center"}><Spinner label={"Loading Fleet..."} size={"lg"} color={"primary"}/></div> : null}
        </div>
    );
}