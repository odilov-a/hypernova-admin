import { useState } from "react";
import { Card, Modal } from "antd";
import { useHooks, useGet } from "hooks";
import Update from "./update";
import { Edit } from "assets/images/icons";

const User = () => {
  const { get, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };
  const { data } = useGet({
    name: "users/update-user",
    url: "users/get-me",
  });
  const info = get(data, "data", {})

  return (
    <div className="flex">
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit user")}
        width={700}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <div>
          <Card
            hoverable
            style={{ width: 400, marginRight: 15 }}
          >
            <Meta
              className="pb-[60px]"
              title={
                <div className="">
                  <p>{t("ID")} - {(get(info, "_id", ""))}</p>
                  <p>{t("Login")} - {(get(info, "username", ""))}</p>
                </div>
              }
            />
            <div className="btnPanel">
              <div
                className="editBtn"
                onClick={() => onEdit(info)}
              >
                <Edit />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;