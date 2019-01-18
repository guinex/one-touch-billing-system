window.onload=function(){


};

$(document).ready(function(){
 document.getElementById("userid").innerHTML = username;
//document.getElementById("username").innerHTML = useremail;

    $("#deleteall").click(function(){
        deletecart();
    });
	 $(".rightarrow").click(function(){
      slidenav();
    });
 $("#carticon").click(function(){
      showcart();
    });
	 $("#scancarticon").click(function(){
      showcart();
    });
	   
	 $("#paycart").click(function(){
      savecart();
    });

/*function handleParseError(err) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
     
      break;

    
  }
}
*/
});
var currentUser = Parse.User.current();	
if(currentUser){
var username  = currentUser.get("username");
var useremail  = currentUser.get("email");
localStorage.setItem("username",username);	 
localStorage.setItem("usermail",useremail);	 

var id=0;
var idc = 1000;

var idm =0;	


/*imp*/



function create(pi,n,d,p,i,t,z,offset,offer){
	
	/* i is used for product image
	   z is used for the type of product to generate relevent items
	*/
var master = document.getElementById("contain");
var flag = document.createElement("div");
if(offset=="f"){
	var ofset = "flat";
	flag.setAttribute("class","flatoff");
	}
else if(offset=="d"){
	var ofset = "discount";
	flag.setAttribute("class","discount");
	}
else if(offset=="o"){
	var ofset = "offer";
	flag.setAttribute("class","off");
	}

flag.setAttribute("id",id+"off");
var parent_container = document.createElement("div");
parent_container.setAttribute("class","drawers");
parent_container.setAttribute("id",id);
var product_price = document.createElement("div");
var product_name = document.createElement("div");
var product_quantity = document.createElement("div");
var product_desc = document.createElement("div");
var addtocart = document.createElement("div");
var compare = document.createElement("div");
var product_img = document.createElement("div");
var product_offer = document.createElement("div");
product_offer.setAttribute("class","productoffer");
product_offer.innerHTML = d;
var img_default = document.createElement("img");
var img_plus = document.createElement("img");
var img_minus = document.createElement("img");
var cart = document.createElement("img");
var btncompare = document.createElement("img");

product_name.setAttribute("class","productname");
product_name.setAttribute("id",id+"productname");
product_price.setAttribute("class","productprice");
product_price.setAttribute("id",id+"productprice");
product_quantity.setAttribute("class","productquantity");
product_quantity.setAttribute("id",id+"productquantity");
product_desc.setAttribute("class","productdescription");
product_desc.setAttribute("id",id+"productdescription");
product_img.setAttribute("class","productimg");
product_img.setAttribute("id",id+"productimg");
addtocart.setAttribute("class","addtocart");
addtocart.setAttribute("id",id+"addtocart");
compare.setAttribute("class","compare");
compare.setAttribute("id",id+"compare");
img_default.setAttribute("src",i);
img_default.setAttribute("class","productdefaulticon");
img_default.setAttribute("id",id+"productdefaulticon");
img_plus.setAttribute("src","icons/plus.jpg");
img_plus.setAttribute("class","plus");
img_plus.setAttribute("id",id+"plus");
img_minus.setAttribute("src","icons/minus.jpg");
img_minus.setAttribute("class","minus");
img_minus.setAttribute("id",id+"minus");
cart.setAttribute("src","icons/Add-To-Cart.png");
cart.setAttribute("class","addtocarticon");
cart.setAttribute("id",id+"addtocarticon");
cart.setAttribute("onclick","addtocartele("+id+","+pi+");");
btncompare.setAttribute("src","icons/compare_balance.png");
btncompare.setAttribute("class","compareicon");
btncompare.setAttribute("id",id+"compareicon");

btncompare.setAttribute("onclick","comparedown("+pi+")");

var quantity = document.createElement("span");
quantity.setAttribute("class","quantity");
quantity.innerHTML = 1;
quantity.setAttribute("id",id+"quantity");
product_name.innerHTML = n;
product_desc.innerHTML = d;
product_price.innerHTML = "Rs "+p;
img_plus.setAttribute("onclick","plusone("+id+")");
img_minus.setAttribute("onclick","minusone("+id+")");
product_img.appendChild(img_default);

product_quantity.appendChild(img_minus);
product_quantity.appendChild(quantity);
product_quantity.appendChild(img_plus);

addtocart.appendChild(cart);
compare.appendChild(btncompare);

parent_container.appendChild(product_img);
parent_container.appendChild(product_name);
parent_container.appendChild(product_quantity);
parent_container.appendChild(product_desc);
parent_container.appendChild(product_price);
parent_container.appendChild(addtocart);
parent_container.appendChild(compare);
parent_container.appendChild(product_offer);
master.appendChild(parent_container);
master.appendChild(flag);



id++;

}

function plusone(id){
	var x = document.getElementById(id+"quantity").innerHTML;
	
	x=parseInt(x);
	if(x<10)
	x++;
	document.getElementById(id+"quantity").innerHTML=x;
}
function minusone(id){
	var x = document.getElementById(id+"quantity").innerHTML;
	x=parseInt(x);
	x--;
	if(x<1){
		document.getElementById(id+"quantity").innerHTML=1;
	}
	else
	document.getElementById(id+"quantity").innerHTML=x;
}

function create_compare(pi,n,p,d,offset,i,url){


if(i==0){
var master = document.getElementById("contain");
var slave_compare = document.createElement("div");
slave_compare.setAttribute("class","slave");
slave_compare.setAttribute("id",pi+"slave");
var flag = document.createElement("div");
if(offset=="f")
	flag.setAttribute("class","flatoffslave");
else if(offset=="d")
	flag.setAttribute("class","discountslave");
else if(offset=="o")
	flag.setAttribute("class","offslave");

flag.setAttribute("id",pi+"off");


var parent_container = document.createElement("div");
parent_container.setAttribute("class","drawercompare");
parent_container.setAttribute("id",pi+"cdrawer"+idm);

var product_price = document.createElement("div");
var product_name = document.createElement("div");
var product_desc = document.createElement("div");
var product_img = document.createElement("div");
var img_default = document.createElement("img");
product_name.setAttribute("class","pcname");
product_name.setAttribute("id",pi+"cproductname"+idm);
product_price.setAttribute("class","pcprice");
product_price.setAttribute("id",pi+"cproductprice"+idm);
product_desc.setAttribute("class","pcdescription");
product_desc.setAttribute("id",pi+"cproductdescription"+idm);
product_img.setAttribute("class","productimg");
product_img.setAttribute("id",pi+"productimg");

product_name.innerHTML = n;
product_desc.innerHTML = d;
product_price.innerHTML = "Rs "+p;
if(url){
img_default.setAttribute("src",url);
}
else img_default.setAttribute("src","icons/productdefault.jpg");
img_default.setAttribute("class","productdefaulticon");
img_default.setAttribute("id",pi+"productdefaulticon");
product_img.appendChild(img_default);
parent_container.appendChild(product_img);
parent_container.appendChild(product_name);
parent_container.appendChild(product_desc);
parent_container.appendChild(product_price);
slave_compare.appendChild(parent_container);
slave_compare.appendChild(flag);


idm++;

master.appendChild(slave_compare);

/*if(si == "true"){
var similar = document.createElement("div");
similar.setAttribute("id","othermart");
similar.innerHTML = "Similar Products";
master.appendChild(similar);
}*/
 $(".slave").slideUp(5);

}
else{
var master = document.getElementById(pi+"slave");

var flag = document.createElement("div");
if(offset=="f")
	flag.setAttribute("class","flatoffslave");
else if(offset=="d")
	flag.setAttribute("class","discountslave");
else if(offset=="o")
	flag.setAttribute("class","offslave");

flag.setAttribute("id",pi+"off");


var parent_container = document.createElement("div");
parent_container.setAttribute("class","drawercompare");
parent_container.setAttribute("id",pi+"cdrawer"+idm);
/*
var sep = document.createElement("div");
sep.setAttribute("id",pi+"seperator"+idm);
sep.setAttribute("class","separator");
*/
var product_price = document.createElement("div");
var product_name = document.createElement("div");
var product_desc = document.createElement("div");
var product_img = document.createElement("div");
var img_default = document.createElement("img");

product_name.setAttribute("class","pcname");
product_name.setAttribute("id",pi+"cproductname"+idm);
product_price.setAttribute("class","pcprice");
product_price.setAttribute("id",pi+"cproductprice"+idm);
product_desc.setAttribute("class","pcdescription");
product_desc.setAttribute("id",pi+"cproductdescription"+idm);
product_img.setAttribute("class","productimg");
product_img.setAttribute("id",pi+"productimg");

product_name.innerHTML = n;
product_desc.innerHTML = d;
product_price.innerHTML = "Rs "+p;
if(url){
img_default.setAttribute("src",url);
}
else img_default.setAttribute("src","icons/productdefault.jpg");
img_default.setAttribute("class","productdefaulticon");
img_default.setAttribute("id",pi+"productdefaulticon");
product_img.appendChild(img_default);
parent_container.appendChild(product_img);
parent_container.appendChild(product_name);
parent_container.appendChild(product_desc);
parent_container.appendChild(product_price);
master.appendChild(parent_container);
master.appendChild(flag);
/*master.appendChild(sep);*/

idm++;


/*if(si == "true"){
var similar = document.createElement("div");
similar.setAttribute("id","othermart");
similar.innerHTML = "Similar Products";
master.appendChild(similar);
}*/
 $(".slave").slideUp(5);

	
}
}

function slidenav(){
	var x   = document.getElementById('navigator');
    x.style.display="block";
	x   = document.getElementById('arrow');
	x.setAttribute("class","leftarrow");
	x.setAttribute("src","icons/menu.png");
	$(".leftarrow").click(function(){
      lslidenav();
    });
}
function lslidenav(){
	var x   = document.getElementById('navigator');
    x.style.display="none";
	x   = document.getElementById('arrow');
	x.setAttribute("class","rightarrow");
	x.setAttribute("src","icons/menu.png");
	$(".rightarrow").click(function(){
      slidenav();
    });
}

function comparedown(ele){
	/*var clickedID = ele.id;
	clickedID = clickedID.replace(/\D/g,'');*/
	var x = document.getElementById(ele+"slave");
	if($(x).is(":visible"))
     $(x).slideUp('fast');
  else   $(x).slideDown('fast');
	/*$('.compareicon').click(function(){
	
    compareup(ele);
	
});
	*/	
	
}



function showcart(){
	window.location = "cart.html";
}
function addtocartele(id,pi){
	var plusonebtn = document.getElementById(id+"plus");
	plusonebtn.setAttribute("onclick","");
	var minusonebtn = document.getElementById(id+"minus");
	minusonebtn.setAttribute("onclick","");
	var parentnode  = document.getElementById(id);
	var res = [];
	var pid  = pi;
	var present = false;
	var incart = JSON.parse(localStorage.getItem("incart"));
	for(var t=0;t<incart.length;t++){
		console.log(incart);
	}
	var idp = pi;
	idp = idp.toString();
	if(incart[0] =="null" )
	{
		incart[0] = idp;
		//localStorage.setItem("incart",res);
		localStorage.setItem("incart", JSON.stringify(incart));
		var x = parentnode.childNodes;

	
	
	var name = x[1].innerHTML;
	var des = x[3].innerHTML;
	var quantity = x[2].childNodes;
	quantity = quantity[1].innerHTML;
	var price = x[4].innerHTML;
	var ele2  = x[5];
	ele2 = ele2.childNodes;
	ele2 = ele2[0];
	
	var off = x[7].innerHTML;
	
	off = off.split(" ");
	if(off[0]=="Buy"||off[0]=="offer"){
		off = "offer";
		 var ele ="";  
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	else if(off==""){
	 var ele ="";	   
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	else {
		off = off[0]+" "+off[1]+" "+off[2];
		 var ele ="";    
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	
	
	
	

	
	/*console.log(ele);*/
	
	if(localStorage.getItem("cartcount")==0){
		
	var count = localStorage.getItem("cartcount");
	
	localStorage.setItem("ele"+count,ele);
	count = parseInt(count);
	count++;
	localStorage.setItem("cartcount",count);
	}
	else{
		
	var count = localStorage.getItem("cartcount");
	
	localStorage.setItem("ele"+count,ele);
	count = parseInt(count);
	count++;
	localStorage.setItem("cartcount",count);
	
		
	}
    console.log(localStorage.getItem("ele"+(count-1)));
	/*makecart(pi,name,des,quantity,price,off);*/
	

	var btn =  document.getElementById(id+"addtocarticon");
	btn.setAttribute("onclick","");
	/* generate_alert(name+added); */
	}
	else{
		console.log(incart);
		for(var k =0;k<incart.length;k++)
			if(incart[k]==idp)
				present = true;
		if(present == true)	{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Product Already Added in your Cart";
	alertbtn.setAttribute("onclick","gotoscanpage()");
			
		}
		else if(present==false){	
		
		
		incart.push(idp);
		//localStorage.setItem("incart",res);
		localStorage.setItem("incart", JSON.stringify(incart));
		var x = parentnode.childNodes;

	
	
		var name = x[1].innerHTML;
	var des = x[3].innerHTML;
	var quantity = x[2].childNodes;
	quantity = quantity[1].innerHTML;
	var price = x[4].innerHTML;
	var ele2  = x[5];
	ele2 = ele2.childNodes;
	ele2 = ele2[0];
	
	var off = x[7].innerHTML;
	
	off = off.split(" ");
	if(off[0]=="Buy"||off[0]=="offer"){
		off = "offer";
		 var ele ="";  
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	else if(off==""){
	 var ele ="";	   
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	else {
		off = off[0]+" "+off[1]+" "+off[2];
		 var ele ="";    
	ele +=off+" ";

	ele +=pid+" ";
	ele +=name+" ";
	ele +=price+" ";
	ele +=quantity+" ";
	ele +=des+" ";
	ele2.setAttribute("src","icons/addedtocart.png");
	}
	/*console.log(ele);*/
	
	if(localStorage.getItem("cartcount")==0){
		
	var count = localStorage.getItem("cartcount");
	
	localStorage.setItem("ele"+count,ele);
	count = parseInt(count);
	count++;
	localStorage.setItem("cartcount",count);
	}
	else{
		
	var count = localStorage.getItem("cartcount");
	
	localStorage.setItem("ele"+count,ele);
	count = parseInt(count);
	count++;
	localStorage.setItem("cartcount",count);
	
		
	}
    console.log(localStorage.getItem("ele"+(count-1)));
	/*makecart(pi,name,des,quantity,price,off);*/
	

	var btn =  document.getElementById(id+"addtocarticon");
	btn.setAttribute("onclick","");
	/* generate_alert(name+added); */
	
		}
	}
	
	
}
	
function makecart(){

	 /*call cloud function to retrive data of cart*/
	 var c = localStorage.getItem("cartcount");
	 c = parseInt(c);
	 var z=0;
	for (var k=0;k<c;k++){
	var j =k;
	j=j.toString();
	var item =localStorage.getItem("ele"+j);
	if(item!="null"){
	z++;	
	item = item.split(" ");
	
	if(item[0]=="offer"){
			var pi   = item[1] ;
	
	var w = 2;
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
		w++;
	}
	 var price = item[w]+" "+item[w+1];
	/* for(var b = w+3;b<item.length;b++)*/
	
			
	var quantity = item[w+2];
	w = w+3;
	var des= "";
	while(w!=item.length){
	 des +=  item[w]+" ";
	 w++
	}
	var off = "";
	}
	
	else if(item[0]=="discount"||item[0]=="flat"){
	var pi   = item[3] ;
	
	var w = 4;
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
		w++;
	}
	var price = item[w]+" "+item[w+1]+" "+item[w+2];
	
	var quantity = item[w+3];
	w=w+4;
	var des= "";
	while(w!=item.length){
	 des +=  item[w]+" ";
	 w++
	}
	var off = "";
	}
	else{
	
	var pi   = item[1] ;
	
	var w = 2;
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
		w++;
	}
	var price = item[w]+" "+item[w+1];
	var des =""  ;
	var quantity = item[w+2];
	
	var off = "";
	}
	
var master = document.getElementById("cart");
var parent_container = document.createElement("div");
parent_container.setAttribute("class","item");
parent_container.setAttribute("id",pi+"cart");
var product_price = document.createElement("div");
var product_name = document.createElement("div");
var product_quantity = document.createElement("div");
var product_desc = document.createElement("div");
var offer = document.createElement("div");
var remove = document.createElement("div");
var removeicon = document.createElement("img");
product_name.setAttribute("class","pname");
product_name.setAttribute("id",pi+"pname");
product_price.setAttribute("class","pprice");
product_price.setAttribute("id",pi+"pprice");
product_quantity.setAttribute("class","pquantity");
product_quantity.setAttribute("id",pi+"pquantity");
product_desc.setAttribute("class","pdescription");
product_desc.setAttribute("id",pi+"pdescription");
offer.setAttribute("class","poffer");
offer.setAttribute("id",pi+"poffer");
remove.setAttribute("class","removeproduct");
remove.setAttribute("id",pi+"removeproduct");
removeicon.setAttribute("class","removeicon");
removeicon.setAttribute("src","icons/remove.png");
removeicon.setAttribute("id",pi+"removeicon");
removeicon.setAttribute("onclick","removeelement("+pi+")");
product_name.innerHTML = name;
product_desc.innerHTML = des;
product_price.innerHTML = price;

offer.innerHTML = off;
product_quantity.innerHTML = quantity;
remove.appendChild(removeicon);
parent_container.appendChild(product_name);
parent_container.appendChild(product_quantity);
parent_container.appendChild(product_price);
parent_container.appendChild(product_desc);
parent_container.appendChild(remove);
parent_container.appendChild(offer);
master.appendChild(parent_container);
}
else{
	continue;
}
	}
	
	if(z==0)
		$("#paycart").hide();
	else
		$("#paycart").show();
	}
	
function removeelement(pi){
	var l = localStorage.getItem("cartcount");
	
	l= parseInt(l);
	/*call cloud to delete the data or item*/
	 for (var i = 0;i<l;i++)
	 {
		 var rem =  localStorage.getItem("ele"+i);
		 var id =pi+"cart";
			var check = rem.split(" ");
		 console.log(check);
		 if(check[1]==pi||check[3]==pi||check[6]==pi){
			 localStorage.setItem("ele"+i,"null");
			
			 
			 var incart = JSON.parse(localStorage.getItem("incart"));
		
			 var ipd = pi.toString();
			 for(var k=0;k<incart.length;k++){
				 if(incart[k]==ipd)
				 {
					 
					 incart.splice(k,1);
					
					 localStorage.setItem("incart", JSON.stringify(incart));
					 
				 }
			 }
		 }
		/* if(pi==cartid[i]){
			cartid.splice(i,1);
			cartname.splice(i,1);
			cartprice.splice(i,1);
			cartdescription.splice(i,1);
			cartquantity.splice(i,1);
			cartoffer.(i,1);
			cartcount--;
		 }
		 */
		 	console.log(localStorage.getItem("ele"+i));
			console.log(i);
	 }
/*	 console.log(cartname);
	 console.log(cartdescription);
	 console.log(cartquantity);
	 console.log(cartprice);
	 console.log(cartoffer);
	 console.log(cartid);
	 */
	 
	 var x = document.getElementById(pi+"cart");
	
	
	 $(x).slideUp();
	
}
/* changes v3*/
function deletecart(){
	/*call cloud to delete the data or item*/
		var l = localStorage.getItem("cartcount");
	
	l= parseInt(l);
	/*call cloud to delete the data or item*/
	 for (var i = 0;i<l;i++)
	 {
		
			 localStorage.setItem("ele"+i,"null");
			 var incart = JSON.parse(localStorage.getItem("incart"));
		
			
			 for(var k=0;k<incart.length;k++){
				
				 
					 
					 incart.splice(k,1);
					
					 localStorage.setItem("incart", JSON.stringify(incart));
					 
				 
			 }
			 
		 
			
		 	console.log(localStorage.getItem("ele"+i));
			console.log(i);
	 }

	 var x = document.getElementsByClassName("item");
			
			$(x).remove();
	localStorage.setItem("cartcount",0);
	window.location = "cart.html";
}

/*
function cartitems(){
	
	var name = cartele.name.split(" ");
	var price = cartele.price.split(",");
	var description = cartele.description.split(",");
	var quantity = cartele.quantity.split(" ");
	var count = cartele.count;
    this.return_name = function(){
		return name;
	}
	this.return_price = function(){
		return price;
	}
	this.return_description = function(){
		return description;
	}
	this.return_quantity = function(){
		return quantity;
	}
	this.return_count = function(){
		return count;
	}
}
function getindexed(index){
	var name = cartele.name.split(" ");
	name  = name[index];
	
	
}
function generate_alert(msg){
	var alerts = document.getElementById("alert");
	alerts.innerHTML = msg;
	
	setTimeout( "$('#alerts').show();", 400000000);
	
}
function changecartin(ele){
	
	 ele.setAttribute('src', 'icons/shopping_click.png');
}
function changecartout(ele){
	
	 ele.setAttribute('src', 'icons/shopping.png');
}
*/
function savecartid(id){
	/*Parse.Cloud.run('deletepreviouscart ',{username:username},{
	    success:function(){
			
			
		window.location = "area.html";
		},
		error: function(error){
			console.log(error.message);
		}
		
});*/
		Parse.Cloud.run('savethiscartid ',{id:id,username:username},{
	    success:function(){
			
			
		window.location = "index.html";
		},
		error: function(error){
			console.log(error.message);
		}
		
});
}
function gotoarea(){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	
	window.location="index.html";
	
}
function gotoscan(){

	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	
	var city = localStorage.getItem("city");
	var z = Math.floor((Math.random() * 1000000000) + 1);
    /*var y = Math.floor((Math.random() * 100) + 1);
    var n= Math.floor((z*y)/(y+1));
	n = Math.abs(n);*/
	z=z.toString();
	
	Parse.Cloud.run('savecity ',{city:city,username:username,billno:z},{
	    success:function(id){
			var currentcartid = id;
			localStorage.setItem("currentcartid", currentcartid);
			scannow();
			
		},
		error: function(error){
			console.log(error.message);
		}
		
});
	
	
}
function scannow(){
	var mn = localStorage.getItem("martname");
	mn = mn.split(" ");
	mn= mn[0];
	
	var mi = localStorage.getItem("currentmartid");
	var cid = localStorage.getItem("currentcartid");
	Parse.Cloud.run('savemartid ',{objectId:cid,martid:mi,martname:mn},{
	    success:function(results){
			if(results)
			window.location="scan.html";
			
		},
		error: function(error){
			console.log(error.message);
		}
		
});
	
} 
function logout(){
	window.location="login.html";
}
function gotoscanpage(){
	window.location="scan.html";
}
function changelocation(){
	window.location = "location.html";
	
}
function leavemart(){
	window.location = "index.html";
	
}
function pay(){
	/*save cart to cloud*/
	window.location="payment.html";
}
function historydetail(){
	var nowurl = window.location.href;
	localStorage.setItem("nowurl",nowurl);
	window.location="purchase.html";
}

function checklist(){
	var nowurl = window.location.href;
	localStorage.setItem("nowurl",nowurl);
		window.location="previuosproductchecklist.html";
}
function quickpick(){
	var nowurl = window.location.href;
	localStorage.setItem("nowurl",nowurl);
	window.location="checklist.html";

}
function gotoaccount(){
	var nowurl = window.location.href;
	localStorage.setItem("nowurl",nowurl);
	window.location="account.html";

}
function gotohowitworks(){
	var nowurl = window.location.href;
	localStorage.setItem("nowurl",nowurl);
	window.location="walkthrough.html";

}
}
else{
window.location="login.html";
	
	
}