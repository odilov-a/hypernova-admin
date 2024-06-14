import { useState } from "react";
import { Col, Row, Modal, notification, Pagination } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import PositionCreate from "./positionCreate";
import More from "./more";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Team = () => {
  const { get, queryClient, t } = useHooks();
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const [createPosition, showCreatePosition] = useState(false)
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить team?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/team/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`team`],
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
        open={createPosition}
        onCancel={() => showCreatePosition(false)}
        footer={null}
        centered
        title={t("Create new position")}
        width={500}
        destroyOnClose
      >
        <PositionCreate {...{ createPosition, showCreatePosition }} />
      </Modal>
      <Modal
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={get(createModal, "data._id") ? t("Update team") : t("Create team")}
        width={800}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal, showCreatePosition }} />
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
        <Container.All name="team" url="/team" params={{ page, limit: 8, }} >
          {({ items, meta }) => {
            return (
              <div>
                <div className="flex justify-between">
                  <Button title={t("Create team")} icon={<CreateDoc />} size="large"
                    onClick={() => showCreateModal({ open: true, data: {} })} />
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
                        <Col className="flex items-baseline justify-center cursor-pointer"
                          onClick={() => (showMoreModal({ open: true, data: card }))}>
                          <div className="mr-8 mb-4">
                            <img
                              className="object-cover rounded-[10px] w-[260px] h-[200px]"
                              src={get(card, "images[0].medium")}
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

export default Team;