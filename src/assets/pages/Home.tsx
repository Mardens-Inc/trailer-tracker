import FleetSidebar from "../components/fleet-overview/sidebar/FleetSidebar.tsx";
import FleetMap from "../components/fleet-overview/FleetMap.tsx";

export default function Home()
{
    return (
        <div className={"flex flex-row w-full"}>
            <FleetSidebar
                contentSelection={""}
                onContentSelectionChange={_ =>
                {
                }}
            />
            <FleetMap/>
        </div>
    );
}