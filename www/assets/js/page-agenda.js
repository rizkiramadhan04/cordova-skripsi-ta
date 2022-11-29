var firstCon = firstConnection();
var id_news = window.localStorage.getItem("id");
var idK = window.localStorage.getItem("id_kategori_berita");

// $(document).ready(function() {
//     var site_id = window.localStorage.getItem('site_id');
//     checkIsLoggedIn().done(function(values) {
//         if (values.status_login == false) {
//            console.log('site_id : kosong');
//         }
//         else
//         {
//             console.log('site_id :' +site_id);
//         }
//     });
// });

if (firstCon == "online") {
  if (idK == 3) {
    //kategori umum
    $("#img-ceklis-acara").css("display", "none");
    $("#img-ceklis-promo").css("display", "none");
    $("#img-ceklis-umum").css("display", "inline");
  } else if (idK == 2) {
    //kategori acara
    $("#img-ceklis-acara").css("display", "inline");
    $("#img-ceklis-promo").css("display", "none");
    $("#img-ceklis-umum").css("display", "none");
  } //kategori promo
  else {
    $("#img-ceklis-acara").css("display", "none");
    $("#img-ceklis-promo").css("display", "inline");
    $("#img-ceklis-umum").css("display", "none");
  }

  data = {
    id_kategori: window.localStorage.getItem("id_kategori_berita"),
    user_id: window.localStorage.getItem("userID"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/news-all",
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
        $("#berita-page-search").hide();
        var data_fl = values.data;

        $("#count_awal_news").val(values.total_awal);
        $("#count_news").val(values.total);

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#berita-page").append(
            '<div class="herf-list-news"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickBeritaDetailPage(this)">' +
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

function clickBeritaDetailPage(param) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", $(param).data("id"));
  pages("berita-detail");
}

// function clickBeritaDetailSliderBerita(id) {
//     window.localStorage.removeItem('id_news');
//     window.localStorage.setItem('id_news', id);
//     pages('berita-detail');
//     // console.log(id);
// }

$(".load-more-news").click(function () {
  console.log("load more news started");
  var count_awl = $("#count_awal_news").val();
  var count_total = $("#count_awal").val();
  // var suc = parseInt(count)+8 ;
  // console.log('id_skrg :'+suc);
  // $( "#count_awal" ).val(suc);
  data = {
    user_id: window.localStorage.getItem("userID"),
    id_kategori: window.localStorage.getItem("id_kategori_berita"),
    offset: count_awl,
  };
  $.ajax({
    type: "POST",
    url: conn + "/news-loadmore",
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

        var total_plus = values.total_plus;
        var new_count_awl = parseInt(count_awl) + parseInt(total_plus);
        console.log(total_plus);
        console.log(new_count_awl);

        $("#count_awal_news").val(new_count_awl);

        // $("#count_produk").val(values.total);
        $("#berita-page-search").hide();
        var data_fl = values.data;

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#berita-page").append(
            '<div class="herf-list-news"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickBeritaDetailPage(this)">' +
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
});

function cariBerita() {
  var keyword = $("#src-news").val();
  window.localStorage.removeItem("title_news");
  console.log("cari produk : " + keyword);

  window.localStorage.setItem("title_news", keyword);
  $("#berita-page-search").remove();
  $("#pages-list-berita").append(
    '<div class="new-berita baru" id="berita-page-search"></div>'
  );

  data = {
    // category_id:  window.localStorage.getItem('category_id'),
    title: window.localStorage.getItem("title_news"),
    user_id: window.localStorage.getItem("userID"),
  };

  $.ajax({
    type: "POST",
    url: conn + "/cari-berita",
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

        $(".list-kategori").hide();
        $("#titlenya").hide();
        $("#berita-page").hide();
        $("#berita-page-search").show();
        $(".load-more-news").hide();
        $("#src-news").val("");
        $("#cari-titlenya").show();
        $("#title-list-kategori").hide();

        var data_fl = values.data;

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#berita-page-search").append(
            '<div class="herf-list-news"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickBeritaDetailPage(this)">' +
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
}
