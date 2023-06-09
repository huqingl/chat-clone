import { Outlet } from "react-router-dom";
const WorkSpace = () => {
  return (
    <div className="basis-auto flex-1 h-full">
      <div className="p-4 h-full">
        <Outlet />
      </div>
    </div>
  );
};
export default WorkSpace;
