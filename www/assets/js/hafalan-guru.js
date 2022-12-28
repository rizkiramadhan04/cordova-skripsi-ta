var firstCon = firstConnection();

$(document).ready(function () {
  $(".select2-basic").select2();

  $("#jenis").on("change", function () {
    // console.log($('#jenis_kitab').val());
    if ($("#jenis").val() == "Doa Sehari-hari") {
      $("#bacaan_sholat").show();
      $("#doa_sehari").hide();
    } else {
      $("#doa_sehari").show();
      $("#bacaan_sholat").hide();
    }
  });
});

if (firstCon == "online") {
  // get data murid

  $.ajax({
    type: "GET",
    url: conn + "/get-data-murid",
    dataType: "json",
    timeout: timeout,
  })
    .done(function (values) {
      console.log(values);
      var data = values.data;
      SpinnerDialog.hide();

      if (values.status == "failed") {
        navigator.notification.alert(
          "Data tidak ada!",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else if (values.status == "success") {
        var list_anak = "";

        for (var i = 0; i < data.length; i++) {
          var data_obj = data[i];

          list_anak +=
            '<option value="' +
            data_obj.id +
            '">' +
            data_obj.nama_murid +
            "</option>";
        }

        $("#murid_id").append(list_anak);
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
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        navigator.notification.alert(
          "Koneksi offline - Cek koneksi internet Anda.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Request Time Out - Cek koneksi internet Anda.",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });

  //get data murid

  function postData() {
    event.preventDefault();
    SpinnerDialog.show(null, "Mengirim data ...");

    data = {
      murid_id: $("#murid_id").val(),
      jenis: $("#jenis").val(),
      materi_hafalan: $("#materi_hafalan").val(),
      nilai: $("#nilai").val(),
      tanggal_hafalan: $("#tanggal_hafalan").val(),
    };

    // console.log(data);

    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.getItem("access_token")
        );
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/input-data-hafalan",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        console.log(values);

        SpinnerDialog.hide();
        if (values.status == "failed") {
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

          pages('list-hafalan');
          
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
  }
} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
