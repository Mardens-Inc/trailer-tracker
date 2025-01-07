import {TTButton} from "../components/variants/TTButton.tsx";
import {Icon} from "@iconify-icon/react";
import {Link} from "@nextui-org/react";
import {ReportIssue} from "../ts/report.ts";

export default function ErrorPage()
{
    return (
        <div className={"flex flex-col mt-[150px] items-center gap-6 w-[400px] mx-auto"}>
            <h1 className={"text-6xl font-bold"}>Error Page</h1>
            <p className={"italic font-light text-center"}>
                Lost in the <span className="text-purple-500 font-bold">void</span>?
                Don't worry, even we don't know how you ended up here.
                But hey, click below to <span className="text-green-500 underline font-bold">fix it</span>!
            </p>
            <div className={"flex flex-row items-center gap-4 justify-between w-[300px]"}>
                <TTButton
                    as={Link}
                    href={"/"}
                    startContent={<Icon icon={"mage:home-2-fill"} width={22}/>}
                    variant={"flat"}
                    radius={"sm"}
                    className={"grow"}
                    color={"primary"}
                >
                    Go Home
                </TTButton>
                <TTButton
                    onPress={ReportIssue}
                    variant={"flat"}
                    color={"danger"}
                    radius={"sm"}
                    className={"grow"}
                    startContent={<Icon icon={"mage:exclamation-hexagon-fill"} width={22}/>}
                >
                    Report Issue
                </TTButton>
            </div>
        </div>
    );
}