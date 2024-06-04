import { UseInfiniteQueryResult, UseQueryOptions } from "@tanstack/react-query";
import useScroll from "hooks/useScrollGet";
import { get } from "lodash";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TParams } from "services/types";

interface IScroll {
  name: string;
  url: string;
  customMoreBtn?: boolean;
  onSuccess?: (data: any) => any;
  onError?: (data: any) => any;
  children: (
    data: { items: any[] | undefined } & UseInfiniteQueryResult,
    ref: any
  ) => any;
  params?: TParams | undefined;
  queryOptions?: UseQueryOptions<any, any, any, any>;
  dataKey?: string;
}
const Scroll = ({
  name,
  onSuccess,
  onError,
  customMoreBtn = false,
  url,
  children,
  params,
  queryOptions,
  dataKey = "data",
}: IScroll) => {
  const { ref, inView } = useInView();

  const data = useScroll({
    name,
    url,
    params,
    onSuccess,
    onError,
    queryOptions,
  });
  useEffect(() => {
    if (!customMoreBtn) {
      if (inView && data.hasNextPage) {
        data.fetchNextPage();
      }
    }
  }, [inView]);

  const items: object[] | undefined = get(data, "data.pages")
    ?.map((item) => get(item, dataKey))
    .flat(1);

  return children({ items, ...data }, ref);
};

export default Scroll;
