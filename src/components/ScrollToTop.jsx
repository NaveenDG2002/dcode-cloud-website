import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    // Let in-page hash links (e.g. footer's /#services) jump to their
    // section instead of being forced to the top.
    if (hash) return;

    // useLayoutEffect runs synchronously before the browser paints, so
    // this resets scroll before the user ever sees the old position.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Safari fallback
  }, [pathname, hash]);

  return null;
}