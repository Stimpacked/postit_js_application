<?php 

// store POST for id
$id = $_POST['id'];

// Open file
$xml = simplexml_load_file('../xml/0.xml');

// Check xml for ID
foreach($xml->children() as $child) {
	if($child->id == $id) {
		// if ID is found, remove from xml
		$dom=dom_import_simplexml($child);
        $dom->parentNode->removeChild($dom);
	}
}

// save xml
$xml->asXml('../xml/0.xml');