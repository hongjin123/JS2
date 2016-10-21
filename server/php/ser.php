<?php
   if($_GET["cb"]){
   	 $f=$_GET["cb"];
   }
   else
   {
   $f="test";
   }

   if($_GET["city"]){
   	  $c=$_GET["city"];
   }
   else
   {
   	  $c="beijing";
   }


   $arr=array("beijing"=>"25,3");
   $arr1=array("shanghai"=>"28,4");
   $arr2=array("tianjin"=>"26,1");
   
   switch($c){
   	case "beijing":
   echo "$f(".json_encode($arr).")";break;
     	case "shanghai":
   echo "$f(".json_encode($arr1).")";break;
   	case "tianjin":
   echo "$f(".json_encode($arr2).")";break;
	}

?>