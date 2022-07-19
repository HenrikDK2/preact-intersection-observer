# preact-intersection-observer

A lightweight Preact implementation of [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).
The package is less than 1kb minified, and fast with a simple API made for Preact.

## Install

```bash
npm i preact-intersection-observer
```

## Options

| Name          | Type      | Default | Description                                                                                                                                                            |
| ------------- | --------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootMargin    | `string`  | `0px`   | Grow or shrink each side of the root element's bounding box. This is specfied the same way as the CSS property `margin`.                                               |
| threshold     | `number`  | `1.0`   | Target visibility percentage in view before triggering. The value is between `0` and `1`, and for an example `0.25` is 25% and `1` is 100%.                            |
| triggerOnce   | `boolean` | `false` | Trigger the firing event only once.                                                                                                                                    |
| defaultInView | `boolean` | `false` | Specify if inView defaults as either `true` or `false`. This can be useful when you want something to be visible inView at first, but then disappear when out of view. |

## Example:

```jsx
import { h } from "preact";
import { useObserver } from "preact-intersection-observer";

const intersectOptions = {
  triggerOnce: true,
  rootMargin: "0px 0px -250px 0px",
};

export const Section = () => {
  const [sectionRef, inView] = useObserver(intersectOptions);

  return <section ref={sectionRef}>...</section>;
};
```

## TypeScript usage example:

```tsx
import { FunctionalComponent, h } from "preact";
import { useObserver } from "preact-intersection-observer";

export const Component: FunctionalComponent = () => {
  const [ref, inView] = useObserver<HTMLDivElement>();

  return <div ref={ref}>...</div>;
};
```
