var firstCon = firstConnection();
var status_user = window.localStorage.getItem("status_user");
var data_id = window.localStorage.getItem("pencatatan_id");

if (firstCon == "online") {
  if (status_user == "Guru") {
    $(document).ready(function () {
      $("#appBottomMenuGuru").css("display", "flex");
      $("#appBottomMenuMurid").css("display", "none");
    });

    $("#title-page").append("List Mengajar");
    $("#title-section").append("Daftar mengajar anda");

    data = {
      data_id: data_id,
    };

    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/get-data-pencatatan-id",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        var results = values.data;
        console.log(results);

        window.localStorage.removeItem("jenis_kitab");
        window.localStorage.setItem("jenis_kitab", results.jenis_kitab);

        window.localStorage.removeItem("murid_id");
        window.localStorage.setItem("murid_id", results.murid_id);

        window.localStorage.removeItem("no_surah");
        window.localStorage.setItem("no_surah", results.no_surah);

        window.localStorage.removeItem("juz");
        window.localStorage.setItem("juz", results.juz);

        window.localStorage.removeItem("hasil");
        window.localStorage.setItem("hasil", results.hasil);

        $("#no_ayat").val(results.no_ayat);
        $("#no_iqro").val(results.no_iqro);
        $("#jilid").val(results.jilid);
        $("#halaman").val(results.halaman);
        $("#tanggal").val(results.tanggal);

        SpinnerDialog.hide();
        if (values.status == "failed") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "success") {
          //   //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
          var result_list = "";
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
  } else {
    $(document).ready(function () {
      $("#appBottomMenuGuru").css("display", "none");
      $("#appBottomMenuMurid").css("display", "flex");
    });
  }

  $("#title-page").append("List Mengaji");
  $("#title-section").append("Daftar mengaji anda");
}

$(document).ready(function () {
  $("#appBottomMenuGuru").css("display", "flex");
  $("#appBottomMenuMurid").css("display", "none");

  $(".select2-basic").select2();

  var jenis_kitab = window.localStorage.getItem("jenis_kitab");

  if (jenis_kitab == "Al Quran") {
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

  var list_jenis_kitab = "";

  if (jenis_kitab != null) {
    list_jenis_kitab =
      '<option value="Al Quran" ' +
      (jenis_kitab == "Al Quran" ? "selected" : "") +
      ">Al Quran</option>" +
      '<option value="Iqro" ' +
      (jenis_kitab == "Iqro" ? "selected" : "") +
      ">Iqro</option>";
  } else {
    list_jenis_kitab =
      '<option value="Al Quran">Al Quran</option>' +
      '<option value="Iqro">Iqro</option>';
  }

  $("#jenis_kitab").append(list_jenis_kitab);

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

  var list_hasil = "";
  var hasil = window.localStorage.getItem("hasil");
  if (hasil != null) {
    list_hasil =
      +'<option value="Al Quran">Al Quran</option>' +
      '<option value="Iqro">Iqro</option>';

    list_hasil =
      '<option value="0" ' +
      (hasil == 0 ? "selected" : "") +
      ">Ulang</option>" +
      '<option value="1" ' +
      (hasil == 1 ? "selected" : "") +
      ">Lanjut</option>";
  } else {
    list_hasil =
      '<option value="0">Ulang</option>' + '<option value="1">Lanjut</option>';
  }

  $("#hasil").append(list_hasil);

  //juz
  var juz = window.localStorage.getItem("juz");
  var dropdown_juz;
  for (let i = 1; i < 30; i++) {
    dropdown_juz +=
      '<option value="' +
      i +
      '" ' +
      (juz == i ? "selected" : "") +
      ">" +
      i +
      "</option>";
  }

  $("#juz").append(dropdown_juz);
});

// get data alquran

var surah = window.localStorage.getItem("no_surah");

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
          '"' +
          (surah == data_obj.no_surah ? "selected" : "") +
          ">" +
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

// Input data

function postData() {
  event.preventDefault();
  SpinnerDialog.show(null, "Mengirim data ...");

  data = {
    pencatatan_id: data_id,
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
    url: conn + "/update-data-pencatatan",
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
        pages("edit-pencatatan");
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
