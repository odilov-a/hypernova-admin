import { Button } from "antd";

interface IProps {
  title: string;
  size?: "large" | "small";
  className?: string;
  isLoading?: boolean;
  htmlType?: "button" | "submit" | "reset";
  icon?: any;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const MyButton = (props: IProps) => {
  const {
    title = "Button",
    size = "large",
    className = "",
    isLoading = false,
    htmlType = "button",
    onClick = () => {},
    icon = null
  } = props;
  return (
    <div>
      <Button onClick={onClick} icon={icon} size={size} htmlType={htmlType} loading={isLoading} className={className + " bg-[#3367F6] text-[17px] text-white hover:!text-white flex items-center justify-center border-none"}>
        {title}
      </Button>
    </div>
  );
};

export default MyButton;
