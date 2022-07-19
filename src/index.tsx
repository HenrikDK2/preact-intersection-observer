import { Ref } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

type Entries = IntersectionObserverEntry[];
type InView = boolean;
type TriggerOnce = boolean;
type Init = boolean;

interface ObserverOptions {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  threshold?: IntersectionObserverInit["threshold"];
  defaultInView?: InView;
  triggerOnce?: TriggerOnce;
}

const isBrowser = typeof window !== "undefined";

export const useObserver = <T extends HTMLElement>(
  options?: ObserverOptions
): [ref: Ref<T>, inView: InView] => {
  const defaultInView = options?.defaultInView || false;
  const [inView, setInView] = useState<InView>(defaultInView);
  const observer = useRef<IntersectionObserver>();
  const init = useRef<Init>(false);
  const ref = useRef<T>(null);

  if (isBrowser && !observer.current) {
    const params = { ...options, root: ref.current };
    const callback = (e: Entries) => setInView(e[0].isIntersecting);
    observer.current = new IntersectionObserver(callback, params);
  }

  useEffect(() => {
    if (!init.current) {
      observer.current.observe(ref.current);
      init.current = true;
    } else if (options?.triggerOnce && defaultInView !== inView) {
      observer.current.unobserve(ref.current);
    }
  }, [ref, inView, defaultInView, options]);

  return [ref, inView];
};
