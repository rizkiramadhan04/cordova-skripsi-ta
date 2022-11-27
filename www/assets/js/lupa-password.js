$(".icon-close-fgtpassword").click(function () {
  $("#exampleModalFgtPassword").modal("hide");
});

// $("#exampleModalFgtPassword").modal("show");
function SubmitFgt() {
  event.preventDefault();
  var firstCon = firstConnection();
  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");

    var email = $("#EmailFgtPwd").val();

    // navigator.notification.alert(email, alertDismissed, TITLE_ALERT, 'Ok');
    // SpinnerDialog.hide();
    data = {
      email: email,
    };

    $.ajax({
      type: "POST",
      url: conn + "/forgot-password",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        if (values.status == "error") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          SpinnerDialog.hide();
          console.log("format email salah");
        } else if (values.status == "success") {
          $("#pesanpwd1").html(
            "Tautan untuk berubah Kata Sandi baru telah dikirimkan ke Email Anda"
          );
          $("#pesanpwd2").html(
            "Silahkan cek kotak masuk di email anda untuk melanjutkan proses ubah Kata Sandi yang baru"
          );
          $("#btn-fgt-pwd").append(
            '<div style="display:none;">' +
              '<a href="javascript:;" style="color:white;">Daftar</a>' +
              "</div>"
          );
          $("#btn-fgt-pwd").hide();
          $("#exampleModalFgtPassword").modal("show");
          $("#EmailFgtPwd").val("");
          SpinnerDialog.hide();
        } else if (values.status == "failed") {
          $("#pesanpwd1").html(
            "Alamat Email yang anda masukan tidak dapat ditemukan"
          );
          $("#pesanpwd2").html("Silahkan daftarkan diri anda terlebih dahulu");
          $("#btn-fgt-pwd").append(
            "<div>" +
              '<a href="javascript:;" style="color:white;" onclick="PageRegister()">Daftar</a>' +
              "</div>"
          );
          $("#exampleModalFgtPassword").modal("show");
          $("#EmailFgtPwd").val("");
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
            "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else {
          SpinnerDialog.hide();
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
