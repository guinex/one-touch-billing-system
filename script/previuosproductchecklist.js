$(document).ready(function(){
		checklist();
				 $(".containsarrow").click(function(){
      goback();
    });
		
	});
var mi = localStorage.getItem("currentmartid");
var mn = localStorage.getItem("martname");


var relevant ;
var refmartid =[];
var similarlength ;	
var company ;
var desc ;
var productpreview ;
var times ;
var product_id ;
var name ;
var price;
var type ;
var rotate = "false";
var relevant_productid = [];
var getsimilarflag = 0;
var global_price;
var issimilar = "false";
var barcode2;
var compare2 = false;	
var productsinchecklist = [];
var eachfrequency = [];	
var finalres = [];
	var each = [];
	var barcode;
	var searcheditem  = [];
	function goback(){
		var nowurl = localStorage.getItem("nowurl");
		window.location = nowurl;
	}	
function searchitem(){
	var sec = document.getElementById("searchtext").value;
	sec=sec.toString();
	sec = sec.toLowerCase();
	if(sec){
	searcheditem=[];
	for(var i=0;i<searchvar.length;i++){
		var s = searchvar[i];
		/*
		s=s.split(" ");
		
		for(var j=0;j<s.length;j++){
			
			if(sec == s[j]){
				searcheditem.push(i);
			}
			str.search("W3Schools");
			
		}*/
		s=s.toString();
		s=s.toLowerCase();
		var n = s.search(sec);
		if(n!=-1){
			searcheditem.push(finalres[i]);
		}
	}
	console.log(searcheditem);
	showsearch();
	}
}	

function removesearch(){
	document.getElementById("searchtext").value="";
	for(var i=0;i<searcheditem.length;i++){
		var x  = document.getElementById(searcheditem[i]);
		x.style.display = "none";
	}
	
	var l = document.getElementById("searchimg");
	l.setAttribute("src","icons/yeast.png");
    l.setAttribute("onclick","searchitem()");
		$('.drawers').show();
		$('.flatoff').show();
}

function showsearch(){
	var z = document.getElementById("searchimg");
	z.setAttribute("src","icons/windowclose.png");
	z.setAttribute("onclick","removesearch()");
	
	$('.drawers').hide();
	$('.flatoff').hide();
	for(var i=0;i<searcheditem.length;i++){
		var x  = document.getElementById(searcheditem[i]);
		x.style.display = "block";
	}
}
function checklist(){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	var username = localStorage.getItem("username");
	var martid = localStorage.getItem("currentmartid");
	
	Parse.Cloud.run('checklist ',{username:username,martid:martid},{
	    success:function(results){
			if(results){	
			console.log(results);
			var res = results;
				for(var i=0;i<res.length;i++){
						res[i] = parseInt(res[i]);
				}
				res.sort();
				console.log(res);
				var i=0;
			while(i<res.length)	
			{
				var c=0;
				var j=i;
				while(res[i]==res[j]){
					if(c==0)
					finalres.push(res[i]);	
					c++;
					j++;
					
				}
				c++;
				each.push(c);
				i=j;
			}
			productsinchecklist = finalres;
			eachfrequency       = each;
			
			generatesearch();
				console.log(res);
				console.log(finalres);
				console.log(each);
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

}	
var countglobal=0;
var searchglobal=0;
var searchvar = [];
function generatesearch(){
	if(searchglobal<finalres.length)
	{
		Parse.Cloud.run('checklistsearch',{product:parseInt(finalres[searchglobal])},{
	    success:function(results){
		if(results){	
		 var r ="";
		 r += results[0].toString();
		 r += " "+results[1].toString();
		 searchvar.push(r);
					searchglobal++;
		 			generatesearch();
					console.log(searchvar);
		}
		},
		error: function(error){
			searchglobal=0;
			generatesearch();
			console.log(error.code);
		}
		});
		
	}
	else {
		generatechecklist();
	}
}
function generatechecklist(){
	if(countglobal<finalres.length)
	{
		finalres[countglobal] = parseInt(finalres[countglobal]);
		generateproducts(finalres[countglobal]);
	}
	else {
		checkchecklist();
		var alerts = document.getElementById("alert");
		alerts.style.display="none";
	}
}

function generateproducts(b){
barcode = parseInt(b);

/*cloud function 1*/

		Parse.Cloud.run('getproductforchecklist ',{barcode:barcode},{
	    success:function(results){
			if(results!=false){	
/*alert('deployed');	*/	
			
			 product_id = results[0].get("productid");
			
			 name = results[0].get("productname");
			 price = results[0].get("price");
			  global_price = price;
			 company = results[0].get("company");
			 type = results[0].get("type");
			productpreview = results[0].get("productpreview").url();
			 relevant =results[0].get("type");
			 
			refmartid = results[0].get("refmartid");
			 for(var i=0;i<refmartid.length;i++)
				 if(parseInt(refmartid[i])==mi)
					refmartid.splice(i, 1);
			  times  = refmartid.length;
		
			  /*localstorage.setItem("productincart",product_id);*/
			var desc = company;
			offset ="n";
			/*console.log(relevant);*/
			console.log(refmartid);	
		
			create(product_id,name,desc,price,productpreview,times,type,offset,company);
			
			}
			else
			{
				countglobal++;
				generatechecklist();
			}
			
			
			
		},
		error: function(error){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Product Currently Unavailable<br>Please try Later...";
	alertbtn.setAttribute("onclick","gotoscanpage()");
		
			console.log(error);
		}
		
});
}
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
flag.setAttribute("class","flatoff");
flag.style.backgroundColor = "#ffffff";

flag.setAttribute("id",pi+"off");
var parent_container = document.createElement("div");
parent_container.setAttribute("class","drawers");
parent_container.setAttribute("id",pi);
parent_container.setAttribute("onclick","addtochecklist("+pi+")");
var product_price = document.createElement("div");
var product_name = document.createElement("div");

//var product_quantity = document.createElement("div");
var product_desc = document.createElement("div");
var addtocart = document.createElement("div");
var compare = document.createElement("div");
var product_img = document.createElement("div");
var product_offer = document.createElement("div");
product_offer.setAttribute("class","productoffer");
product_offer.innerHTML = d;

var img_default = document.createElement("img");
/*
var img_plus = document.createElement("img");
var img_minus = document.createElement("img");
var cart = document.createElement("img");
var btncompare = document.createElement("img");
*/
product_name.setAttribute("class","productnameinchecklist");
product_name.setAttribute("id",id+"productname");
product_price.setAttribute("class","productprice");
product_price.setAttribute("id",id+"productprice");
/*
product_quantity.setAttribute("class","productquantity");
product_quantity.setAttribute("id",id+"productquantity");
*/
product_desc.setAttribute("class","productdescription");
product_desc.setAttribute("id",id+"productdescription");
product_img.setAttribute("class","productimg");
product_img.setAttribute("id",id+"productimg");
/*
addtocart.setAttribute("class","addtocart");
addtocart.setAttribute("id",id+"addtocart");
compare.setAttribute("class","compare");
compare.setAttribute("id",id+"compare");
*/
img_default.setAttribute("src",i);
img_default.setAttribute("class","productdefaulticon");
img_default.setAttribute("id",id+"productdefaulticon");
/*
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
btncompare.setAttribute("src","icons/check.png");
btncompare.setAttribute("class","compareicon");
btncompare.setAttribute("id",id+"compareicon");

btncompare.setAttribute("onclick","comparedown("+pi+")");
*/
//var quantity = document.createElement("span");
//quantity.setAttribute("class","quantity");
//quantity.innerHTML = 1;
//quantity.setAttribute("id",id+"quantity");
product_name.innerHTML = n;
product_desc.innerHTML = d;
product_price.innerHTML = "Rs "+p;
//img_plus.setAttribute("onclick","plusone("+id+")");
//img_minus.setAttribute("onclick","minusone("+id+")");
product_img.appendChild(img_default);

//product_quantity.appendChild(img_minus);
//product_quantity.appendChild(quantity);
//product_quantity.appendChild(img_plus);

//addtocart.appendChild(cart);
//compare.appendChild(btncompare);

parent_container.appendChild(product_img);
parent_container.appendChild(product_name);
//parent_container.appendChild(product_quantity);
parent_container.appendChild(product_desc);
parent_container.appendChild(product_price);
//parent_container.appendChild(addtocart);
//parent_container.appendChild(compare);
parent_container.appendChild(product_offer);
master.appendChild(parent_container);

master.appendChild(flag);



id++;
countglobal++;
generatechecklist();
}
function plusone(id){
	var x = document.getElementById(id+"quantity").innerHTML;
	
	x=parseInt(x);
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
function addtochecklist(id){
var x = document.getElementById(id);
x.style.backgroundColor = "#FFCC80";
x.setAttribute("onclick","removefromchecklist("+id+")")	;
var y = document.getElementById(id+"off");
y.style.backgroundColor = "#FFCC80";

var pid = parseInt(id);
var z=0;

 var check =JSON.parse(localStorage.getItem("checkedlist"));

if(check[0]!="null"){

for(var i=0;i<check.length;i++){
	if(parseInt(check[i])==pid)
		z++;
}
if(z==0){
	pid  = pid.toString();
	check.push(pid);
}	
}
else {
	pid  = pid.toString();
	check[0] = pid;
}
localStorage.setItem("checkedlist",JSON.stringify(check));
	 
check =JSON.parse(localStorage.getItem("checkedlist"));
console.log(check);
}	
function removefromchecklist(id){
var x = document.getElementById(id);
x.style.backgroundColor = "#FFFFFF";
x.setAttribute("onclick","addtochecklist("+id+")")	;
var y = document.getElementById(id+"off");
y.style.backgroundColor = "#FFFFFF";
var pid = parseInt(id);
var z=0;

var check = JSON.parse(localStorage.getItem("checkedlist"));

console.log(check);
if(check[0]!="null"){

for(var i=0;i<check.length;i++){
	if(parseInt(check[i])==id){
		z=i;
		break;
	}
}
}

check.splice(z,1);	
console.log(check);
localStorage.setItem("checkedlist",JSON.stringify(check));


check = JSON.parse(localStorage.getItem("checkedlist"));
console.log(check);
}
function checkchecklist(){
	var check = JSON.parse(localStorage.getItem("checkedlist"));
	var count = localStorage.getItem("cartcount");
	var incart = JSON.parse(localStorage.getItem("incart"));
	if(check[0]!="null"){
	for(var k=0;k<check.length;k++){
		var t = check[k];
		t = t.toString();
		var x = document.getElementById(t);
x.style.backgroundColor = "#FFCC80";
x.setAttribute("onclick","removefromchecklist("+t+")")	;
var y = document.getElementById(t+"off");
y.style.backgroundColor = "#FFCC80";
	}
	}
	for(var i=0;i<parseInt(count);i++){
		var item =localStorage.getItem("ele"+i);
		if(item!="null"){
	item = item.split(" ");
	
	if(item[0]=="offer"){
			var pi   = item[1] ;
				
	}
	
	else if(item[0]=="discount"||item[0]=="flat"){
	var pi   = item[3] ;
	}
	else{
	
	var pi   = item[1] ;
	
	}
	pi = parseInt(pi);
	for(var j=0;j<check.length;j++)
	if(pi==parseInt(check[j])){
		pi =pi.toString();
var x = document.getElementById(pi);
x.style.backgroundColor = "#9CCC65";
x.setAttribute("onclick","removefromchecklist("+pi+")")	;
var y = document.getElementById(pi+"off");
y.style.backgroundColor = "#9CCC65";
	}
	}
	
}
}
function arrangechecked(){
	var z  = document.getElementsByClassName("containsarrangechecked")[0];
	z.style.marginTop="15%";
	var x = document.getElementById("nowselected");
	x.style.backgroundColor ="#1abc9c";
	x.style.color ="white";
	x.innerHTML = "View All";
	x.setAttribute("onclick","unarrangechecked()");
	$('.drawers').hide();
		$('.flatoff').hide();
		
		$("#search").slideUp();
	var check = JSON.parse(localStorage.getItem("checkedlist"));	
	for(var k=0;k<check.length;k++){
		var t = check[k];
		t = t.toString();
		var x = document.getElementById(t);

x.setAttribute("onclick","removefromchecklist("+t+")")	;
x.style.display = "block";
var y = document.getElementById(t+"off");

x.style.display = "block";
	}
		
}
function unarrangechecked(){
		var z  = document.getElementsByClassName("containsarrangechecked")[0];
	z.style.marginTop="2%";
	var x = document.getElementById("nowselected");
	x.style.backgroundColor ="white";
	x.style.color ="black";
	x.innerHTML = "View Checked";
	x.setAttribute("onclick","arrangechecked()");
	$("#search").slideDown();
		$('.drawers').show();
		$('.flatoff').show();
}
function logout(){
	window.location="login.html";
}