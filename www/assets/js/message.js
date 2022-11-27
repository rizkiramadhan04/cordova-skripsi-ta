var firstCon = firstConnection();

$.ajax({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + window.localStorage.getItem("access_token")
    );
    xhr.setRequestHeader("Accept", "application/json");
  },
  type: "POST",
  url: conn + "/message",
  dataType: "json",
  timeout: timeout,
})
  .done(function (values) {
    //console.log(values);
    if (values.status == "errors" || values.status == "failed") {
      navigator.notification.alert(
        values.message,
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else if (values.status == "success") {
      $("#count_awal_msg").val(values.total_awal);
      var data_fl = values.data;
      for (var i = 0; i < data_fl.length; i++) {
        var obj = data_fl[i];
        let img = "";
        let click = "";
        if (obj.type == "register") {
          img +=
            '<img src="assets/img/sample/message/register.png" style="width:80%;margin-top:15px;">';
          if (obj.link == "" || obj.link == null) {
            click += '<a href="#">';
          } else {
            click += '<a href="' + obj.link + '">';
          }
        } else if (obj.type == "promo") {
          img +=
            '<img src="assets/img/sample/message/promo.png" style="width:80%;margin-top:15px;">';
          // click= 'clickPromoDetail(this)';
          click +=
            '<a href="javascript:;" data-id="' +
            obj.id_type +
            '" onClick="clickPromoDetail(this)">';
        } else if (obj.type == "news") {
          img +=
            '<img src="assets/img/sample/message/berita.png" style="width:80%;margin-top:15px;">';
          // click = 'clickBeritaDetail(this)';
          click +=
            '<a href="javascript:;" data-id="' +
            obj.id_type +
            '" onClick="clickBeritaDetail(this)">';
        } else if (obj.type == "ajakan_beli") {
          img +=
            '<img src="assets/img/sample/message/ajakan-beli.png" style="width:80%;margin-top:15px;">';
          if (obj.link == "" || obj.link == null) {
            click += '<a href="#">';
          } else {
            click += '<a href="' + obj.link + '">';
          }
        } else if (obj.type == "others") {
          img +=
            '<img src="assets/img/sample/message/others.png" style="width:80%;margin-top:15px;">';
          if (obj.link == "" || obj.link == null) {
            click += '<a href="#">';
          } else {
            click += '<a href="' + obj.link + '">';
          }
        } else {
          img +=
            '<img src="assets/img/sample/message/ga-beli-bensin.png" style="width:80%;margin-top:15px;">';
          if (obj.link == "" || obj.link == null) {
            click += '<a href="#">';
          } else {
            click += '<a href="' + obj.link + '">';
          }
        }

        $("#list-message").append(
          click +
            '<div class="card">' +
            '<div class="card-body">' +
            '<div class="row">' +
            '<div class="col-3" style="text-align:center;">' +
            img +
            "</div>" +
            '<div class="col-9">' +
            '<div class="title-message">' +
            "<span>" +
            obj.title +
            "</span>" +
            "</div>" +
            '<div class="pesan-message">' +
            "<span>" +
            obj.pesan +
            "</span>" +
            "</div>" +
            '<div class="waktu-message">' +
            "<span>" +
            obj.updated_at +
            "</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div></a>"
        );
      }
    }
    SpinnerDialog.hide();
  })
  .fail(function (jqXHR, textStatus, errorThrown) {
    console.log(jqXHR);
    console.log(textStatus);
    console.log(errorThrown);
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
      SpinnerDialog.hide();
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

function clickBeritaDetail(param) {
  window.localStorage.removeItem("id_news");
  window.localStorage.setItem("id_news", $(param).data("id"));
  pages("berita-detail");
}

function clickPromoDetail(param) {
  window.localStorage.removeItem("id_promo");
  window.localStorage.setItem("id_promo", $(param).data("id"));

  var id_slider_p = $(param).data("id");
  if (id_slider_p != 2) {
    pages("slider-promo-detail");
  } else {
    pages("layanan-informasi");
  }

  // console.log(id);
}

$(".load-more-msg").click(function () {
  console.log("load more news started");
  var count_awl = $("#count_awal_msg").val();

  data = {
    offset: count_awl,
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/pesan-loadmore",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      //console.log(values);
      if (values.status == "errors" || values.status == "failed") {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else if (values.status == "success") {
        var total_plus = values.total_plus;
        var new_count_awl = parseInt(count_awl) + parseInt(total_plus);

        $("#count_awal_msg").val(new_count_awl);

        var data_fl = values.data;
        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          let img = "";
          let click = "";
          if (obj.type == "register") {
            img +=
              '<img src="assets/img/sample/message/register.png" style="width:80%;margin-top:15px;">';
            if (obj.link == "" || obj.link == null) {
              click += '<a href="#">';
            } else {
              click += '<a href="' + obj.link + '">';
            }
          } else if (obj.type == "promo") {
            img +=
              '<img src="assets/img/sample/message/promo.png" style="width:80%;margin-top:15px;">';
            // click= 'clickPromoDetail(this)';
            click +=
              '<a href="javascript:;" data-id="' +
              obj.id_type +
              '" onClick="clickPromoDetail(this)">';
          } else if (obj.type == "news") {
            img +=
              '<img src="assets/img/sample/message/berita.png" style="width:80%;margin-top:15px;">';
            // click = 'clickBeritaDetail(this)';
            click +=
              '<a href="javascript:;" data-id="' +
              obj.id_type +
              '" onClick="clickBeritaDetail(this)">';
          } else if (obj.type == "ajakan_beli") {
            img +=
              '<img src="assets/img/sample/message/ajakan-beli.png" style="width:80%;margin-top:15px;">';
            if (obj.link == "" || obj.link == null) {
              click += '<a href="#">';
            } else {
              click += '<a href="' + obj.link + '">';
            }
          } else if (obj.type == "others") {
            img +=
              '<img src="assets/img/sample/message/others.png" style="width:80%;margin-top:15px;">';
            if (obj.link == "" || obj.link == null) {
              click += '<a href="#">';
            } else {
              click += '<a href="' + obj.link + '">';
            }
          } else {
            img +=
              '<img src="assets/img/sample/message/ga-beli-bensin.png" style="width:80%;margin-top:15px;">';
            if (obj.link == "" || obj.link == null) {
              click += '<a href="#">';
            } else {
              click += '<a href="' + obj.link + '">';
            }
          }

          $("#list-message").append(
            click +
              '<div class="card">' +
              '<div class="card-body">' +
              '<div class="row">' +
              '<div class="col-3" style="text-align:center;">' +
              img +
              "</div>" +
              '<div class="col-9">' +
              '<div class="title-message">' +
              "<span>" +
              obj.title +
              "</span>" +
              "</div>" +
              '<div class="pesan-message">' +
              "<span>" +
              obj.pesan +
              "</span>" +
              "</div>" +
              '<div class="waktu-message">' +
              "<span>" +
              obj.updated_at +
              "</span>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div></a>"
          );
        }
      }
      SpinnerDialog.hide();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
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
        SpinnerDialog.hide();
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
