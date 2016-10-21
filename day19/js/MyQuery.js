function addHandler(obj,event,func){
     if(obj.addEventListener){
     	obj.addEventListener(event,function(ev){
            if(false==func.call(obj))
            {
               ev.stopPropagation();
                ev.preventDefault();

            }
      },false);
     } 
     else if(obj.attachEvent){
     	obj.attachEvent("on"+event,function(){
     		 if(false==func.call(obj)){
            window.event.cancelBubble=true;
            return false;
         }
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
 MyQuery.prototype.extend=function(name,fun){
  MyQuery.prototype[name]=fun;
 }
 MyQuery.prototype.click=function(func){
 	for(var i=0;i<this.elements.length;i++){
 		addHandler(this.elements[i],"click",func);
 	}
   return this;
 }

 MyQuery.prototype.hover=function(fun1,fun2){
 		for(var i=0;i<this.elements.length;i++){
 		addHandler(this.elements[i],"mouseover",fun1);
 		addHandler(this.elements[i],"mouseout",fun2);
 	}
  return this;
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
     return this;
}

MyQuery.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="none";
	}
  return this;
}
MyQuery.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display="block";
	}
  return this;
}

MyQuery.prototype.css=function(attr,value){
	if(arguments.length==2){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style[attr]=value;
	}
  }
  else
  {
     if(typeof attr=="string"){
  	   return  getStyle(this.elements[0],attr);
     }
     else
     {for(var i=0;i<this.elements.length;i++){
           for(var t in attr){

            this.elements[i].style[t]=attr[t];
           }
          }
     }
  }
  return this;
}
MyQuery.prototype.bindEvent=function(event,fn){
    for(var i=0;i<this.elements.length;i++){
      addHandler(this.elements[i],event,fn);
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
  return this;
}
 MyQuery.prototype.eq=function(n){

 	return $(this.elements[n]);
 }
 MyQuery.prototype.find=function(str){  //找子元素
     var arr=[];
     for(var i=0;i<this.elements.length;i++){
         switch(str.charAt(0)){
            case '.':
               arr = arr.concat(getByClass(this.elements[i],str.substring(1)));
               break;
            default:
             var els = this.elements[i].getElementsByTagName(str);
             for(var j=0;j<els.length;j++){
                 arr.push(els[j]);
             }

         }
     }
     var newIns=$();
     newIns.elements=arr;
     return newIns;

 }

 function getIndex(obj){
     var  objs=obj.parentNode.children;
     for(var i=0;i<objs.length;i++){
          if(objs[i]==obj)
            return i;
     }
 }

 MyQuery.prototype.index=function(){
     return getIndex(this.elements[0]);
 }

function $(arg){
	return new MyQuery(arg);
}