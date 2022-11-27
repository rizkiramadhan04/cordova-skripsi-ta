var versionDevice = window.localStorage.getItem("versi_app");
var latitude = window.localStorage.getItem("latitude");
var longitude = window.localStorage.getItem("longitude");
var player_id = window.localStorage.getItem("player_id");
var pop_up_geoloc = window.localStorage.getItem("pop_up_geoloc");

$(document).ready(function () {
  $(".appBottomMenu").css("display", "none");
  $("#versi_app_form_login").text(versionDevice);

  // show hide password
  $("#showPassword").click(function () {
    if ($("#showPassword").is(":checked")) {
      $("#passwordFormLogin").attr("type", "text");
      console.log("Ubah text");
    } else {
      $("#passwordFormLogin").attr("type", "password");
    }
  });
});

var firstCon = firstConnection();

if (firstCon == "offline") {
  navigator.notification.alert(
    "Koneksi Offline", // message
    alertDismissed, // callback
    TITLE_ALERT, // title
    "Ok" // buttonName
  );
} else {
  // console.log("Latitude : ", window.localStorage.getItem("latitude"));
  // console.log("Longitude : ", window.localStorage.getItem("longitude"));

  if (player_id == "undefined") {
    OneSignalInit();
  }

  if (
    latitude == null ||
    (latitude == 0 && longitude == null) ||
    longitude == 0
  ) {
    if (pop_up_geoloc) {
      if (pop_up_geoloc == 0) {
        function onConfirm(buttonIndex) {
          // console.log(buttonIndex);
          if (buttonIndex == 1) {
            window.localStorage.setItem("pop_up_geoloc", 1);
            document.addEventListener(getLocation());
          }
        }

        navigator.notification.confirm(
          "Pastikan lokasi anda menyala & izinkan akses lokasi anda!", // message
          onConfirm, // callback to invoke with index of button pressed
          TITLE_ALERT, // title
          ["Oke"] // buttonLabels
        );
      } else {
        document.addEventListener(getLocation());
      }
    } else {
      function onConfirm(buttonIndex) {
        // console.log(buttonIndex);
        if (buttonIndex == 1) {
          window.localStorage.setItem("pop_up_geoloc", 1);
          document.addEventListener(getLocation());
        }
      }

      navigator.notification.confirm(
        "Pastikan lokasi anda menyala & izinkan akses lokasi anda!, sebelum melakukan Login", // message
        onConfirm, // callback to invoke with index of button pressed
        TITLE_ALERT, // title
        ["Oke"] // buttonLabels
      );
    }
  }
}

document.addEventListener("offline", onOfflineLogin, false);
document.addEventListener("online", onOnlineLogin, false);

function onOfflineLogin() {}

function onOnlineLogin() {}
