function shareBerita() {
  var firstCon = firstConnection();
  var title = window.localStorage.getItem("title_berita");
  var desc = window.localStorage.getItem("description_berita");
  var text = title + ". " + desc + ". Mau lihat lebih lanjut? klik link:";
  var news_id = window.localStorage.getItem("id_news");

  if (firstCon == "online") {
    data = {
      id_news: window.localStorage.getItem("id_news"),
    };
    $.ajax({
      type: "POST",
      url: conn + "/share-news",
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
          DetailPageNews(news_id);
          navigator
            .share({
              title: "Mobil Indostation",
              text: text,
              url: "https://play.google.com/store/apps/details?id=com.nadyne.MobilIndostation",
              // 'image' : 'https://www.google.nl/images/srpr/logo4w.png'
            })
            .then(function () {
              console.log("Successful share");
            })
            .catch(function (error) {
              console.log("Error sharing:", error);
            });
        } else {
          console.log("gagal tambah share");
          // navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
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

  // window.plugins.socialsharing.shareViaFacebook(
  // 'Optional message, may be ignored by Facebook app',
  // ['https://www.google.nl/images/srpr/logo4w.png','www/image.gif'],
  // null);
}

function DetailPageNews(id) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", id);
  pages("berita-detail");
}

function sharePromo() {
  var firstCon = firstConnection();
  var title = window.localStorage.getItem("title_promo");
  var text = title + ". Mau lihat lebih lanjut? klik link:";
  var promo_id = window.localStorage.getItem("id_promo");

  if (firstCon == "online") {
    data = {
      id_promo: window.localStorage.getItem("id_promo"),
    };
    $.ajax({
      type: "POST",
      url: conn + "/share-promo",
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
          DetailPagePromo(promo_id);
          navigator
            .share({
              title: "Mobil Indostation",
              text: text,
              url: "https://play.google.com/store/apps/details?id=com.nadyne.MobilIndostation",
              // 'image' : 'https://www.google.nl/images/srpr/logo4w.png'
            })
            .then(function () {
              console.log("Successful share");
            })
            .catch(function (error) {
              console.log("Error sharing:", error);
            });
        } else {
          console.log("gagal tambah share");
          // navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
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
}

function DetailPagePromo(id) {
  window.localStorage.removeItem("id_promo");
  window.localStorage.setItem("id_promo", id);
  pages("slider-promo-detail");
  // var id_slider_p = id;
  // if(id != 2)
  // {
  //     pages('slider-promo-detail');
  // }
  // else
  // {
  //     pages('layanan-informasi');
  // }

  // console.log(id);
}
