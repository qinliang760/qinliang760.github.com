<?php

$items = array(
"id"=>"Podiceps nigricollis",
"name"=>"Ixobrychus minutus",
"type"=>"Nycticorax nycticorax",
"come"=>"Ardea purpurea",
"start"=>"Ciconia ciconia",
"end"=>"Platalea leucorodia"
);

echo json_encode($items);
/*foreach ($items as $key=>$value) {
	//if (strpos(strtolower($key), $q) !== false) {
		echo "$key|$value\n";
	//}
}*/

?>