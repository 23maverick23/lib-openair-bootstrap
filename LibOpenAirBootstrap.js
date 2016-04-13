/**
 * @file Add simplified Bootstrap components in emails.
 * @version 1.0.0
 * @author Ryan Morrissey <rmorrissey@netsuite.com>
 * @copyright 2016 NetSuite, Inc.
 * @license MIT
 */

/** namespace */
var Bootstrap = (function () {
    // ************************************************************************ //
    // MODULE METATAGS
    // ************************************************************************ //

    var VERSION = '1.0.0',
        AUTHOR  = 'Ryan Morrissey',

    // ************************************************************************ //
    // MODULE GLOBALS
    // ************************************************************************ //

        total_char_limit    = 30000,  // 30,000 character limit as of 16.1
        alert_char_count    = 167,    // HTML and CSS characters total 167
        label_char_count    = 243,    // HTML and CSS characters total 243
        progress_char_count = 416,    // HTML and CSS characters total 416
        badge_char_count    = 252,    // HTML and CSS characters total 252
        well_char_count     = 201,    // HTML and CSS characters total 201

        elipses             = '...',
        limit_msg           = '[Limit]',  // Displayed if limit is exceeded
        error_msg           = 'Unexpected error. Please contact an administrator.',
        log_source          = null,

    // ************************************************************************ //
    // PRIVATE METHODS
    // ************************************************************************ //

        /**
         * A Bootstrap result object.
         * @param {string} content      HTML string.
         * @param {boolean} error       True for errors.
         */
        BootstrapResult = function(content, error) {
            this.html  = content || '';
            this.count = content.length;
            this.error = error || false;
        },

        /**
         * Creates an alert color swatch object.
         * @param {string} color        Text hexcolor.
         * @param {string} background   Background hexcolor.
         * @param {string} border       Border hexcolor.
         */
        ColorSwatch = function (color, background, border) {
            this.color      = color;
            this.background = background;
            this.border     = border;
        },

        styles = {
            alert: {
                success: new ColorSwatch("#3c763d", "#dff0d8", "#d0e9c6"),  // Green
                info:    new ColorSwatch("#31708f", "#d9edf7", "#bcdff1"),  // Blue
                warning: new ColorSwatch("#8a6d3b", "#fcf8e3", "#faf2cc"),  // Orange
                danger:  new ColorSwatch("#a94442", "#f2dede", "#ebcccc")   // Red
            },
            label: {
                default: new ColorSwatch(null, "#777777", null),
                primary: new ColorSwatch(null, "#337ab7", null),
                success: new ColorSwatch(null, "#5cb85c", null),
                info:    new ColorSwatch(null, "#5bc0de", null),
                warning: new ColorSwatch(null, "#f0ad4e", null),
                danger:  new ColorSwatch(null, "#d9534f", null)
            }
        },

        /**
         * Test if value is an object or not, ignoring arrays too.
         * @param {Array|Object}  val   Any type to check as Object.
         * @return {boolean}            Returns true if is an Object.
         */
        isObject = function (val) {
            if (val === null) { return false;}
            if (Array.isArray(val)) { return false; }
            return ( (typeof val === 'function') || (typeof val === 'object') );
        },

        /**
         * Trims message body to ensure content is under max limit.
         * @param {string|Object} data   An Object or string of message data.
         * @return {string|Object}       A copy of the original Object or string.
         */
        trimMessageBody = function (data, elem) {
            log_source = 'Bootstrap::trimMessageBody()<br>';  // First line of log output

            try {
                var elem_types      = {
                        alert    : alert_char_count,
                        label    : label_char_count,
                        progress : progress_char_count,
                        badge    : badge_char_count,
                        well     : well_char_count
                    },

                    log_msg = log_source +
                              'Your email body has been truncated as it ' +
                              'exceeded the 30,000 max character limit.',

                    html_char_count    = parseInt(elem_types[elem]),
                    title_char_count   = 0,
                    content_char_count = 0,
                    base_char_count    = 0,
                    char_overage       = 0;

                if (isObject(data) && elem === 'alert') {

                    // Ensure correct keys if data is an object
                    if ( !('title' in data) || !('content' in data) ) { return false; }

                    // Data argument is an object and element is an alert
                    title_char_count   = parseInt(data.title.length);
                    content_char_count = parseInt(data.content.length);
                    base_char_count    = parseInt(total_char_limit - html_char_count - title_char_count);

                    if (base_char_count < 0) {
                        char_overage = base_char_count - limit_msg.length - elipses.length;
                        data.title = data.title.slice(0, char_overage) + elipses;
                        data.content = limit_msg;

                        NSOA.meta.log('warning', log_msg);

                        // This will only display in Form scripts; it should
                        // fail silently in Scheduled scripts.
                        NSOA.form.warning(log_msg);

                    } else if (base_char_count - content_char_count < 0) {
                        char_overage = base_char_count - content_char_count - elipses.length;  // Adjust for elipses
                        data.content = data.content.slice(0, char_overage) + elipses;

                        NSOA.meta.log('warning', log_msg);

                        // This will only display in Form scripts; it should
                        // fail silently in Scheduled scripts.
                        NSOA.form.warning(log_msg);
                    }
                } else {
                    // Data argument is a string
                    base_char_count    = parseInt(total_char_limit - html_char_count);
                    content_char_count = parseInt(data.length);

                    if (base_char_count - content_char_count < 0) {
                        char_overage = base_char_count - html_char_count - elipses.length;  // Adjust for elipses
                        data = data.slice(0, char_overage) + elipses;

                        NSOA.meta.log('warning', log_msg);

                        // This will only display in Form scripts; it should
                        // fail silently in Scheduled scripts.
                        NSOA.form.warning(log_msg);
                    }
                }

            } catch (e) {
                NSOA.meta.log('error', 'Bootstrap: Unexpected error -> ' + e.message);
            } finally {
                return data;
            }
        },

    // ************************************************************************ //
    // PUBLIC METHODS
    // ************************************************************************ //

        /**
         * Create a Bootstrap styled alert.
         * @param {Object} data             An Object containing required data.
         * @param {string} data.title       Alert title.
         * @param {string} data.content     Alert body content.
         * @param {string} type             An alert type which controls colors. Valid
         *                                  types are: success, info, warning, danger.
         * @return {BootstrapResult}        A BootstrapResult object.
         * 
         * The format of the data object should look like the below.
         * {
         *     "title": "My Title",
         *     "content": "My HTML body content"
         * }
         */
        alert = function (data, type) {
            log_source = 'Bootstrap::alert()<br>';  // First line of log output

            try {
                var clean_data   = trimMessageBody(data),
                    alert_type   = type || 'info',  // Default to 'info' if null
                    html_content = null,
                    html_output  = null;

                html_content = '<div style="border-radius:.25rem;color:' +
                        styles.alert[alert_type].color +
                    ';background:' +
                        styles.alert[alert_type].background +
                    ';margin:20px;padding:15px;border:1px solid ' +
                        styles.alert[alert_type].border +
                    ';"><strong style="font-weight:bold;">{{title}} </strong>{{content}}</div>'
                ;

                html_output = html_content
                    .replace(/{{title}}/, clean_data.title)
                    .replace(/{{content}}/, clean_data.content)
                ;

                return new BootstrapResult(html_output, false);
            } catch(e) {
                NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
                return new BootstrapResult(error_msg, true);
            }
        },

        /**
         * Create a Bootstrap styled label.
         * @param {string} data         A string to be displayed inside the label
         * @param {string} type         An alert type which controls colors. Valid
         *                              types are: default, primary, success, info,
         *                              warning, danger.
         * @return {BootstrapResult}    A BootstrapResult object.
         */
        label = function (data, type) {
            log_source = 'Bootstrap::label()<br>';  // First line of log output

            try {
                var clean_data   = trimMessageBody(data),
                    label_type   = type || 'default',  // Default to 'default' if null
                    html_content = null,
                    html_output  = null;

                html_content = '<span style="box-sizing:border-box;display:inline;' +
                    'padding:.2em .6em .3em;font-size:75%;font-weight:700;line-height:1;' +
                    'color:#fff;text-align:center;white-space:nowrap;vertical-align:baseline;' +
                    'border-radius:.25em;background-color:' +
                        styles.label[label_type].background +
                    ';">{{label}}</span>'
                ;

                html_output = html_content
                    .replace(/{{label}}/, clean_data)
                ;

                return new BootstrapResult(html_output, false);
            } catch(e) {
                NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
                return new BootstrapResult(error_msg, true);
            }
        },

        /**
         * Create a Bootstrap styled progress meter.
         * @param {string} data         A string to be displayed inside the badge.
         * @return {BootstrapResult}    A BootstrapResult object.
         */
        progress = function (data) {
            log_source = 'Bootstrap::progress()<br>';  // First line of log output

            try {
                var percent      = (data.indexOf('%') === -1) ? data + '%' : data,
                    clean_data   = trimMessageBody(percent),
                    html_content = null,
                    html_output  = null;

                html_content     = '<div style="box-sizing:border-box;height:20px;' +
                    'margin-bottom:20px;overflow:hidden;background-color:#f5f5f5;' +
                    'border-radius:4px;box-shadow:inset 0 1px 2px rgba(0,0,0,.1);">' +
                    '<div style="min-width:2em;width:{{progress}};box-sizing:border-box;' +
                    'float:left;height:100%;font-size:12px;line-height:20px;color:#fff;' +
                    'text-align:center;background-color:#337ab7;' +
                    'box-shadow:inset 0 -1px 0 rgba(0,0,0,.15);' +
                    'transition:width .6s ease;">{{progress}}</div></div>'
                ;

                html_output = html_content
                    .replace(/{{progress}}/g, clean_data)
                ;

                return new BootstrapResult(html_output, false);
            } catch(e) {
                NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
                return new BootstrapResult(error_msg, true);
            }
        },

        /**
         * Create a Bootstrap styled badge.
         * @param {string} data         A string to be displayed inside the badge.
         * @return {BootstrapResult}    A BootstrapResult object.
         */
        badge = function (data) {
            log_source = 'Bootstrap::badge()<br>';  // First line of log output

            try {
                var clean_data   = trimMessageBody(data),
                    html_content = null,
                    html_output  = null;

                html_content = '<span style="box-sizing:border-box;display:inline-block;' +
                    'min-width:10px;padding:3px 7px;font-size:12px;font-weight:700;' +
                    'line-height:1;color:#fff;text-align:center;white-space:nowrap;' +
                    'vertical-align:middle;background-color:#777;border-radius:10px;">{{badge}}</span>'
                ;

                html_output = html_content
                    .replace(/{{badge}}/, clean_data)
                ;

                return new BootstrapResult(html_output, false);
            } catch(e) {
                NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
                return new BootstrapResult(error_msg, true);
            }
        },

        /**
         * Create a Bootstrap styled well.
         * @param {string} data         A string to be displayed inside the well.
         * @return {BootstrapResult}    A BootstrapResult object.
         */
        well = function (data) {
            log_source = 'Bootstrap::well()<br>';  // First line of log output

            try {
                var clean_data   = trimMessageBody(data),
                    html_content = null,
                    html_output  = null;

                html_content = '<div style="box-sizing:border-box;min-height:20px;padding:19px;' +
                    'margin-bottom:20px;background-color:#f5f5f5;border:1px solid #e3e3e3;' +
                    'border-radius:4px;box-shadow:inset 0 1px 1px rgba(0,0,0,.05);">{{well}}</div>'
                ;

                html_output = html_content
                    .replace(/{{well}}/, clean_data)
                ;

                return new BootstrapResult(html_output, false);
            } catch(e) {
                NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
                return new BootstrapResult(error_msg, true);
            }
        }
    ;

    return {
        VERSION  : VERSION,
        AUTHOR   : AUTHOR,

        alert    : alert,
        label    : label,
        progress : progress,
        badge    : badge,
        well     : well
    };

})();


/** namespace */
var BootstrapMail = (function () {
    /**
     * Simple wrapper for sendMail method to require HTML format.
     * @param {Object} message      A message object.
     * @return {?boolean}           True if mail was queued to send.
     */
    var mail = function (message) {
        var log_source = 'BootstrapMail::mail()<br>',  // First line of log output
            m          = null;

        try {
            if (!message || message.length < 1) {
                NSOA.meta.log('error', log_source + 'Mail method has 1 required argument "message"!');
                return;
            }
            message.format = 'HTML';  // Require HTML
            m = NSOA.meta.sendMail(message);
        } catch(e) {
            NSOA.meta.log('error', log_source + 'Unexpected error -> ' + e.message);
        } finally {
            return m;
        }
    };

    return {
        mail: mail
    };
})();

exports.Bootstrap = Bootstrap;
exports.BootstrapMail = BootstrapMail;