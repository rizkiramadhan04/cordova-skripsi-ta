var firstCon = firstConnection();
var data_id = window.localStorage.getItem("hafalan_id");

$(document).ready(function () {
  $("#appBottomMenuGuru").css("display", "flex");
  $("#appBottomMenuMurid").css("display", "none");

  $(".select2-basic").select2();
});

if (firstCon == "online") {
  data = {
    data_id: data_id,
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/get-data-hafalan-id",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      var results = values.data;
      console.log(results);

      window.localStorage.removeItem("materi_hafalan");
      window.localStorage.setItem("materi_hafalan", results.materi_hafalan);

      window.localStorage.removeItem("murid_id");
      window.localStorage.setItem("murid_id", results.murid_id);

      window.localStorage.removeItem("jenis_hafalan");
      window.localStorage.setItem("jenis_hafalan", results.jenis);

      $("#nilai").val(results.nilai);
      $("#tanggal_hafalan").val(results.tanggal_hafalan);

      SpinnerDialog.hide();
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

  // get data murid

  var murid_id = window.localStorage.getItem("murid_id");

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
            '"' +
            (murid_id == data_obj.id ? "selected" : "") +
            ">" +
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

  var list_type = "";
  var jenis_hafalan = window.localStorage.getItem("jenis_hafalan");
  if (jenis_hafalan != null) {
    list_type =
      '<option value="1" ' +
      (jenis_hafalan == 1 ? "selected" : "") +
      ">Bacaan Sholat</option>" +
      '<option value="2" ' +
      (jenis_hafalan == 2 ? "selected" : "") +
      ">Doa Sehari-hari</option>";
  } else {
    list_type =
      '<option value="1">Bacaan Sholat</option>' +
      '<option value="2">Doa Sehari-hari</option>';
  }

  $("#jenis").append(list_type);

  var list_materi = "";
  var materi = window.localStorage.getItem("materi_hafalan");
  if (materi != null) {
    list_materi =
      "<option " +
      (materi == "Doa Iftitah" ? "selected" : "") +
      ' value="Doa Iftitah">Doa Iftitah</option>' +
      "<option " +
      (materi == "Surah Al - Fatihah" ? "selected" : "") +
      ' value="Surah Al - Fatihah">Surah Al - Fatihah</option>' +
      "<option " +
      (materi == "Doa Ruku & Itidal" ? "selected" : "") +
      ' value="Doa Ruku & Itidal">Doa Ruku & Itidal</option>' +
      "<option " +
      (materi == "Doa Sujud" ? "selected" : "") +
      ' value="Doa Sujud">Doa Sujud</option>' +
      "<option " +
      (materi == "Doa Duduk iftirasy" ? "selected" : "") +
      ' value="Doa Duduk iftirasy">Doa Duduk iftirasy</option>' +
      "<option " +
      (materi == "Doa Tasyahud" ? "selected" : "") +
      ' value="Doa Tasyahud">Doa Tasyahud</option>' +
      "<option " +
      (materi == "Dzikir Bada Sholat" ? "selected" : "") +
      ' value="Dzikir Bada Sholat">Dzikir Bada Sholat</option>' +
      "<option " +
      (materi == "Doa Kebaikan" ? "selected" : "") +
      ' value="Doa Kebaikan">Doa Kebaikan Dunia & Akhirat</option>' +
      "<option " +
      (materi == "Doa Sebelum Makan" ? "selected" : "") +
      ' value="Doa Sebelum Makan">Doa Sebelum Makan</option>' +
      "<option " +
      (materi == "Doa Setelah Makan" ? "selected" : "") +
      ' value="Doa Setelah Makan">Doa Setelah Makan</option>' +
      "<option " +
      (materi == "Doa Sebelum Tidur" ? "selected" : "") +
      ' value="Doa Sebelum Tidur">Doa Sebelum Tidur</option>' +
      "<option " +
      (materi == "Doa Bangun Tidur" ? "selected" : "") +
      ' value="Doa Bangun Tidur">Doa Bangun Tidur</option>' +
      "<option " +
      (materi == "Doa Masuk Rumah" ? "selected" : "") +
      ' value="Doa Masuk Rumah">Doa Masuk Rumah</option>' +
      "<option " +
      (materi == "Doa Keluar Rumah" ? "selected" : "") +
      ' value="Doa Keluar Rumah">Doa Keluar Rumah</option>' +
      "<option " +
      (materi == "Doa Masuk WC" ? "selected" : "") +
      ' value="Doa Masuk WC">Doa Masuk WC</option>' +
      "<option " +
      (materi == "Doa Keluar WC" ? "selected" : "") +
      ' value="Doa Keluar WC">Doa Keluar WC</option>' +
      "<option " +
      (materi == "Doa Setelah Adzan" ? "selected" : "") +
      ' value="Doa Setelah Adzan">Doa Setelah Adzan</option>' +
      "<option " +
      (materi == "Doa Setelah Iqomah" ? "selected" : "") +
      ' value="Doa Setelah Iqomah">Doa Setelah Iqomah</option>' +
      "<option " +
      (materi == "Doa Selesai Wudhu" ? "selected" : "") +
      ' value="Doa Selesai Wudhu">Doa Selesai Wudhu</option>' +
      "<option " +
      (materi == "Doa Bercermin" ? "selected" : "") +
      ' value="Doa Bercermin">Doa Bercermin</option>' +
      "<option " +
      (materi == "Doa Untuk Orang Tua" ? "selected" : "") +
      ' value="Doa Untuk Orang Tua">Doa Untuk Orang Tua</option>' +
      "<option " +
      (materi == "Doa Qunut" ? "selected" : "") +
      ' value="Doa Qunut">Doa Qunut</option>';
  } else {
    list_materi =
      '<option value="Doa Iftitah">Doa Iftitah</option>' +
      '<option value="Surah Al - Fatihah">Surah Al - Fatihah</option>' +
      '<option value="Doa Ruku & Itidal">Doa Ruku & Itidal</option>' +
      '<option value="Doa Sujud">Doa Sujud</option>' +
      '<option value="Doa Duduk iftirasy">Doa Duduk iftirasy</option>' +
      '<option value="Doa Tasyahud">Doa Tasyahud</option>' +
      '<option value="Dzikir Bada Sholat">Dzikir Bada Sholat</option>' +
      '<option value="Doa Kebaikan">Doa Kebaikan Dunia & Akhirat</option>' +
      '<option value="Doa Sebelum Makan">Doa Sebelum Makan</option>' +
      '<option value="Doa Setelah Makan">Doa Setelah Makan</option>' +
      '<option value="Doa Sebelum Tidur">Doa Sebelum Tidur</option>' +
      '<option value="Doa Bangun Tidur">Doa Bangun Tidur</option>' +
      '<option value="Doa Masuk Rumah">Doa Masuk Rumah</option>' +
      '<option value="Doa Keluar Rumah">Doa Keluar Rumah</option>' +
      '<option value="Doa Masuk WC">Doa Masuk WC</option>' +
      '<option value="Doa Keluar WC">Doa Keluar WC</option>' +
      '<option value="Doa Setelah Adzan">Doa Setelah Adzan</option>' +
      '<option value="Doa Setelah Iqomah">Doa Setelah Iqomah</option>' +
      '<option value="Doa Selesai Wudhu">Doa Selesai Wudhu</option>' +
      '<option value="Doa Bercermin">Doa Bercermin</option>' +
      '<option value="Doa Untuk Orang Tua">Doa Untuk Orang Tua</option>' +
      '<option value="Doa Qunut">Doa Qunut</option>';
  }

  $("#materi_hafalan").append(list_materi);

  function postData() {
    event.preventDefault();
    SpinnerDialog.show(null, "Mengirim data ...");

    data = {
      hafalan_id: data_id,
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
      url: conn + "/update-data-hafalan",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        // console.log(values);

        SpinnerDialog.hide();
        if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          pages("hafalan-guru");
        } else if (values.status == "success") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );

          pages("list-hafalan");
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
