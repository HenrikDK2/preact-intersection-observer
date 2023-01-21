import { FunctionalComponent, render, JSX } from "preact";
import { useObserver, ObserverOptions, ViewportObserver } from "../src/index";

interface IHeadingProps {
  options?: ObserverOptions;
  style?: JSX.CSSProperties;
}

const defaultStyle: JSX.CSSProperties = {
  margin: "100vh 0 50vh 0",
  transition: "opacity 2s ease",
  textAlign: "center",
};

const Heading: FunctionalComponent<IHeadingProps> = ({ options, style, children }) => {
  const [ref, inView] = useObserver<HTMLHeadingElement>(options);

  return (
    <h1
      ref={ref}
      style={{
        ...defaultStyle,
        opacity: inView ? 1 : 0,
        ...style,
      }}
    >
      {children}
    </h1>
  );
};

render(
  <main style={{ display: "flex" }}>
    <div style={{ flex: "1" }}>
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
    </div>
    <div style={{ flex: "1" }}>
      <ViewportObserver
        options={{ defaultInView: true }}
        render={({ inView }) => (
          <h1 style={{ ...defaultStyle, margin: "50vh 0 50vh 0", opacity: inView ? 1 : 0 }}>
            Default in view with ViewportObserver
          </h1>
        )}
      />
      <ViewportObserver
        options={{ triggerOnce: true }}
        render={({ inView }) => (
          <h1 style={{ ...defaultStyle, opacity: inView ? 1 : 0 }}>Trigger once ViewportObserver</h1>
        )}
      />
      <ViewportObserver
        as="section"
        render={({ inView }) => {
          return <h1 style={{ ...defaultStyle, opacity: inView ? 1 : 0 }}>Trigger always with ViewportObserver</h1>;
        }}
      />
    </div>
  </main>,
  document.getElementById("root")
);
