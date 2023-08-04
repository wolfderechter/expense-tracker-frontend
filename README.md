# expense-tracker-frontend

![workflow](https://build.redpencil.io/api/badges/2385/status.svg)

The frontend of the expense-tracker, an ember.js application where you can add, edit and remove expenses and their categories. Additionally you can filter by all/year/month and gain insights into that period with some stats and charts.


## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)

## Installation

* `git clone https://github.com/wolfderechter/expense-tracker-frontend`
* `cd expense-tracker-frontend`
* `npm install`

## Running / Development

* `ember serve --proxy http://localhost:80`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

 - Use the docker-compose and instructions of [expense-tracker](https://github.com/wolfderechter/expense-tracker).

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://cli.emberjs.com/release/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
