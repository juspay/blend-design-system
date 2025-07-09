import { useEffect } from "react";

const useScrollLock = (shouldLock?: boolean) => {
  useEffect(() => {
    if (shouldLock) {
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
      document.documentElement.style.overscrollBehavior = "none";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.height = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.touchAction = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.height = "";
    };
  }, [shouldLock]);
};

export default useScrollLock;
