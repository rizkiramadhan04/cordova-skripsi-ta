var provinsi = window.localStorage.getItem("provinsi");
var city = window.localStorage.getItem("city");

// console.log(provinsi);
// console.log(city);

// else if (city == "Kabupaten Bojonegoro") {
//         $("#header-section").css("display", "block");
//         $("#owl-stage").css("display", "block");
//       }

$(document).ready(function () {
  checkIsLoggedIn().done(function (values) {
    if (values.status_login == false) {
      $("#header-section").css("display", "none");
      $("#owl-stage").css("display", "none");
    } else {
      if (provinsi == "BANTEN") {
        $("#header-section").css("display", "block");
        $("#owl-stage").css("display", "block");
      } else {
        $("#header-section").css("display", "none");
        $("#owl-stage").css("display", "none");
      }
    }
  });

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
    },

    type: "POST",
    url: conn + "/cek-voucher-user-progres",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log("Data progress : ", values);
      var count_receipt = values.count_receipt;

      $("#count_receipt").html("(" + values.count_voucher + ")");

      var html_progress_bar = "";
      var struk = 1;
      var image_progress = "";
      if (count_receipt <= 10) {
        for (i = 0; i < count_receipt; i++) {
          // if (struk == 1) {
          //   var type = "voucher";
          //   modalGetVoucher(type);
          // } else if (struk == 3) {
          //   var type = "voucher";
          //   modalGetVoucher(type);
          // } else if (struk == 6) {
          //   var type = "voucher";
          //   modalGetVoucher(type);
          // }
          image_progress =
            '<img style="width: 45px;" src="assets/img/progress/COMPLETE-STEP-GRATIS-BENSIN-ICON.png" />';

          html_progress_bar +=
            '<div class="owl-item line completed">' +
            '<a href="javascript:void(0)" onclick="">' +
            '<span class="wrapper-img">' +
            image_progress +
            "</span>" +
            "</a>" +
            '<p class="d-none"> Struk ' +
            struk++ +
            "</p>" +
            "</div>";
        }

        var jumlah_berhasil = 10 - count_receipt;
        for (i = 0; i < jumlah_berhasil; i++) {
          if (struk == 1) {
            image_progress =
              '<img style="width: 45px; border-radius: 0; margin-top:7px" src="assets/img/progress/voucher.png" />';
          } else if (struk == 2) {
            image_progress =
              '<img style="width: 45px; border-radius: 0; margin-top:7px" src="assets/img/progress/voucher.png" />';
          } else if (struk == 3) {
            image_progress =
              '<img style="width: 45px; border-radius: 0; margin-top:7px" src="assets/img/progress/voucher.png" />';
          } else {
            image_progress =
              '<img style="width: 40px; border-radius: 0; margin-top:-17px" src="assets/img/progress/pombensin.png"/>';
          }

          html_progress_bar +=
            '<div class="owl-item line">' +
            '<a href="javascript:void(0)" onclick="clickUploadStruk()">' +
            '<span class="wrapper-img">' +
            image_progress +
            "</span>" +
            "</a>" +
            '<p class="d-none"> Struk ' +
            struk++ +
            "</p>" +
            "</div>";
        }
      } else {
        for (i = 0; i < count_receipt; i++) {
          html_progress_bar +=
            '<div class="owl-item line">' +
            '<a href="javascript:void(0)" onclick="">' +
            '<span class="wrapper-img">' +
            '<img style="width: 45px;" src="assets/img/progress/COMPLETE-STEP-GRATIS-BENSIN-ICON.png">' +
            "</span>" +
            "</a>" +
            '<p class="d-none"> Struk ' +
            struk++ +
            "</p>" +
            "</div>";
        }
        html_progress_bar +=
          '<div class="owl-item line">' +
          '<a href="javascript:void(0)" onclick="clickUploadStruk()">' +
          '<span class="wrapper-img">' +
          '<img style="width: 40px;  border-radius: 0; margin-top:-15px" src="assets/img/progress/pombensin.png">' +
          "</span>" +
          "</a>" +
          '<p class="d-none"> Struk ' +
          struk++ +
          "</p>" +
          "</div>";
      }

      $("#owl-stage").html(html_progress_bar);

      var owl = $(".owl-carousel");
      owl.owlCarousel({
        margin: 0,
        nav: false,
        loop: false,
        dots: false,
        responsive: {
          0: {
            items: 5,
          },
          600: {
            items: 5,
          },
          1000: {
            items: 5,
          },
        },
      });

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
        //Network error (i.e. connection refused, access denied due to CORS, etc.)
        navigator.notification.alert(
          "Koneksi offline - Silahkan hubungi Call Center : Kode #DB-001",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }
    });
});

function clickUploadStruk() {
  pages("foto-struk");
}
