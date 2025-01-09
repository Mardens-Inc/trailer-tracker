import MessagesSidebar from "../components/messages/sidebar/MessagesSidebar.tsx";
import {useState} from "react";
import FleetItem from "../ts/fleet-item.ts";
import NoSelectedMessageGroup from "../components/messages/NoSelectedMessageGroup.tsx";
import MessageBoard from "../components/messages/message-board/MessageBoard.tsx";

export default function MessagesPage()
{
    const [selectedMessageGroup, setSelectedMessageGroup] = useState<FleetItem | null>(null);
    return (
        <div className={"flex flex-row w-full"}>
            <MessagesSidebar
                onMessageGroupSelected={setSelectedMessageGroup}
                selectedMessageGroup={selectedMessageGroup}
            />
            {selectedMessageGroup === null ? <NoSelectedMessageGroup/> : <MessageBoard fleet={selectedMessageGroup}/>}
        </div>
    );
}