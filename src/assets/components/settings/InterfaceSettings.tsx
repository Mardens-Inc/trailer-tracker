import {Select, SelectItem} from "@nextui-org/react";
import {Themes, useTheme} from "../../providers/Theme.tsx";

export default function InterfaceSettings()
{
    const {theme, setTheme} = useTheme();
    return (
        <>
            <Select
                label={"Theme"}
                placeholder={"Select"}
                variant={"bordered"}
                className={"w-48"}
                size={"sm"}
                defaultSelectedKeys={[theme]}
                selectedKeys={[theme]}
                disallowEmptySelection
                selectionMode={"single"}
                onSelectionChange={keys => setTheme([...keys][0] as Themes)}
                classNames={{
                    trigger: "capitalize"
                }}
            >

                {Object.values(Themes).map(theme => (
                    <SelectItem key={theme} className={"capitalize"}>{theme}</SelectItem>
                ))}

            </Select>
        </>
    );
}