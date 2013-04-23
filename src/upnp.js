var dgram = require("dgram"),
	server = dgram.createSocket("udp4"),
	search = "M-SEARCH * HTTP/1.1 \r\n"
			+ "HOST: 239.255.255.250:1900 \r\n"
			+ "MAN: ssdp:discover \r\n"
			+ "MX: 10 \r\n"
			+ "ST: ssdp:all \r\n"
			+ "\r\n";

function parseUpnpMessage( msg ) {

	var parsed = {},
		first = parsed.shift();

	

}

server.on("message", function (msg, info) {

	var parse = String(msg).split(/[ ]*\r\n/),
		trigger = parse[0].match(/M-SEARCH|NOTIFY/);
	
	console.log( parse );
});

server.on("listening", function () {
  //var address = server.address();
  //console.log("server listening " +
     // address.address + ":" + address.port);
});

server.on("error", function() {
	console.log( arguments );
});

server.bind(1900, '0.0.0.0', function() {
	server.addMembership('239.255.255.250');
});