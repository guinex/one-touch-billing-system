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
			searcheditem.push(i);
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
}

function showsearch(){
	var z = document.getElementById("searchimg");
	z.setAttribute("src","icons/windowclose.png");
	z.setAttribute("onclick","removesearch()");
	
	$('.drawers').hide();
	for(var i=0;i<searcheditem.length;i++){
		var x  = document.getElementById(searcheditem[i]);
		x.style.display = "block";
	}
}
function checklist(){
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
		var alerts = document.getElementById("alert");
		alerts.style.display="none";
	}
}

function generateproducts(b){
barcode = parseInt(b);

/*cloud function 1*/
var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
		Parse.Cloud.run('getproduct ',{barcode:barcode,martid:mi},{
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
			
			/*console.log(relevant);*/
			console.log(refmartid);	
			getrefmartids(true);
				//callsecond(barcode,true);
				
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
/*end of 1*/

}

var nowrefids = [];
function getrefmartids(flg){
	var areanm = localStorage.getItem("area");
	Parse.Cloud.run('getrefmartids ',{areaname:areanm},{
	    success:function(results){
			if(results){	
				for(var i=0;i<results.length;i++){
				var ref = results[i];
				nowrefids.push(ref);
				}
				console.log(nowrefids);
				for(var i=0;i<refmartid.length;i++){
					var z=0;
					for(var j=0;j<nowrefids.length;j++){
						var y = refmartid[i];
						var x = nowrefids[j];
						if(x==y)
							z++;
					}	
					if(z==0){
						
						refmartid.splice(i, 1);
						i--;
					}
				}
				 times  = refmartid.length;
				console.log(refmartid);	
			
				
				callsecond(barcode,flg);
				
			}
			
			
			
			
		},
		error: function(error){
	
			console.log(error);
			getrefmartids();
		}
		
});
	
}
function callsecond(barcode,again){
	/*cloud function 2*/
	mi = parseInt(mi);
	mn =mn.split(" ");
	mn = mn[0];
	var d;
	var isoffer = false;
		Parse.Cloud.run('getproductmartdetails ',{barcode:barcode,martname:mn,martid:mi},{
	    success:function(results){
			if(results){	
/*alert('deployed');	
console.log(results[0]);
console.log(results[1]);

console.log(offset);
console.log(marker);
*/
			if(results == "false"){
				countglobal++;
				generatechecklist();
			}
			else{
		//var priceval = price.replace(/[^0-9]/g, '');
		var priceval = price;
		
		var offset=results[0];var marker=results[1];
	
			if(offset=="o"){
				d="offer";
				desc = d;
				isoffer = true;
				
				/*other queries for offer details */
			}
			else if(offset=="f"){
				d="flat";
				desc = d+" "+marker+" off";
				priceval = (parseInt(priceval))-(parseInt(marker));
				priceval = priceval.toString();
				price = price.toString();
				price = price.strike();
				price = price+" "+priceval;
				
			}
			else if(offset=="d"){
				d="discount";
				desc = d+" "+marker+" %";
				priceval = (parseInt(priceval))-((parseInt(priceval))*((parseInt(marker))/100));
				priceval = priceval.toString();
				price = price.toString();
				price = price.strike();
				price = price+" "+priceval;
			}
			 else if(offset=="n")
			 {
				 d="n";
				 desc = "";
			}
		
			/*console.log(relevant);
			console.log(refmartid);	*/
			if(again==false){
				desc = "offer";
			create(product_id,name,desc,price,productpreview,times,type,offset,company);
			
			generatecompare(false,compare2);
			}
			else if(isoffer ==false){
			create(product_id,name,desc,price,productpreview,times,type,offset,company);
			
			generatecompare(false,compare2);
			}
			else if(isoffer == true){
		
				callcheckoffer();
				
			}
			}
			}
			
			
		},
		error: function(error){
			generateproducts();//if necessary
			console.log(error.code);
		}
		
});
/*end of 2*/

}
/*------------------------------check if offer is present ----------------------------------------------*/
function callcheckoffer(){
	 var d = new Date();
	 var res = [];
	 var finalres1 ="";
	 var finalres2 ="";
	Parse.Cloud.run('checkoffer ',{barcode:barcode,martname:mn,date:d},{
	    success:function(results){
			if(results!=false){
				
				res.push(results[0]);
				res.push(results[1]);
				res.push(results[2]);
				res.push(results[3]);
				res.push(results[4]);
				res.push(results[5]);
				finalres1 +="Buy ";
				var id =barcode;
				id= id.toString();
				
				if(results[0]==id&&results[1]==id)
				{
					finalres1+="2";
					barcode2 =id;
					
				}
				else if(results[0]==id&&results[1]!=id){
					finalres1+=results[7];
					barcode2 =results[1];
				}
				else if(results[0]!=id&&results[1]==id){
					finalres1+=results[6];
					barcode2 =results[0];
				}
				if(results[2]!=0)
				{
					finalres2+="get Rs "+results[2]+" off";
				}
				else if(results[3]!=0){
					finalres2+="get "+results[3]+"% discount";
				}
			desc = finalres1+" "+finalres2;
			var offset = "o";
			create(product_id,name,desc,price,productpreview,times,type,offset,company);
			generatecompare(false,compare2);
			}
			else{
			desc = "";
			var offset = "n";
			create(product_id,name,desc,price,productpreview,times,type,offset,company);
			
			generatecompare(false,compare2);
			}
		},
		error: function(error){
			console.log(error.code);
		}
});
	
}



var countersimilar=0;

var countcompare = 0;
function generatecompare(flg,x){
	
	if(countcompare<parseInt(refmartid.length))
	{   
		
		Parse.Cloud.run('getmartsforcompare ',{martid:refmartid[countcompare]},{
	    success:function(results){
			if(results){	
			var martname = results[0].get("mart_name");
			var mid = parseInt(refmartid[countcompare]);
			if(countcompare==0)
			getcompareproduct(mid,martname,0,flg,x);
		    else getcompareproduct(mid,martname,1,flg,x);
		/*	var parent_container = document.getElementById("select_mart");
			for (var i=0;i<results.length;i++){
			var options = document.createElement("div");
			options.setAttribute("class","options martname");
			options.setAttribute("id",results[i].get('martid'));
			options.setAttribute("onclick","hidemart(this)");
			options.innerHTML = results[i].get("mart_name")+" ("+results[i].get("description")+")";
			parent_container.appendChild(options);
			mart_ids.push(results[i].get('martid'));
}	


			var ele2 = document.getElementById("selected_mart");
			var ele = document.getElementById("select_area");
			ele.style.display="none";
			ele2.style.display="block";
			alerts.style.display="none";
			/*for (var i=0;i<results.length;i++){
			 /*console.log(results[i].get("area"));
			 area_names.push(results[i].get("area"));
			 mart_names.push(results[i].get("mart_name"));
			 dsec_names.push(results[i].get("description"));
			 mart_ids.push(results[i].get("martid"));
			 
			}*/
			
			}
		},
		error: function(error){
			console.log(error.code);
		}
		
});
		
		
	}
	else if(flg==true){
			/*var bid = barcode2;
			bid = parseInt(bid);
			var martid  = mi;
			var pbid = barcode;
			pbid = parseInt(pbid);*/
			countcompare =0;
			countglobal++;
			generatechecklist();
			/*compare2 = true
			if(pbid!=bid)
			{
			Parse.Cloud.run('getproduct ',{barcode:bid,martid:martid},{
	    success:function(results){
			if(results!=false){	

			
			 product_id = results[0].get("productid");
			
			 name = results[0].get("productname");
			 price = results[0].get("price");
			  global_price = price;
			 company = results[0].get("company");
			 type = results[0].get("type");
			productpreview = results[0].get("productpreview");
			 relevant =results[0].get("type");
			 
			refmartid = results[0].get("refmartid");
			 for(var i=0;i<refmartid.length;i++)
				 if(parseInt(refmartid[i])==mi)
					refmartid.splice(i, 1);
			  times  = refmartid.length;
		
			 
			
		
			console.log(refmartid);	
			
					
				callsecond(bid,false);
				
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
	}*/		
	}
	else{	countcompare =0;
		       countglobal++;
				generatechecklist();
		

		/*if(getsimilarflag==1)
		{
			generatesimilarproducts();
		}
		else
			getsimilar();*/
	}
}
function getcompareproduct(mid,martname,i,flg,x){
	
	if(x==false){
	barcode = parseInt(barcode);
	mid = parseInt(mid);
	Parse.Cloud.run('getproductmartdetails ',{barcode:barcode,martname:martname,martid:mid},{
	    success:function(results){
			if(results){	


  
		//var priceval = price.replace(/[^0-9]/g, '');
		var priceval = global_price;
		var price2  = priceval;
		var offset=results[0];var marker=results[1];
		var uls = results[3];
			if(offset=="o"){
				d="offer";
				desc = d;
				/*other queries for offer details */
			}
			else if(offset=="f"){
				d="flat";
				desc = d+" "+marker+" off";
				price2 = (parseInt(priceval))-(parseInt(marker));
				priceval = priceval.toString();
				price2 = price2.toString();
				priceval = priceval.strike();
				price2 = priceval+" "+price2;
				
			}
			else if(offset=="d"){
				d="discount";
				desc = d+" "+marker+" %";
				price2 = (parseInt(priceval))-((parseInt(priceval))*((parseInt(marker))/100));
				priceval = priceval.toString();
				price2 = price2.toString();
				priceval = priceval.strike();
				price2 = priceval+" "+price2;
			}
			 else if(offset=="n")
			 {d="n";desc = company;}
			
		
			/*console.log(relevant);
			console.log(refmartid);	*/
			
					
			
			create_compare(product_id,name,price2,desc,offset,i,uls);
			countcompare++;
			generatecompare(flg,x);
			
			
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
	});
	}
	else if(x==true){
		barcode2 = parseInt(barcode2);
		mid = parseInt(mid);
		Parse.Cloud.run('getproductmartdetails ',{barcode:barcode2,martname:martname,martid:mid},{
	    success:function(results){
			if(results){	


  
		//var priceval = price.replace(/[^0-9]/g, '');
		var priceval = global_price;
		var price2  = priceval;
		var offset=results[0];var marker=results[1];
		var uls = results[3];
			if(offset=="o"){
				d="offer";
				desc = d;
				/*other queries for offer details */
			}
			else if(offset=="f"){
				d="flat";
				desc = d+" "+marker+" off";
				price2 = (parseInt(priceval))-(parseInt(marker));
				priceval = priceval.toString();
				price2 = price2.toString();
				priceval = priceval.strike();
				price2 = priceval+" "+price2;
				
			}
			else if(offset=="d"){
				d="discount";
				desc = d+" "+marker+" %";
				price2 = (parseInt(priceval))-((parseInt(priceval))*((parseInt(marker))/100));
				priceval = priceval.toString();
				price2 = price2.toString();
				priceval = priceval.strike();
				price2 = priceval+" "+price2;
			}
			 else if(offset=="n")
			 {d="n";desc = company;}
			
		
			/*console.log(relevant);
			console.log(refmartid);	*/
			
					
			
			create_compare(product_id,name,price2,desc,offset,i,uls);
			countcompare++;
			generatecompare(flg,x);
			
			
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
	});
		
	}
}

/*--------------------product.js--------------------------*/
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
/*
master.appendChild(flag);

*/

id++;

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


function addtocartele(id,pi){
	var parentnode  = document.getElementById(id);
	var res = [];
	var pid  = pi;
	var present = false;
	var incart = JSON.parse(localStorage.getItem("incart"));
	var idp = pi;
	idp = idp.toString();
	if(incart ==null )
	{
		res.push(idp);
		//localStorage.setItem("incart",res);
		localStorage.setItem("incart", JSON.stringify(res));
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
		res.push(incart);
		
		res.push(idp);
		//localStorage.setItem("incart",res);
		localStorage.setItem("incart", JSON.stringify(res));
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
function logout(){
	window.location="login.html";
}