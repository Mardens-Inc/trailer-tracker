import FleetFilters from "./FleetFilters.tsx";
import ContentSelector from "./ContentSelector.tsx";
import FleetList from "./FleetList.tsx";

interface FleetSidebarProps
{
    contentSelection: string;
    onContentSelectionChange: (value: string) => void;
}

export default function FleetSidebar(props: FleetSidebarProps)
{

    return (
        <div className={"flex flex-col w-[500px] h-full gap-6 p-8 fixed z-[1001] bg-background/80 backdrop-blur-sm backdrop-contrast-150"}>
            <h1 className={"text-3xl border-b-1 border-b-white/10 pb-2"}>Fleet</h1>
            <ContentSelector onSelectionChange={props.onContentSelectionChange} selected={props.contentSelection}/>
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