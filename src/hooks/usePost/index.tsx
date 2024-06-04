import { useMutation } from '@tanstack/react-query'
import { AxiosRequestConfig } from 'axios'
import { api, queryBuilder } from 'services'
import { IMethod, TParams } from 'services/types'

interface IPostOptions {
  method: IMethod
  url: string
  data: any
  configs?: AxiosRequestConfig<any> | undefined
  params?: TParams | undefined
}

export async function postData(props: IPostOptions) {
  const { url, data, params, method, configs } = props
  return await api[method](queryBuilder(url, params), data, configs)
}

const usePost = () => {
  return useMutation(postData)
}

export default usePost
