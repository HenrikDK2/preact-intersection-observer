import { createRef, RefObject } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

export default function (options: ObserverOptions) {
  const ref: RefObject<any> = createRef();
  const init: RefObject<any> = createRef();
  const [inView, setInView] = useState<boolean>(false);

  const observerCallback = useCallback(
    (entries) => entries[0].isIntersecting === !inView && setInView(!inView),
    [inView]
  );

  const observer = new IntersectionObserver(observerCallback, { ...options, root: ref.current });

  useEffect(() => {
    if (ref?.current && !init.current) {
      observer.observe(ref.current);
      init.current = true;
    }
    if (inView && options?.triggerOnce) observer.unobserve(ref.current);
  }, [ref, inView]);

  return [ref, inView];
}
