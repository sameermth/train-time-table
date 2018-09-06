<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/jsonp");
header("Access-Control-Request-Method: POST");
require 'vendor/autoload.php';

	$con = new MongoDB\Client();
	
	$db = $con->train;
	
	$collection = $db->train_time_table;
	
	$train_time_table = array();
	
	if(isset($_POST['train_number']))
	{
		$train_number = $_POST['train_number'];
		$document = $collection->find(['Train No'=> (int)$train_number]);
		foreach($document as $doc){
			$temp = array(
							'sequence' 		=> $doc['SEQ'],
							'stationCode'	=> $doc['Station Code'],
							'stationName'	=> $doc['Station Name'],
							'arrivalTime'	=> $doc['Arrival time'],
							'departureTime'=> $doc['Departure Time']
						);
			array_push($train_time_table, $temp);				
		}
	}
	
	echo json_encode($train_time_table);
	
?>