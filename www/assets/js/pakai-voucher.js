$(document).ready(function () {
  // checkIsLoggedIn().done(function(values) {
  //     if (values.status_login == false) {
  //         pages('login');
  //     }
  // });
  // $("#exampleModalCenterVoucher").modal("show");
  // $(".btn-lihat-voucherconfirm").click(function(e) {
  //     e.preventDefault();
  //     $("#exampleModalCenterVoucherConfirm").modal("hide");
  //     uploadStrukVoucher();
  // });

  $(".icon-close-voucher").click(function () {
    window.localStorage.removeItem("voucher");
    window.localStorage.removeItem("no_site");
    $("#exampleModalCenterVoucher").modal("hide");
    pages("dashboard");
  });

  $(".icon-close-voucherconfirm").click(function () {
    $("#exampleModalCenterVoucherConfirm").modal("hide");
  });

  $(".icon-close-vouchermanual").click(function () {
    $("#exampleModalCenterVoucherManual").modal("hide");
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
// var voucher = window.localStorage.getItem('voucher');
// console.log('voucher kamu:' +voucher);

function cekStruk() {
  SpinnerDialog.show(null, "Pengecekan struk ...");
  var foto_struk = $("#foto_text_struk").val();
  var user_id = window.localStorage.getItem("userID");
  console.log(foto_struk);

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
      console.log(values);
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
        window.localStorage.setItem("no_site", values.site_no);
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

function ulangiSubmitStruk() {
  $("#foto_text_struk").val("");
  $("#real_foto_struk").hide();
  $("#resultCheckStruk").hide();
  $("#containerButtonCekStruk").show();
  $("#containerButtonUploadStruk").hide();
  $("#containerButtonUlangiCekStruk").hide();
  $("#containerFormStruk").hide();

  pages("pakai-voucher");
}

function uploadStrukVoucher() {
  SpinnerDialog.show(null, "Mengupload data struk ...");

  var user_id = window.localStorage.getItem("userID");
  var voucher = window.localStorage.getItem("voucher");
  var file_receipt = $("#formUploadStrukFileReceipt").val();
  var site_no = $("#formUploadStrukSiteId").val();
  var receipt_no = $("#formUploadStrukReceiptNumber").val();
  var purchase_date = $("#formUploadStrukPurchaseDate").val();

  console.log(user_id + "," + "," + voucher + "," + site_no + "," + receipt_no);

  data = {
    voucher: voucher,
    file_receipt: $("#formUploadStrukFileReceipt").val(),
    user_id: user_id,
    site_no: $("#formUploadStrukSiteId").val(),
    receipt_no: $("#formUploadStrukReceiptNumber").val(),
    purchase_date: $("#formUploadStrukPurchaseDate").val(),
    amount: $("#formUploadStrukAmount").val(),
    type: "apps-ocr-voucher",
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
    url: conn + "/upload-receipt-voucher",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      SpinnerDialog.hide();
      if (values.status == "success") {
        // navigator.notification.alert('Selamat! Proses upload struk berhasil.', alertDismissed, TITLE_ALERT, 'Ok');
        $("#exampleModalCenterVoucher").modal("show");
      } else {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }

      // pages('pakai-voucher');
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

function confirmUpload() {
  var no_site = window.localStorage.getItem("no_site");
  $("#number-site-vcr").html(no_site);
  $("#exampleModalCenterVoucherConfirm").modal("show");
}

function confirmVoucher() {
  $("#exampleModalCenterVoucherConfirm").modal("hide");
  uploadStrukVoucher();
}

function revealFormStruk() {
  $("#resultCheckStruk").hide();
  $("#foto_text_struk").val("");
  $("#containerFormStruk").show();
  $("#containerUploadStruk").hide();
}

function submitManualVoucher() {
  SpinnerDialog.show(null, "Proses...");

  var user_id = window.localStorage.getItem("userID");
  var voucher = window.localStorage.getItem("voucher");

  data = {
    voucher: voucher,
    // file_receipt    :'',
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
    url: conn + "/upload-receipt-voucher",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      SpinnerDialog.hide();
      if (values.status == "success") {
        // navigator.notification.alert('Selamat! Proses upload struk berhasil.', alertDismissed, TITLE_ALERT, 'Ok');
        $("#exampleModalCenterVoucher").modal("show");
      } else {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }

      // pages('pakai-voucher');
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      SpinnerDialog.hide();
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        //Network error (i.e. connection refused, access denied due to CORS, etc.)
        navigator.notification.alert(
          "Koneksi offline - Silahkan hubungi Call Center : Kode #DB-001 Silahkan hubungi Call Center : Kode #DB-001",
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

function confirmVoucherManual() {
  $("#exampleModalCenterVoucherManual").modal("hide");
  submitManualVoucher();
}

function confirmManual() {
  var site = $("#formInputStrukSiteId").val();
  $("#number-site-manual").html(site);
  // window.localStorage.setItem('no_site', values.site_no);
  $("#exampleModalCenterVoucherManual").modal("show");
}
