import FleetFilters from "./FleetFilters.tsx";
import FleetList from "./FleetList.tsx";

interface FleetSidebarProps
{
}

export default function FleetSidebar(_props: FleetSidebarProps)
{

    return (
        <div className={"flex flex-col w-[500px] h-full gap-6 p-8 fixed z-[1001] bg-background/80 backdrop-blur-sm backdrop-contrast-150"}>
            <h1 className={"text-3xl border-b-1 border-b-white/10 pb-2"}>Fleet</h1>
            <FleetFilters
                onSearch={_ =>
                {
                }}
                onStatusChange={_ =>
                {
                }}
            />

            <FleetList/>

        </div>
    );
}