// npm install createsend-node

// Authenticate with API Key
var createsend = require('createsend-node');
var auth = { apiKey: 'd84667cf35e1a0f408e6b4b0d82c57c4' };
var api = new createsend(auth);

// Create a details object
var details = {};

// Add the unique identifier for the smart email
details.smartEmailID = 'edd46feb-4940-46af-8478-8a8b35932129';

// Add the 'To' email address
details.to = "Wayne <wayne@moving2canada.com>";

// Add mail merge variables
details.data = {
    "x-apple-data-detectors": "x-apple-data-detectorsTestValue",
	"href^=\"tel\"": "href^=\"tel\"TestValue",
	"href^=\"sms\"": "href^=\"sms\"TestValue",
	"owa": "owaTestValue",
	"role=section": "role=sectionTestValue",
	"style*=\"font-size:1px\"": "style*=\"font-size:1px\"TestValue",
	"firstname": "Wayne"
}

// Send the smart email(and provide a callback function that takes an error and a response parameter)
api.transactional.sendSmartEmail(details, function (err, res) {
    if (err) {
        /*do something*/
        console.log("email failed");
    } else {
        /*do something*/
        console.log("email sent");
    }
});
        