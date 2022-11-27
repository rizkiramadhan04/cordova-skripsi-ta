var firstCon = firstConnection();
// var id_kupon = window.localStorage.getItem('id_kupon');
// console.log('id kupon anda:'+id_kupon);

if (firstCon == "online") {
  data = {
    id_logreceipt: window.localStorage.getItem("id_kupon"),
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
    url: conn + "/detail-kupon",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      //console.log(values);
      SpinnerDialog.hide();
      if (values.status == "errors") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "failed") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "success") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
        console.log("no nota: " + values.no_nota);
        if (values.type_kupon == "silver") {
          $("#img-detail-kupon").append(
            '<img src="assets/img/sample/kupon/silver.png">'
          );
        } else {
          $("#img-detail-kupon").append(
            '<img src="assets/img/sample/kupon/gold.png">'
          );
        }

        $(".detail-kupon-kode").html(values.kupon_prefix);
        $(".detail-kupon-nota").html(values.no_nota);
        $(".detail-kupon-kodeoutlet").html(values.kode_outlet);
        $(".detail-kupon-jumlah").html("Rp" + values.amount);
        $(".detail-kupon-tanggal").html(values.date);
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
