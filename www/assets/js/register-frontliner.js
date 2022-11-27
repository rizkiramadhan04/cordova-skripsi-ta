const { $ } = require("dom7");

var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");

function submitRegisterFrontliner() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      store_name: $("#formRegisterFrontlinerStoreName").val(),
      name: $("#formRegisterFrontlinerName").val(),
      no_hp: $("#formRegisterFrontlinerNoHp").val(),
      address: $("#formRegisterFrontlinerAddress").val(),
      email: $("#formRegisterFrontlinerEmail").val(),
      password: $("#formRegisterFrontlinerPassword").val(),
      password_confirmation: $(
        "#formRegisterFrontlinerPasswordConfirmation"
      ).val(),
      ewallet: $("#formRegisterFrontlinerEwallet").val(),
      ewallet_image: $("#foto_text_ewallet").val(),
      store_id: window.localStorage.getItem("store_id"),
    };

    $.ajax({
      type: "POST",
      url: conn + "/register-frontliner",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        SpinnerDialog.hide();
        if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "success") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          console.log(values.data.user.id);
          console.log(values.data.user.email);
          window.localStorage.setItem(
            "register_user_id_sess",
            values.data.user.id
          );
          window.localStorage.setItem(
            "register_email_sess",
            values.data.user.email
          );
          pages("otp-register");
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        SpinnerDialog.hide();
        if (jqXHR.readyState == 0) {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          navigator.notification.alert(
            "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else {
          if (textStatus == "timeout") {
            navigator.notification.alert(
              "Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          }
        }
      });
  } else {
    SpinnerDialog.hide();
    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}
