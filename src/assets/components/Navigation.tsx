import {cn, Link, Navbar, NavbarContent, NavbarItem, Tooltip} from "@nextui-org/react";
import {Icon} from "@iconify-icon/react";
import {TTButton} from "./variants/TTButton.tsx";
import {useLocation} from "react-router-dom";
import {JSX} from "react";
import {ReportIssue} from "../ts/report.ts";
import {useSettings} from "../providers/Settings.tsx";

type MenuItem = {
    label: string;
    icon: JSX.Element;
    href?: string;
    onClick?: () => void;
    placement: "top" | "bottom"
}

export default function Navigation()
{
    const {open} = useSettings();
    const {pathname} = useLocation();

    const menuitems: MenuItem[] = [
        {
            label: "Fleet Overview",
            icon: <Icon icon={"mage:map-marker-fill"} width={22}/>,
            href: "/",
            placement: "top"
        },
        {
            label: "Fleet Management",
            icon: <Icon icon={"mage:three-d-box-square-fill"} width={22}/>,
            href: "/fleet/management",
            placement: "top"
        },
        {
            label: "Fleet Overview",
            icon: <Icon icon={"mage:home-2-fill"} width={22}/>,
            href: "/other2",
            placement: "top"
        },
        {
            label: "Messages",
            icon: <Icon icon={"mage:message-dots-round-fill"} width={22}/>,
            href: "/messages",
            placement: "top"
        },
        {
            label: "Settings",
            icon: <Icon icon={"mage:settings-fill"} width={22}/>,
            onClick: () => open(),
            placement: "bottom"
        },
        {
            label: "Report an Issue",
            icon: <Icon icon="mdi:bug" width={22}/>,
            onClick: ReportIssue,
            placement: "bottom"
        }
    ];

    return (
        <Navbar
            className={
                cn(
                    "flex flex-col justify-start grow-0 shrink-0 w-[unset] min-w-[unset] max-w-[unset]",
                    "border-r-1 border-white/5 my-4"
                )
            }
            classNames={{
                wrapper: "flex-col h-full"
            }}
        >
            <NavbarContent className={"flex flex-col justify-start gap-2"}>
                <Tooltip content={"Marden's Trailer Tracker"} placement={"right"} showArrow radius={"sm"} className={"flex flex-col items-center"}>
                    <div className={"bg-gradient-to-br from-foreground/10 to-foreground/0 p-5 rounded-md w-[22px] aspect-square h-[22px] flex justify-center items-center mb-8"}>
                        <Icon icon={"mage:delivery-truck-fill"} width={22}/>
                    </div>
                </Tooltip>
                {menuitems.filter(i => i.placement === "top").map((item, index) => (
                    <NavbarItem key={`navitem-top-${index}`}>
                        <Tooltip content={item.label} placement={"right"} showArrow radius={"sm"}>
                            <TTButton
                                as={item.href ? Link : undefined}
                                href={item.href || undefined}
                                onPress={item.onClick || undefined}
                                variant={"flat"}
                                color={"primary"}
                                className={"aspect-square data-[active=false]:bg-transparent data-[active=false]:text-foreground/20 data-[active=false]:hover:text-foreground"}
                                data-active={pathname === item.href}
                            >
                                {item.icon}
                            </TTButton>
                        </Tooltip>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className={"flex flex-col-reverse items-end gap-2 h-fit"}>
                {menuitems.filter(i => i.placement === "bottom").map((item, index) => (
                    <NavbarItem key={`navitem-bottom-${index}`}>
                        <Tooltip content={item.label} placement={"right"} showArrow radius={"sm"}>
                            <TTButton
                                as={item.href ? Link : undefined}
                                href={item.href || undefined}
                                onPress={item.onClick || undefined}
                                variant={"flat"}
                                color={"primary"}
                                className={"aspect-square data-[active=false]:bg-transparent data-[active=false]:text-foreground/20 data-[active=false]:hover:text-foreground"}
                                data-active={pathname === item.href}
                            >
                                {item.icon}
                            </TTButton>
                        </Tooltip>
                    </NavbarItem>
                ))}
            </NavbarContent>
        </Navbar>
    );
}