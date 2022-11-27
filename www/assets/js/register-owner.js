var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");

$(document).ready(function () {
  $(".select2-basic").select2();
  $("#formRegisterOwnerProvinsi").on("select2:select", function (e) {
    var data = e.params.data;
    console.log(data.id);

    $.ajax({
      type: "GET",
      url: conn + "/kota/" + data.id,
      dataType: "json",
      timeout: timeout,
    })
      .done(function (values) {
        if (values.status == "failed" || values.status == "errors") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "success") {
          console.log(values);
          var list_kota = values.data;
          var option_list = "";
          for (var i = 0; i < list_kota.length; i++) {
            option_list +=
              "<option value='" +
              list_kota[i].id +
              "'>" +
              list_kota[i].name +
              "</option> \n";
          }

          //console.log(option_list);
          var jml_option = $("#formRegisterOwnerKota option").length;

          if (jml_option > 1) {
            $("#formRegisterOwnerKota").html(option_list).trigger("change");
          } else {
            $("#formRegisterOwnerKota").append(option_list).trigger("change");
          }
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
  });
});

function submitRegisterOwner() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      store_name: $("#formRegisterOwnerStoreName").val(),
      name: $("#formRegisterOwnerName").val(),
      no_hp: $("#formRegisterOwnerNoHp").val(),
      provinsi_id: $("#formRegisterOwnerProvinsi").val(),
      kota_id: $("#formRegisterOwnerKota").val(),
      address: $("#formRegisterOwnerAddress").val(),
      email: $("#formRegisterOwnerEmail").val(),
      password: $("#formRegisterOwnerPassword").val(),
      password_confirmation: $("#formRegisterOwnerPasswordConfirmation").val(),
      ewallet: $("#formRegisterOwnerEwallet").val(),
      ewallet_image: $("#foto_text_ewallet").val(),
    };

    $.ajax({
      type: "POST",
      url: conn + "/register",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        SpinnerDialog.hide();
        if (values.status == "failed" || values.status == "errors") {
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
              "Request Time Out - Cek koneksi internet Anda",
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
