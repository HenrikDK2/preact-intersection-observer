import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const isBrowser = typeof window !== "undefined";

export const useObserver = <T extends HTMLElement>(
  options?: ObserverOptions
): [ref: Ref<T>, inView: boolean] => {
  const [inView, setInView] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>();
  const ref = useRef<T>(null);
  const init = useRef<boolean>(false);

  if (isBrowser) {
    const observerCallback = (entries: any) =>
      setInView(entries[0].isIntersecting);

    if (!observer.current) {
      observer.current = new IntersectionObserver(observerCallback, {
        ...options,
        root: ref.current,
      });
    }

    useEffect(() => {
      if (observer.current && ref.current) {
        if (ref?.current && !init.current) {
          observer.current.observe(ref.current);
          init.current = true;
        }

        if (options?.triggerOnce && init.current && inView === true) {
          observer.current.unobserve(ref.current);
        }
      }
    }, [ref, inView, ref.current]);
  }

  return [ref, inView];
};
