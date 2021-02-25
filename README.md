# preact-intersection-observer

Less than 0.5kb minified. This package is lightweight and fast with a simple API made for Preact.

## Install

```bash
npm i preact-intersection-observer
```

## Options

- rootMargin (default `0px`) Margin around element, values serves to grow or shrink each side of the root element's bounding.
- threshold (default `1.0`) - Percentage of the target in view before firing the observer callback.
- triggerOnce (default `false`) - Trigger the observer callback once.

## Example:

```jsx
import Preact from "preact";
import useObserver from "preact-intersection-observer";

//Options - Example
const intersectOptions = {
  triggerOnce: true,
  threshold: window.innerWidth < 500 ? 0.05 : 0.2,
  rootMargin: "0px 0px -250px 0px",
};

const Section = () => {
  const [sectionRef, inView] = useObserver(intersectOptions);

  return <section ref={sectionRef}>...</section>;
};

export default Section;
```
