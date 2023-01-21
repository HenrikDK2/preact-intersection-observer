# preact-intersection-observer

A lightweight Preact implementation of the Intersection Observer API that is fast and easy to use. With a gzipped size of less than 0.4kb, this package provides a simple way to detect when an element is within the viewport.

## Installation

```bash
npm i preact-intersection-observer --save
```

## Usage

### useObserver

```jsx
const [ref, inView, entry] = useObserver(options);
```

The `useObserver` hook allows you to observe an element's visibility within the viewport. It takes an optional `options` object, but `ref` must reference the element that you want to observe. `inView` is a boolean that indicates whether the element is within the viewport, and `entry` returns the [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object. Both `inView` and `entry` will update when the element enters or exits the viewport.

### ViewportObserver

```jsx
  <ViewportObserver
    as="section"
    options={options}
    render={({ inView, entry }) => (...)}
  />
```

The `ViewportObserver` component is similar to the `useObserver` hook, but it is typically used when multiple observers are needed within the same component. It also takes an optional `options` object and a `render` prop that returns the `inView`, and `entry` values, as well as an `as` prop that allows you to specify the HTML element that will be used as the wrapper, it defaults to `div`.

## API

### Options

The `options` object is used in both the `useObserver` hook, and the `ViewportObserver` component.

| Name          | Type      | Default | Description                                                                                                                                                                                                                       |
| ------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootMargin    | `string`  | `0px`   | Allows you to grow or shrink the area around the root element's bounding box, specified in the same format as the CSS margin property.                                                                                            |
| threshold     | `number`  | `0.0`   | The target visibility percentage in view before triggering. The value can range from 0 to 1, with 0 meaning that even a single visible pixel is sufficient, 0.25 representing 25% visibility, and 1 representing 100% visibility. |
| triggerOnce   | `boolean` | `false` | If true, the observer will trigger only once.                                                                                                                                                                                     |
| defaultInView | `boolean` | `false` | Specifies if the element defaults to being in view or not. This can be useful if you want an element to be visible at first, but then disappear when it goes out of view.                                                         |

### ViewportObserver props

The `options` object is used in both the `useObserver` hook, and the `ViewportObserver` component.

| Name   | Type                                     | Default     | Description                                                                                                                                                                                                                                                            |
| ------ | ---------------------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| as     | `string`                                 | `div`       | This prop allows you to specify the type of HTML element that will be used to wrap the content passed to the `ViewportObserver` component. By default, it will be a div element, but you can change it to any valid HTML element, such as a section, article, or span. |
| render | `({inView, entry}) => ComponentChildren` | `undefined` | This prop is a function that receives an object containing the `inView` boolean, and the root `entry` of the container. It expects that you return a component that will be rendered by the `ViewportObserver`.                                                        |

## Examples

### JavaScript example

```jsx
import { h } from "preact";
import { useObserver, ViewportObserver } from "preact-intersection-observer";

// useObserver hook
export const Example = () => {
  const [ref, inView, entry] = useObserver();

  return <div ref={ref}>...</div>;
};

// ViewportObserver
export const Example2 = () => (
  <ViewportObserver
    render={({ inView, entry }) => (...)}
  />
);
```

### TypeScript example

```tsx
import { FunctionalComponent, h } from "preact";
import { useObserver, ViewportObserver } from "preact-intersection-observer";

// useObserver hook
export const Example: FunctionalComponent = () => {
  const [ref, inView, entry] = useObserver<HTMLDivElement>();

  return <div ref={ref}>...</div>;
};

// ViewportObserver
export const Example2: FunctionalComponent = () => (
  <ViewportObserver
    render={({ inView, entry }) => (...)}
  />
);
```
