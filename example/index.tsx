import { FunctionComponent, render, h, JSX } from "preact";
import { useObserver, ObserverOptions } from "../dist";

interface IHeadingProps {
  options?: ObserverOptions;
  style?: JSX.CSSProperties;
}

const Heading: FunctionComponent<IHeadingProps> = ({ options, style, children }) => {
  const [ref, inView] = useObserver<HTMLHeadingElement>(options);

  return (
    <h1
      ref={ref}
      style={{
        margin: "100vh 0 50vh 0",
        transition: "all 2s ease",
        textAlign: "center",
        opacity: inView ? 1 : 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

render(
  <main>
    <Heading
      options={{ defaultInView: true }}
      style={{
        margin: "50vh 0 50vh 0",
      }}
    >
      Default in view
    </Heading>
    <Heading options={{ triggerOnce: true }}>Trigger once</Heading>
    <Heading>Trigger always</Heading>
  </main>,
  document.getElementById("root")
);
