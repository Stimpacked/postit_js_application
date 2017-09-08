<?php 

// Load xml file
$filename = '../xml/0.xml';


// Check if xml exists
if (file_exists($filename)) {
	// load xml
    $xml = simplexml_load_file($filename);
} else {
	// new xml string
    $xmlNew = <<< EOT
<?xml version="1.0"?>
<stickers>
</stickers>
EOT;
	// make new xml object from string
	$xml = new SimpleXMLElement($xmlNew);
	// save xml
	$xml->asXml($filename);
}

// Convert to json object and echo out to javascript
echo json_encode($xml);