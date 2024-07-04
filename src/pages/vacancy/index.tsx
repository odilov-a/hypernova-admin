import { useState } from "react";
import { Col, Row, Modal, notification, Pagination, Card } from "antd";
import { Delete, Edit, CreateDoc } from "assets/images/icons";
import { useHooks, usePost } from "hooks";
import { Container } from "modules";
import { Button } from "components";
import Create from "./create";
import More from "./more";
import "./style.scss";

const Vacancy = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить Vacancy?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/vacancies/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`vacancies`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={
          get(createModal, "data._id")
            ? t("Update vacancy")
            : t("Create vacancy")
        }
        width={800}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <Modal
        open={moreModal?.open}
        onOk={() => showMoreModal({ open: true, data: {} })}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("More informaiton")}
        width={900}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All
          name="vacancies"
          url="/vacancies"
          params={{ page, limit: 8 }}
        >
          {({ items, meta }) => {
            return (
              <div>
                <div className="flex justify-between">
                  <Button
                    title={t("Create vacancy")}
                    icon={<CreateDoc />}
                    size="large"
                    onClick={() => showCreateModal({ open: true, data: {} })}
                  />
                  {meta && meta.perPage && (
                    <div className="mt-[20px] flex justify-center">
                      <Pagination
                        current={meta.currentPage}
                        pageSize={meta.perPage}
                        total={meta.totalCount}
                        onChange={(page: any) => {
                          setPage(page);
                          window.scrollTo({
                            behavior: "smooth",
                            top: 0,
                            left: 0,
                          });
                        }}
                      />
                    </div>
                  )}
                </div>
                <Row className="h-[120px] mt-[15px]">
                  {items.map((card) => {
                    return (
                      <>
                        <Col
                          className="cursor-pointer"
                          onClick={() =>
                            showMoreModal({ open: true, data: card })
                          }
                        >
                          <div className="mr-8 mb-4 w-[250px] h-[150px]">
                            <Meta
                              className="pb-[40px] p-0"
                              title={
                                <div className="mb-1">
                                  <p className="dark:text-[#e5e7eb] block truncate">
                                    <strong>{get(card, "title", "")}</strong>
                                  </p>
                                </div>
                              }
                              description={
                                <div className="flex justify-between items-center mb-2">
                                  <p className="dark:text-[#e5e7eb] line-clamp-3">
                                    {get(card, "description", "")}
                                  </p>
                                </div>
                              }
                            />
                            <div className="btnPanel2">
                              <div
                                className="editBtn"
                                onClick={(e) => (
                                  e.stopPropagation(),
                                  showCreateModal({ open: true, data: card })
                                )}
                              >
                                <Edit />
                              </div>
                              <div
                                className="deleteBtn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteHandler(get(card, "_id", ""));
                                }}
                              >
                                <Delete />
                              </div>
                            </div>
                          </div>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Vacancy;
