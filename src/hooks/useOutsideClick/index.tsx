import { useEffect } from "react";

function useClickOutside(
  ref: any,
  setVisible: (arg0: boolean) => void,
  visible: boolean
) {
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target) && visible) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}

export default useClickOutside;
