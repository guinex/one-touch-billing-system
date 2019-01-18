$(document).ready(function(){
	




});
var cartlength = 0;
var productidcompare = [];
var productcomparequant = [];
var nowmartid = [];
var cnmd =0;
var cpic =0;
var Finalres = [];
var Rejected = [];
// first call for quantity and check
function rollbackcompare(){
	createcomparemart();
}
function createcomparemart(){
	
localStorage.setItem("iscomparegen",false);	
var l = localStorage.getItem("cartcount");
while(cartlength<l)
	{
		
var item = localStorage.getItem("ele"+cartlength);
if(item!="null"){
	item = item.split(" ");
	if(item[0]=="offer"){
	var pi   = item[1] ;
	var w = 2;
	while(item[w]!="Rs"){
	w++;
	}
	var quantity = item[w+2];
	productidcompare.push(pi);
	productcomparequant.push(quantity);
	
	}
	else if(item[0]=="discount"||item[0]=="flat"){
	var pi   = item[3] ;
		var w = 4;
	while(item[w]!="Rs"){
	w++;
	}
	var quantity = item[w+3];
		productidcompare.push(pi);
		productcomparequant.push(quantity);
	}
	else{
	var pi   = item[1] ;
		var w = 2;
	while(item[w]!="Rs"){
	w++;
	}
	var quantity = item[w+2];
		productidcompare.push(pi);
		productcomparequant.push(quantity);
	}
}
cartlength++;

	}

var thismart = localStorage.getItem("currentmartid");
var martidarr = localStorage.getItem("martids");	

	martidarr=martidarr.split(",");
console.log(martidarr);
for(var i=0;i<martidarr.length;i++){

	if(thismart!=martidarr[i])
		nowmartid.push(martidarr[i]);
}

/*alert(productidcompare);*/

querycloud();

}

function querycloud(){
	var nmd = nowmartid.length;
	var pic = productidcompare.length;
	
	var available = [];
	
	var flag ;
	
	if(cpic<pic){
		
			if(cnmd<nmd){
			var ids = parseInt(productidcompare[cpic]);
			/*console.log(ids);
			console.log(nowmartid[cnmd]);*/
					Parse.Cloud.run('comparelist',{martid:nowmartid[cnmd],product:ids},{
						success:function(results){
						
						var arr = results[0].get("refmartid");
							var a ; 
							for(var i=0;i<arr.length;i++){
								if(arr[i]==nowmartid[cnmd]){
									flag = arr[i];
									
									a ="true";
				
								}
							}	
								if(a !="true")
								
								{
									flag = nowmartid[cnmd];
									
									a="false";
									
									}
								var finalres = [];
								
								finalres.push(a);
								
								finalres.push(flag);
								finalres.push(ids);
								finalres.push(productcomparequant[cpic]);
							
								Finalres.push(finalres);
								console.log(Finalres);
								if(cnmd<nmd)
									cnmd++;
								
								querycloud();
						},
						error: function(error){
							
							console.log(error.code);
							cpic= 0;cnmd = 0;
							querycloud();
						}
					});	
				
			}
			else 
								{
									
										cpic++;
										cnmd=0;
								
										querycloud();
								}
		
		}
		else{
			arrangefinalres();
			
			
			
		}
		

}
var qttry = [];
var quantitycount=0;
function getquantity(){
	var x =Finalres.length;
	if(quantitycount<x){
		var elem = Finalres[quantitycount];
		
			
			var q = elem[3];
			var pid =  elem[2];
			var mid = elem[1];
			
			 
				pid = parseInt(pid);

				q = parseInt(q);
			
				mid = parseInt(mid);
		Parse.Cloud.run('comparequantity',{martid:mid,product:pid,quantity:q},{
						success:function(results){
							
							
							qttry.push(results);
							console.log(qttry);
							quantitycount++;
							getquantity();
						},
						error: function(error){
						
							console.log(error.code);
							quantitycount =0 ;
							getquantity();
						}
					});	
		
	}
	else{
		createcomparison();
		
	}
	
}
function arrangefinalres(){
	var l = Finalres.length;
	
	var temp;
	console.log(Finalres);
	var q;
	var p;
	var id;
	var f;
	for(var i=0;i<l-1;i++){
		for(var j=0;j<l-1;j++){
		if(parseInt(Finalres[j][1])>parseInt(Finalres[j+1][1])){
			temp = Finalres[j];
			Finalres[j] = Finalres[j+1];
			Finalres[j+1] = temp;
		}
		}
	}
	console.log(Finalres);
	getquantity();
	/*createcomparison();*/
}

var reslencount = 0;
var martcreated = [];
var objectids = [];
var comparepresent = false;
function createcomparison(){

	var un = localStorage.getItem("username");
	var obj  = localStorage.getItem("currentcartid");
	var reslen = Finalres.length;
	var fg="false";
	var vc;
	
	if(reslencount<reslen){
		
		var elem = Finalres[reslencount];
		console.log(Finalres[reslencount]);
		if(elem[0]=="true"&&qttry[reslencount][0]=="true"){
			comparepresent = true;
			var left = qttry[reslencount][1];
			var q = elem[3];
			var pid =  elem[2];
			var mid = elem[1];
			var mtid = mid;
			firstmart = mid;
				pid = parseInt(pid);
			
				q = parseInt(q);

				mid = parseInt(mid);
				
			for(var i=0;i<martcreated.length;i++)
			{
				if(mtid==martcreated[i]||mid==martcreated[i]){
					fg = "true";
					vc=i;
				}	
			}
			if(fg=="false"){
			Parse.Cloud.run('comparecartgen',{username:un,object:obj,martid:mid,product:pid,quantity:q},{
						success:function(results){
							objectids.push(results[1]);
							martcreated.push(results[0]);
							console.log(objectids);
							console.log(martcreated);
							reslencount++;
							createcomparison();
						},
						error: function(error){
						
							console.log(error.code);
							rollbackcompare();
						}
					});	
			}
			else{
				   var obj = objectids[vc];
					Parse.Cloud.run('comparecartgennext',{username:un,object:obj,martid:mid,product:pid,quantity:q},{
						success:function(results){
						if(results=="true"){
							reslencount++;
							createcomparison();
							}
						},
						error: function(error){
						
							console.log(error.code);
							rollbackcompare();
						}
					});	
				
			}
		
		}
		else{
			if(reslen!=0){
			var ty = [];
			ty.push(elem[2]);
			ty.push(elem[1]);
			Rejected.push(ty);
			}
			reslencount++;
			createcomparison();
		}
	}
	/*else if(comparepresent == false){
		var o  = document.getElementById("compareothermarts");
		o.style.display = "none";
	}*/
	else{
		if(comparepresent == false){
		var o  = document.getElementById("compareothermarts");
		o.style.display = "none";
		var alerts = document.getElementById("alert");
		alerts.style.display = "none";
		}
		else
		rejecteddetails();	
		/*computetotalcompare();*/
	}
	
}
var namesandprice = [];
var rejectcount = 0;
function rejecteddetails(){
	
	var l = Rejected.length;
	if(rejectcount<l){
		var pid = Rejected[rejectcount][0];
	
		pid  = parseInt(pid);
		
		Parse.Cloud.run('rejecteddetail',{product:pid},{
						success:function(results){
							if(results){
							var res = [];
							res.push(Rejected[rejectcount][1]);//martid
							res.push(pid);//productid
							res.push(results[0]);//name
							res.push(results[1]);//price
							namesandprice.push(res);
							rejectcount++;
							rejecteddetails();
							
							}
							
						},
						error: function(error){
						
							console.log(error.code);
							rejectcount = 0;
							rejecteddetails();
						}
					});	
	}
	else{
		computetotalcompare();
	}
	
}
var totalcomputecount = 0;
function computetotalcompare(){
	var l = objectids.length;
	
	if(totalcomputecount<l){
			Parse.Cloud.run('comparecartcalculatetotal',{object:objectids[totalcomputecount]},{
						success:function(results){
							if(results){
								var t = results[1];
								var s = results[2];
								var item = results[0];
								var cl = results[3];
								var urls = results[4];
								var mid = results[5];
								createcomparesection(item,t,s,cl,urls,mid,objectids[totalcomputecount]);
							totalcomputecount++;
							computetotalcompare();
							
							}
							
						},
						error: function(error){
						
							console.log(error.code);
							rollbackcompare();
						}
					});	
	}
	else{
		
		var alerts = document.getElementById("alert");
		alerts.style.display = "none";
	}
}
var compareid = 0;
function createcomparesection(item,t,s,cl,urls,mid,obj){
var master = document.getElementById("contain");
var cc = document.createElement("div");
cc.setAttribute("class","far");
var parent_container = document.createElement("div");
parent_container.setAttribute("class","ccdrawers");
parent_container.setAttribute("id",compareid+"compare");

parent_container.setAttribute("onclick","comparedmartslide("+compareid+")");

var product_img = document.createElement("div");
var product_name = document.createElement("div");
var product_quantity = document.createElement("div");
var product_price = document.createElement("div");
var img_default = document.createElement("img");
product_name.setAttribute("class","ccproductname");
product_name.setAttribute("id",compareid+"productname");
product_price.setAttribute("class","ccproductprice");
product_price.setAttribute("id",compareid+"productprice");
product_quantity.setAttribute("class","ccproductquantity");
product_quantity.setAttribute("id",compareid+"productquantity");
product_img.setAttribute("class","productimg");
product_img.setAttribute("id",compareid+"productimg");
img_default.setAttribute("src",urls);
img_default.setAttribute("class","productdefaulticon");
img_default.setAttribute("id",compareid+"productdefaulticon");
product_name.innerHTML = "Products Available: "+item;
product_quantity.innerHTML ="Total: "+t+"/-";
product_price.innerHTML = "Savings: "+s+"/-";
cc.innerHTML="<br>"+cl+"<br>Km";
product_img.appendChild(img_default);
parent_container.appendChild(product_img);
parent_container.appendChild(product_name);
parent_container.appendChild(product_quantity);
parent_container.appendChild(product_price);
master.appendChild(parent_container);
master.appendChild(cc);
var otherdetails = document.createElement("div");
otherdetails.setAttribute("class","othercomparedetails");
otherdetails.setAttribute("id",compareid+"othercomparedetails");
console.log(namesandprice);
if(namesandprice.length!=1){
var banner = document.createElement("div");
banner.setAttribute("class","notpresentbanner");
banner.innerHTML = "Excluding";
otherdetails.appendChild(banner);
//for
}

for(var f=0;f<namesandprice.length;f++)
{
						/*	res.push(Rejected[rejectcount][1]);//martid
							res.push(pid);//productid
							res.push(results[0]);//name
							res.push(results[1]);//price
							namesandprice.push(res);*/
if(parseInt(mid)==parseInt(namesandprice[f][0])){
var notpres = document.createElement("div");
notpres.setAttribute("class","notpresent");
notpres.innerHTML = namesandprice[f][2];
var notpresprice = document.createElement("div");
notpresprice.setAttribute("class","notpresentprice");
notpresprice.innerHTML = namesandprice[f][3]+"/-";
otherdetails.appendChild(notpres);
otherdetails.appendChild(notpresprice);
}
}
/*
var gotomart = document.createElement("div");
gotomart.setAttribute("class","gotomart");
gotomart.innerHTML = "Go To Mart";
gotomart.setAttribute("id","obj");
gotomart.setAttribute("onclick","movetoother("+obj+")");
otherdetails.appendChild(gotomart);
*/
master.appendChild(otherdetails);
 $(".othercomparedetails").slideUp('fast');
compareid++;
	
}
function comparedmartslide(id){
	
	id =parseInt(id);
	id = id+"othercomparedetails";
	var x  = document.getElementById(id);
	if($(x).is(":visible"))
     $(x).slideUp('fast');
  else   $(x).slideDown('fast');
}
//do not call
function movetoother(obj){
		Parse.Cloud.run('movetoother',{object:obj},{
	    success:function(results){
			if(results){
				// save to table Cart
				
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
}