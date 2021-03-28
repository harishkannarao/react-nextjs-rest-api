# ReactJs + NodeJs stack for Java Developers

### Background

I am a Java Developer who enjoyed developing both server side web (frontend) and server side (backend) Http API. In recent years, Java or other JVM languages are predominantly used for server side API and NodeJs stack is the defacto standard for Frontend.

This page explores the frontend (UI) development using ReactJs + NodeJs stack using Java lens by comparing tools and framework in Java stack.

In this repository, I explored the ReactJs ecosystem to build, test (unit and integration) and deploy a pure client side rendering (CSR) web application.

### Development Stack

ReactJs is the basic building block to build the UI components and NextJs is built on top of ReactJs to create pages with routing and deployment tools for application built with ReactJs.

Axios is a very popular Http Client library to fetch data from server side Http APIs

|NodeJs|Java|
|----|---|
|ReactJs|Spring MVC|
|NextJs|Spring Boot|
|Axios|Spring RestClient|

### Testing Stack

###### Unit and Component Testing

Jest Library is a test runner tool with built in assertion library and retry utilities to test async behaviours of a ReactJs Web application.

Testing Library is used to render the ReactJs Components in a headless html renderer and allows to interact with the DOM elements.

MSW Library is used to stub and verify the server side Http API interactions during the test run.

This stack has very fast feedback time, however it was hard to test the bits in `<head>` section of the html and unable to test the cross page navigations.

|NodeJs|Java|
|----|---|
|Jest|Junit or TestNg|
|Jest|AssertJ|
|Jest|Awaitility|
|Testing Library|Html Unit or Chromedriver|
|Testing Library|WebDriver (Selenium)|
|MSW|WireMock|

###### Functional Testing

