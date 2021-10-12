import { createRef, RefObject } from "preact";
import { useEffect, useState } from "preact/hooks";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

type ReturnArr = [ref: RefObject<HTMLElement>, inView: boolean];
const isBrowser = typeof window !== "undefined";

export default function (options: ObserverOptions): ReturnArr {
  const ref: RefObject<HTMLElement> = createRef();
  const init: RefObject<boolean> = createRef();
  const [inView, setInView] = useState<boolean>(false);

  if (isBrowser) {
    const observerCallback = (entries: any) =>
      entries[0].isIntersecting === !inView && setInView(!inView);
    const observer = new IntersectionObserver(observerCallback, { ...options, root: ref.current });

    useEffect(() => {
      if (ref?.current && !init.current) {
        observer.observe(ref.current);
        //@ts-ignore
        init.current = true;
      }
      if (inView && options?.triggerOnce) observer.unobserve(ref.current!);
    }, [ref, inView]);
  }

  return [ref, inView];
}
