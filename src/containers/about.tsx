import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Figure from 'react-bootstrap/figure';

export default function About() {
  const [index, setIndex] = useState<number>(0);
  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  function makeFigureCaption() {
    switch (index) {
      case 0:
        return 'Typescript is actually the best. Why would I ever go back to plain JS?';
      case 1:
        return 'React is also pretty fun, and works nicely with typescript. Which is the best.';
      case 2:
        return 'I can not style or design for my life. Bootstrap saved my WebDev Career';
      case 3:
        return 'Node.js is pretty cool, But I gotta get on that Deno soon.';
      case 4:
        return 'Of course, shoutout to plain HTML5, CSS3, and JS. They work. Kinda.';
      default:
        return 'how the heck did you get here?';
    }
  }

  return (
    <>
      <br />
      <Carousel interval={3000} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 img"
            src="https://www.freecodecamp.org/news/content/images/size/w2000/2019/07/ts-1.png"
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>Typescript</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.valuecoders.com/blog/wp-content/uploads/2016/08/react.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://2.bp.blogspot.com/-qLIArGZuD3k/XJD3H0jVcNI/AAAAAAAAAL8/T6pp2WxF4WkAtW9s9ejelXamgWYydNwUgCEwYBhgL/s1600/bootstrap%2B4.jpeg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://railsware.com/blog/wp-content/uploads/2018/09/2400%D1%851260-rw-blog-node-js.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://journocode.com/wp-content/uploads/2016/06/htmlCssJS-1140x515.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Figure>
        <Figure.Caption>{makeFigureCaption()}</Figure.Caption>
      </Figure>
      <div style={{ textAlign: 'left', paddingLeft: '30px', paddingTop: '30px' }}>
        <blockquote className="blockquote">
          <p>
            I really like food, so much so i earned Uber Eats Platinum in
            <mark>5 months.</mark>
            <strong>That is $2,500.</strong>
          </p>
        </blockquote>
        <blockquote className="blockquote">
          <p>
            In an effort to rescue my paycheck from
            <strong style={{ color: 'red' }}> viscous takeout app abuse</strong>, i made this to see
            what i could make with the stuff in my kitchen.
          </p>
          <footer className="blockquote-footer">
            My famous last words before I ordered $30 of
            <cite title="Source Title"> Korean Fried Chicken</cite>
          </footer>
        </blockquote>
      </div>
    </>
  );
}
