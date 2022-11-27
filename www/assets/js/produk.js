var firstCon = firstConnection();
var id_category = window.localStorage.getItem("category_id");

if (firstCon == "online") {
  data = {
    category_id: window.localStorage.getItem("category_id"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/produk",
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
        let nama_category = "";
        $("#div-src-produk").hide();
        if (id_category == 0) {
          nama_category +=
            '<div class="all"><img src="assets/img/sample/produk/icon-semua-produk.png" alt="image"><span>SEMUA PRODUK</span></div>';
        } else if (id_category == 1) {
          nama_category +=
            '<div class="sparepart"><img src="assets/img/sample/produk/icon-sparepart.png" alt="image"><span>SPAREPARTS</span></div>';
        } else {
          nama_category +=
            '<div class="ron"><img src="assets/img/sample/produk/icon-pom.png" alt="image"><span>RON 92</span></div>';
        }

        $("#js-kategori-produk").append(nama_category);
        $("#count_awal").val(values.total_awal);
        $("#count_produk").val(values.total);

        var data_fl = values.data;

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#js-lst-produk").append(
            '<div class="div-lst-produk"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickProdukDetail(this)">' +
              '<div class="img-produk">' +
              '<img src="' +
              server_url +
              "/images/produk/" +
              obj.thumbnail +
              '" class="" alt="image">' +
              "</div>" +
              '<div class="detail-produk">' +
              '<div class="nama-produk">' +
              "<span>" +
              obj.judul +
              "</span>" +
              "</div>" +
              '<div class="harga-produk">' +
              "<span>Rp" +
              obj.harga +
              "</span>" +
              "</div>" +
              "</div>" +
              "</a></div>"
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

function clickProdukDetail(param) {
  window.localStorage.removeItem("product_id");
  window.localStorage.setItem("product_id", $(param).data("id"));
  pages("produk-detail");
  // console.log();
}

$(".load-more-produk").click(function () {
  console.log("load more started");
  var count_awl = $("#count_awal").val();
  var count_total = $("#count_awal").val();
  // var suc = parseInt(count)+8 ;
  // console.log('id_skrg :'+suc);
  // $( "#count_awal" ).val(suc);
  data = {
    category_id: window.localStorage.getItem("category_id"),
    offset: count_awl,
  };
  $.ajax({
    type: "POST",
    url: conn + "/produk-loadmore",
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
        $("#div-src-produk").hide();
        var total_plus = values.total_plus;
        var new_count_awl = parseInt(count_awl) + parseInt(total_plus);
        console.log(total_plus);
        console.log(new_count_awl);

        $("#count_awal").val(new_count_awl);

        // $("#count_produk").val(values.total);

        var data_fl = values.data;

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#js-lst-produk").append(
            '<div class="div-lst-produk"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickProdukDetail(this)">' +
              '<div class="img-produk">' +
              '<img src="' +
              server_url +
              "/images/produk/" +
              obj.thumbnail +
              '" class="" alt="image">' +
              "</div>" +
              '<div class="detail-produk">' +
              '<div class="nama-produk">' +
              "<span>" +
              obj.judul +
              "</span>" +
              "</div>" +
              '<div class="harga-produk">' +
              "<span>Rp" +
              obj.harga +
              "</span>" +
              "</div>" +
              "</div>" +
              "</a></div>"
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

function cariProduk() {
  var keyword = $("#src-prd").val();
  window.localStorage.removeItem("nama_produk");
  console.log("cari produk : " + keyword);

  window.localStorage.setItem("nama_produk", keyword);
  // $("#div-produk").hide();
  // $("#div-src-produk").show();
  $("#js-lst-produk-cari").remove();
  $("#div-src-produk").append(
    '<div id="js-lst-produk-cari" class="row lst-produk baru"></div>'
  );

  data = {
    // category_id:  window.localStorage.getItem('category_id'),
    nama_produk: window.localStorage.getItem("nama_produk"),
  };
  $.ajax({
    type: "POST",
    url: conn + "/cari-produk",
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

        // var div =  $("#js-lst-produk-cari");

        $("#div-produk").hide();
        $("#js-kategori-produk").hide();
        // $("#div-src-produk").load();
        $("#div-src-produk").show();
        $(".load-more-produk").hide();
        $("#src-prd").val("");
        // var total_plus = values.total_plus;
        // var new_count_awl = parseInt(count_awl) + parseInt(total_plus);
        // console.log(total_plus);
        // console.log(new_count_awl);

        // $("#count_awal").val(new_count_awl);

        // $("#count_produk").val(values.total);

        var data_fl = values.data;

        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          // console.log(obj.title);
          // console.log(data_fl.length);
          $("#js-lst-produk-cari").append(
            '<div class="div-lst-produk"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickProdukDetail(this)">' +
              '<div class="img-produk">' +
              '<img src="' +
              server_url +
              "/images/produk/" +
              obj.thumbnail +
              '" class="" alt="image">' +
              "</div>" +
              '<div class="detail-produk">' +
              '<div class="nama-produk">' +
              "<span>" +
              obj.judul +
              "</span>" +
              "</div>" +
              '<div class="harga-produk">' +
              "<span>Rp" +
              obj.harga +
              "</span>" +
              "</div>" +
              "</div>" +
              "</a></div>"
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
