import {cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {TTButton} from "../../../variants/TTButton.tsx";
import {Icon} from "@iconify-icon/react";

export default function FleetFilterDropdown()
{
    return (
        <Dropdown>
            <DropdownTrigger>

                <TTButton
                    variant={"bordered"}
                    color={"default"}
                    className={cn(
                        "h-full aspect-square min-w-0 border-1 border-white/10",
                        "data-[hover]:border-white/40"
                    )}
                    size={"sm"}
                >
                    <Icon icon="proicons:filter" width={24}/>
                </TTButton>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem key={"item-1"}>Item 1</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}