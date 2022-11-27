$(document).ready(function () {
  checkIsLoggedIn().done(function (values) {
    if (values.status_login == false) {
      pages("login");
    }
  });

  $("#formUploadStruk").submit(function (e) {
    e.preventDefault();
  });
  $("#formCekStruk").submit(function (e) {
    e.preventDefault();
  });
  $("#formInputStruk").submit(function (e) {
    e.preventDefault();
  });
});

function cekStruk() {
  SpinnerDialog.show(null, "Pengecekan struk ...");
  var foto_struk = $("#foto_text_struk").val();
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
        $("#containerButtonCekStruk").hide();
        $("#containerButtonUploadStruk").show();
        $("#resultCheckStruk").show();
        $("#tableResultSuccessReadReceipt").show();
        $("#tableResultFailedReadReceipt").hide();
        $("#siteIdCheckReceipt").text(values.site_no);
        $("#receiptNumberCheckReceipt").text(values.nota_no);
        $("#receiptTimeCheckReceipt").text(values.date_time);
        $("#receiptTotalCheckReceipt").text("Rp. " + values.total);

        $("#formUploadStrukFileReceipt").val(foto_struk);
        $("#formUploadStrukUserId").val(user_id);
        $("#formUploadStrukSiteId").val(values.site_no);
        $("#formUploadStrukReceiptNumber").val(values.nota_no);
        $("#formUploadStrukPurchaseDate").val(values.date_time);
        $("#formUploadStrukAmount").val(values.total);
      } else {
        $("#containerButtonCekStruk").hide();
        $("#resultCheckStruk").hide();
        $("#containerButtonUlangiCekStruk").show();
        $("#resultCheckStruk").show();
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

      //   $("#containerButtonCekStruk").hide();
      //   $("#resultCheckStruk").hide();
      //   $("#containerButtonUlangiCekStruk").hide();
      //   $("#resultCheckStruk").hide();
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

function uploadStruk() {
  SpinnerDialog.show(null, "Mengupload data struk ...");

  var user_id = window.localStorage.getItem("userID");

  data = {
    file_receipt: $("#formUploadStrukFileReceipt").val(),
    user_id: user_id,
    site_no: $("#formUploadStrukSiteId").val(),
    receipt_no: $("#formUploadStrukReceiptNumber").val(),
    purchase_date: $("#formUploadStrukPurchaseDate").val(),
    amount: $("#formUploadStrukAmount").val(),
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
  $("#resultCheckStruk").hide();
  $("#foto_text_struk").val("");
  $("#containerFormStruk").show();
  $("#containerUploadStruk").hide();
}

function ulangiSubmitStruk() {
  $("#foto_text_struk").val("");
  $("#real_foto_struk").hide();
  $("#resultCheckStruk").hide();
  $("#containerButtonCekStruk").show();
  $("#containerButtonUploadStruk").hide();
  $("#containerButtonUlangiCekStruk").hide();
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
