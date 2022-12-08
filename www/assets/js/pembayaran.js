$(document).ready(function () {
  checkIsLoggedIn().done(function (values) {
    if (values.status_login == false) {
      pages("login");
    }
  });

  $("#formuploadPembayaran").submit(function (e) {
    e.preventDefault();
  });
  $("#formCekPembayaran").submit(function (e) {
    e.preventDefault();
  });
  $("#formInputStruk").submit(function (e) {
    e.preventDefault();
  });

  var type_pembayaran = window.localStorage.getItem("status_pembayaran");

  if (type_pembayaran == "1") {
    $("#img-ceklis-all").css("display", "none");
    $("#img-ceklis-agenda").css("display", "none");
    $("#img-ceklis-bulanan").css("display", "inline");
  } else if (type_pembayaran == "0") {
    $("#img-ceklis-all").css("display", "none");
    $("#img-ceklis-agenda").css("display", "inline");
    $("#img-ceklis-bulanan").css("display", "none");
  } else {
    $("#img-ceklis-all").css("display", "inline");
    $("#img-ceklis-agenda").css("display", "none");
    $("#img-ceklis-bulanan").css("display", "none");
  }
});

function cekStruk() {
  SpinnerDialog.show(null, "Pengecekan pembayaran ...");
  var foto_struk = $("#foto_text_pembayaran").val();
  var user_id = window.localStorage.getItem("userID");

  data = {
    user_id: user_id,
    file_receipt: foto_struk,
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
    url: conn + "/check-receipt",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);

      if (values.site_no != "" && values.nota_no != "") {
        $("#containerButtonCekPembayaran").hide();
        $("#containerButtonUploadPembayaran").show();
        $("#resultCheckPembayaran").show();
        $("#tableResultSuccessReadReceipt").show();
        $("#tableResultFailedReadReceipt").hide();
        $("#siteIdCheckReceipt").text(values.site_no);
        $("#receiptNumberCheckReceipt").text(values.nota_no);
        $("#receiptTimeCheckReceipt").text(values.date_time);
        $("#receiptTotalCheckReceipt").text("Rp. " + values.total);

        $("#formuploadPembayaranFileReceipt").val(foto_struk);
        $("#formuploadPembayaranUserId").val(user_id);
        $("#formuploadPembayaranSiteId").val(values.site_no);
        $("#formuploadPembayaranReceiptNumber").val(values.nota_no);
        $("#formuploadPembayaranPurchaseDate").val(values.date_time);
        $("#formuploadPembayaranAmount").val(values.total);
      } else {
        $("#containerButtonCekPembayaran").hide();
        $("#resultCheckPembayaran").hide();
        $("#containerButtonUlangiCekPembayaran").show();
        $("#resultCheckPembayaran").show();
        $("#tableResultSuccessReadReceipt").hide();
        $("#tableResultFailedReadReceipt")
          .show()
          .text(
            "Mohon maaf. Struk tidak terbaca dengan baik, silakan ulangi lagi."
          );
      }

      if (values.status == "failed") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );

        pages("foto-struk");
      }

      // if (
      //   values.status == "failed" &&
      //   values.message ==
      //     "Anda sudah 3 kali melakukan pengecekan struk, silahkan coba kembali di jam berikutnya"
      // ) {
      //   navigator.notification.alert(
      //     values.message,
      //     alertDismissed,
      //     TITLE_ALERT,
      //     "Ok"
      //   );

      //   pages("foto-struk");
      // } else {
      //   navigator.notification.alert(
      //     values.message,
      //     alertDismissed,
      //     TITLE_ALERT,
      //     "Ok"
      //   );

      //   $("#containerButtonCekPembayaran").hide();
      //   $("#resultCheckPembayaran").hide();
      //   $("#containerButtonUlangiCekPembayaran").hide();
      //   $("#resultCheckPembayaran").hide();
      //   $("#tableResultSuccessReadReceipt").hide();
      //   $("#tableResultFailedReadReceipt")
      //     .show()
      //     .text(
      //       "Mohon maaf. Struk tidak terbaca dengan baik, silakan ulangi lagi."
      //     );
      // }

      SpinnerDialog.hide();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        //Network error (i.e. connection refused, access denied due to CORS, etc.)
        navigator.notification.alert(
          "Koneksi offline - Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        status_sync = "0";

        SpinnerDialog.show(null, "Cek struk ...");
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

      //$('#profile-form-button').prop('disabled', false);
    });
}

function uploadPembayaran() {
  SpinnerDialog.show(null, "Mengupload data struk ...");

  var user_id = window.localStorage.getItem("userID");

  data = {
    file_receipt: $("#formuploadPembayaranFileReceipt").val(),
    user_id: user_id,
    site_no: $("#formuploadPembayaranSiteId").val(),
    receipt_no: $("#formuploadPembayaranReceiptNumber").val(),
    purchase_date: $("#formuploadPembayaranPurchaseDate").val(),
    amount: $("#formuploadPembayaranAmount").val(),
    type: "apps-ocr",
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
    url: conn + "/upload-receipt",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      console.log(values);
      SpinnerDialog.hide();

      if (values.status == "success") {
        navigator.notification.alert(
          "Selamat! Proses upload struk berhasil.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );

        if (values.status_receipt == "valid" && values.type == "voucher") {
          var type = values.type;
          modalGetVoucher(type);
        }

        // pages("dashboard");
        // if (values.type == "voucher") {
        //   $(".v1").modal("show");

        //   $("#icon-close-1").click(function () {
        //     $(".v1").modal("hide");
        //   });
        // }

        window.localStorage.removeItem("jenis_kupon");
        window.localStorage.setItem("jenis_kupon", values.coupon_type);
        // pages("dashboard");
      } else {
        // navigator.notification.alert('Mohon maaf. Proses upload struk gagal.', alertDismissed, TITLE_ALERT, 'Ok');
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        pages("foto-struk");
      }

      pages("foto-struk");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      SpinnerDialog.hide();
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        //Network error (i.e. connection refused, access denied due to CORS, etc.)
        navigator.notification.alert(
          "Koneksi offline - Silahkan hubungi Call Center : Kode #DB-001",
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
}

function submitManualStruk() {
  SpinnerDialog.show(null, "Mengupload data struk ...");

  var user_id = window.localStorage.getItem("userID");

  data = {
    file_receipt: "dummy-text-lorem-ipsum-manual-receipt",
    user_id: user_id,
    site_no: $("#formInputStrukSiteId").val(),
    receipt_no: $("#formInputStrukReceiptNumber").val(),
    purchase_date: $("#formInputStrukPurchaseDate").val(),
    amount: $("#formInputStrukAmount").val(),
    type: "apps-manual-input",
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
    url: conn + "/upload-receipt",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      SpinnerDialog.hide();
      console.log(values);
      if (values.status == "success") {
        navigator.notification.alert(
          "Selamat! Proses upload struk berhasil.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );

        if (values.status_receipt == "valid" && values.type == "voucher") {
          var type = values.type;
          modalGetVoucher(type);
        }

        // pages("dashboard");

        window.localStorage.removeItem("jenis_kupon");
        window.localStorage.setItem("jenis_kupon", values.coupon_type);
      } else {
        // navigator.notification.alert('Mohon maaf. Proses upload struk gagal.', alertDismissed, TITLE_ALERT, 'Ok');
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }

      pages("foto-struk");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      SpinnerDialog.hide();
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        //Network error (i.e. connection refused, access denied due to CORS, etc.)
        navigator.notification.alert(
          "Koneksi offline - Silahkan hubungi Call Center : Kode #DB-001",
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
}

function revealFormStruk() {
  $("#resultCheckPembayaran").hide();
  $("#foto_text_pembayaran").val("");
  $("#containerFormStruk").show();
  $("#containerUploadPembayaran").hide();
}

function ulangiSubmitPembayaran() {
  $("#foto_text_pembayaran").val("");
  $("#real_foto_pembayaran").hide();
  $("#resultCheckPembayaran").hide();
  $("#containerButtonCekPembayaran").show();
  $("#containerButtonUploadPembayaran").hide();
  $("#containerButtonUlangiCekPembayaran").hide();
  $("#containerFormStruk").hide();

  pages("foto-struk");
}

// function notifStruk() {
//   cordova.plugins.notification.local.schedule({
//     title: "Selamat!",
//     text: "Anda telah berhasil mengupload struk!",
//     foreground: true,
//   });
// }
