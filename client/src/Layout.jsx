import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex  min-h-screen flex-col px-8 py-4">
      <Header />
      <Outlet />
    </div>
  );
}
