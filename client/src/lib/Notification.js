import React, { useEffect } from "react";

export const NotificationWrapper = ({ duration, killSelf, children }) => {
  useEffect(() => {
    const id = setTimeout(killSelf, duration);
    return () => clearTimeout(id);
  }, []);

  return <div>{children}</div>;
};
