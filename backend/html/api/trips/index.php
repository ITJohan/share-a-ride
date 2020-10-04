<?php
define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
include(ABS_PATH . "/api.php");
//include(ABS_PATH . "/agilecourse/api.php");

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 1000');	

//Chrome skickar en pre-flight request av typ OPTIONS som 
//vill ha flaggor, den här biten löser det
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	header('Access-Control-Max-Age: 1000');	
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$filterArray = getTripGETParameters();
	$response = readFilteredTable($filterArray, "Resa", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">=") . "ORDER BY startTime ASC");
	sendResponseQuery($response);
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$data = json_decode(file_get_contents("php://input", true));
	$response = writeTrip($data);
	sendResponseString($response);
}
?>