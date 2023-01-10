//====================================================
//  Variable Global
//====================================================

var isProduction = 0;
var versionDevice = "1.0.0";
var versionDeviceLocal = "1.0.0";
var versionServer, TITLE_ALERT;
var checkVersion = false;
var statusLoginOnline = true;
var close_load_init = 0;
var myDB = "";

if (isProduction == 0) {
  TITLE_ALERT = "TPA Al Muhibbin App";
} else {
  TITLE_ALERT = "TPA Al Muhibbin App";
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

var server_url = "https://tpa-almuhibbin.com/public";
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
  var section_page_of = window.localStorage.getItem("section_page_of");

  console.log(current_page);
  if (current_page == "dashboard" && "dashboard-guru") {
    navigator.app.exitApp();
  } else {
    if (section_page_of == "Guru") {
      pages("dashboard-guru");
    } else {
      pages("dashboard");
    }
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

  // console.log(versionDevice);
  window.localStorage.setItem("versionDevice", versionDevice);
  window.localStorage.removeItem("province_id");
  window.localStorage.removeItem("countvcr");
  checkLogin();
} //end onDeviceReady

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
    url: conn + "/check-user-login",
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

    case "dashboard-guru":
      window.localStorage.setItem("current_page", "dashboard-guru");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuDashboardGuru").addClass("active");

      target_main.load("contents/dashboard-guru.html");
      profilHeader();
      break;

    case "login":
      window.localStorage.setItem("current_page", "login");
      target_main.load("contents/login.html");
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

    case "profil":
      window.localStorage.setItem("current_page", "profil");
      target_main.load("contents/profil.html");
      break;

    case "profil-edit":
      window.localStorage.setItem("current_page", "profil-edit");
      target_main.load("contents/profil-edit.html");
      break;

    case "mengaji":
      window.localStorage.setItem("current_page", "mengaji");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuMengaji").addClass("active");

      target_main.load("contents/mengaji.html");
      break;

    case "hafalan":
      window.localStorage.setItem("current_page", "hafalan");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuHafalan").addClass("active");

      target_main.load("contents/hafalan.html");
      break;

    case "mengaji-guru":
      window.localStorage.setItem("current_page", "mengaji");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuMengajiGuru").addClass("active");

      target_main.load("contents/mengaji-guru.html");
      break;

    case "hafalan-guru":
      window.localStorage.setItem("current_page", "hafalan");
      $(".appBottomMenu").find("a").removeClass("active");
      $("#linkBottomMenuHafalanGuru").addClass("active");

      target_main.load("contents/hafalan-guru.html");
      break;

    case "edit-pencatatan":
      window.localStorage.setItem("current_page", "edit-pencatatan");

      target_main.load("contents/edit-pencatatan.html");
      break;

    case "edit-hafalan":
      window.localStorage.setItem("current_page", "edit-hafalan");

      target_main.load("contents/edit-hafalan.html");
      break;

    case "slider-agenda-detail":
      window.localStorage.setItem("current_page", "slider-agenda-detail");
      target_main.load("contents/slider-agenda-detail.html");
      break;

    case "edit-user":
      window.localStorage.setItem("current_page", "edit-user");
      target_main.load("contents/edit-user.html");
      break;

    case "list-pembayaran":
      window.localStorage.setItem("current_page", "list-pembayaran");
      target_main.load("contents/list-pembayaran.html");
      break;

    case "list-presensi":
      window.localStorage.setItem("current_page", "list-presensi");
      target_main.load("contents/list-presensi.html");
      break;

    case "list-pencatatan":
      window.localStorage.setItem("current_page", "list-pencatatan");
      target_main.load("contents/list-pencatatan.html");
      break;

    case "list-hafalan":
      window.localStorage.setItem("current_page", "list-hafalan");
      target_main.load("contents/list-hafalan.html");
      break;

    case "input-izin":
      window.localStorage.setItem("current_page", "input-izin");
      target_main.load("contents/input-izin.html");
      break;

    default:
      window.localStorage.setItem("current_page", "login");
      target_main.load("contents/login.html");
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

  var identity = $("#usernameFormLogin").val();
  var password = $("#passwordFormLogin").val();

  if (identity == "" && password == "") {
    navigator.notification.alert(
      "Email dan password belum diisi",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
    //loading('close');
    SpinnerDialog.hide();
  } else {
    data = {
      email: identity,
      password: password,
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
        if (values.success == "error") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
        } else if (values.success == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
          $("#usernameFormLogin").val(identity);
        } else if (values.success == "success") {
          console.log("status user:" + values.user_status);
          window.localStorage.setItem("status_user", values.user_status);
          if (values.user_status == "Guru") {
            pages("dashboard-guru");
            window.localStorage.setItem("section_page_of", values.user_status);
          } else {
            pages("dashboard");
            window.localStorage.setItem("section_page_of", values.user_status);
          }

          window.localStorage.removeItem("status_presensi");
          window.localStorage.setItem("status_presensi", "all");

          window.localStorage.setItem("userID", values.user.id);
          NativeStorage.setItem(
            "userID",
            values.user.id,
            function () {},
            function () {}
          );
          window.localStorage.setItem(
            "name",
            values.user.name,
            function () {},
            function () {}
          );
          NativeStorage.setItem("name", values.name, function () {});
          window.localStorage.setItem("email", values.user.email);
          NativeStorage.setItem(
            "email",
            values.email,
            function () {},
            function () {}
          );
          window.localStorage.setItem("no_hp", values.user.no_hp);
          window.localStorage.setItem("access_token", values.token);
          NativeStorage.setItem(
            "access_token",
            values.token,
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
          }

          //loading('show');
          SpinnerDialog.hide();

          window.localStorage.setItem("status_login", "1");
        }

        window.localStorage.setItem("status_struk", "all");
        //loading('close');
        SpinnerDialog.hide();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        var contentType = jqXHR.getResponseHeader("Content-Type");

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

        window.localStorage.setItem("status_login", 0);

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
        window.localStorage.removeItem("model_device");
        window.localStorage.removeItem("nama_device");
        window.localStorage.removeItem("current_page");
        window.localStorage.removeItem("register_user_id_sess");
        window.localStorage.removeItem("status_presensi");
        window.localStorage.removeItem("status_user");

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

        pages("login");
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
  pages("login");
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

function clickPresensi(id) {
  window.localStorage.removeItem("status_presensi");
  window.localStorage.setItem("status_presensi", id);

  pages("list-presensi");
}

function clickPresensiIzin(id) {
  window.localStorage.removeItem("status_presensi");
  window.localStorage.setItem("status_presensi", id);

  pages("list-presensi");
}

function clickPresensiAll(id) {
  window.localStorage.removeItem("status_presensi");
  window.localStorage.setItem("status_presensi", id);

  pages("list-presensi");
}

function clickPembayaranA(id) {
  window.localStorage.removeItem("status_pembayaran");
  window.localStorage.setItem("status_pembayaran", id);

  pages("list-pembayaran");
}

function clickPembayaranB(id) {
  window.localStorage.removeItem("status_pembayaran");
  window.localStorage.setItem("status_pembayaran", id);

  pages("list-pembayaran");
}

function clickPembayaranAll(id) {
  window.localStorage.removeItem("status_pembayaran");
  window.localStorage.setItem("status_pembayaran", id);

  pages("list-pembayaran");
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
      url: conn + "/get-data",
      dataType: "json",
      timeout: timeout,
    })
      .done(function (values) {
        if (values.status == "success") {
          var foto = "assets/img/sample/avatar/icon-user.png";

          $("#profileHeader").attr("src", foto);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);

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

function checkLogin() {
  var status_login = window.localStorage.getItem("status_login");
  var section_page_of = window.localStorage.getItem("section_page_of");

  // console.log(section_page_of);

  if (status_login == 1) {
    if (section_page_of == "Guru") {
      pages("dasboard-guru");
    } else {
      pages("dashboard");
    }
  } else {
    pages("login");
  }
}
