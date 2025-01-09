import {createContext, ReactNode, useContext, useState} from "react";
import SettingsModal from "../components/settings/SettingsModal.tsx";
import Settings from "../ts/settings.ts";

interface SettingsContextType
{
    settings: Settings | null;
    open: () => void;
    close: () => void;
    save: (value: Settings) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({children}: { children: ReactNode })
{
    const [settings, setSettings] = useState<Settings | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const save = async (value: Settings) =>
    {
        setSettings(value);
        await value.save();
    };

    return (
        <SettingsContext.Provider value={{settings, save, open, close}}>
            <SettingsModal isOpen={isOpen} onClose={close}/>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings(): SettingsContextType
{
    const context = useContext(SettingsContext);
    if (!context)
    {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}