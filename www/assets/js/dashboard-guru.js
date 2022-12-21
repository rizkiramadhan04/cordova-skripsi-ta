var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");

if (firstCon == "online") {
  window.localStorage.removeItem("province_id");

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/get-data-hafalan-by-guru",
    dataType: "json",
    timeout: timeout,
    // data: data,
  })
    .done(function (values) {
      console.log(values);
      var results = values.data;
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
        for (var i = 0; i < 5; i++) {
          // console.log(results[i].nama_murid);
          //,\"' +results[i].site_name + '\"
          result_list += '<a href="javascript:void(0)">';
          result_list += '<div class="row detail item mb-2 p-0">';
          result_list +=
            '<div class="col-3"><img src="assets/img/site-icon-120.png" alt="img" class="image-block imaged w76"></div>';
          result_list +=
            '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">';
          result_list += "<strong>Hafalan</strong>";
          result_list +=
            "<p>Nama Murid : <strong>" +
            results[i].nama_murid +
            "</strong><br/>";
          result_list +=
            "<p>Materi : <strong>" +
            results[i].materi_hafalan +
            "</strong><br/>";
          result_list +=
            "<p>Nama Guru : <strong>" + results[i].nama_guru + "</strong><br/>";
          result_list +=
            "<p>Tanggal : <strong>" +
            results[i].tanggal_hafalan +
            "</strong><br/></p>";
          result_list += "</div>";
          result_list += '<div class="col-3 text-center">';
          result_list += '<p style="width: 20px;"><b> Nilai </b></p>';
          result_list +=
            '<strong style="font-size:.8rem;display:block;">' +
            results[i].nilai +
            "</strong>";
          result_list += "</div>";
          result_list += "</div>";
          result_list += "</a>";
        }

        $("#dashboardHafalanContainer").html("result_list");
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
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}

$(document).ready(function () {
  $("#appBottomMenuGuru").css("display", "flex");
  $("#dashboardSectionAppContainer").text("v" + version_number);
  document.querySelectorAll(".carousel-dashboard").forEach((carousel) =>
    new Splide(carousel, {
      perPage: 1,
      speed: 1000,
      rewind: true,
      type: "loop",
      gap: 0,
      padding: 0,
      arrows: true,
      pagination: false,
      autoplay: true,
      breakpoints: {
        768: {
          perPage: 1,
        },
        991: {
          perPage: 2,
        },
      },
    }).mount()
  );
});
