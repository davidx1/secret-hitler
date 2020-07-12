import React, { useEffect } from "react";

export const NotificationWrapper = ({ duration, killSelf, children }) => {
  useEffect(() => {
    setTimeout(killSelf, duration);
  }, []);

  return <div>{children}</div>;
};
