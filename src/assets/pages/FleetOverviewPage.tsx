import FleetSidebar from "../components/fleet-overview/sidebar/FleetSidebar.tsx";
import FleetMap from "../components/fleet-overview/FleetMap.tsx";

export default function FleetOverviewPage()
{
    return (
        <div className={"flex flex-row w-full"}>
            <FleetSidebar/>
            <FleetMap/>
        </div>
    );
}