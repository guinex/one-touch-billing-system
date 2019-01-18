	$(document).ready(function(){
	makecart();
	var x   = document.getElementById('navigator');
    x.style.display="none";
	x   = document.getElementById('arrow');
	x.setAttribute("class","rightarrow");
	x.setAttribute("src","icons/menu.png");
	
	$(".rightarrow").click(function(){
      slidenav();
    });
	var c = document.getElementById("cart");
	var p = document.getElementById("contain");
	var pay = document.getElementsByClassName("payicon")[0];
	var icon = document.getElementsByClassName("containscarticon")[0];
	var del = document.getElementsByClassName("containsdelete")[0];
	var delicon = document.getElementById("deleteall");
	var change = document.getElementById("carticon");
	
	
	/*if(c.style.display== "block")
	{
		c.style.display= "none";
		p.style.display= "block";
		del.style.display = "none";
		pay.style.display="none";
		icon.style.marginTop="1%";
		icon.style.marginLeft="75%";
		crt.style.display ="none";
		change.setAttribute("src","icons/shopping.png");
		change.style.width = "180%";
	}
	else {*/
	c.style.display= "block";
	p.style.display= "none";
	del.style.display = "block";
	pay.style.display="block";
	pay.style.marginLeft="10%";
	icon.style.marginLeft="10%";
	icon.style.marginTop="0%";
	
	change.setAttribute("src","icons/plus.png");
	change.setAttribute("onclick","gotoscanpage()");
	change.style.width = "100%";
	/*}
	/*
document.addEventListener('backbutton', function(){
/*	var pathname = window.location.pathname;
	
  if(pathname.toLowerCase().indexOf("index.html") >= 0) {
         navigator.app.exitApp();
   
  }

	 if(c.style.display== "block")
	{
		c.style.display= "none";
		p.style.display= "block";
	}
    
  
});*/
});
	
	
var cartlength = 0;
function savecart(){
	var alerts = document.getElementById("alert");
	var alertstext = document.getElementById("alertmsgtext");
	var alertbtn = document.getElementById("alertbtn");
	var alertsmsg = document.getElementById("alertmsg");
	alertsmsg.style.display="block";
	alertstext.style.display="none";
	alerts.style.display="block";	
	alertbtn.style.display="none";	
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
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
		w++;
	}
	var quantity = item[w+2];
	}
	else if(item[0]=="discount"||item[0]=="flat"){
	var pi   = item[3] ;
	var isoffer  = false;
	var w = 4;
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
		w++;
	}
	var quantity = item[w+3];
	}
	else{
	var pi   = item[1] ;
	var isoffer  = false;
	var w = 2;
	var name ="";
	while(item[w]!="Rs"){
		name +=item[w]+" ";
			w++;
	}
	var quantity = item[w+2];
	}
	console.log(name);
	var mn = localStorage.getItem("currentcartid");
		/*end now call cloud*/
		
		Parse.Cloud.run('saveusercart ',{obj:mn,quantity:quantity,productid:pi,isoffer:isoffer,productname:name},{
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
		window.location = "payment.html";
	}
	
}
