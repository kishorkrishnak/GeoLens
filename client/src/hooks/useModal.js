import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => {
    setIsShowing((x) => !x);
  };
  return {
    isShowing,
    toggle,
  };
};

export default useModal;
