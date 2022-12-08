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
}

document.addEventListener("offline", onOfflineLogin, false);
document.addEventListener("online", onOnlineLogin, false);

function onOfflineLogin() {}

function onOnlineLogin() {}
