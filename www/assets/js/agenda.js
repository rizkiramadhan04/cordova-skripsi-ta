var firstCon = firstConnection();

if (firstCon == "online") {
  data = {
    user_id: window.localStorage.getItem("userID"),
  };
  $.ajax({
    beforeSend: function (xhr) {
      $(".img-slider-dsb-0").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-1").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-2").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-3").attr("src", "assets/img/sample/news/loading.gif");
    },
    type: "POST",
    url: conn + "/news",
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

        // console.log('id_newsnya :'+data_fl[0].id);
        var length_data = data_fl.length;
        if (length_data == 4) {
          $(".list-one").attr("id", data_fl[0].id);
          $(".list-two").attr("id", data_fl[1].id);
          $(".list-three").attr("id", data_fl[2].id);
          $(".list-four").attr("id", data_fl[3].id);

          $(".news-title-0").html(data_fl[0].title);
          $(".news-dshb-0").html(data_fl[0].description);
          $(".img-slider-dsb-0").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-1").html(data_fl[1].title);
          $(".news-dshb-1").html(data_fl[1].description);
          $(".img-slider-dsb-1").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );

          $(".news-title-2").html(data_fl[2].title);
          $(".news-dshb-2").html(data_fl[2].description);
          $(".img-slider-dsb-2").attr(
            "src",
            server_url + "/images/" + data_fl[2].image
          );

          $(".news-title-3").html(data_fl[3].title);
          $(".news-dshb-3").html(data_fl[3].description);
          $(".img-slider-dsb-3").attr(
            "src",
            server_url + "/images/" + data_fl[3].image
          );
        } else if (length_data == 3) {
          $(".list-one").attr("id", data_fl[0].id);
          $(".list-two").attr("id", data_fl[1].id);
          $(".list-three").attr("id", data_fl[2].id);
          $(".list-four").attr("id", data_fl[0].id);

          $(".news-title-0").html(data_fl[0].title);
          $(".news-dshb-0").html(data_fl[0].description);
          $(".img-slider-dsb-0").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-1").html(data_fl[1].title);
          $(".news-dshb-1").html(data_fl[1].description);
          $(".img-slider-dsb-1").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );

          $(".news-title-2").html(data_fl[2].title);
          $(".news-dshb-2").html(data_fl[2].description);
          $(".img-slider-dsb-2").attr(
            "src",
            server_url + "/images/" + data_fl[2].image
          );

          $(".news-title-3").html(data_fl[0].title);
          $(".news-dshb-3").html(data_fl[0].description);
          $(".img-slider-dsb-3").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        } else if (length_data == 2) {
          $(".list-one").attr("id", data_fl[0].id);
          $(".list-two").attr("id", data_fl[1].id);
          $(".list-three").attr("id", data_fl[0].id);
          $(".list-four").attr("id", data_fl[0].id);

          $(".news-title-0").html(data_fl[0].title);
          $(".news-dshb-0").html(data_fl[0].description);
          $(".img-slider-dsb-0").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-1").html(data_fl[1].title);
          $(".news-dshb-1").html(data_fl[1].description);
          $(".img-slider-dsb-1").attr(
            "src",
            server_url + "/images/" + data_fl[1].image
          );

          $(".news-title-2").html(data_fl[0].title);
          $(".news-dshb-2").html(data_fl[0].description);
          $(".img-slider-dsb-2").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-3").html(data_fl[0].title);
          $(".news-dshb-3").html(data_fl[0].description);
          $(".img-slider-dsb-3").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        } else if (length_data == 1) {
          $(".list-one").attr("id", data_fl[0].id);
          $(".list-two").attr("id", data_fl[0].id);
          $(".list-three").attr("id", data_fl[0].id);
          $(".list-four").attr("id", data_fl[0].id);

          $(".news-title-0").html(data_fl[0].title);
          $(".news-dshb-0").html(data_fl[0].description);
          $(".img-slider-dsb-0").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-1").html(data_fl[0].title);
          $(".news-dshb-1").html(data_fl[0].description);
          $(".img-slider-dsb-1").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-2").html(data_fl[0].title);
          $(".news-dshb-2").html(data_fl[0].description);
          $(".img-slider-dsb-2").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );

          $(".news-title-3").html(data_fl[0].title);
          $(".news-dshb-3").html(data_fl[0].description);
          $(".img-slider-dsb-3").attr(
            "src",
            server_url + "/images/" + data_fl[0].image
          );
        }

        //manual js

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#berita-page-terkait").append(
            '<div class="herf-list-news"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickBeritaDetail(this)">' +
              '<div class="list-new-berita"> <div class="img-new-berita">' +
              '<img src="' +
              server_url +
              "/images/" +
              obj.image_thumbnail +
              '"></div><div class="isi-new-berita">' +
              '<div class="title-berita">' +
              obj.title +
              '</div><div class="isi-berita">' +
              obj.description +
              "</div></div></div></a></div>"
          );
        }
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
      $(".img-slider-dsb-0").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-1").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-2").attr("src", "assets/img/sample/news/loading.gif");
      $(".img-slider-dsb-3").attr("src", "assets/img/sample/news/loading.gif");
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
  $(".img-slider-dsb-0").attr("src", "assets/img/sample/news/loading.gif");
  $(".img-slider-dsb-1").attr("src", "assets/img/sample/news/loading.gif");
  $(".img-slider-dsb-2").attr("src", "assets/img/sample/news/loading.gif");
  $(".img-slider-dsb-3").attr("src", "assets/img/sample/news/loading.gif");
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}

function clickBeritaDetailDashboard(id) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", id);
  pages("berita-detail");
  // console.log(id);
}

function clickBeritaDetail(param) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", $(param).data("id"));
  pages("berita-detail");
}

function clickBeritaDetailSliderBerita(id) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", id);
  pages("berita-detail");
  // console.log(id);
}
