import { useState } from "react";
import { Input, notification } from "antd";
import { useHooks, usePost } from "hooks";
import { Button } from "components";

const PositionCreate = ({ createPosition, showCreatePosition }: any) => {
  const { get, queryClient, t } = useHooks();
  const { mutate } = usePost();
  const [inputValue, setInputValue] = useState({ nameUz: "", nameRu: "", nameEn: "" });
  const createPositionFunc = () => {
    mutate(
      { method: "post", url: `position`, data: { ...inputValue } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          notification["success"]({
            message: t("Успешно!"),
            duration: 2,
          });
          showCreatePosition(!createPosition);
        },
        onError: (error: any) => {
          console.log(error);
          notification["error"]({
            message: get(error, "errorMessage", t("Произошло ошибка!")),
            duration: 2,
          });
        },
      }
    );
  };

  return (
    <div>
      <label>{t("lavozimni kiriting uz")}</label>
      <Input
        placeholder={t("lavozimni kiriting uz")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, nameUz: e.target.value }))}
      />
      <label>{t("lavozimni kiriting ru")}</label>
      <Input
        placeholder={t("lavozimni kiriting ru")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, nameRu: e.target.value }))}
      />
      <label>{t("lavozimni kiriting en")}</label>
      <Input
        placeholder={t("lavozimni kiriting en")} className="mb-[10px] p-[10px]"
        onChange={(e: any) => setInputValue(prev => ({ ...prev, nameEn: e.target.value }))}
      />
      <Button title={t("Create")} size="large" className="w-full" onClick={createPositionFunc} />
    </div>
  );
};

export default PositionCreate;