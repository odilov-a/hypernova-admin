import Button from "components/button";
import { useHooks } from "hooks";

const NotFound = () => {
  const { navigate , t } = useHooks();
  return (
    <div className="notfound-page">
      <div className="center h-[100%] flex items-center justify-center flex-col">
        <div className="error flex flex-row justify-between content-center">
          <div className="number">4</div>
          <div className="illustration relative w-[12.2rem] mx-0 my-[2.1rem]">
            <div className="absolute b-0 left-0 w-[12.2rem] h-[10.8rem] rounded-[50%] bg-[#293b49] dark:bg-[#517491]"></div>
            <div className="clip absolute b-[0.3rem] l-[50%] translate-x-[50%] overflow-hidden w-[12.5rem] h-[13rem] rounded-b-[50%] ">
              <div className="paper">
                <div className="face relative mt-[2.3rem]">
                  <div className="eyes">
                    <div className="eye eye-left "></div>
                    <div className="eye eye-right"></div>
                  </div>
                  <div className="rosyCheeks rosyCheeks-left"></div>
                  <div className="rosyCheeks rosyCheeks-right"></div>
                  <div className="mouth"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="number">4</div>
        </div>
        <div className="text-[25px] mt-[5rem] font-[300] text-[#293b49] dark:text-[#517491]">
          {t("Oops. The page you're looking for doesn't exist.")}
        </div>
        <Button
          title="Back Home"
          size="large"
          onClick={() => navigate("/")}
          className="px-[28px] py-[22px] mt-[40px]"
        />
      </div>
      </div>
  );
};

export default NotFound;
