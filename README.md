# Scandiweb Carousel

A Carousel made for you

## Demo

https://scandiwebcarousel.netlify.app/

## Package Manger

```bash
npm install scandiweb-carousel
```

## Contributing

PLEASE review CONTRIBUTING.markdown prior to requesting a feature, filing a pull request or filing an issue.

# Usage

By default, the component does not need anything except data to render a simple carousel.

```js
import React from "react";
import Carousel from "scandiweb-carousel";

const data = [
  {
    title: "title",
    description: "description",
    imgSrc: "imgSrc",
  },
];

const MyCarousel = () => <SCarousel data={data}></SCarousel>;
```

## Props

| Props | Type  |                                           description |
| ----- | :---: | ----------------------------------------------------: |
| data  | Array | the data will be showen on the slides of the carousel |

# License

ISC license
