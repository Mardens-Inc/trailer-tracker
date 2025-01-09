import {Icon} from "@iconify-icon/react";

export default function NoSelectedMessageGroup()
{
    return (
        <div className={"flex flex-col mt-[150px] items-center gap-6 w-[400px] mx-auto"}>
            <Icon icon="mage:email-opened-fill" width="96"/>
            <h1 className={"text-6xl font-bold"}>No Message</h1>
            <p className={"italic font-light text-center"}>
                There is currently no message selected.
                Please select a message from the list to get started.
            </p>
        </div>
    );
}