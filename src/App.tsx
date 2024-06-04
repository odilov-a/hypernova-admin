import { useGet } from "hooks";
import RoutesWrapper from "routes";
import "assets/styles/index.scss";
import useStore from "store";
import { Spin } from "antd";

function App() {
  const { getMe, logOut, auth: { isLoggedIn } } = useStore((state) => state);
  const { isLoading } = useGet({
    name: "users/get-me",
    url: "users/get-me",
    onSuccess: (data) => {
      getMe({ data: data });
    },
    onError: (error) => {
      logOut();
    },
  });

  return (
    <>
      {isLoading ? (
        <div className='w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-8'>
          <Spin tip='Loading' size='large'>
            <div className='content' />
          </Spin>
        </div>
      ) : (
        <RoutesWrapper />
      )}
    </>
  );
}

export default App;
