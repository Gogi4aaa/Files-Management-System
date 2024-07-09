import { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import "./Layout.css";
interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="main-container">
        <div className={showMenu ? "sidebar-open" : "sidebar-close"}>
            <SideBar showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
        <div className="mt-3">
          {children}
        </div>
      </div>
    </>
  );
}
