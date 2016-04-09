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
    body = LibOA.Bootstrap.alert(data);

    // CASE 2 - Alert with type
    // body = LibOA.Bootstrap.alert(data, 'warning');

    // CASE 3 - Alert exceeds limit
    // body = LibOA.Bootstrap.alert(datalong);

    // CASE 4 - Label no type
    // body = LibOA.Bootstrap.label(shorttext);

    // CASE 5 - Label with type
    // body = LibOA.Bootstrap.label(shorttext, 'info');

    // CASE 6 - Label exceeds limit
    // body = LibOA.Bootstrap.label(longtext);

    // CASE 7 - Progress
    // body = LibOA.Bootstrap.progress(datanum);

    // CASE 8 - Badge
    // body = LibOA.Bootstrap.badge(datanum);

    // CASE 9 - Well
    // body = LibOA.Bootstrap.well(shorttext);

    // CASE 10 - Well exceeds limit
    // body = LibOA.Bootstrap.well(longtext);

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