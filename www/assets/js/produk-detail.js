var firstCon = firstConnection();
var product_id = window.localStorage.getItem("product_id");
// console.log("idnya:"+ product_id);

if (firstCon == "online") {
  data = {
    product_id: window.localStorage.getItem("product_id"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/product-by-id",
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

        $("#detail-produk-judul").html(values.title);
        $("#detail-produk-harga").html("Rp" + values.price);
        $("#detail-produk-desc").html(values.description);

        var data_fl = values.image;
        var length_image = data_fl.length;
        // console.log('nama image :'+data_fl[0]);
        if (length_image == 1) {
          // console.log('image hanya 1');
          $("#image-utama").attr(
            "src",
            server_url + "/images/produk/" + data_fl[0]
          );
          $(".img-all-produk").append(
            '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class="active"></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class=""></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class=""></div>'
          );
        } else if (length_image == 2) {
          // console.log('image hanya 2');
          $("#image-utama").attr(
            "src",
            server_url + "/images/produk/" + data_fl[0]
          );
          $(".img-all-produk").append(
            '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class="active"></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[1] +
              '" data-id="' +
              data_fl[1] +
              '" onClick="changeimg(this)" class=""></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class=""></div>'
          );
        } else if (length_image == 3) {
          // console.log('image ada 3');
          $("#image-utama").attr(
            "src",
            server_url + "/images/produk/" + data_fl[0]
          );

          $(".img-all-produk").append(
            '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class="active"></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[1] +
              '" data-id="' +
              data_fl[1] +
              '" onClick="changeimg(this)" class=""></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[2] +
              '" data-id="' +
              data_fl[2] +
              '" onClick="changeimg(this)" class=""></div>'
          );
        } else if (length_image < 1) {
          // console.log('tidak ada image');
          $("#image-utama").attr(
            "src",
            server_url + "/images/produk/" + values.thumbnail
          );
          $(".img-all-produk").hide();
        } else {
          // console.log('image lebih dari 3');
          $("#image-utama").attr(
            "src",
            server_url + "/images/produk/" + data_fl[0]
          );
          $(".img-all-produk").append(
            '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[0] +
              '" data-id="' +
              data_fl[0] +
              '" onClick="changeimg(this)" class="active"></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[1] +
              '" data-id="' +
              data_fl[1] +
              '" onClick="changeimg(this)" class=""></div>' +
              '<div><img src="' +
              server_url +
              "/images/produk/" +
              data_fl[2] +
              '" data-id="' +
              data_fl[2] +
              '" onClick="changeimg(this)" class=""></div>'
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

function changeimg(param) {
  document.getElementById("image-utama").src =
    server_url + "/images/produk/" + $(param).data("id");
}

// $(document).ready(function() {
//     $('#produk-page-detail .img-all-produk div').click(function(){
//         // $('li a').removeClass("active");
//         // $(this).addClass("active");
//         console.log('div active');
//     });
// });
