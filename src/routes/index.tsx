import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components";
import { useHooks } from "hooks";
import { privateRoutes, publicRoutes } from "./data";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Login from "pages/login";
import NotFound from "pages/notFound";
import useStore from "store";

const RoutesWrapper = () => {
  const { get } = useHooks();
  const {
    auth: { isLoggedIn },
  } = useStore((state) => state);

  return (
    <div className='h-full'>
      <Routes>
        <Route
          path={"/login"}
          element={
            <Suspense
              fallback={
                <div className='flex justify-center items-center mt-10'>
                  Spinning
                </div>
              }
            >
              <PublicRoute children={<Login />} />
            </Suspense>
          }
        />
        <Route
          path={"*"}
          element={
            <Suspense
              fallback={
                <div className='flex justify-center items-center mt-10'>
                  Spinning
                </div>
              }
            >
              <PrivateRoute children={<> <NotFound/> </>} />
            </Suspense>
          }
        />
        <Route path='/' element={<Layout />}>
          {/* Private protected routes */}
          {privateRoutes.length > 0 &&
            privateRoutes.map((route, idx) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className='flex justify-center items-center mt-10'>
                          Spinning
                        </div>
                      }
                    >
                      <PrivateRoute children={route.element} />
                    </Suspense>
                  }
                >
                  {get(route, "inner")?.map((innerRoute, innerKey) => (
                    <Route
                      key={innerKey}
                      path={innerRoute.path}
                      element={
                        <Suspense
                          fallback={
                            <div className='flex justify-center items-center mt-10'>
                              Spinning
                            </div>
                          }
                        >
                          {innerRoute.element}
                        </Suspense>
                      }
                    />
                  ))}
                </Route>
              );
            })}

          {/* Public routes */}
          {publicRoutes.length > 0 &&
            publicRoutes.map((route, idx) => {
              return (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className='flex justify-center items-center mt-10'>
                          Spinning
                        </div>
                      }
                    >
                      <PublicRoute children={route.element} />
                    </Suspense>
                  }
                >
                  {get(route, "inner")?.map((innerRoute, innerKey) => (
                    <Route
                      key={innerKey}
                      path={innerRoute.path}
                      element={
                        <Suspense
                          fallback={
                            <div className='flex justify-center items-center mt-10'>
                              Spinning
                            </div>
                          }
                        >
                          {innerRoute.element}
                        </Suspense>
                      }
                    />
                  ))}
                </Route>
              );
            })}
        </Route>
      </Routes>
    </div>
  );
};

export default RoutesWrapper;
