import MainContent from "./MainContent";
import NavbarComponnent from "./NavbarComponnent";
import Sidebar from "./Sidebar";

const LeftSideComponnent = () => {
  return (
    <>
      <NavbarComponnent />
      <div className="grid grid-cols-6">
        <div className="col-span-2">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default LeftSideComponnent;
