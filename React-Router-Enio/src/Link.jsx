import React from "react";
import { EVENTS } from "./constantes";

export function navigate(href) {
  window.history.pushState({}, "", href);
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === 0;
    const isModifyEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
    const isManageableEvent = target === undefined || target === "self";
    if (isMainEvent && isManageableEvent && !isModifyEvent) {
      e.preventDefault();
      navigate(to);
    }
  };

  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
