var dgram = require("dgram"),
	server = dgram.createSocket("udp4"),
	search = "M-SEARCH * HTTP/1.1 \r\n"
			+ "HOST: 239.255.255.250:1900 \r\n"
			+ "MAN: ssdp:discover \r\n"
			+ "MX: 10 \r\n"
			+ "ST: ssdp:all \r\n"
			+ "\r\n",
	notify = "NOTIFY * HTTP/1.1 \r\n"
			+ "HOST: 239.255.255.250:1900 \r\n"
			+ "LOCATION: http://10.0.1.1:49000/igddesc.xml \r\n"
			+ "SERVER: FRITZ!Box 6360 Cable (um) UPnP/1.0 AVM FRITZ!Box 6360 Cable (um) 85.05.28 \r\n"
			+ "CACHE-CONTROL: max-age=1800 \r\n"
			+ "NT: urn:schemas-upnp-org:service:WANIPConnection:1 \r\n"
			+ "NTS: ssdp:alive \r\n"
			+ "USN: uuid:75802409-bccb-40e7-8e6a-9CC7A60A9D6A::urn:schemas-upnp-org:service:WANIPConnection:1 \r\n";


function send() {
	var message = new Buffer( search );
	server.send(message, 0, message.length, 1900, "239.255.255.250");
	setTimeout( send, 5000 );
}

server.bind(1900, '0.0.0.0', function() {
	server.addMembership('239.255.255.250');
	send();
});