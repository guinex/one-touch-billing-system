$(document).ready(function(){
	 $(".containsarrow").click(function(){
      goback();
    });
	   var x = document.getElementById("pay");
	   x.style.marginLeft="-80%";
	/*retrive all cart details from cloud*/
	var d = new Date();
	var h  = d.getHours();
	var m  = d.getMinutes();
	if(h+2<=22)
	document.getElementsByClassName("hours")[0].innerHTML = h+2;
	else{
		document.getElementById("ifscheduled").innerHTML = "Cannot Schedule now";
		var g  = document.getElementById("scheduletimeimg");
		g.setAttribute("onclick","");
	}
	document.getElementsByClassName("mins")[0].innerHTML = m;
	 var ispay = localStorage.getItem("donepay");
	 if(ispay=="false"){
	 check();
	 localStorage.setItem("donepay","true");
	 }
	else 
	 rollbackward();
	 slideschedule();
	 $('#pay').click(function() {
		updatepurchase();
});
	$(".star").click(function(){
		var id=$(this).attr('id');
		giverating(id);
    });
	/*localStorage.setItem("iscomparegen","false");*/
});
var tocall;
var calling = 0;
var productarr =[] ;
var quantityarr =[] ;
function goback(){
		
		window.location = "cart.html";
	}	
function rollbackward(){
		var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";
	var object = localStorage.getItem("currentcartid");
	Parse.Cloud.run('rollback ',{object:object},{
	    success:function(results){
		savecart();
		
		},
		error: function(error){
			
			console.log(error.code);
		}
});	
}
var cartlength = 0;
function savecart(){
	var l = localStorage.getItem("cartcount");
	if(cartlength<l)
	{
var item = localStorage.getItem("ele"+cartlength);
if(item!="null"){
	item = item.split(" ");
	if(item[0]=="offer"){
	var pi   = item[1];
	var isoffer  = true;
	var w = 2;
	while(item[w]!="Rs"){
		w++;
	}
	var quantity = item[w+2];
	}
	else if(item[0]=="discount"||item[0]=="flat"){
	var pi   = item[3] ;
	var isoffer  = false;
	var w = 4;
	while(item[w]!="Rs"){
		w++;
	}
	var quantity = item[w+3];
	}
	else{
	var pi   = item[1] ;
	var isoffer  = false;
	var w = 2;
	while(item[w]!="Rs"){
			w++;
	}
	var quantity = item[w+2];
	}
	var mn = localStorage.getItem("currentcartid");
		/*end now call cloud*/
		pi = parseInt(pi);
		Parse.Cloud.run('saveusercart ',{obj:mn,quantity:quantity,productid:pi,isoffer:isoffer},{
	    success:function(results){
			if(results){	
		
			cartlength++;	
			savecart();
			}
		},
		error: function(error){
			console.log(error.code);
		}
});	
		
		}
		else{
			cartlength++;
			savecart();
		}
	}
	else{
		localStorage.setItem("iscomparegen","true");
		 localStorage.setItem("donepay","false");
		window.location = "payment.html";
	}
	
}
function giverating(id){
	var rate = parseInt(id);
	var mid = localStorage.getItem("currentmartid");
	mid  = parseInt(mid);
		Parse.Cloud.run('rating ',{mid:mid,rate:rate},{
	    success:function(results){
		  var stars = document.getElementById("stars");
		  stars.style.display="none";
		   var mn = document.getElementById("exp");
			mn.innerHTML = "Thank You for your response";
		 var m = document.getElementById("whatmart");
		 m.style.display = "none";
			  var sr = document.getElementById("skiprate");
			  sr.style.marginLeft="90%";
			  sr.innerHTML = "OK";
			  sr.style.marginTop = "35%";
			  sr.setAttribute("onclick","skiprating()");
		},
		error: function(error){
			
			console.log(error.code);
		}
});	
}
function skiprating(){
	window.location = "index.html";
}
function updatepurchase(){
	var object = localStorage.getItem("currentcartid");
			Parse.Cloud.run('paycart ',{object:object,paid:payusing,coupon:globalcoupon},{
	    success:function(results){
			updatecoupon();
		  /*var rate = document.getElementById("ratings");
		  var martname = localStorage.getItem("martname");
		  var mn = document.getElementById("whatmart");
		  mn.innerHTML = martname;
		  var stars = document.getElementById("stars");
		  stars.style.display="block";
		  rate.style.display="block";
		  var exp = document.getElementById("exp");
			exp.style.display="block";*/
		},
		error: function(error){
			
			console.log(error.code);
		}
});	
}
function updatecoupon(){
	var username = localStorage.getItem("username");
			Parse.Cloud.run('updatecouponforuser ',{username:username,coupon:globalcoupon},{
	    success:function(results){
		  var rate = document.getElementById("ratings");
		  var martname = localStorage.getItem("martname");
		  var mn = document.getElementById("whatmart");
		  mn.innerHTML = martname;
		  var stars = document.getElementById("stars");
		  stars.style.display="block";
		  rate.style.display="block";
		  var exp = document.getElementById("exp");
			exp.style.display="block";
		},
		error: function(error){
			
			console.log(error.code);
		}
});	
}
function check() {
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
	var accept = true;
	paybill(accept);
   
}
function paybill(accept){
	
	var object = localStorage.getItem("currentcartid");
	var mart = localStorage.getItem("martname");
	mart = mart.split(" ");
	mart= mart[0];

	var pay = accept;
		Parse.Cloud.run('payuserbill ',{pay:pay,object:object,mart:mart},{
	    success:function(results){
			console.log(results);
					
				/*var x = document.getElementById("netbankingbtn");
				if(x.checked == true){
				alert("payment Successfull");
				window.location= "area.html";
				}
			*/
			var k = results[0].length;
			k = parseInt(k);
			for(var i=0;i<k;i++){
				
			productarr.push((results[0])[i]);
			quantityarr.push((results[1])[i]);
			}
			/*console.log(productarr);
			console.log(quantityarr);*/
			tocall = productarr.length;
			tocall = parseInt(tocall);
			dobilling();
		},
		error: function(error){
	
			console.log(error.code);
			rollbackward();
		}
});	
}

function dobilling(){
	
	var object = localStorage.getItem("currentcartid");
	var mart = localStorage.getItem("martname");
	mart = mart.split(" ");
	mart= mart[0];
	var x  = productarr;
	var z  = quantityarr;
	if(calling<tocall)
	{
		var y= x[calling];
		var w= z[calling];
		y = parseInt(y);
	
			updateall(w,y,mart,object)
	}
	else{
		total(object,mart);
		
		
	}
}
var productoffers = [];
function checkoffer(object,mart){
		Parse.Cloud.run('sendoffer ',{obj:object},{
	    success:function(results){
			if(results){
				productoffers = results;
				for(var i=0;i<productoffers.length;i++){
					productoffers[i] = productoffers[i].toString();
					
				}
					var l = productoffers.length;
					if(l==0){
					var docompare = localStorage.getItem("iscomparegen");
					if(docompare=="true")
					createcomparemart();
					else{
					var alerts = document.getElementById("alert");
						alerts.style.display = "none";
							return;
						}
					}	
					else removesecond(object,mart);
			}
		},
		error: function(error){
			
			console.log(error.code);
			rollbackward();
		}
});
}
var checkeachoffer = 0;
var nowoffproducts = [];
function runupdateoffer(object,mart){
	var l = productoffers.length;
	var p = productoffers[checkeachoffer];
	p=parseInt(p);
	var there = false;
			Parse.Cloud.run('updateoffer ',{obj:object,mart:mart,product:p},{
	    success:function(results){
			if(results){
				var fir = results[0];
				var sec = results[1];
				if(productoffers[checkeachoffer]==fir)
				{
					for(var i=0;i<l;i++){
						if(productoffers[i]==sec)
						{
							for(k=0;k<nowoffproducts.length;k++){
								if(nowoffproducts[k]==sec||nowoffproducts[k]==fir)
									there = true;
							}
							if(there==false){
							nowoffproducts.push(productoffers[checkeachoffer]);
							nowoffproducts.push(productoffers[i]);
							}
							productoffers.splice(i,1);
							productoffers.splice(checkeachoffer,1);
						
							removesecond(object,mart);
						}
						else continue;
					}
					checkeachoffer++;
					removesecond(object,mart);
				}
				else if(productoffers[checkeachoffer]==sec)
				{
					for(var i=0;i<l;i++){
						if(productoffers[i]==fir)
						{
							for(k=0;k<nowoffproducts.length;k++){
								if(nowoffproducts[k]==sec||nowoffproducts[k]==fir)
									there = true;
							}
							if(there==false){
							nowoffproducts.push(productoffers[checkeachoffer]);
							nowoffproducts.push(productoffers[i]);
							console.log(nowoffproducts);
							}
							productoffers.splice(i,1);
							productoffers.splice(checkeachoffer,1);
							console.log(productoffers);
							removesecond(object,mart);
						}
						else continue;
						
					}
					checkeachoffer++;
					removesecond(object,mart);
				}
				
			}
		},
		error: function(error){
			
			console.log(error.code);
			rollbackward();
		}
});
	
}
var dontcome = false;
function removesecond(object,mart){
	if(dontcome==false){
	var l = productoffers.length;
	
	if(l!=0&&checkeachoffer<l){
		runupdateoffer(object,mart/*,parseInt(productoffers[checkeachoffer])*/);
		
	}
	else{
		dontcome = true;
		completeoffer(object,mart);
		
	}
	}
}
var finaloffercount = 0;
var resafteroffer = [];
var callonce = false;
function completeoffer(object,mart){

	var j = nowoffproducts.length;
	if(finaloffercount<j){
		var x = parseInt(nowoffproducts[finaloffercount]);
		var y = parseInt(nowoffproducts[finaloffercount+1]);
		Parse.Cloud.run('deducefromtotal',{object:object,mart:mart,product1:x,product2:y},{
	    success:function(results){
			resafteroffer[0] = results[0];
			resafteroffer[1] = results[1];
			resafteroffer[2] = results[2];
				var pl = resafteroffer[0];
				var t = resafteroffer[1];
				var s  = resafteroffer[2];
				document.getElementById("carttotalproducts").innerHTML = "Items: "+pl;
				document.getElementById("carttotal").innerHTML = "Total: "+t;
				document.getElementById("carttotalsavings").innerHTML = "Savings: "+s;
				finaloffercount+=2;
				completeoffer(object,mart);
	         
		
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
			rollbackward();
		}
});
		
	}
	else{
	var pl = resafteroffer[0];
	var t = resafteroffer[1];
	var s  = resafteroffer[2];
	document.getElementById("carttotalproducts").innerHTML = "Items: "+pl;
	document.getElementById("carttotal").innerHTML = "Total: "+t;
	document.getElementById("carttotalsavings").innerHTML = "Savings: "+s;
	var docompare = localStorage.getItem("iscomparegen");
	if(docompare=="true")
		createcomparemart();
	else{
		var alerts = document.getElementById("alert");
		alerts.style.display = "none";
	}
			
	}
	//display alert none;
	
}

/*cloud code*/
	
// while call promise come here
function deducemartquantity(product,mart,quant){
	var q = parseInt(quant);
	Parse.Cloud.run('getquantity ',{product:product,mart:mart,quant:q},{
	    success:function(results){
			if(results){
				calling++;
				dobilling();
				
				console.log(results);
			
			}
		},
		error: function(error){

			console.log(error.code);
			rollbackward();
		}
});
	
	
}	

// promise to do ....get price ....update Cart eachprice and update Cart off .....deduce mart quantity
function updateall(quantity,product,mart,obj){
var quant = quantity;
if(isNaN(quant))
	quant = parseInt(quant);
	
Parse.Cloud.run('savepriceoff ',{obj:obj,product:product,mart:mart,quant:quant},{
	    success:function(results){
			if(results=="Done"){
				
				console.log(results);
			deducemartquantity(product,mart,quant);
			}
		},
		error: function(error){
			
			console.log(error.code);
			rollbackward();
		}
});
}
var globalcarttotal;
function total(obj,mart){
	Parse.Cloud.run('calculatetotal ',{object:obj},{
	    success:function(results){
			if(results){
				
				var total = results[0];
				var saving = results[1];
				var productlen = results[2];
				globalcarttotal = total;
				    var img = document.getElementsByClassName("productdefaulticon")[0];
					img.src = localStorage.getItem("marturl");
					document.getElementById("carttotalproducts").innerHTML = "Items: "+productlen;
					document.getElementById("carttotal").innerHTML = "Total: "+total;
					document.getElementById("carttotalsavings").innerHTML = "Savings: "+saving;
				console.log(results);
				
				checkoffer(obj,mart);
				
	
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
			rollbackward();
		}
});
}
function slideschedule(){
	var x= document.getElementById("scheduledetails");
	if($(x).is(":visible"))
     $(x).slideUp('fast');
  else   $(x).slideDown('fast');
}
function schedule(){
		var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";
	var object = localStorage.getItem("currentcartid");
	var d = new Date();
	var h  = d.getHours();
	var m  = d.getMinutes();
	var w = document.getElementsByClassName("mins")[0];
	var q = document.getElementsByClassName("hours")[0];
	w=w.innerHTML;
	q=q.innerHTML;
	h = parseInt(h);
	q = parseInt(q);
	w=parseInt(w);
	m=parseInt(m);
	
if(q>=h){
	
		w = w.toString();
		q = q.toString();
		Parse.Cloud.run('schedule',{hour:q,minute:w,object:object},{
	    success:function(results){
			if(results){
					var alerts = document.getElementById("alert");
	
	alerts.style.display="none";	

				var x  = document.getElementById("completeschedule");
				x.setAttribute("src","icons/afterschedule.png");
				x.setAttribute("onclick","cancelschedule()");
				var y  = document.getElementById("isschedule");
				y.setAttribute("src","icons/alarmdone.png");
				var s  = document.getElementById("ifscheduled");
				s.innerHTML = "Scheduled At "+q+" : "+w;
				slideschedule();
	
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
	}
}
function cancelschedule(){
		
	var object = localStorage.getItem("currentcartid");
	Parse.Cloud.run('cancelschedule',{object:object},{
	    success:function(results){
			if(results){
				
	var x  = document.getElementById("completeschedule");
				x.setAttribute("src","icons/beforeschedule.png");
				x.setAttribute("onclick","schedule()");
	var q  = document.getElementById("isschedule");
	q.setAttribute("src","icons/alarm.png");
	var s  = document.getElementById("ifscheduled");
	s.innerHTML = "Schedule Delivery";
	
	
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
	
	
	
}
function plustime(id){
	id = parseInt(id);
	var d = new Date();
	var h  = d.getHours();
	var m  = d.getMinutes();
	h = parseInt(h);
	if(id==00){

	var x = document.getElementsByClassName("hours")[0].innerHTML;
	x=parseInt(x);
	if(x<22){	
	x++;
	}
	document.getElementsByClassName("hours")[0].innerHTML=x;
	}
	else if(id==11){
	var x = document.getElementsByClassName("mins")[0].innerHTML;
	x=parseInt(x);
	if(x>0&&x<=15)
		x=15;
	else if(x>15&&x<=30)
		x=30;
		else if(x>30&&x<=45)
		x=45;
	
		
	if(x == 45||x>45){	
	x=00;
	var y = document.getElementsByClassName("hours")[0].innerHTML;
	y=parseInt(y);
	if(y<22)
	y++;
	document.getElementsByClassName("hours")[0].innerHTML=y;
	}
	else x = x+15;
	document.getElementsByClassName("mins")[0].innerHTML=x;
	}
		
	
}
function minustime(id){
	id = parseInt(id);
	var d = new Date();
	var h  = d.getHours();
	var m  = d.getMinutes();
	h = parseInt(h);
	if(id==00){

	var x = document.getElementsByClassName("hours")[0].innerHTML;
	x=parseInt(x);
	if(x>h+2){	
	x--;
	}
	else if(x==0)
	x = 0;
	document.getElementsByClassName("hours")[0].innerHTML=x;
	}
	else if(id==11){
	var x = document.getElementsByClassName("mins")[0].innerHTML;
	x=parseInt(x);
	//x=x-15;
	var y = document.getElementsByClassName("hours")[0].innerHTML;
	y=parseInt(y);


	if(x == 0||x<0){	
	
	var y = document.getElementsByClassName("hours")[0].innerHTML;
	y=parseInt(y);
	x=00;
	if(y>h+2){
	y--;
	
	}
	document.getElementsByClassName("hours")[0].innerHTML=y;
	}
	else if(x<=15)
		x=0;
	else if(x>15&&x<=30){
		x=15;

	}
	else if(x>30&&x<=45){
		x=30;
	}
	else if(x>45){
		x=45;
	}
	
	document.getElementsByClassName("mins")[0].innerHTML=x;
	
}
		
}
function cancelhomedelivery(){
	
	var object = localStorage.getItem("currentcartid");
	Parse.Cloud.run('cancelhomedelivery',{object:object},{
	    success:function(results){
			if(results){
				
	var b = document.getElementsByClassName("containshrmin")[0];
	b.style.display="block";
	
	var c = document.getElementsByClassName("containshrmintext")[0];
	c.style.display="block";
	var y = document.getElementsByClassName("homedeliver")[0];
	y.style.backgroundColor  ="#ffffff";
	y.style.color = "#000000";
	y.innerHTML = "Home Delivery";
	y.style.height = "20%";
	var l = document.getElementById("scheduledetails");
	l.style.height = "25%";
		y.setAttribute("onclick","schedulehomedelivery()");
	var q  = document.getElementById("isschedule");
	q.setAttribute("src","icons/alarm.png");
	var s  = document.getElementById("ifscheduled");
	s.innerHTML = "Schedule Delivery";
	
	
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
	
	
}
function schedulehomedelivery(){
	hidealerts();
	var object = localStorage.getItem("currentcartid");
	Parse.Cloud.run('homedelivery',{object:object},{
	    success:function(results){
			if(results){
				
	var b = document.getElementsByClassName("containshrmin")[0];
	b.style.display="none";
	
	var c = document.getElementsByClassName("containshrmintext")[0];
	c.style.display="none";
	var y = document.getElementsByClassName("homedeliver")[0];
	y.style.backgroundColor  ="#FF5722";
	y.style.color = "#ffffff";
	y.innerHTML = "Cancel Delivery";
	y.setAttribute("onclick","cancelhomedelivery()");
	y.style.height = "50%";
	var l = document.getElementById("scheduledetails");
	l.style.height = "10%";
	var q  = document.getElementById("isschedule");
	q.setAttribute("src","icons/homedelivery.png");
	var s  = document.getElementById("ifscheduled");
	s.innerHTML = "Home Delivery";
	var x= document.getElementById("scheduledetails");
	if($(x).is(":visible"))
     $(x).slideUp('fast');
	else   $(x).slideDown('fast');
	
			}
			console.log(results);
		},
		error: function(error){
			
			console.log(error.code);
		}
});
	
	
}
var payusing  = "";
function payug(ele){
	var id = ele.id
	var classes =ele.className;
	var y  =document.getElementsByClassName(classes);
	for(var i=0;i<y.length;i++)
	{
		y[i].style.backgroundColor = "#ffffff";
		y[i].style.color = "#000000";
	}	
	 var texts = document.getElementById(id).innerHTML;
	 payusing  = texts;
	 var x  =document.getElementById(id);
	 x.style.backgroundColor = "#3F51B5";
	x.style.color = "white";
	var p = document.getElementById("pay");
	p.style.display = "block";
	 }
	 var globalcoupon="";
	 var couponbeforetotal;
function applycoupon(){
	var martname = localStorage.getItem("martname");
	martname = martname.split(" ");
	var mn = martname[0];
	var x = document.getElementById("coupon");
	var name = localStorage.getItem("username");
	x  = x.value;
	x= x.toString();
	globalcoupon = x;
	Parse.Cloud.run('checkcoupon',{coupon:x,martname:mn,username:name},{
	    success:function(results){
			if(results){
				
				var c = document.getElementById("carttotal").innerHTML;
				c=c.toString();
				c=c.split(" ");
				if(!isNaN(parseInt(c[1])))
				couponbeforetotal = parseInt(c[1]);
				
				var net =couponbeforetotal -parseInt(results);
				if(net<0){
					net=0;
				}
				document.getElementById("carttotal").innerHTML = "Total: <strike> "+c[1]+" </strike> "+net;
				var x  = document.getElementById("applycoupon");
				x.innerHTML = "Remove";
				
				x.setAttribute("onclick","removecoupon()");
				document.getElementById("coupon").disabled = true;
				console.log(results);
			}
			else{
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Coupon has Expired";
	alertbtn.setAttribute("onclick","hidealerts()");
			}
			
		},
		error: function(error){
			
			console.log(error.code);
		}
});
}	 
function removecoupon(){
	var x  = document.getElementById("applycoupon");
				x.innerHTML = "Apply";
				
				x.setAttribute("onclick","applycoupon()");

	
	document.getElementById("coupon").disabled = false;
		document.getElementById("carttotal").innerHTML = "Total: "+globalcarttotal;
}
function getaddress(){
	var mono  = localStorage.getItem("username");	 
 
	Parse.Cloud.run('getaccountdetails ',{username:mono},{
	    success:function(results){
			if(results[1]!=""&&results[1].length>5){	
				
				var address = results[1];
				console.log(address);
				localStorage.setItem("address",address);
				var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Your Order will be Delivered at<br>"+address;
	alertbtn.setAttribute("onclick","schedulehomedelivery()");
				//schedulehomedelivery();
			
			}
			else {
				var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="block";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="Please Provide an Address.<br>Accounts->Address";
	alertbtn.setAttribute("onclick","hidealerts()");
				
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

	
}	
function hidealerts(){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="none";
	alertstext.style.display="block";
	alerts.style.display="none";	
	alertbtn.style.display="block";	
	alertstext.innerHTML="";
	alertbtn.setAttribute("onclick","hidealerts()");
	
}
function logout(){
	window.location="login.html";
}