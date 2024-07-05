import SideBar from "../components/Sidebar/SideBar";
interface LayoutProps {
    children: React.ReactNode,
}
export default function Layout({children} : LayoutProps) {
    return (
        <div>
            <div>
                <SideBar/>
            </div>
            {children}
        </div>
    )
}