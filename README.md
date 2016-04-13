lib-openair-bootstrap
=====================

[![GitHub release](https://img.shields.io/github/release/23maverick23/lib-openair-bootstrap.svg)](https://github.com/23maverick23/lib-openair-bootstrap/releases) [![GitHub license](https://img.shields.io/github/license/23maverick23/lib-openair-bootstrap.svg)](https://github.com/23maverick23/lib-openair-bootstrap/blob/master/LICENSE) [![Build Status](https://img.shields.io/travis/23maverick23/lib-openair-bootstrap/master.svg)](https://travis-ci.org/23maverick23/lib-openair-bootstrap) [![devDependency Status](https://img.shields.io/david/dev/23maverick23/lib-openair-bootstrap.svg)](https://david-dm.org/23maverick23/lib-openair-bootstrap#info=devDependencies)

This is a simple library for creating more eye-pleasing email notifications in OpenAir User Scripting. It uses simplified Bootstrap components which can be easily included in HTML formatted emails sent via `NSOA.meta.sendMail()`.

## Installation

Download `LibOpenAirBootstrap.js` or the minified version `LibOpenAirBootstrap.min.js` from this repository. `require` it into your user script with whatever name you like.

## Usage

Before you begin, make sure to upload and deploy the `LibOpenAirBootstrap` file as a **Library** in OpenAir. There are no dependencies to this library when installing.

Next, import the library into your script using the `require` syntax. It's likely best to do this early in your script to prevent import errors.

Once the library is loaded, you can call any of the available methods, passing the required arguments, and return a `BootstrapResult` object.

```javascript
var LibOA = require('LibOpenAirBootstrap');

var data = {
    title: 'Alert title!',
    content: 'Alert body text.'
};

var body = LibOA.Bootstrap.alert(data, 'warning').html;

var message = {
    to: ['youremail@address.com'],
    subject: 'LibOpenAirBootstrap',
    body: body
};

var email = LibOA.BootstrapMail.mail(message);
```

## Documentation

The following methods are available from within the library.

### Alert

![Bootstrap.alert](https://github.com/23maverick23/lib-openair-bootstrap/raw/master/images/alert.png)

```javascript
/**
 * Create a Bootstrap styled alert.
 * @param {object} data         A JSON object containing required data.
 * @param {string} type         An alert type which controls colors. Valid
 *                              types are: success, info, warning, danger.
 * @return {BootstrapResult}    A BootstrapResult object.
 *
 * The format of the data object should look like the below.
 * {
 *     "title": "My Title",
 *     "content": "My HTML body content"
 * }
 */
var myAlert = LibOA.Bootstrap.alert(data, type);
```

### Label

![Bootstrap.label](https://github.com/23maverick23/lib-openair-bootstrap/raw/master/images/label.png)

```javascript
/**
 * Create a Bootstrap styled label.
 * @param {string} data         A string to be displayed inside the label.
 * @param {string} type         An alert type which controls colors. Valid
 *                              types are: default, primary, success, info,
 *                              warning, danger.
 * @return {BootstrapResult}    A BootstrapResult object.
 */
var myLabel = LibOA.Bootstrap.label(data, type);
```

### Progress

![Bootstrap.progress](https://github.com/23maverick23/lib-openair-bootstrap/raw/master/images/progress.png)

```javascript
/**
 * Create a Bootstrap styled progress meter.
 * @param {string} data         A string to be displayed inside the badge.
 * @return {BootstrapResult}    A BootstrapResult object.
 */
var myProgress = LibOA.Bootstrap.progress(data);
```

### Badge

![Bootstrap.badge](https://github.com/23maverick23/lib-openair-bootstrap/raw/master/images/badge.png)

```javascript
/**
 * Create a Bootstrap styled badge.
 * @param {string} data         A string to be displayed inside the badge.
 * @return {BootstrapResult}    A BootstrapResult object.
 */
var myBadge = LibOA.Bootstrap.badge(data);
```

### Well

![Bootstrap.well](https://github.com/23maverick23/lib-openair-bootstrap/raw/master/images/well.png)

```javascript
/**
 * Create a Bootstrap styled well.
 * @param {string} data         A string to be displayed inside the well.
 * @return {BootstrapResult}    A BootstrapResult object.
 */
var myWell = LibOA.Bootstrap.well(data);
```

### BootstrapResult

This is returned by all methods

```javascript
/**
 * @class BootstrapResult
 * @classdesc A Bootstrap result object.
 * @param {string} content      HTML string.
 * @param {boolean} error       True for errors.
 * @this BootstrapResult
 * @property {string} this.html - The raw HTML content.
 * @property {number} this.count - The character length of the content.
 * @property {boolean} this.error - True if there was an error.
 */
var BootstrapResult = function(content, error) {
    this.html  = content || '';
    this.count = content.length;
    this.error = error || false;
}
```

### Mail

There is also an included utility function for sending mail. This method is simply a wrapper around the standard `NSOA.meta.sendMail()` method, however it ensures that the message format is set to `HTML`.

```javascript
/**
 * A simple wrapper for sendMail method to require HTML format.
 * @param {Object} message      An email message object.
 * @return {?boolean}           True if message is queued for email.
 */
var myMail = LibOA.BootstrapMail.mail(message);
```

## History

12 APR 2016

- Close issue #1
- Close issue #2

09 APR 2016

- Initial commit

## Credits

Thanks to the folks over at [Bootstrap](getbootstrap.com) for their awesome work.

## License

This project is [licensed](LICENSE) under the MIT license.