import { createContext } from "react";
import { SideBarContextProviderProps } from "../Interfaces/Props/SideBarContextProvider";
export const SideBarContext = createContext(null);

export function SideBarContextProvider({value, children} : SideBarContextProviderProps) {
    return(
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    )
}