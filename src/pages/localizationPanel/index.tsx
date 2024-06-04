import React, { ChangeEvent, useEffect, useState } from "react";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Table } from "components";
import { Input } from "antd";
import { useDebounce, usePost } from "hooks";
import { Header } from "./components";

const Localization = () => {
  const { get, t } = useHooks();
  const { mutate } = usePost();
  const [inputValue, setInputValue] = useState<{
    value: string;
    data: {
      message: string;
      _id: string;
      en: string;
      uz: string;
    } | null;
    changedLangCode: "uz" | "en" | "ru" | null;
  }>({
    data: null,
    value: "",
    changedLangCode: null,
  });
  const [searchWord, setSearchWord] = useState("")
  const inputValueDebounced = useDebounce(inputValue.value, 600);
  const inputValueDebouncedSearch = useDebounce(searchWord, 600);
  function handleTranslationInput(
    e: ChangeEvent<HTMLInputElement>,
    data: { message: string; _id: string; en: string; uz: string, ru: string },
    langCode: "uz" | "en" | "ru"
  ) {
    setInputValue({
      value: e.target.value,
      data: data,
      changedLangCode: langCode,
    });
  }

  useEffect(() => {
    if (inputValue.data) {
      mutate({
        url: `/translations/${get(inputValue.data, 'id')}`,
        method: "put",
        data: {
          id: get(inputValue.data, 'id'),
          lang: inputValue.changedLangCode,
          translation: inputValueDebounced
        },
      });
    }
  }, [inputValueDebounced]);

  return (
    <div>
      <Header {...{setSearchWord}}/>
      <h1>{t("Localization")}</h1>
      <Container.All
        url={`/translations/${inputValueDebouncedSearch && "search/" + inputValueDebouncedSearch}`}
        name='localization'
        
      >
        {({ isLoading, meta, items }) => {
          return (
            <div>
              <Table
                items={items}
                columns={[
                  {
                    key: "manba",
                    title: t("Manba"),
                    dataIndex: "message",
                    className: "class",
                    render: (value) => <>{value}</>,
                  },
                  {
                    key: "uz",
                    title: t("Lotin alifbosi"),
                    dataIndex: "uz",
                    className: "class",
                    render: (value, data) => {
                      return (
                        <div>
                          <Input
                            defaultValue={value}
                            onChange={(e) => {
                              handleTranslationInput(e, data, "uz");
                            }}
                          />
                        </div>
                      );
                    },
                  },
                  {
                    key: "en",
                    title: t("Ingliz tilida"),
                    dataIndex: "en",
                    className: "class",
                    render: (value, data) => (
                      <div>
                        <Input
                          defaultValue={value}
                          onChange={(e) => {
                            handleTranslationInput(e, data, "en");
                          }}
                        />
                      </div>
                    ),
                  },
                  {
                    key: "ru",
                    title: t("Rus tilida"),
                    dataIndex: "ru",
                    className: "class",
                    render: (value, data) => (
                      <div>
                        <Input
                          defaultValue={value}
                          onChange={(e) => {
                            handleTranslationInput(e, data, "ru");
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
                isLoading={isLoading}
                // meta={meta}
              />
            </div>
          );
        }}
      </Container.All>
    </div>
  );
};

export default Localization;