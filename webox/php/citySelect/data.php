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
		"pin"=>"beijing"
	),
	array(
		"name"=>"上海",
		"pin"=>"shanghai"
	),
	array(
		"name"=>"深圳",
		"pin"=>"shenzhen"
	),
	array(
		"name"=>"广州",
		"pin"=>"guangzhou"
	),
	array(
		"name"=>"南京",
		"pin"=>"nanjin"
	)			
);
echo json_encode($arr);
?>