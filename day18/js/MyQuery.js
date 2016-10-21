function addHandler(obj,event,func){
     if(obj.addEventListener){
     	obj.addEventListener(event,func,false);
     } 
     else if(obj.attachEvent){
     	obj.attachEvent("on"+event,function(){
     		func.call(obj);
     	}); //默认this 指向 window call指向obj

     }    
     else
     {
     	 obj["on"+event]=func;
     }

}
function getByClass(obj,name){
	 var tags = obj.getElementsByTagName("*");
	 var arr=[];
	 var reg=new RegExp("\\b"+name+"\\b");
	 for(var i=0;i<tags.length;i++){
	 	 if(reg.test(tags[i].className)){
	 	 	  arr.push(tags[i]);
	 	 }
	 }
	 return arr;
}

function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj,null)[attr];
	}
}

function MyQuery(arg)
{
	this.elements=[];   //选中的元素存在数组里
	switch(typeof arg){
		case "function":
		     addHandler(window,"load",arg);break;
        case "string":
             switch(arg.charAt(0)){
             	 case '#':
             	      var el = document.getElementById(arg.substring(1));
             	      this.elements.push(el);
             	      break;
             	 case ".":
             	      this.elements=getByClass(document,arg.substring(1));
             	      break;
             	 default:
             	     this.elements=document.getElementsByTagName(arg);
             }
             break;
        case "object":
              this.elements.push(arg);

	}
}
 MyQuery.prototype.html=function(){
 	
 	return this.elements[0].innerHTML;
 }
 MyQuery.prototype.click=function(func){
 	for(var i=0;i<this.elements.length;i++){
 		addHandler(this.elements[i],"click",func);
 	}
 }
 MyQuery.prototype.hover=function(fun1,fun2){
 		for(var i=0;i<this.elements.length;i++){
 		addHandler(this.elements[i],"mouseover",fun1);
 		addHandler(this.elements[i],"mouseout",fun2);
 	}
 }      //mouseover  mouseout
MyQuery.prototype.toggle=function(){
     var _arguments=arguments;
     for(var i=0;i<this.elements.length;i++){
     	this.elements[i].index=0;
     	  this.elements[i].onclick=function(){
              	_arguments[this.index%_arguments.length].call(this);
 				this.index++;
     	  }
     }

}

MyQuery.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="none";
	}
}
MyQuery.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="block";
	}
}

MyQuery.prototype.css=function(attr,value){
	if(arguments.length==2){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style[attr]=value;
	}
  }
  else
  {
  	   return  getStyle(this.elements[0],attr);
  }
}
MyQuery.prototype.attr=function(attr,value){
	if(arguments.length==2){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i][attr]=value;
	}
  }
  else
  {
  	   return  this.elements[0][attr];
  }
}
 MyQuery.prototype.eq=function(n){

 	return $(this.elements[n]);
 }
function $(arg){
	return new MyQuery(arg);
}