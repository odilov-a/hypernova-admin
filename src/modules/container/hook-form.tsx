import { useForm } from "react-hook-form";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import usePost from "hooks/usePost";
import React from "react";
import { IMethod, TParams } from "services/types";
type THookForm = {
  url: string;
  name: string;
  method: IMethod;
  children: React.FC;
  params: TParams;
  values: { [key: string]: any };
  onError: () => void;
  onSuccess: (
    data: { [key: string]: any },
    reset: () => void,
    queryClient: QueryClient
  ) => void;
  onSettled: () => void;
  customizeData: (values: { [key: string]: any }) => { [key: string]: any };
};
const HookForm = ({
  url,
  name,
  method,
  children,
  params,
  values = {},
  onError = () => {},
  onSuccess = () => {},
  onSettled = () => {},
  customizeData = (values) => values,
}: THookForm) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    control,
    formState: { errors },
    ...rest
  } = useForm({
    values,
  });

  const { mutate } = usePost();

  const onSubmit = (values: { [key: string]: any }) => {
    mutate(
      { url, params, method, data: customizeData(values) },
      {
        onSuccess: (data) => {
          onSuccess(data, reset, queryClient);
          if (name) queryClient.invalidateQueries({ queryKey: [name] });
        },
        onError,
        onSettled,
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children({
        register,
        watch,
        getValues,
        setValue,
        reset,
        errors,
        control,
        ...rest,
      })}
    </form>
  );
};

export default HookForm;
