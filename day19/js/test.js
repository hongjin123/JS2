var doc=document,
 oBtn=doc.getElementById("my"),
buttons=doc.getElementsByTagName('button');
for(var i=0,len=buttons.length;i<len;i++)
buttons[i].onclick=function(){
	alert(this.id)
}