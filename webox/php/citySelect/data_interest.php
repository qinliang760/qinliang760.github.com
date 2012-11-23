<?php
/*
include_once("connect.php");
$keywords="最近";



if(empty($keywords)){
    echo "不能为空";
}else{
	$query=mysql_query("select title,dateline from fy_articles where title like '$keywords%'");
	if($query){
		$arr = array();
	   while($row=mysql_fetch_assoc($query))
		{
		$arr[]=$row;
		} 
		//print_r($arr);
		echo json_encode($arr);

	}else{
	   echo "数据出错";	
	}
}*/
$arr=array(
	array(
		"name"=>"北京",
		"id"=>"1"
	),
	array(
		"name"=>"上海",
		"id"=>"2"
	),
	array(
		"name"=>"深圳",
		"id"=>"3"
	),
	array(
		"name"=>"广州",
		"id"=>"4"
	),
	array(
		"name"=>"南京",
		"id"=>"5"
	)			
);
echo json_encode($arr);
?>