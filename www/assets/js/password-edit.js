var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");
var store_id = window.localStorage.getItem("store_id");
var id_frontliner_edit = window.localStorage.getItem("id_edit_frontliner");

$(document).ready(function () {});

function requestOTPPasswordEdit() {
  event.preventDefault();
  var pass_new = $("#formEditPasswordPassword").val();
  var pass_new_confirm = $("#formEditPasswordPasswordConfirmation").val();

  if (firstCon == "online") {
    if (pass_new === pass_new_confirm) {
      //SpinnerDialog.show(null, "Mengirim data ...");
      $.ajax({
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + window.localStorage.getItem("access_token")
          );
          xhr.setRequestHeader("Accept", "application/json");
        },
        type: "POST",
        url: conn + "/otp/request-generate",
        dataType: "json",
        timeout: timeout,
        data: {
          type: "password_edit",
        },
      })
        .done(function (values) {
          //console.log(values);
          SpinnerDialog.hide();
          if (values.status == "errors") {
            navigator.notification.alert(
              values.message,
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          } else if (values.status == "failed") {
            navigator.notification.alert(
              values.message,
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          } else if (values.status == "success") {
            //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
            $("#otpModalCenter").modal("show");
            console.log(values.data);
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
      navigator.notification.alert(
        "Password baru & Password konfirmasi harus sama!",
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    }
  } else {
    //SpinnerDialog.hide();
    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}

function submitOTPPasswordEdit() {
  event.preventDefault();
  if (firstCon == "online") {
    data = {
      otp: $("#input_otp").val(),
      type: $("#otp_type").val(),
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
      url: conn + "/otp/request-check",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        //console.log(values);
        if (values.status == "errors") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "success") {
          console.log("Success verify OTP");
          $("#otpModalCenter").modal("hide");
          submitEditPassword();
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
    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}

function submitEditPassword() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      password: $("#formEditPasswordPassword").val(),
      password_confirmation: $("#formEditPasswordPasswordConfirmation").val(),
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
      url: conn + "/user/update/password",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        SpinnerDialog.hide();
        console.log(values.status);
        if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "errors") {
          navigator.notification.alert(
            values.errors,
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

          pages("settings");
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
