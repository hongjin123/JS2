<?php
    // echo "alert('hello php php');";
     if($_GET["cb"]){
     	$f=$_GET["cb"];
     }
     else
     {
     	$f="fun";
     }
     $arr=array("beijing"=>"天气晴，28度");
     $arr1=array("tianjin"=>"天气多云，26度");
     $arr2=array("shanghai"=>"天气晴，32度");
     if($_GET["city"])
     {
     	$cs=$_GET["city"];
     }
     else
     {
     	$cs="beijing";
     }
    
     switch ($cs) {
     	case 'beijing':
     		 $data=json_encode($arr);
     		break;
     	case 'tianjin':
     		 $data=json_encode($arr1);
     		break;
     	case 'shanghai':
     		 $data=json_encode($arr2);
     		break;
     }
     echo $f."($data)";
?>