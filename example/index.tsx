/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FunctionComponent, render, h } from "preact";
import { useObserver } from "../dist";

const App: FunctionComponent = () => {
  const [ref, inView] = useObserver<HTMLHeadingElement>({ triggerOnce: true });
  const [ref2, inView2] = useObserver<HTMLHeadingElement>();

  return (
    <main>
      <h1
        ref={ref}
        style={{
          margin: "2000px 0 200px",
          transition: "all 2s ease",
          textAlign: "center",
          opacity: inView ? 1 : 0,
        }}
      >
        Trigger once
      </h1>
      <h1
        ref={ref2}
        style={{
          margin: "2000px 0 200px",
          transition: "all 2s ease",
          textAlign: "center",
          opacity: inView2 ? 1 : 0,
        }}
      >
        Trigger always
      </h1>
    </main>
  );
};

render(<App />, document.getElementById("root")!);
