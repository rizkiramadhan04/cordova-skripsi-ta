var firstCon = firstConnection();
var store_name = window.localStorage.getItem("store_name");
var store_email = window.localStorage.getItem("email");
var store_no_hp = window.localStorage.getItem("no_hp");
store_name = store_name.capitalize();
window.localStorage.removeItem("id_edit_frontliner");

$(document).ready(function () {
  $(".store-name").text(store_name);
  $(".store-email").text(store_email);
  $(".store-no-hp").text(store_no_hp);
});

if (firstCon == "online") {
} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
