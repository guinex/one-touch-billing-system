

$(document).ready(function(){
var alerts = document.getElementById("alert");
alerts.style.display="none";
localStorage.setItem("donepay","false");
 
generateproducts();
});
var mi = localStorage.getItem("currentmartid");
var mn = localStorage.getItem("martname");
var barcode = localStorage.getItem("barcode");

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

function generateproducts(){
barcode = parseInt(barcode);

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
			
		
			  /*localstorage.setItem("productincart",product_id);*/
			
			/*console.log(relevant);*/
			console.log(refmartid);	
			
				getrefmartids(true);	
				//callsecond(barcode,true);
				
			}
			else
			{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Product Currently Unavailable <br>Please try Later...";
	alertbtn.setAttribute("onclick","gotoscanpage()");
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
/*end of 1*/
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
				var alerts = document.getElementById("alert");
var alertsmsg = document.getElementById("alertmsg");
alerts.style.display="block";
alertsmsg.style.display="none";
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	alertstext.style.display="block";
		
	alertbtn.style.display="block";	
	alertstext.innerHTML="Thats the last product we have!<br><br>Please take this to the counter<br> for billing.";
	alertbtn.setAttribute("onclick","gotoscanpage()");
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
			generatecompare(true,compare2);
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
			var bid = barcode2;
			bid = parseInt(bid);
			
			var martid  = mi;
			var pbid = barcode;
			pbid = parseInt(pbid);
			countcompare =0;
			compare2 = true
			if(pbid!=bid)
			{
			barcode = bid;	
			Parse.Cloud.run('getproduct ',{barcode:bid,martid:martid},{
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
			
				getrefmartids(false);	
				//callsecond(bid,false);
				
			}
			else
			{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Product Currently Unavailable <br>Please try Later...";
	alertbtn.setAttribute("onclick","gotoscanpage()");
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
	}
	else{
		var alerts = document.getElementById("alert");

alerts.style.display="none";

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