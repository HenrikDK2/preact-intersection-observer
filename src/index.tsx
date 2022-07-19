import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
interface ObserverOptions {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  threshold?: IntersectionObserverInit["threshold"];
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

  if (isBrowser && !observer.current) {
    const params = { ...options, root: ref.current };
    const callback = (e: Entries) => setInView(e[0].isIntersecting);
    observer.current = new IntersectionObserver(callback, params);
  }

  useEffect(() => {
    if (!init.current) {
      observer.current.observe(ref.current);
      init.current = true;
    } else if (options?.triggerOnce && inView) {
      observer.current.unobserve(ref.current);
    }
  }, [ref, inView, options]);

  return [ref, inView];
};
