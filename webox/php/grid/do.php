<?php
header("Content-type: text/html; charset=utf-8");

if($_POST['trId']){
	$field=$_POST['rel'];
	$trId=$_POST['trId'];
	$val=$_POST['value'];
	echo $val;
}else{
$arr=array("result"=>array(
	array(
		"ID"=>"1",
		"name"=>"qin"
	),
	array(
		"ID"=>"2",
		"name"=>"<a href='#'>qin</a>"
	)),"paginal"=>array(
		"total"=>340,
		"pages"=>7,
		"size"=>50,
		"current"=>"1"
	)
);


echo json_encode($arr);
}
?>