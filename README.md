lib-openair-bootstrap
=====================

This is a simple library for creating more eye-pleasing email notifications in OpenAir User Scripting. It uses simplified Bootstrap components which can be easily included in HTML formatted emails sent via `NSOA.meta.sendMail()`.

## Installation

Download `LibOpenAirBootstrap.js` or the minified version `LibOpenAirBootstrap.min.js` from this repository. `require` it into your user script with whatever name you like.

## Usage

Before you begin, make sure to upload and deploy the `LibOpenAirBootstrap` file as a **Library** in OpenAir. There are no dependencies to this library when installing.

Next, import the library into your script using the `require` syntax.

```javascript
var LibOA = require('LibOpenAirBootstrap');
```

The following methods are available from within the library.

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

/**
 * Create a Bootstrap styled label.
 * @param  {string} data    A string to be displayed inside the label
 * @param  {string} type    An alert type which controls colors. Valid
 *                          types are: default, primary, success, info,
 *                                     warning, danger.
 * @return {string}         Formatted HTML string.
 */
var myLabel = LibOA.Bootstrap.label(data, type);

/**
 * Create a Bootstrap styled progress meter.
 * @param  {string} data    A string to be displayed inside the badge
 * @return {string}         Formatted HTML string.
 */
var myProgress = LibOA.Bootstrap.progress(data);

/**
 * Create a Bootstrap styled badge.
 * @param  {string} data    A string to be displayed inside the badge
 * @return {string}         Formatted HTML string.
 */
var myBadge = LibOA.Bootstrap.badge(data);

/**
 * Create a Bootstrap styled well.
 * @param  {string} data    A string to be displayed inside the well
 * @return {string}         Formatted HTML string.
 */
var myWell = LibOA.Bootstrap.well(data);
```

There is also an included utility function for sending mail. This method is simply a wrapper around the standard `sendMail()` method, however it ensures that the message format is set to `HTML`.

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