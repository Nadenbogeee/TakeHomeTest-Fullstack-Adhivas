import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckToken from "../../services/CheckToken";
import LeftSideComponnent from "../../components/LeftMain/LeftSideComponnent";
import Aside from "../../components/RightMain/Aside";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    CheckToken(navigate);
  }, [navigate]);

  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <LeftSideComponnent />
        </div>
        <div className="col-span-3">
          <Aside />
        </div>
      </div>
    </>
  );
};

export default MainPage;
