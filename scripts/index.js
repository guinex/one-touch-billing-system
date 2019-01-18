// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
        document.getElementById('selected_productscan').addEventListener('click', function (e) {
            cordova.plugins.barcodeScanner.scan(

    // success callback function
    function (result) {
        // wrapping in a timeout so the dialog doesn't free the app
        setTimeout(function () {
            localStorage.setItem("barcode", result.text);
           
        }, 0);
        window.location = "product.html";
    },

    // error callback function
    function (error) {
        alert("Scanning failed: " + error);
    },

    // options object
    {
        "preferFrontCamera": false,
        "showFlipCameraButton": true
    }
    );

        })



    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();