import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

type Entries = IntersectionObserverEntry[];

const isBrowser = typeof window !== "undefined";

export const useObserver = <T extends HTMLElement>(
  options?: ObserverOptions
): [ref: Ref<T>, inView: boolean] => {
  const [inView, setInView] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>();
  const ref = useRef<T>(null);
  const init = useRef<boolean>(false);

  if (isBrowser) {
    if (!observer.current) {
      const observerCallback = (entries: Entries) => {
        setInView(entries[0].isIntersecting);
      };

      observer.current = new IntersectionObserver(observerCallback, {
        ...options,
        root: ref.current,
      });
    }

    useEffect(() => {
      if (observer.current && ref.current) {
        if (!init.current) {
          observer.current.observe(ref.current);
          init.current = true;
        } else if (options?.triggerOnce && inView) {
          observer.current.unobserve(ref.current);
        }
      }
    }, [ref, inView]);
  }

  return [ref, inView];
};
