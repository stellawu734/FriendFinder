// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData 		= require('../data/friend.js');
console.log(friendData.length+' friends founded!');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
	// API GET Requests
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function (req, res) {
		res.json(friendData);
	});


	// API POST Requests
	// Below code handles when a user submits a form and thus submits data to the server.
	// In each of the below cases, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server saves the data to the tableData array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function (req, res) {
		// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
		// It will do this by sending out the value "true" have a table
		console.log(req.body);
		res.json(friendData);
		//handle claculations too
		var differences = [];
		for (var i = 0; i < friendData.length; i++) {
			for (var j = 0; j < req.body.scores.length; j++) {
				var difference = 0;
				difference = difference+Math.abs(req.body.scores[j] - friendData[i].scores[j])
			}
			differences.push(difference);
		}
		console.log(differences);
		var match = Math.min.apply(Math, differences);
		var index = differences.indexOf(match);
		console.log('best match found: '+friendData[index].name);
		friendData.push(req.body);
	});

	
};