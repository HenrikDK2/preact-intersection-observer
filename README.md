# preact-intersection-observer

A lightweight Preact hooks implementation of the Intersection Observer API that is fast and easy to use. With a gzipped size of less than 0.35kb, this package provides a simple way to detect when an element is within the viewport.

## Installation

```bash
npm i preact-intersection-observer --save
```

## Options

| Name          | Type      | Default | Description                                                                                                                                                                                                                       |
| ------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootMargin    | `string`  | `0px`   | Allows you to grow or shrink the area around the root element's bounding box, specified in the same format as the CSS margin property.                                                                                            |
| threshold     | `number`  | `0.0`   | The target visibility percentage in view before triggering. The value can range from 0 to 1, with 0 meaning that even a single visible pixel is sufficient, 0.25 representing 25% visibility, and 1 representing 100% visibility. |
| triggerOnce   | `boolean` | `false` | If true, the observer will trigger only once.                                                                                                                                                                                     |
| defaultInView | `boolean` | `false` | Specifies if the element defaults to being in view or not. This can be useful if you want an element to be visible at first, but then disappear when it goes out of view.                                                         |

## Usage

```jsx
const [ref, inView, entry] = useObserver();
```

The `useObserver` function takes an optional `options` object, but `ref` must reference the element that you want to observe. `inView` is a boolean that indicates whether the element is within the viewport, and `entry` returns the [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object. Both `inView` and `entry` will update when the element enters or exits the viewport.

### JavaScript example

```jsx
import { h } from "preact";
import { useObserver } from "preact-intersection-observer";

const options = {
  triggerOnce: true,
  rootMargin: "0px 0px -250px 0px",
};

export const Section = () => {
  const [ref, inView, entry] = useObserver(options);

  return <section ref={ref}>...</section>;
};
```

### TypeScript example

```tsx
import { FunctionalComponent, h } from "preact";
import { useObserver } from "preact-intersection-observer";

export const Component: FunctionalComponent = () => {
  const [ref, inView, entry] = useObserver<HTMLDivElement>();

  return <div ref={ref}>...</div>;
};
```
