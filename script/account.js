$(document).ready(function(){
		getdetails();
				 $(".containsarrow").click(function(){
      goback();
    });
	});
function goback(){
		var nowurl = localStorage.getItem("nowurl");
		window.location = nowurl;
	}		
	
function getdetails(){
	var mono  = localStorage.getItem("username");	 
	var email = localStorage.getItem("usermail");	 
	Parse.Cloud.run('getaccountdetails ',{username:mono},{
	    success:function(results){
			if(results){	
				var name = results[0];
				var address = results[1];
				if(address!=""){
				var add1 = "";
				var add2 = "";
				var add3 = "";
				address = address.split(",");
				console.log(address[0]);
				
						var add1 = address[0];
					
						var add2 = address[1];
					
						var add3 = address[2];
					
				
				document.getElementById("mobno").value = mono;
				document.getElementById("mobno").disabled= true;
				document.getElementById("email").value = email;
				document.getElementById("email").disabled = true;
				document.getElementById("name").value = name;
				document.getElementById("name").disabled = true;
				document.getElementById("address1").value = add1;
				document.getElementById("address1").disabled = true;
				document.getElementById("address2").value = add2;
				document.getElementById("address2").disabled = true;
				document.getElementById("address3").value = add3;
				document.getElementById("address3").disabled = true;
			}
			getactivecoupon();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

	
}	
function updatename(){
	var mono  = localStorage.getItem("username");	 
	
    var name  = document.getElementById("name").value;	
	Parse.Cloud.run('updateaccountname ',{username:mono,name:name},{
	    success:function(results){
			if(results){	
			window.location= "account.html";
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});

	
}	
function updateaddress(){
	var mono  = localStorage.getItem("username");	 

				var add1 = document.getElementById("address1").value;
				var add2 = document.getElementById("address2").value;
				var add3 = document.getElementById("address3").value;
				var address = add1+","+add2+","+add3;
	Parse.Cloud.run('updateaccountaddress ',{username:mono,address:address},{
	    success:function(results){
			if(results){	
			 window.location= "account.html";
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});
}	
function changename(){
	document.getElementById("name").disabled = false;
	var x = document.getElementById("updatename");
	x.innerHTML= "Update";
	x.setAttribute("onclick","updatename()");
}
function changeaddress(){
	document.getElementById("address1").disabled = false;
	document.getElementById("address2").disabled = false;
	document.getElementById("address3").disabled = false;
	var x = document.getElementById("updateaddress");
	x.innerHTML= "Update";
	x.setAttribute("onclick","updateaddress()");
}
var allcoupons= [];
var couponmartnames = [];
var couponpoints = [];
function getactivecoupon(){
	var mono  = localStorage.getItem("username");	
    Parse.Cloud.run('getactivecoupons ',{username:mono},{
	    success:function(results){
			if(results){	
			 allcoupons = results;
			 getcoupondetails();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});
}
var couponcount= 0;
function getcoupondetails(){
	if(couponcount<allcoupons.length){	
    Parse.Cloud.run('getactivecouponpoints ',{coupon:allcoupons[couponcount]},{
	    success:function(results){
			if(results){	
			 couponmartnames.push(results[0]);
			 couponpoints.push(results[1]);
			 couponcount++;
			 getcoupondetails();
			}
			
		},
		error: function(error){
			console.log(error.code);
		}
		
});
	}
	else{
		displaycoupons();
	}
}

function displaycoupons(){
for(var i=0;i<allcoupons.length;i++){
var id = allcoupons[i];
var w  = couponpoints[i];
var m = couponmartnames[i];
var master = document.getElementById("account");

var parent_container = document.createElement("div");
parent_container.setAttribute("class","eachcoupon");

var couponid = document.createElement("div");
var worth = document.createElement("div");
var couponmart = document.createElement("div");



couponid.setAttribute("class","couponid");

worth.setAttribute("class","worth");

couponmart.setAttribute("class","couponmart");

couponid.innerHTML = id;
worth.innerHTML = "Rs "+w;
couponmart.innerHTML = m;




parent_container.appendChild(couponid);
parent_container.appendChild(worth);
parent_container.appendChild(couponmart);

master.appendChild(parent_container);

}
}