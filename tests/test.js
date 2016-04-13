function runBootstrapTests(type) {
    var LibOA = require('LibOpenAirBootstrap');
    var LibLorem = require('LibLoremIpsum');

    var shorttext = LibLorem.LoremIpsum.paragraph(),
        longtext  = LibLorem.LoremIpsum.sentence(),
        datanum   = shorttext.length,
        data      = {
            title: 'An Important Alert!',
            content: shorttext
        },
        datalong = {
            title: 'An Important Alert!',
            content: longtext
        },
        body = null
    ;

    /**
     * START TEST CASES - UNCOMMENT ONE AT A TIME!
     */
    
    // CASE 1 - Alert no type
    body = LibOA.Bootstrap.alert(data).html;

    // CASE 2 - Alert with type
    // body = LibOA.Bootstrap.alert(data, 'warning').html;

    // CASE 3 - Alert exceeds limit
    // body = LibOA.Bootstrap.alert(datalong).html;

    // CASE 4 - Label no type
    // body = LibOA.Bootstrap.label(shorttext).html;

    // CASE 5 - Label with type
    // body = LibOA.Bootstrap.label(shorttext, 'info').html;

    // CASE 6 - Label exceeds limit
    // body = LibOA.Bootstrap.label(longtext).html;

    // CASE 7 - Progress
    // body = LibOA.Bootstrap.progress(datanum).html;

    // CASE 8 - Badge
    // body = LibOA.Bootstrap.badge(datanum).html;

    // CASE 9 - Well
    // body = LibOA.Bootstrap.well(shorttext).html;

    // CASE 10 - Well exceeds limit
    // body = LibOA.Bootstrap.well(longtext).html;

    /**
     * END TEST CASES
     */

    // EMAIL MESSAGE
    var message = {
        to: ['rmorrissey@netsuite.com'],
        subject: 'LibOpenAirBootstrap',
        body: body
    };

    // SEND MAIL USING WRAPPER FUNCTION
    LibOA.BootstrapMail.mail(message);
}