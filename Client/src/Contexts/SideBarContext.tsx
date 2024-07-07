import { createContext } from "react";

export const SideBarContext = createContext(null);
interface SideBarContextProviderProps{
    value: any,
    children: any,
}
export function SideBarContextProvider({value, children} : SideBarContextProviderProps) {
    return(
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    )
}