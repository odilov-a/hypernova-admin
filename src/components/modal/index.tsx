import { Modal } from "antd";

interface IProps {
  data: { isOpen: boolean; data: any };
  onCancel: () => void;
  childrenEl: React.ComponentType<any>;
  title?: string;
}

const index: React.FC<IProps> = (props) => {
  const {
    data: { isOpen, data },
    onCancel = () => {},
    childrenEl: ChildEl,
    title,
  } = props;

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onCancel();
      }}
      closeIcon={<>X</>}
      footer={null}
      centered
      title={title}
    >
      <ChildEl {...{ data }} />
    </Modal>
  );
};

export default index;
