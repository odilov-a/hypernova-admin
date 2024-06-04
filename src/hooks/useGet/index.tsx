import {
  useQuery,
  QueryFunctionContext,
  UseQueryResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { TParams } from "services/types";
import { api, queryBuilder } from "services";

interface QueryKeyArgs {
  url: string;
  params?: TParams | undefined;
}

interface Props {
  name: string;
  url: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  queryOptions?: UseQueryOptions<any, any, any, any>;
  params?: TParams | undefined;
}

async function get({ queryKey }: QueryFunctionContext<[string, QueryKeyArgs]>) {
  const { url, params } = queryKey[1];

  const res = await api.get(queryBuilder(url, params));
  return res.data;
}
function useGet(args: Props): UseQueryResult {
  const { name, onSuccess, onError, queryOptions, url, params } = args;

  const data = useQuery({
    queryKey: [`${name}`, { url, params }],
    queryFn: get,
    onSuccess,
    onError,
    ...queryOptions,
  });

  return { ...data };
}
export default useGet;
