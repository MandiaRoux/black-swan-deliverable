###Black Swan Data Assignment

Hello! Thank you for taking the time to review this assignment. 

There are a few things I'd like to mention regarding design choices made during the building of 
this app:
- I have considered performance: the search function is debounced and the modal
loads critical data first to not obstruct the user experience. 
- I have tried to batch state updates where feasible.
- You will likely be rate-limited by Github anyway - 
they have a limit of 10 search requests per minute
- I have not made use of a component library and written most of the styling from scratch
- I wanted to make easy use of css grid & flexbox for positioning
- It's not perfect - there are things I would want to refine more if I had infinite time 
(i.e mobile redesign, authed requests to remove rate limiting issues) but I had to prioritise

### Live URL: https://black-swan-6b3ea.web.app

### Getting Started

- Clone this repository `git clone https://github.com/MandiaRoux/black-swan-deliverable.git`
- Install dependencies with npm: `npm install`
- Start the development server: `npm start`

### Running Tests
This tech test includes some very basic example of Cypress tests.
 
- To run them from the terminal: `npm test`

You can also use the Cypress test runner application
- Open the test runner application: `npm run cypress`
- Click on a test spec to run it
