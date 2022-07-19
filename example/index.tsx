/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FunctionComponent, render, h } from "preact";
import { useObserver } from "../src";

const App: FunctionComponent = () => {
  const [ref, inView] = useObserver<HTMLHeadingElement>({ triggerOnce: true });
  console.log(inView);

  return (
    <h1
      ref={ref}
      style={{
        margin: "2000px 0 200px",
        transition: "all 2s ease",
        textAlign: "center",
        opacity: inView ? 1 : 0,
      }}
    >
      Test
    </h1>
  );
};

render(<App />, document.getElementById("root")!);
