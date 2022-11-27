var firstCon = firstConnection();
var id_news = window.localStorage.getItem("id_news");
// console.log('id news :'+id_news);

if (firstCon == "online") {
  data = {
    id_news: window.localStorage.getItem("id_news"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/detail-news",
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

        $("#title-detail").html(values.title);
        $("#isi-detail").html(values.news);
        $("#news-time").html(values.time);
        $("#nama-kategori").text(values.category);
        $("#total-view").text(values.view);
        $("#total-share").text(values.share);
        $("#image-detail-news").attr(
          "src",
          server_url + "/images/" + values.image_detail
        );

        // $(".news-title-0").html(data_fl[0].title);
        // $(".news-dshb-0").html(data_fl[0].news);

        // $(".news-title-1").html(data_fl[1].title);
        // $(".news-dshb-1").html(data_fl[1].news);

        // $(".news-title-2").html(data_fl[2].title);
        // $(".news-dshb-2").html(data_fl[2].news);

        window.localStorage.removeItem("title_berita");
        window.localStorage.setItem("title_berita", values.title);
        window.localStorage.removeItem("description_berita");
        window.localStorage.setItem("description_berita", values.description);
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
