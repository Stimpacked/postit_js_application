<?php

// set variables from post
$id = $_POST['id'];
$text = $_POST['textArea'];
$xcord = $_POST['xcord'];
$ycord = $_POST['ycord'];
$zcord = $_POST['zcord'];

$exists = false;

// load xml file
$xml = simplexml_load_file('../xml/0.xml');

// Check if ID exists from before
foreach($xml->children() as $child) {
	if($child->id == $id) {

		// set new data for found node
		$child->text = $text;
		$child->position->x = $xcord;
		$child->position->y = $ycord;
		$child->position->z = $zcord;
		$exists = true;
	}
}

// if not exist from before make new node
if(!$exists) {
	$sticker = $xml->addChild('sticker');

	$sticker->addChild('id', $id);
	$sticker->addChild('text', $text);
	$sticker->addChild('position');
	$sticker->position->addChild('x', $xcord);
	$sticker->position->addChild('y', $ycord);
	$sticker->position->addChild('z', $zcord);
}

// save xml
$xml->asXml('../xml/0.xml');

// Edit the attributes (text, x, y, z) for that sticker

// Create new sticker with provided data
