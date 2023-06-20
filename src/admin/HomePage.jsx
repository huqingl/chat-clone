
import SideBar from "./SideBar";
import WorkSpace from "./WorkSpace";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
  const token = localStorage.getItem("atoken");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      return
    } else {
      navigate("/admin/login");
    }
  }, [navigate, token]);
  return (
    <div className="App h-screen flex flex-col">
      <header className="w-full bg-slate-200 shrink-0">
        <h1 className="text-center p-2 text-xl font-bold">后台管理</h1>
      </header>
      <main className="flex flex-1 basis-auto h-0">
        <SideBar />
        <WorkSpace />
      </main>
    </div>
  );
}

