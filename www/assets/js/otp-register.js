var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");

$(document).ready(function () {
  $(".appBottomMenu").css("display", "none");

  //register device to OneSignal
  deviceUserRegister();
  //register device to OneSignal
});

function submitOTPRegister() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      otp: $("#input_otp_register").val(),
      type: "register",
      user_id: window.localStorage.getItem("register_user_id_sess"),
      email: window.localStorage.getItem("register_email_sess"),
    };
    $.ajax({
      type: "POST",
      url: conn + "/otp/register-check",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        console.log(values);
        SpinnerDialog.hide();
        if (values.status == "errors") {
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
          window.localStorage.removeItem("register_user_id_sess");
          window.localStorage.removeItem("register_email_sess");

          pages("login");
        } else {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
        //loading('close');
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

function resendOtp() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    // data = {
    //   email: window.localStorage.getItem("register_email_sess"),
    // };
    $.ajax({
      type: "POST",
      url: conn + "/otp/register-generate",
      dataType: "json",
      timeout: timeout,
      email: window.localStorage.getItem("register_email_sess"),
    })
      .done(function (values) {
        // console.log(data);
        console.log(values);
        SpinnerDialog.hide();
        if (values.status == "errors") {
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
          window.localStorage.removeItem("register_user_id_sess");
          window.localStorage.removeItem("register_email_sess");

          // $("#link-resend-otp").hide();
        } else {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }

        // $("#link-resend-otp").hide();
        //loading('close');
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

$(document).ready(function () {
  $("#user_id_register").val(
    window.localStorage.getItem("register_user_id_sess")
  );
  $("#email_register").val(window.localStorage.getItem("register_email_sess"));

  $("input:text:visible:first").focus();

  // $(".appBottomMenu").css("display", "none");

  // setInterval(function () {
  //   $("#link-resend-otp").hide();
  // }, 15000);
});
