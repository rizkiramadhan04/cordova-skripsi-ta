var firstCon = firstConnection();

$(document).ready(function () {
  $("#appBottomMenuGuru").css("display", "flex");
  $("#appBottomMenuMurid").css("display", "none");

  $(".select2-basic").select2();

  $("#iqro").hide();
  $("#surah").hide();
  $("#ayat").hide();
  $("#juz_wrap").hide();

  $("#jenis_kitab").on("change", function () {
    // console.log($('#jenis_kitab').val());
    if ($("#jenis_kitab").val() == "Al Qur'an") {
      $("#iqro").hide();
      $("#surah").show();
      $("#ayat").show();
      $("#juz_wrap").show();
    } else {
      $("#iqro").show();
      $("#surah").hide();
      $("#ayat").hide();
      $("#juz_wrap").hide();
    }
  });

  //juz
  var dropdown_juz;
  for (let i = 1; i < 30; i++) {
    dropdown_juz += '<option value="' + i + '">' + i + "</option>";
  }

  $("#juz").append(dropdown_juz);
});

if (firstCon == "online") {
  // get data alquran

  $.ajax({
    type: "GET",
    url: conn + "/get-data-alquran",
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
        var result_list = "";
        for (var i = 0; i < data.length; i++) {
          var data_obj = data[i];

          result_list +=
            '<option value="' +
            data_obj.no_surah +
            '">' +
            data_obj.nama_surah +
            "</option>";
        }

        $("#no_surah").append(result_list);
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

  //get data alquran

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

  // Input data

  function postData() {
    event.preventDefault();
    SpinnerDialog.show(null, "Mengirim data ...");

    data = {
      murid_id: $("#murid_id").val(),
      jenis_kitab: $("#jenis_kitab").val(),
      juz: $("#juz").val(),
      no_surah: $("#no_surah").val(),
      no_ayat: $("#no_ayat").val(),
      no_iqro: $("#no_iqro").val(),
      jilid: $("#jilid").val(),
      halaman: $("#halaman").val(),
      hasil: $("#hasil").val(),
      tanggal: $("#tanggal").val(),
    };

    console.log(data);

    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.getItem("access_token")
        );
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/input-data-pencatatan",
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
          pages("mengaji-guru");
        } else if (values.status == "success") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          pages("list-pencatatan");
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
  }

  // Input data

  // List data presensi

  // List data presensi
} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda.",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
