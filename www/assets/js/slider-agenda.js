var firstCon = firstConnection();

// $(document).ready(function() {
//     var user_id = window.localStorage.getItem('userID');
//     checkIsLoggedIn().done(function(values) {
//         if (values.status_login == false) {
//            console.log('user id : kosong');
//         }
//         else
//         {
//             console.log('user id :' +user_id);
//         }
//     });
// });
// console.log('js berita');
if (firstCon == "online") {
  data = {
    user_id: window.localStorage.getItem("userID"),
  };
  $.ajax({
    beforeSend: function (xhr) {
      $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
    },
    type: "POST",
    url: conn + "/promo",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
      SpinnerDialog.hide();
      if (values.status == "errors") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "failed") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      } else if (values.status == "success") {
        //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');

        var data_fl = values.data;

        var length_data = data_fl.length;
        // console.log('jumlah data promo:'+length_data);
        if (length_data >= 5) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[3].id);
          $(".slider-agenda5").attr("id", data_fl[4].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/images/" + data_fl[2].image
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/images/" + data_fl[3].image
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/images/" + data_fl[4].image
          );
        } else if (length_data == 4) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[3].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/images/" + data_fl[2].image
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/images/" + data_fl[3].image
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        } else if (length_data == 3) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[2].id);
          $(".slider-agenda4").attr("id", data_fl[0].id);
          $(".slider-agenda5").attr("id", data_fl[1].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/images/" + data_fl[2].image
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
        } else if (length_data == 2) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[1].id);
          $(".slider-agenda3").attr("id", data_fl[0].id);
          $(".slider-agenda4").attr("id", data_fl[1].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        } else if (length_data == 1) {
          $(".slider-agenda1").attr("id", data_fl[0].id);
          $(".slider-agenda2").attr("id", data_fl[0].id);
          $(".slider-agenda3").attr("id", data_fl[0].id);
          $(".slider-agenda4").attr("id", data_fl[0].id);
          $(".slider-agenda5").attr("id", data_fl[0].id);

          $(".slider-agenda1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda2").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda3").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda4").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
          $(".slider-agenda5").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        }

        //manual js
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
      $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
      $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
      if (jqXHR.readyState == 0) {
        console.log(
          "Network error (i.e. connection refused, access denied due to CORS, etc.)"
        );
        // navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001', alertDismissed, TITLE_ALERT, 'Ok');
      } else {
        if (textStatus == "timeout") {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          // navigator.notification.alert('Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001', alertDismissed, TITLE_ALERT, 'Ok');
        }
      }
    });
} else {
  SpinnerDialog.hide();
  $(".slider-agenda1").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda2").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda3").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda4").attr("src", "assets/img/sample/news/loading.gif");
  $(".slider-agenda5").attr("src", "assets/img/sample/news/loading.gif");
  // navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001', alertDismissed, TITLE_ALERT, 'Ok');
}

function clickAgendaDetailDashboard(id) {
  window.localStorage.removeItem("id_agenda");
  window.localStorage.setItem("id_agenda", id);
  var id_agenda_p = id;
  if (id != 2) {
    pages("slider-agenda-detail");
  } else {
    pages("layanan-informasi");
  }

  // console.log(id);
}
