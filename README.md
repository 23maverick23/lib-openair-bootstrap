lib-openair-bootstrap
=====================

This is a simple library for creating more eye-pleasing email notifications in OpenAir User Scripting. It uses simplified Bootstrap components which can be easily included in HTML formatted emails sent via `NSOA.meta.sendMail()`.

## Installation

Download `LibOpenAirBootstrap.js` or the minified version `LibOpenAirBootstrap.min.js` from this repository. `require` it into your user script with whatever name you like.

## Usage

Before you begin, make sure to upload and deploy the `LibOpenAirBootstrap` file as a **Library** in OpenAir. There are no dependencies to this library when installing.

Next, import the library into your script using the `require` syntax. It's likely best to do this early in your script to prevent import errors.

Once the library is loaded, you can call any of the available methods, passing the required arguments, and return a formatted HTML string. This string can be input directly into the body of an HTML email.

```javascript
var LibOA = require('LibOpenAirBootstrap');

var data = {
    title: 'Alert title!',
    content: 'Alert body text.'
};

var body = LibOA.Bootstrap.alert(data, 'warning');

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
 * @param  {object} data    A JSON object containing required data
 * @param  {string} type    An alert type which controls colors. Valid
 *                          types are: success, info, warning, danger.
 * @return {string}         Formatted HTML string.
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

```javascript
/**
 * Create a Bootstrap styled label.
 * @param  {string} data    A string to be displayed inside the label
 * @param  {string} type    An alert type which controls colors. Valid
 *                          types are: default, primary, success, info,
 *                                     warning, danger.
 * @return {string}         Formatted HTML string.
 */
var myLabel = LibOA.Bootstrap.label(data, type);
```

### Progress

```javascript
/**
 * Create a Bootstrap styled progress meter.
 * @param  {string} data    A string to be displayed inside the badge
 * @return {string}         Formatted HTML string.
 */
var myProgress = LibOA.Bootstrap.progress(data);
```

### Badge

```javascript
/**
 * Create a Bootstrap styled badge.
 * @param  {string} data    A string to be displayed inside the badge
 * @return {string}         Formatted HTML string.
 */
var myBadge = LibOA.Bootstrap.badge(data);
```

### Well

```javascript
/**
 * Create a Bootstrap styled well.
 * @param  {string} data    A string to be displayed inside the well
 * @return {string}         Formatted HTML string.
 */
var myWell = LibOA.Bootstrap.well(data);
```

### Mail

There is also an included utility function for sending mail. This method is simply a wrapper around the standard `NSOA.meta.sendMail()` method, however it ensures that the message format is set to `HTML`.

```javascript
/**
 * Simple wrapper for sendMail method to require HTML format.
 */
var myMail = LibOA.BootstrapMail.mail(message);
```

## History

09 APR 2016

- Initial commit

## Credits

Thanks to the folks over at [Bootstrap](getbootstrap.com) for their awesome work.

## License

This project is [licensed](LICENSE) under the MIT license.