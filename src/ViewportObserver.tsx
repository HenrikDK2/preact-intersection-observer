import { ComponentChildren, h, FunctionComponent, JSX } from "preact";
import { Entry, InView, ObserverOptions, useObserver } from "./index";
interface ViewportObserverProps {
  render: (props: { inView: InView; entry: Entry }) => ComponentChildren;
  options?: ObserverOptions;
  as?: keyof JSX.IntrinsicElements;
}

export const ViewportObserver: FunctionComponent<ViewportObserverProps> = ({ render, options, as = "div" }) => {
  const [ref, inView, entry] = useObserver<HTMLElement>(options);

  return h(as, { ref }, render({ inView, entry }));
};
