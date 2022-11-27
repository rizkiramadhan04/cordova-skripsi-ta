var firstCon = firstConnection();

function requestOTPProfileEdit() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
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
        type: "profile_edit",
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
          // $('#otpModalCenter').modal('show');
          pages("otp-edit-profile");
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
    //SpinnerDialog.hide();
    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}

function submitOTPProfileEdit() {
  event.preventDefault();
  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");

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
        SpinnerDialog.hide();

        console.log(values);
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
          // $("#otpModalCenter").modal("hide");
          submitEditProfile();
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
        SpinnerDialog.hide();

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
    SpinnerDialog.hide();

    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}

function submitEditProfile() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      old_password: window.localStorage.getItem("old_password"),
      new_password: window.localStorage.getItem("new_password"),
      // new_password_confirmation: $('#formRegisterPasswordConfirmation').val(),
    };

    // console.log("Data : " + $("#formRegisterOldPassword").val());
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.getItem("access_token")
        );
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/update-profile",
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
          //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
          window.localStorage.removeItem("old_password");
          window.localStorage.removeItem("new_password");
          navigator.notification.alert(
            "Sukses ubah kata sandi.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          pages("profil");
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

function cekPasswordLama() {
  event.preventDefault();
  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      old_password: $("#formRegisterOldPassword").val(),
      new_password: $("#formRegisterPassword").val(),
      new_password_confirmation: $("#formRegisterPasswordConfirmation").val(),
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
      url: conn + "/cek-password",
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
          console.log("Data : " + values);
          //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
          window.localStorage.setItem(
            "old_password",
            $("#formRegisterOldPassword").val()
          );
          window.localStorage.setItem(
            "new_password",
            $("#formRegisterPassword").val()
          );
          requestOTPProfileEdit();
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
