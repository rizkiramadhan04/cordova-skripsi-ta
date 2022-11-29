//====================================================
//  Variable Global
//====================================================

var isProduction = 0;
var versionDevice = "0.20.8";
var versionDeviceLocal = "0.20.8";
var versionServer, TITLE_ALERT;
var checkVersion = false;
var statusLoginOnline = true;
var close_load_init = 0;
var myDB = "";

if (isProduction == 0) {
  TITLE_ALERT = "Mobil Indostation App";
} else {
  TITLE_ALERT = "Mobil Indostation App";
}

/**
format month & date 2 digit
*/
Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//https://trial.nadyne.com:10381/mobil-indostation
//https://mobil-indostation.co.id
//http://103.111.186.84/

var server_url = "https://trial.nadyne.com:10381/mobil-indostation";
var conn = server_url + "/api";
var timeout = 50000; // 40 second, global
var timeout1 = 30000; // 2 second, check version
var interval = 10000; // 10 second

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);

document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);

// Replace broken image : https://stackoverflow.com/questions/92720/jquery-javascript-to-replace-broken-images
document.querySelectorAll("img").forEach((img) => {
  img.onerror = function () {
    this.style.display = "none";
  };
});

var OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId: "28b62ea9-2eb1-489e-bbe8-c18bdff1b7f4",
  });

  //28b62ea9-2eb1-489e-bbe8-c18bdff1b7f4 app id nadyne
  //0b5f9921-46b2-431f-8a11-4c80e752eb81 app id indostation

  // console.log("Berhasil subscribe");
  OneSignal.showNativePrompt();
});

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
var onSuccessGeoLocation = function (position) {
  window.localStorage.setItem("latitude", position.coords.latitude);
  window.localStorage.setItem("longitude", position.coords.longitude);

  // console.log('Latitude: ' + position.coords.latitude + '\n' +
  //     'Longitude: ' + position.coords.longitude + '\n' +
  //     'Altitude: ' + position.coords.altitude + '\n' +
  //     'Accuracy: ' + position.coords.accuracy + '\n' +
  //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
  //     'Heading: ' + position.coords.heading + '\n' +
  //     'Speed: ' + position.coords.speed + '\n' +
  //     'Timestamp: ' + position.timestamp + '\n');
};

// onError Callback receives a PositionError object
function onErrorGeoLocation(error) {
  console.log(
    "code: " + error.code + "\n" + "message: " + error.message + "\n"
  );
}

var successCallbackLocAccuracy = function (position) {
  console.log("Location callback geo accuracy");
};

// onError Callback receives a PositionError object
function errorCallbackLocAccuracy(error) {
  console.log(error);
}

function successNativeStorageCallback(message) {}

function errorNativeStorageCallback(error) {}

function onResume() {
  console.log("onResume");
  if (
    window.localStorage.getItem("username") == null &&
    window.localStorage.getItem("userID") == null
  ) {
  }
}

function onPause() {
  //console.log('---- onPause');
  var camera_active = window.localStorage.getItem("camera_active_sess");
  if (camera_active != "1") {
    /*
            timeout 15 menit
            */
    setTimeout(function () {}, 90000);
  }
}

function onBackKeyDown(e) {
  var current_page = window.localStorage.getItem("current_page");

  console.log(current_page);
  if (current_page == "dashboard") {
    navigator.app.exitApp();
  } else {
    pages("dashboard");
  }
}

// $(window).bind('beforeunload', function() {
//     console.log('beforeunload');
// });

function alertDismissed() {
  // do nothing
}

function optionsCamera() {
  var optionsCamera = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 700,
    targetHeight: 800,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
  };

  return optionsCamera;
}

function optionsGallery() {
  var optionsGallery = {
    quality: 75,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    allowEdit: false,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 700,
    targetHeight: 800,
    Options: CameraPopoverOptions,
    saveToPhotoAlbum: false,
  };

  return optionsGallery;
}

var callbackActionSheet = function (tipe_foto, buttonIndex) {
  setTimeout(function () {
    // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
    //console.log('button index: ' + buttonIndex);
    //console.log('tipe foto: ' + tipe_foto);

    var opsi;
    if (buttonIndex == "1") {
      opsi = optionsCamera();
    } else if (buttonIndex == "2") {
      opsi = optionsGallery();
    }
    navigator.camera.getPicture(
      function cameraSuccess(imageUri) {
        //console.log(imageUri);
        //console.log(tipe_foto);
        window.localStorage.removeItem("camera_active_sess");
        var foto = "data:image/jpeg;base64," + imageUri;

        $("#real_foto_" + tipe_foto).attr("src", foto);
        $("#real_foto_" + tipe_foto + " img").fakecrop({
          wrapperWidth: 90,
          wrapperHeight: 82,
        });
        $("#foto_text_" + tipe_foto).val(foto);
      },
      function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
        window.localStorage.removeItem("camera_active_sess");
      },
      opsi
    );
  });
};

var callbackActionSheet2 = function (tipe_foto, buttonIndex) {
  // event.preventDefault();
  setTimeout(function () {
    // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1)
    //console.log('button index: ' + buttonIndex);
    //console.log('tipe foto: ' + tipe_foto);

    var opsi;
    if (buttonIndex == "1") {
      opsi = optionsCamera();
    } else if (buttonIndex == "2") {
      opsi = optionsGallery();
    }
    navigator.camera.getPicture(
      function cameraSuccess(imageUri) {
        //console.log(imageUri);
        //console.log(tipe_foto);
        window.localStorage.removeItem("camera_active_sess");
        var foto = "data:image/jpeg;base64," + imageUri;

        $("#real_foto_" + tipe_foto).attr("src", foto);
        // $("#real_foto_" + tipe_foto + " img").fakecrop({
        //     wrapperWidth: 90,
        //     wrapperHeight: 82
        // });
        $("#foto_text_" + tipe_foto).val(foto);

        data = {
          photo: foto,
        };

        $.ajax({
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              "Bearer " + window.localStorage.getItem("access_token")
            );
            xhr.setRequestHeader("Accept", "application/json");
          },
          type: "POST",
          url: conn + "/upload-photo",
          dataType: "json",
          timeout: timeout,
          data: data,
        })
          .done(function (values) {
            if (values.status == "success") {
              navigator.notification.alert(
                "Foto berhasil diupdate",
                alertDismissed,
                TITLE_ALERT,
                "Ok"
              );
              SpinnerDialog.hide();
              // pages('profil');
            } else {
              navigator.notification.alert(
                values.message,
                alertDismissed,
                TITLE_ALERT,
                "Ok"
              );
              SpinnerDialog.hide();
            }
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);

            if (jqXHR.responseJSON.message == "Service Unavailable") {
              $(".modal-maintenance").modal("show");

              $("#btn-modal-close").click(function () {
                navigator.app.exitApp();
              });
            }

            if (jqXHR.readyState == 0) {
              console.log(
                "Network error (i.e. connection refused, access denied due to CORS, etc.)"
              );
              navigator.notification.alert(
                "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
                alertDismissed,
                TITLE_ALERT,
                "Ok"
              );
            } else {
              SpinnerDialog.hide();
              if (textStatus == "timeout") {
                navigator.notification.alert(
                  "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
                  alertDismissed,
                  TITLE_ALERT,
                  "Ok"
                );
              }
            }
          });
      },
      function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");
        window.localStorage.removeItem("camera_active_sess");
      },
      opsi
    );
  });
};

function fotoActionSheet(tipe_foto) {
  window.localStorage.setItem("camera_active_sess", "1");
  var options = {
    androidTheme:
      window.plugins.actionsheet.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT, // default is THEME_TRADITIONAL
    title: "Ambil Foto",
    subtitle: "Ambil foto dari kamera atau dari gallery", // supported on iOS only
    buttonLabels: ["Kamera", "Gallery"],
    androidEnableCancelButton: true, // default false
    winphoneEnableCancelButton: true, // default false
    addCancelButtonWithLabel: "Batal",
    position: [20, 40], // for iPad pass in the [x, y] position of the popover
    destructiveButtonLast: true, // you can choose where the destructive button is shown
  };
  // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter
  // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin)
  if (tipe_foto == "foto_user") {
    window.plugins.actionsheet.show(
      options,
      callbackActionSheet2.bind(this, tipe_foto)
    );
  } else {
    window.plugins.actionsheet.show(
      options,
      callbackActionSheet.bind(this, tipe_foto)
    );
  }
  // window.plugins.actionsheet.show(options, callbackActionSheet.bind(this, tipe_foto));
}

function onOffline() {
  console.log("offline");
  $(".dotNetworkIndicator").css("background-color", "#ececec");
}

function onOnline() {
  console.log("online");
  $(".dotNetworkIndicator").css("background-color", "#9fc963");
}
//document.addEventListener("backbutton", onDeviceBack, false);

function onDeviceReady() {
  //clear cache
  var success = function (status) {
    // console.log("Message: " + status);
  };
  var error = function (status) {
    // console.log("Error: " + status);
  };
  window.CacheClear(success, error);
  //end clear cache
  updateVersion();
  cekMaintenance();
  // OneSignalInit();
  modalStruk();

  var deviceManufacturer = device.manufacturer;
  var model = device.model;
  var platform = device.platform;
  var version = device.version;

  window.localStorage.setItem("nama_device", deviceManufacturer);
  window.localStorage.setItem("model_device", model);
  window.localStorage.setItem("platform_device", platform);
  window.localStorage.setItem("version_device", version);

  // console.log("nama_device = ", deviceManufacturer);
  // console.log("model_device = ", model);
  // console.log("platform_device = ", platform);
  // console.log("version_device = ", version);

  document.addEventListener("backbutton", onBackKeyDown, false);
  navigator.splashscreen.hide();
  //In your 'deviceready' handler, set up your Analytics tracker:
  // window.ga.startTrackerWithId("G-C4BN1Z0H3D", 30);
  cordova.plugin.http.setHeader(
    "Access-Control-Allow-Origin",
    "https://localhost"
  );
  console.log(navigator.camera);
  $(".loader").remove();
  //var userID = window.localStorage.getItem('userID');
  var userID = NativeStorage.getItem(
    "userID",
    function (d) {
      if (userID != null && userID != "") {
        logout("reset");
      }

      $("#userInfoSidebarPanelBeforeLogin").hide();
      $("#userInfoSidebarPanel").show();
      $("#topRightNoLogin").hide();
      $("#topRightAfterLogin").show();
      $("#linkLoginSidebarPanel").hide();
      $("#linkLogoutSidebarPanel").show();

      // let name = NativeStorage.getItem('name', function (d) {
      //     $('#nameSidebarPanel').text(d);
      //     $('#userInfoSidebarPanelBeforeLogin').hide();
      //     $('#userInfoSidebarPanel').show();
      //     $('#topRightNoLogin').hide();
      //     $('#topRightAfterLogin').show();
      //     $('#linkLoginSidebarPanel').hide();
      //     $('#linkLogoutSidebarPanel').show();
      // }, errorNativeStorageCallback);

      // let email = NativeStorage.getItem('email', function (d) {
      //     $('#emailSidebarPanel').text(d);
      // }, errorNativeStorageCallback);
    },
    errorNativeStorageCallback
  );

  let access_token = NativeStorage.getItem(
    "access_token",
    function (a) {
      window.localStorage.setItem("access_token", a);
    },
    errorNativeStorageCallback
  );

  console.log("Device Ready");
  var optionAccuracy = {};
  //cordova.plugins.locationAccuracy.request(successCallbackLocAccuracy, errorCallbackLocAccuracy)
  //navigator.splashscreen.show();

  var optionsGeoLoc = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  geolocationStart = navigator.geolocation.getCurrentPosition(
    onSuccessGeoLocation,
    onErrorGeoLocation,
    optionsGeoLoc
  );

  // getLocation();

  pictureSource = navigator.camera.PictureSourceType;
  destinationType = navigator.camera.DestinationType;

  // init database
  var databaseName = "Mobil Indostation";
  var databaseVersion = "1.0";
  var databaseDisplayName = "Mobil Indostation";
  var databaseSize = 15 * 1024 * 1024;

  // Accessing with HTML5 local database
  myDB = window.openDatabase(
    databaseName,
    databaseVersion,
    databaseDisplayName,
    databaseSize
  );

  //tes
  myDB.transaction(function (transaction) {
    database("customer_local", transaction);
    database("customer_server", transaction);
    database("outlet", transaction);
    database("product", transaction);
    database("city_local", transaction);
  });

  window.plugins.OnDestroyPlugin.setEventListener(function () {
    //console.log('ondestroy');
  });
  // console.log('Device-info:');
  console.log("UUID : " + device.uuid);
  // console.log('Model : ' + device.model);
  // console.log('Platform : ' + device.platform);

  var device_uuid = device.uuid;

  window.localStorage.setItem("device_uuid", device_uuid);
  window.localStorage.setItem("versi_app", versionDevice);
  // window.localStorage.setItem("pop_up_update_sudah_tampil", "");

  window.plugins.appsFlyer.registerDeepLink(function (res) {
    console.log("AppsFlyer DDL ==> " + res);
    //alert('AppsFlyer DDL ==> ' + res);
  });

  window.plugins.appsFlyer.initSdk(
    {
      devKey: "qC69oBPHF2WD3cyUoz3pra", // your AppsFlyer devKey
      isDebug: false,
      appId: "3135196843475135", // your ios appID
      waitForATTUserAuthorization: 10, //time for the sdk to wait before launch - IOS 14 ONLY!
      onInstallConversionDataListener: true,
      onDeepLinkListener: true, // by default onDeepLinkListener is false!
    },
    (result) => {
      console.log(result);
    },
    (error) => {
      console.error(error);
    }
  );

  //start-pusher
  // initPusher();
  //end-pusher

  // console.log(versionDevice);
  window.localStorage.setItem("versionDevice", versionDevice);
  window.localStorage.removeItem("province_id");
  window.localStorage.removeItem("countvcr");
  init();
} //end onDeviceReady

function getLocation() {
  var optionsGeoLoc = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  geolocationStart = navigator.geolocation.getCurrentPosition(
    onSuccessGeoLocation,
    onErrorGeoLocation,
    optionsGeoLoc
  );
}

// function initPusher() {
//   if (window.localStorage.getItem("access_token") !== "") {
//     var pusher = new Pusher("eb3ec020eefa4815a37050ffcd3883bc", {
//       cluster: "ap1",
//       authEndpoint: server_url + "/broadcasting/auth",
//       wsHost: "sandboxc.brahmayasa.com",
//       wssHost: "sandboxc.brahmayasa.com",
//       wsPort: 6001,
//       wssPort: 6001,
//       forceTLS: true,
//       encrypted: true,
//       disableStats: true,
//       enabledTransports: ["ws", "wss"],
//       auth: {
//         headers: {
//           Authorization:
//             "Bearer " + window.localStorage.getItem("access_token"),
//         },
//       },
//     });
//   }

//   if (window.localStorage.getItem("userID") !== "") {
//     var channel_name =
//       "private-App.User." + window.localStorage.getItem("userID");
//     var event_name = "notification.general";

//     var channel = pusher.subscribe(channel_name);
//     channel.bind(event_name, function (data) {
//       console.log(JSON.stringify(data));
//       //alert(JSON.stringify(data));
//       cordova.plugins.notification.local.schedule({
//         title: "Mobil Indostation",
//         text: data.message,
//         foreground: true,
//       });
//     });
//     channel.bind("pusher:subscription_error", function (data) {
//       console.log(data);
//     });
//   }

//   return 1;
// }

function generateOTP() {
  return $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/otp/generate",
    dataType: "json",
    async: true,
    timeout: timeout1,
  });
}

function ajaxCheckVersion() {
  return $.ajax({
    type: "POST",
    url: conn + "/check-version",
    dataType: "json",
    async: true,
    timeout: timeout1,
  });
}

function runningVersion() {
  /*
      ajaxCheckVersion().done(function(values) {
          if (values.version != '') {

              versionServer = values.version;
              checkVersion = true;
              console.log(versionServer);
              console.log(versionDevice);
              var compareVer = compareVersion(versionServer, versionDevice);
              console.log(compareVer);
              var pop_up_update_sudah_tampil = window.localStorage.getItem("pop_up_update_sudah_tampil");

              if (compareVer == '1' && (pop_up_update_sudah_tampil != '1')) {
                  //alert('New App Version : ' + server + '\nChange the latest version!' );
                  general_modal('Version Info', '<p style="width:100%;text-align:center">Ada update APK baru, silahkan klik button Download <br/><a style="margin-top:20px" class="btn btn-block gradient-blue" onClick="getAPK()" href="javascript:void(0)">Download</a><br/></p>');
                  window.localStorage.setItem("pop_up_update_sudah_tampil", "1");
              } else {
                  //general_modal('Version Info', '<p style="width:100%;text-align:center">APK sudah terupdate</p>');
              }
          }

      }).fail(function(jqXHR, textStatus, error) {
          console.log('Error ajax check version server');
          console.log('---------------');
          console.log('error : ');
          console.log(jqXHR);
          console.log('---------------');
      });
      */
} //

function firstConnection() {
  //console.log(checkConnection());
  if (checkConnection() == "No network connection") {
    connection = "offline";
  } else {
    connection = "online";
  }

  return connection;
}

function checkIsLoggedIn() {
  return $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/is-logged-in",
    dataType: "json",
    async: true,
    timeout: timeout1,
  });
}

function checkConnection() {
  var networkState = navigator.connection.type;
  var states = {};
  states[Connection.UNKNOWN] = "Unknown connection";
  states[Connection.ETHERNET] = "Ethernet connection";
  states[Connection.WIFI] = "WiFi connection";
  states[Connection.CELL_2G] = "Cell 2G connection";
  states[Connection.CELL_3G] = "Cell 3G connection";
  states[Connection.CELL_4G] = "Cell 4G connection";
  states[Connection.CELL] = "Cell generic connection";
  states[Connection.NONE] = "No network connection";
  return states[networkState];
}

function drop(item, transaction) {
  console.log("Drop table " + item);
  transaction.executeSql("DROP TABLE IF EXISTS " + item);
}

function database(item, transaction) {
  switch (item) {
    case "customer_local":
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS customer_local (id INTEGER PRIMARY KEY, id_server INTEGER, " +
          "name VARCHAR(100), email VARCHAR(100), no_hp VARCHAR(20), " +
          "product_id INTEGER, " +
          "device_uuid VARCHAR(40), " +
          "status_sync VARCHAR(2)," +
          "photo_id_card LONGTEXT, " +
          "photo_invoice LONGTEXT, " +
          "photo_open_box LONGTEXT, " +
          "photo_customer LONGTEXT, " +
          "time_created DATETIME, time_modified DATETIME)",
        [],
        function (tx, result) {
          //console.log("Table customer created successfully.");
        },
        function (error, e) {
          console.log(
            "Error occurred while creating the table customer_local."
          );
          console.log("Error : " + e.message);
        }
      );
      break;

    case "customer_server":
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS customer_server (id INTEGER PRIMARY KEY, id_server INTEGER, " +
          "name VARCHAR(100), email VARCHAR(100), no_hp VARCHAR(20), " +
          "product_id INTEGER, " +
          "device_uuid VARCHAR(40), " +
          "status VARCHAR(100), " +
          "photo_id_card LONGTEXT, " +
          "photo_invoice LONGTEXT, " +
          "photo_customer LONGTEXT, " +
          "time_created DATETIME, time_modified DATETIME)",
        [],
        function (tx, result) {
          //console.log("Table customer created successfully.");
        },
        function (error, e) {
          console.log(
            "Error occurred while creating the table customer_server."
          );
          console.log("Error : " + e.message);
        }
      );
      break;

    case "city_local":
      transaction.executeSql(
        "CREATE TABLE IF NOT EXISTS city_local (id INTEGER PRIMARY KEY, parent_id INTEGER(11), " +
          "name VARCHAR(255), latitude VARCHAR(20), longitude VARCHAR(20))",
        [],
        function (tx, result) {
          // console.log("Table city_local created successfully.");
        },
        function (error, e) {
          console.log(
            "Error occurred while creating the table customer_server."
          );
          console.log("Error : " + e.message);
        }
      );
      break;
  }
} //end function database

function insertQuery(item) {
  var query;

  switch (item) {
    case "customer_local":
      query =
        "INSERT OR REPLACE INTO customer_local (name, no_hp, email, product_id, device_uuid, " +
        "status_sync, photo_id_card, photo_invoice, photo_customer)";
      break;

    case "customer_server":
      query =
        "INSERT OR REPLACE INTO customer_server (id_server, name, no_hp, email, status, product_id, device_uuid, data_type, " +
        "photo_id_card, photo_invoice, photo_customer, time_created)";
      break;

    case "city_local":
      query =
        "INSERT OR REPLACE INTO city_local (id, parent_id, name, latitude, longitude)";
      break;

    default:
      query = "";
      break;
  }

  return query;
}

function insertDatabase(item, values, transaction) {
  transaction.executeSql(
    insertQuery(item) + " VALUES " + values,
    [],
    function (tx, result) {
      window.localStorage.setItem(item + "_insertId", result.insertId);
      // console.log(insertQuery(item) + " VALUES " + values);
    },
    function (error, e) {
      console.log(insertQuery(item) + " VALUES " + values);
      console.log("Error occurred while insert table " + item + ".");
      console.log("Error : " + e.message);
    }
  );
}

function insertMassData(item, query, transaction) {
  transaction.executeSql(
    query,
    [],
    function (tx, result) {
      //console.log("Insert table " + item + " successfully.");
    },
    function (error, e) {
      console.log("Error occurred while insert table " + item + ".");
      console.log("Error : " + e.message);
    }
  );
}

function pages(main) {
  //console.log('show page ' + main);
  var target_main = $("#appCapsule");
  switch (main) {
    case "dashboard":
      window.localStorage.setItem("current_page", "dashboard");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuDashboard").addClass("active");

      target_main.load("contents/dashboard.html");
      profilHeader();
      break;

    case "login":
      window.localStorage.setItem("current_page", "login");
      target_main.load("contents/login.html");
      break;

    case "register":
      window.localStorage.setItem("current_page", "register");
      target_main.load("contents/register.html");
      break;

    case "otp-register":
      target_main.load("contents/otp-register.html");
      break;

    case "bantuan":
      window.localStorage.setItem("current_page", "bantuan");
      target_main.load("contents/bantuan.html");
      break;

    case "agenda":
      window.localStorage.setItem("current_page", "agenda");
      target_main.load("contents/agenda.html");
      break;

    case "agenda-detail":
      window.localStorage.setItem("current_page", "agenda-detail");
      target_main.load("contents/agenda-detail.html");
      break;

    case "pembayaran":
      window.localStorage.setItem("current_page", "pembayaran");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuPembayaran").addClass("active");

      target_main.load("contents/pembayaran.html");
      break;

    case "presensi":
      window.localStorage.setItem("current_page", "presensi");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuPresensi").addClass("active");

      target_main.load("contents/presensi.html");
      break;

    case "produk":
      window.localStorage.setItem("current_page", "produk");
      target_main.load("contents/produk.html");
      break;

    case "produk-detail":
      window.localStorage.setItem("current_page", "produk-detail");
      target_main.load("contents/produk-detail.html");
      break;

    case "profil":
      window.localStorage.setItem("current_page", "profil");
      target_main.load("contents/profil.html");
      break;

    case "profil-edit":
      window.localStorage.setItem("current_page", "profil-edit");
      target_main.load("contents/profil-edit.html");
      break;

    case "message":
      window.localStorage.setItem("current_page", "message");
      target_main.load("contents/message.html");
      break;

    case "mengaji":
      window.localStorage.setItem("current_page", "mengaji");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuMengaji").addClass("active");

      target_main.load("contents/mengaji.html");
      break;

    case "site":
      window.localStorage.setItem("current_page", "site");
      target_main.load("contents/site.html");
      break;

    case "site-detail":
      window.localStorage.setItem("current_page", "site-detail");
      target_main.load("contents/site-detail.html");
      break;

    case "hafalan":
      window.localStorage.setItem("current_page", "hafalan");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuHafalan").addClass("active");

      target_main.load("contents/hafalan.html");
      break;

    case "settings":
      window.localStorage.setItem("current_page", "settings");
      target_main.load("contents/settings.html");
      break;

    case "contact-us":
      window.localStorage.setItem("current_page", "contact-us");
      target_main.load("contents/contact-us.html");
      break;

    case "privacy-policy":
      window.localStorage.setItem("current_page", "privacy-policy");
      target_main.load("contents/privacy-policy.html");
      break;

    case "scan-voucher":
      window.localStorage.setItem("current_page", "scan-voucher");
      target_main.load("contents/scan-voucher.html");
      break;

    case "promo-gold":
      window.localStorage.setItem("current_page", "promo-gold");
      target_main.load("contents/promo-detail-gold.html");
      break;

    case "promo-silver":
      window.localStorage.setItem("current_page", "promo-silver");
      target_main.load("contents/promo-detail-silver.html");
      break;

    case "layanan-informasi":
      window.localStorage.setItem("current_page", "layanan-informasi");
      target_main.load("contents/layanan-informasi.html");
      break;

    case "slider-agenda-detail":
      window.localStorage.setItem("current_page", "slider-agenda-detail");
      target_main.load("contents/slider-agenda-detail.html");
      break;

    case "privasi":
      window.localStorage.setItem("current_page", "privasi");
      target_main.load("contents/privasi.html");
      break;

    case "pakai-voucher":
      window.localStorage.setItem("current_page", "pakai-voucher");
      target_main.load("contents/pakai-voucher.html");
      break;

    case "detail-kupon":
      window.localStorage.setItem("current_page", "detail-kupon");
      target_main.load("contents/detail-kupon.html");
      break;

    case "sukses-struk":
      window.localStorage.setItem("current_page", "sukses-struk");
      target_main.load("contents/berhasil-upload-struk.html");
      break;

    case "cari-produk":
      window.localStorage.setItem("current_page", "cari-produk");
      target_main.load("contents/cari-produk.html");
      break;

    case "lupa-password":
      window.localStorage.setItem("current_page", "lupa-password");
      target_main.load("contents/lupa-password.html");
      break;

    case "edit-user":
      window.localStorage.setItem("current_page", "edit-user");
      target_main.load("contents/edit-user.html");
      break;

    case "progress-struk":
      window.localStorage.setItem("current_page", "progress-struk");
      target_main.load("contents/progress-struk.html");
      break;

    case "otp-edit-profile":
      window.localStorage.setItem(
        "current_page",
        "progress-strukotp-edit-profile"
      );
      target_main.load("contents/otp-edit-profile.html");
      break;

    case "list-pembayaran":
      window.localStorage.setItem(
        "current_page",
        "list-pembayaran"
      );
      target_main.load("contents/list-pembayaran.html");
      break;

    default:
      window.localStorage.setItem("current_page", "dashboard"); //default login
      target_main.load("contents/dashboard.html");
  }
  $("#sidebarPanel").modal("hide");
}

function submitLogin() {
  event.preventDefault();

  //loading('show');
  //loading_content('Mengirim data ...');
  SpinnerDialog.show(null, "Mengirim data ...");

  var identity = $("#usernameFormLogin").val();
  var password = $("#passwordFormLogin").val();

  if (identity == "" && password == "") {
    navigator.notification.alert(
      "Username dan password belum diisi",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
    //loading('close');
    SpinnerDialog.hide();
  } else if (identity == "") {
    navigator.notification.alert(
      "Username belum diisi",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
    //loading('close');
    SpinnerDialog.hide();
  } else if (password == "") {
    navigator.notification.alert(
      "Password belum diisi",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
    //loading('close');
    SpinnerDialog.hide();
  } else {
    loginOnline(identity, password);

    SpinnerDialog.hide();
  }
}

function loginOnline() {
  // console.log("Latitude : ", window.localStorage.getItem(latitude));
  // console.log("Longitude : ", window.localStorage.getItem(longitude));

  event.preventDefault();
  SpinnerDialog.show(null, "Mengirim data ...");

  var data = [];

  var latitude = window.localStorage.getItem("latitude");
  var longitude = window.localStorage.getItem("longitude");
  var identity = $("#usernameFormLogin").val();
  var password = $("#passwordFormLogin").val();

  if (identity == "" && password == "") {
    navigator.notification.alert(
      "Email/No telepon dan password belum diisi",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
    //loading('close');
    SpinnerDialog.hide();
  } else {
    data = {
      identity: identity,
      password: password,
      latitude: latitude,
      longitude: longitude,
      device_uuid: window.localStorage.getItem("device_uuid"),
    };
    SpinnerDialog.show(null, "Mengirim data ...");
    //console.log(data);
    $.ajax({
      type: "POST",
      url: conn + "/login",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        console.log(values);
        if (values.status == "error") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
        } else if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
          $("#usernameFormLogin").val(identity);
        } else if (values.status == "failed-otp") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
          window.localStorage.setItem(
            "register_user_id_sess",
            values.user.user_id
          );
          window.localStorage.setItem("register_email_sess", values.user.email);
          pages("otp-register");
        } else if (values.status == "success") {
          //console.log(values.role[0]);

          window.localStorage.setItem("provinsi", values.provinsi);

          window.localStorage.setItem("userID", values.user_id);
          NativeStorage.setItem(
            "userID",
            values.user_id,
            function () {},
            function () {}
          );
          window.localStorage.setItem(
            "name",
            values.name,
            function () {},
            function () {}
          );
          NativeStorage.setItem("name", values.name, function () {});
          window.localStorage.setItem("email", values.email);
          NativeStorage.setItem(
            "email",
            values.email,
            function () {},
            function () {}
          );
          window.localStorage.setItem("no_hp", values.no_hp);
          window.localStorage.setItem("access_token", values.access_token);
          NativeStorage.setItem(
            "access_token",
            values.access_token,
            function () {},
            function () {}
          );

          if (window.localStorage.getItem("access_token") !== "") {
            $("#userInfoSidebarPanelBeforeLogin").hide();
            $("#userInfoSidebarPanel").show();
            $("#topRightNoLogin").hide();
            $("#topRightAfterLogin").show();
            $("#linkLoginSidebarPanel").hide();
            $("#linkLogoutSidebarPanel").show();

            //start-pusher
            // initPusher();
            //end-pusher

            //oneSignal-register-player_id
            deviceUserRegister();
          }

          //loading('show');
          SpinnerDialog.hide();

          window.localStorage.setItem("otp_login", "1");

          pages("dashboard");
          setTimeout(function () {
            // notification();
            // notifVoucher();
            voucher_modal();
          }, 2000);
        }

        window.localStorage.setItem("status_struk", "all");
        //loading('close');
        SpinnerDialog.hide();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        var contentType = jqXHR.getResponseHeader("Content-Type");

        if (jqXHR.responseJSON.message == "Service Unavailable") {
          $(".modal-maintenance").modal("show");

          $("#btn-modal-close").click(function () {
            navigator.app.exitApp();
          });
        }

        console.log(jqXHR.status);
        //console.log(textStatus);
        //console.log(errorThrown);
        //loading('close');
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (
          jqXHR.status === 200 &&
          contentType.toLowerCase().indexOf("text/html") >= 0
        ) {
          // assume that our login has expired - reload our current page
          navigator.notification.alert(
            "URL SERVER tidak ditemukan",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
        SpinnerDialog.hide();
      });
  }
}

function logout(logout_type) {
  window.localStorage.setItem("pop_up_update_sudah_tampil", "");
  var data = [];

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/logout",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      console.log("Logged Out");
      if (values.status == "error") {
        // console.log(values.status);
      } else if (values.status == "success") {
        //clear cache
        var success = function (status) {
          console.log("Message: " + status);
        };
        var error = function (status) {
          console.log("Error: " + status);
        };
        window.CacheClear(success, error);
        //end clear cache

        NativeStorage.remove(
          "userID",
          successNativeStorageCallback,
          errorNativeStorageCallback
        );
        NativeStorage.remove(
          "access_token",
          successNativeStorageCallback,
          errorNativeStorageCallback
        );
        window.localStorage.removeItem("userID");
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("otp_login");
        window.localStorage.removeItem("name");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("no_hp");
        window.localStorage.removeItem("camera_active_sess");
        window.localStorage.removeItem("version_device");
        window.localStorage.removeItem("customer_id");
        window.localStorage.removeItem("status_struk");
        window.localStorage.removeItem("platform_device");
        window.localStorage.removeItem("device_uuid");
        window.localStorage.removeItem("versi_app");
        window.localStorage.removeItem("versionDevice");
        window.localStorage.removeItem("city_local_insertId");
        window.localStorage.removeItem("model_device");
        window.localStorage.removeItem("nama_device");
        window.localStorage.removeItem("current_page");
        window.localStorage.removeItem("register_user_id_sess");
        window.localStorage.removeItem("product_id");
        window.localStorage.removeItem("id_kategori_berita");
        window.localStorage.removeItem("provinsi_id");
        window.localStorage.removeItem("category_id");
        window.localStorage.removeItem("jenis_kupon");
        window.localStorage.removeItem("provinsi");
        window.localStorage.removeItem("city");
        window.localStorage.removeItem("voucher");
        window.localStorage.removeItem("register_email_sess");
        window.localStorage.removeItem("id_promo");
        window.localStorage.removeItem("pop_up_update_sudah_tampil");
        window.localStorage.removeItem("province_id");
        window.localStorage.removeItem("pop_up_geoloc");

        $(document.body).removeClass("modal-open");
        $("#sidebarPanel").modal("hide");

        $(".modal-backdrop").remove();
        $("#userInfoSidebarPanel").hide();
        $("#userInfoSidebarPanelBeforeLogin").show();
        $("#topRightNoLogin").show();
        $("#topRightAfterLogin").hide();
        $("#nameSidebarPanel").text();
        $("#emailSidebarPanel").text();
        $("#linkLoginSidebarPanel").show();
        $("#linkLogoutSidebarPanel").hide();

        if (logout_type == "reset") {
          navigator.notification.alert(
            "Inisialisasi apps berhasil.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else {
          navigator.notification.alert(
            "Logout berhasil.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }

        pages("dashboard");
      }
      //loading('close');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      //console.log(textStatus);
      //console.log(errorThrown);
    });
} //end logout()

function init() {
  // runningVersion();
  pages("dashboard");
}

function convertImgToBase64URL(url, callback) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    var canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d"),
      dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    callback(dataURL);
    canvas = null;
  };
  img.src = url;
}

function loading(stat) {
  var loading =
    '<div id="loading">' +
    '<div class="loading_image"><img src="assets/img/loading.gif" width="28" height="28" alt="Mohon Tunggu ..." /></div>' +
    '<div class="loading_content"></div>' +
    "</div>";
  if (stat == "show") {
    //console.log('show loading');
    $("#footer").append(loading);
  } else if (stat == "close") {
    //console.log('close loading');
    $("#loading").remove();
  }
}

function display_modal(title, message) {
  $("#errorModal").modal("show");
  $(".modal-title").show().html(title);
  $(".modal-body-message").show().html(message);
}

function general_modal(title, message) {
  $("#generalModal").modal("show");
  $(".modal-title").show().html(title);
  $(".modal-body-message").show().html(message);
}

function loading_content(str) {
  $(".loading_content").html(str);
}

function loading_apps() {
  var content_first =
    '<div class="loads">' +
    '<div class="load_running"></div>' +
    '<div class="load_failed"></div>' +
    "</div>";
  loading_content(content_first);
}

function loading_running(str) {
  $(".load_running").html(str);
}

function loading_failed(str) {
  var _str = '<div class="failed_sync">' + str + "</div>";
  $(".load_failed").append(_str);
}

function compareVersion(version_server, version_local) {
  var v1 = version_server;
  var v2 = version_local;

  if (typeof v1 !== "string") return false;
  if (typeof v2 !== "string") return false;
  v1 = v1.split(".");
  v2 = v2.split(".");
  const k = Math.min(v1.length, v2.length);
  //for (let i = 0; i < k; ++i) {
  for (var i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1;
} // compareVersion()

function getAPK() {
  //console.log('1503 : getAPK');
  if (typeof navigator !== "undefined" && navigator.app) {
    // Mobile device.
    navigator.app.loadUrl(conn + "/download-apk", { openExternal: true });
  }
  /*
      else {
          // Possible web browser
      }
      */
} //

function openMap(latitude, longitude, site_name) {
  launchnavigator.isAppAvailable(
    launchnavigator.APP.GOOGLE_MAPS,
    function (isAvailable) {
      var app;
      if (isAvailable) {
        app = launchnavigator.APP.GOOGLE_MAPS;
      } else {
        console.warn(
          "Google Maps not available - falling back to user selection"
        );
        navigator.notification.alert(
          "Aplikasi Google Maps tidak tersedia.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        app = launchnavigator.APP.USER_SELECT;
      }
      launchnavigator.navigate([latitude, longitude]);
    }
  );
}

$(document).ready(function () {
  $(".btn-lihat-voucher").click(function () {
    $("#exampleModalCenter").modal("hide");
    $(".modal-v2").modal("hide");
    $(".modal-v3").modal("hide");
    pages("voucher");
  });

  // $(".icon-close").click(function () {
  //   $("#exampleModalCenter").modal("hide");
  //   // pages('voucher');
  // });

  $("#icon-close-3").click(function () {
    $(".modal-v3").modal("hide");
  });

  $("#icon-close-2").click(function () {
    $(".modal-v2").modal("hide");
  });

  $("#icon-close-1").click(function () {
    $(".v1").modal("hide");
  });
  // var namaSidebar = window.localStorage.getItem('nama_profil_sidebar');
  // console.log('nama sidebar:' +namaSidebar);
  // $('#nameSidebarPanel').val(namaSidebar);
});

function voucher_modal() {
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/voucher-cek",
    dataType: "json",
    timeout: timeout,
  })
    .done(function (values) {
      console.log(values);

      var data = values.type;

      // console.log("datanya ada  :" + data[0]);

      if (data.length == 1) {
        if (data[0] == "bensin") {
          $(".v1").modal("show");
          $("#icon-close-1").click(function () {
            $(".v1").modal("hide");
          });
          console.log("Berhasil 1");
        } else if (data[0] == "oli mobil") {
          $(".modal-v2").modal("show");
          $("#icon-close-2").click(function () {
            $(".modal-v2").modal("hide");
          });
        } else if (data[0] == "oli federal") {
          $(".modal-v3").modal("show");
          $("#icon-close-3").click(function () {
            $(".modal-v3").modal("hide");
          });
        }
      } else if (data.length == 2) {
        if (data[0] == "bensin") {
          $(".v1").modal("show");
          if (data[1] == "oli mobil") {
            console.log("Berhasil 2");
            $("#icon-close-1").click(function () {
              $(".v1").modal("hide");
              $(".modal-v2").modal("show");
            });
          } else {
            // console.log("Berhasil 2");
            $("#icon-close-1").click(function () {
              $(".v1").modal("hide");
              $(".modal-v3").modal("show");
              $("#icon-close-3").click(function () {
                $(".modal-v3").modal("hide");
              });
            });
          }
          $("#icon-close-1").click(function () {
            $(".v1").modal("hide");
          });
        } else if (data[0] == "oli mobil") {
          $(".modal-v2").modal("show");
          if (data[1] == "oli federal") {
            $("#icon-close-2").click(function () {
              $(".modal-v2").modal("hide");
              $(".modal-v3").modal("show");
            });
          } else {
            $("#icon-close-2").click(function () {
              $(".modal-v2").modal("hide");
              $(".v1").modal("show");
              $("#icon-close-1").click(function () {
                $(".v1").modal("hide");
              });
            });
          }

          $("#icon-close-2").click(function () {
            $(".modal-v2").modal("hide");
          });
        } else if (data[0] == "oli federal") {
          $(".modal-v3").modal("show");
          if (data[1] == "bensin") {
            $("#icon-close-3").click(function () {
              $(".modal-v3").modal("hide");
              $(".v1").modal("show");
            });
          } else {
            $("#icon-close-2").click(function () {
              $(".modal-v2").modal("show");
              $(".modal-v3").modal("hide");
              $("#icon-close-2").click(function () {
                $(".modal-v2").modal("hide");
              });
            });
          }

          $("#icon-close-3").click(function () {
            $(".modal-v3").modal("hide");
          });
        } else {
          $("#icon-close-1").click(function () {
            $("#exampleModalCenter").modal("hide");
          });
        }
      } else if (data.length == 3) {
        $(".v1").modal("show");

        $(".v1").on("hidden", function () {
          $(".modal-v2").modal("show");
          $(".v1").modal("hide");
          $(".modal-v3").modal("hide");
        });
        $(".modal-v2").on("hidden", function () {
          $(".modal-v3").modal("show");
          $(".modal-v2").modal("hide");
          $(".v1").modal("hide");
        });
        // if ($(".modal-v2").modal("hide")) {
        //   $(".modal-v3").modal("show");
        //   $(".modal-v2").modal("hide");
        // }
        // if ($(".v1").modal("hide")) {
        //   $(".v1").modal("hide");
        //   $(".modal-v2").modal("show");
        // }
        $("#icon-close-3").click(function () {
          $(".modal-v3").modal("hide");
        });
        $("#icon-close-2").click(function () {
          $(".modal-v2").modal("hide");
          $(".modal-v3").modal("show");
        });
        $("#icon-close-1").click(function () {
          $(".v1").modal("hide");
          $(".modal-v2").modal("show");
          $(".modal-v3").modal("hide");
        });
      }

      if (values.status == "errors" || values.status == "failed") {
        $("#exampleModalCenter").modal("hide");
        // navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      }

      // else if (values.status == "success") {
      // $("#exampleModalCenter").modal("show");
      // if (values.jumlah_vcr == 1) {
      //   // $(".v1").modal("show");
      //   // $("#icon-close-1").click(function () {
      //   //   $(".v1").modal("hide");
      //   // });
      //   // } else if (values.jumlah_vcr > 1) {
      //   //   $(".v1").on("hidden", function () {
      //   //     $(".modal-v2").modal("show");
      //   //     $(".v1").modal("hide");
      //   //     $(".modal-v3").modal("show");
      //   //   });
      //   //   $(".modal-v2").on("hidden", function () {
      //   //     $(".modal-v3").modal("show");
      //   //     $(".modal-v2").modal("hide");
      //   //     $(".v1").modal("hide");
      //   //   });
      //   //   if ($(".modal-v2").modal("hide")) {
      //   //     $(".modal-v3").modal("show");
      //   //     $(".modal-v2").modal("hide");
      //   //   }
      //   //   if ($(".v1").modal("hide")) {
      //   //     $(".v1").modal("hide");
      //   //     $(".modal-v2").modal("show");
      //   //   }
      //   // $("#icon-close-3").click(function () {
      //   //   $(".modal-v3").modal("hide");
      //   // });
      //   // $("#icon-close-2").click(function () {
      //   //   $(".modal-v2").modal("hide");
      //   //   $(".modal-v3").modal("show");
      //   // });
      //   // $("#icon-close-1").click(function () {
      //   //   $(".v1").modal("hide");
      //   //   $(".modal-v2").modal("show");
      //   //   $(".modal-v3").modal("hide");
      //   // });
      // } else {
      //   $("#exampleModalCenter").modal("hide");
      // }
      // }

      SpinnerDialog.hide();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);

      if (jqXHR.responseJSON.message == "Service Unavailable") {
        $(".modal-maintenance").modal("show");

        $("#btn-modal-close").click(function () {
          navigator.app.exitApp();
        });
      }

      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}

function clickProdukKategori(id) {
  window.localStorage.setItem("category_id", id);
  pages("produk");
}

function clickKuponGold(id) {
  window.localStorage.removeItem("status_struk");
  window.localStorage.setItem("status_struk", id);
  // console.log("type struk :" + window.localStorage.setItem("status_struk", id));
  pages("kupon");
}

function clickKuponSilver(id) {
  window.localStorage.removeItem("status_struk");
  window.localStorage.setItem("status_struk", id);
  // console.log("type struk :" + window.localStorage.setItem("status_struk", id));
  pages("kupon");
}

function clickKuponAll(id) {
  window.localStorage.removeItem("status_struk");
  window.localStorage.setItem("status_struk", id);
  // console.log("type struk :" + window.localStorage.setItem("status_struk", id));
  pages("kupon");
}

function clickKuponAllMenu(param) {
  window.localStorage.removeItem("status_struk");
  // window.localStorage.setItem('kupon_type', id);
  window.localStorage.setItem("status_struk", $(param).data("id"));
  // console.log('type kupon :' +window.localStorage.setItem('kupon_type', id));
  pages("kupon");
}

function PageBeritaAll(param) {
  window.localStorage.removeItem("id_kategori_berita");
  window.localStorage.setItem("id_kategori_berita", $(param).data("id"));
  pages("berita");
}

function PageRegister() {
  $("#exampleModalFgtPassword").modal("hide");
  pages("register");
}

function profilHeader() {
  var akses_token = window.localStorage.getItem("access_token");

  if (akses_token !== "") {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.getItem("access_token")
        );
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/profile",
      dataType: "json",
      timeout: timeout,
    })
      .done(function (values) {
        if (values.status == "success") {
          if (values.file_photo == null) {
            var foto = "assets/img/sample/avatar/icon-user.png";
          } else {
            var foto = values.file_photo;
          }

          $("#profileHeader").attr("src", foto);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);

        if (jqXHR.responseJSON.message == "Service Unavailable") {
          $(".modal-maintenance").modal("show");

          $("#btn-modal-close").click(function () {
            navigator.app.exitApp();
          });
        }

        if (jqXHR.readyState == 0) {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          // navigator.notification.alert('Koneksi offline.', alertDismissed, TITLE_ALERT, 'Ok');
        } else {
          SpinnerDialog.hide();
          if (textStatus == "timeout") {
            // navigator.notification.alert('Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001', alertDismissed, TITLE_ALERT, 'Ok');
          }
        }
      });
  }
}

// $(document).ready(function () {
//   var firstCon = firstConnection();
//   if (firstCon == "online") {
//     var status_login = window.localStorage.getItem("otp_login");
//     if (status_login == 1) {
//       setTimeout(() => {
//         // notification();
//       }, 36000);
//     }
//   }
// });

// function notification() {
//   $.ajax({
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader(
//         "Authorization",
//         "Bearer " + window.localStorage.getItem("access_token")
//       );
//     },
//     type: "POST",
//     url: conn + "/message",
//     dataType: "json",
//     timeout: timeout,
//   })
//     .done(function (values) {
//       // console.log(values);

//       var data = values.data;
//       // var status = values.data[0].status;

//       // console.log(status);
//       // var jml_data = values.total_awal;

//       console.log("Jmlah Data = " + data.length);

//       if (data.length > 0) {
//         if (data[0].status == 0 && data[1].status == 0 && data[2].status == 0) {
//           cordova.plugins.notification.local.schedule([
//             { id: 1, title: data[0].title, text: data[0].pesan },
//             { id: 2, title: data[1].title, text: data[1].pesan },
//             { id: 3, title: data[2].title, text: data[2].pesan },
//           ]);
//         } else if (data[0].status == 0 && data[1].status == 0) {
//           cordova.plugins.notification.local.schedule([
//             { id: 1, title: data[0].title, text: data[0].pesan },
//             { id: 2, title: data[1].title, text: data[1].pesan },
//           ]);
//         } else if (data[0].status == 0) {
//           cordova.plugins.notification.local.schedule([
//             { id: 1, title: data[0].title, text: data[0].pesan },
//           ]);
//         }
//       } else {
//         console.log("Data message terkini tidak ada");
//       }

//       // for (var i = 0; i < data.length; i++) {
//       //   var obj = data[i];
//       //   if (data.length == 3 && obj.status == 0) {
//       //     cordova.plugins.notification.local.schedule([
//       //       { id: 1, title: obj.title, text: obj.pesan },
//       //       { id: 2, title: obj.title, text: obj.pesan },
//       //       { id: 3, title: obj.title, text: obj.pesan },
//       //     ]);
//       //   } else if (data.length == 2 && obj.status == 0) {
//       //     cordova.plugins.notification.local.schedule([
//       //       { id: 1, title: obj.title, text: obj.pesan },
//       //       { id: 2, title: obj.title, text: obj.pesan },
//       //     ]);
//       //   } else if (data.length == 1 && obj.status == 0) {
//       //     cordova.plugins.notification.local.schedule([
//       //       { id: 1, title: obj.title, text: obj.pesan },
//       //     ]);
//       //   }
//       // }
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//       if (jqXHR.readyState == 0) {
//         console.log(
//           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
//         );
//         navigator.notification.alert(
//           "Koneksi offline.",
//           alertDismissed,
//           TITLE_ALERT,
//           "Ok"
//         );
//       } else {
//         SpinnerDialog.hide();
//         if (textStatus == "timeout") {
//           navigator.notification.alert(
//             "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
//             alertDismissed,
//             TITLE_ALERT,
//             "Ok"
//           );
//         }
//       }
//     });
// }

// function notifVoucher() {
//   $.ajax({
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader(
//         "Authorization",
//         "Bearer " + window.localStorage.getItem("access_token")
//       );
//     },

//     type: "POST",
//     url: conn + "/cek-voucher-user",
//     dataType: "json",
//     timeout: timeout,
//   })
//     .done(function (values) {
//       // console.log(values);
//       if (values.status == "error" || values.status == "failed") {
//         navigator.notification.alert(
//           "Anda belum mendapatkan Voucher!",
//           alertDismissed,
//           TITLE_ALERT,
//           "Ok"
//         );
//       } else {
//         var data = values.voucher;

//         for (var i = 0; i < data.length; i++) {
//           var obj = data[i];

//           if (obj.status_voucher == "Tersedia")
//             if (obj.day_before_expired == 3) {
//               navigator.notification.alert(
//                 "Hai voucher " +
//                   obj.type +
//                   " anda akan segera expired di tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 alertDismissed,
//                 TITLE_ALERT,
//                 "Ok"
//               );
//               cordova.plugins.notification.local.schedule({
//                 title: "Voucher Expired!!",
//                 text:
//                   "Hai, voucher " +
//                   obj.type +
//                   " anda akan segera expired pada tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 foreground: true,
//               });
//             } else if (obj.day_before_expired == 2) {
//               navigator.notification.alert(
//                 "Hai voucher " +
//                   obj.type +
//                   " anda akan segera expired di tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 alertDismissed,
//                 TITLE_ALERT,
//                 "Ok"
//               );
//               cordova.plugins.notification.local.schedule({
//                 title: "Voucher Expired!!",
//                 text:
//                   "Hai, voucher " +
//                   obj.type +
//                   " anda akan segera expired pada tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 foreground: true,
//               });
//             } else if (obj.day_before_expired == 1) {
//               navigator.notification.alert(
//                 "Hai voucher " +
//                   obj.type +
//                   " anda akan segera expired di tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 alertDismissed,
//                 TITLE_ALERT,
//                 "Ok"
//               );
//               cordova.plugins.notification.local.schedule({
//                 title: "Voucher Expired!!",
//                 text:
//                   "Hai, voucher " +
//                   obj.type +
//                   " anda akan segera expired pada tanggal " +
//                   obj.expired_date +
//                   " Ayo segera gunakan di site Mobil terdekat",
//                 foreground: true,
//               });
//             }
//         }
//       }
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//       if (jqXHR.readyState == 0) {
//         console.log(
//           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
//         );
//         navigator.notification.alert(
//           "Koneksi offline.",
//           alertDismissed,
//           TITLE_ALERT,
//           "Ok"
//         );
//       } else {
//         SpinnerDialog.hide();
//         if (textStatus == "timeout") {
//           navigator.notification.alert(
//             "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
//             alertDismissed,
//             TITLE_ALERT,
//             "Ok"
//           );
//         }
//       }
//     });
// }

function updateVersion() {
  var data = {
    version: versionDevice,
  };

  console.log(data);
  $.ajax({
    type: "POST",
    url: conn + "/check-version",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
      // console.log("Version : ", window.localStorage.getItem("versionDevice"));
      if (values.status == "success") {
        // $("#message").append(values.message);

        $(".modal-update-apps").modal("show");
        $(".icon-close-voucherconfirm").click(() => {
          $(".modal-update-apps").modal("hide");
        });

        $("#btn-update").click(() => {
          cordova.plugins.market.open("com.nadyne.MobilIndostation");
        });
      } else {
        $(".modal-update-apps").modal("hide");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);

      if (jqXHR.responseJSON.message == "Service Unavailable") {
        $(".modal-maintenance").modal("show");

        $("#btn-modal-close").click(function () {
          navigator.app.exitApp();
        });
      }

      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}

// function OneSignalInit() {
//   //28b62ea9-2eb1-489e-bbe8-c18bdff1b7f4 app id nadyne
//   //0b5f9921-46b2-431f-8a11-4c80e752eb81 app id indostation

//   window.plugins.OneSignal.setAppId("28b62ea9-2eb1-489e-bbe8-c18bdff1b7f4");

//   window.plugins.OneSignal.setNotificationOpenedHandler(function (jsonData) {
//     console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
//   });

//   window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function (
//     accepted
//   ) {
//     console.log("User accepted notifications: " + accepted);
//   });

//   window.plugins.OneSignal.getDeviceState((state) => {
//     console.log("Player id : " + state.userId);
//     window.localStorage.setItem("player_id", state.userId);
//   });
// }

function deviceUserRegister() {
  var data = {
    os_player_id: window.localStorage.getItem("player_id"),
    device_type: window.localStorage.getItem("model_device"),
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },

    type: "POST",
    url: conn + "/user-device/register",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
      if (values.status == "success") {
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);

      if (jqXHR.responseJSON.message == "Service Unavailable") {
        $(".modal-maintenance").modal("show");

        $("#btn-modal-close").click(function () {
          navigator.app.exitApp();
        });
      }

      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}


function modalGetVoucher(type) {
  $(document).ready(function () {
    if (type == "voucher") {
      $(".v1").modal("show");

      $("#icon-close-1").click(function () {
        $(".v1").modal("hide");
      });
    }
  });
}

function cekMaintenance() {
  $(document).ready(function () {
    data = {
      name: "maintenance",
    };

    $.ajax({
      type: "POST",
      url: conn + "/setting",
      dataType: "json",
      data: data,
      timeout: timeout,
    })
      .done(function (values) {
        // console.log("status maintenance", values.message);

        if (values.message == "true") {
          $(".modal-maintenance").modal("show");

          $("#btn-modal-close").click(function () {
            navigator.app.exitApp();
          });
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        console.log("status : ", jqXHR.responseJSON.message);

        if (jqXHR.responseJSON.message == "Service Unavailable") {
          $(".modal-maintenance").modal("show");

          $("#btn-modal-close").click(function () {
            navigator.app.exitApp();
          });
        }
        if (jqXHR.readyState == 0) {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          navigator.notification.alert(
            "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else {
          SpinnerDialog.hide();
          if (textStatus == "timeout") {
            navigator.notification.alert(
              "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          }
        }
      });
  });
}

function modalStruk() {
  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },

    type: "POST",
    url: conn + "/get-popup-voucher",
    dataType: "json",
    timeout: timeout,
  })
    .done(function (values) {
      // console.log(values);
      if (values.status == "success") {
        if (values.status_popup == 1) {
          $(".v1").modal("show");
          if ($(".v1").modal("show")) {
            updateStatusStruk();
          }

          $("#icon-close-1").click(function () {
            updateStatusStruk();
            $(".v1").modal("hide");
          });
        } else if (values.status_popup == 0) {
          $(".v1").modal("hide");
        } else {
          $(".v1").modal("hide");
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);

      if (jqXHR.responseJSON.message == "Service Unavailable") {
        $(".modal-maintenance").modal("show");

        $("#btn-modal-close").click(function () {
          navigator.app.exitApp();
        });
      }

      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}

function updateStatusStruk() {
  var data = {
    popup_voucher: 0,
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },

    type: "POST",
    url: conn + "/update-popup-voucher",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);

      if (jqXHR.responseJSON.message == "Service Unavailable") {
        $(".modal-maintenance").modal("show");

        $("#btn-modal-close").click(function () {
          navigator.app.exitApp();
        });
      }

      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}
