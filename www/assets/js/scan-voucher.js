var firstCon = firstConnection();
var voucher = window.localStorage.getItem("voucher");

if (firstCon == "online") {
  data = {
    voucher: window.localStorage.getItem("voucher"),
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
    url: conn + "/cek-voucher-detail-user",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      console.log(values);

      if (values.type == "bensin") {
        $("#batas-claim").html(7);
      } else {
        $("#batas-claim").html(90);
      }

      var date = values.expired_date;
      var dd = date.substring(0, 2);
      var mm = date.substring(3, 5);
      var yyyy = date.substring(6, 10);

      // console.log(dd + "-" + mm + "-" + yyyy);

      var bulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      var bln = bulan[mm - 1];
      var date_x = dd + " " + bln + " " + yyyy;

      // console.log(date_x);

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
        // new QRCode(document.getElementById("qrcode"), values.qr_text);
        new QRCode(document.getElementById("qrcode"), values.voucher_no);
        let status_vcr = "";
        var html_text_min_beli = "";
        if (values.status_claimed == 0) {
          $(".btn-pakai-voucher").css("display", "block");
          status_vcr += '<span class="status-claimed claimed">Tersedia</span>';
        } else {
          $(".btn-pakai-voucher").css("display", "none");
          status_vcr +=
            '<span class="status-claimed unclaimed">Terpakai</span>';
        }
        // $(".voucher-code-scan").html(values.voucher_no);
        $(".voucher-code-scan").html(values.voucher_no);
        $(".voucher-status-scan").html(status_vcr);
        $("#expired_date").append(date_x);

        html_text_min_beli +=
          (values.type == "bensin"
            ? "<span>Pembelian bensin min Rp. " +
              values.min_purchase +
              " Anda akan mendapatkan potongan senilai Rp. " +
              values.amount
            : " Anda mendapatkan potongan senilai Rp. " + values.amount) +
          "</span>";

        $(".min-beli").html(html_text_min_beli);

        $(".btn-pakai-voucher").on("click", function () {
          function onConfirm(buttonIndex) {
            // console.log(buttonIndex);
            if (buttonIndex == 1) {
              var voucher = values.voucher_no;
              deleteVoucher(voucher);
            }
          }

          navigator.notification.confirm(
            "Anda ingin menghapus voucher ini!", // message
            onConfirm, // callback to invoke with index of button pressed
            TITLE_ALERT, // title
            ["Oke", "Tidak"] // buttonLabels
          );
        });
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

function deleteVoucher(voucher) {
  var data = {
    voucher_no: voucher,
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
    url: conn + "/delete-voucher",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
      if (values.status == "success") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );

        pages("voucher");
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
            "Koneksi Time Out - Cek koneksi internet Anda",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}
