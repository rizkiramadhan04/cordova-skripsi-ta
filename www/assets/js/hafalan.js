$(document).ready(function () {
  checkIsLoggedIn().done(function (values) {
    if (values.status_login == false) {
      pages("login");
    }
  });
});

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
  url: conn + "/cek-voucher-user",
  dataType: "json",
  timeout: timeout,
})
  .done(function (values) {
    console.log(values);
    if (values.status == "errors" || values.status == "failed") {
      navigator.notification.alert(
        values.message,
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else if (values.status == "success") {
      var data_fl = values.voucher;
      var count_vcr = values.count;
      // console.log("count vcr:" + count_vcr);
      $("#countvcr").html("(" + count_vcr + ")");
      // $("#total-vcr-user").html(':('+count_vcr+')');
      // window.localStorage.setItem("countvcr", count_vcr);

      var data = values.voucher_recepit;

      var date = new Date();
      var tanggal = String(date.getDate()).padStart(2, "0");
      var bulan = String(date.getMonth() + 1).padStart(2, "0");
      var tahun = date.getFullYear();
      var tanggal = +tanggal + "-" + bulan + "-" + tahun;

      // console.log(tanggallengkap);

      // if (data > 0) {
      //   modalStruk();
      // }
      // modalStruk(data);

      let status_vcr = "";
      var class_vcr = "";

      // console.log(data_fl);
      var html_voucher_text = "";
      var img_voucher = "";
      var img_voucher_grey = "";
      var batas_claim = "";

      for (var i = 0; i < data_fl.length; i++) {
        var obj = data_fl[i];

        var date = obj.expired_date;
        var yyyy = date.substring(0, 4);
        var mm = date.substring(5, 7);
        var dd = date.substring(8, 10);

        var bulan = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];

        var bln = bulan[mm - 1];
        var date_x = dd + " " + bln + " " + yyyy;

        if (
          obj.status_voucher == "Tersedia" ||
          (obj.status_voucher == "Terpakai" && obj.claimed_date > tanggal)
        ) {
          if (obj.type == "bensin") {
            img_voucher = "voucher_bensin_new.png";
            img_voucher_grey = "voucher_bensin_new_grey.png";
            batas_claim = 7;
          } else if (obj.type == "oli mobil" && obj.voucher_value == "10000") {
            img_voucher = "voucher_oli_mobil_10k.png";
            img_voucher_grey = "voucher_oli_mobil_grey.png";
            batas_claim = 90;
          } else if (
            obj.type == "oli federal" ||
            (obj.type == "oli mobil" && obj.voucher_value == "25000")
          ) {
            img_voucher = "voucher_corsa_25k.png";
            img_voucher_grey = "voucher_corsa_grey.png";
            batas_claim = 90;
          }

          html_voucher_text +=
            '<div class="card">' +
            '<div class="card-body">' +
            '<div class="card-image">' +
            '<img src="assets/img/voucher/' +
            (obj.message == "Unclaimed Voucher"
              ? img_voucher
              : img_voucher_grey) +
            '" class="" alt="image"></div>' +
            '<div class="card-detail">' +
            '<div class="row card-status">' +
            '<div class="col-8">' +
            "<table>" +
            "<tbody>" +
            "<tr>" +
            "<td>Campaign</td>" +
            "<td>&nbsp;:</td>" +
            "<td>&nbsp;" +
            obj.nama_campaign +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Jumlah</td>" +
            "<td>&nbsp;:</td>" +
            "<td>&nbsp;" +
            obj.amount +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Status</td>" +
            "<td>&nbsp;:</td>" +
            '<td>&nbsp;<span class="status-claimed" style="' +
            (obj.message == "Unclaimed Voucher"
              ? "color: #0b9b0b;"
              : "color: #c9314d;") +
            '">' +
            obj.status_voucher +
            "</span></td>" +
            "</tr>" +
            "</tbody>" +
            "</table>" +
            "</div>" +
            '<div class="col-4" style="text-align: center;">' +
            (obj.message == "Unclaimed Voucher"
              ? '<a data-id="' +
                obj.voucher +
                '" href="javascript:;" onClick="clickPakaiVoucher(this)" class="btn-pindai btn-pakai-voucher" style="display:block;"> Pakai </a>'
              : '<a data-id="' +
                obj.voucher +
                '" href="javascript:;" class="btn-disabled btn-pakai-voucher disabled"> Pakai </a>') +
            "</div>" +
            "</div>" +
            '<div class="card-keterangan">' +
            '<div class="expired"><span>Hangus ' +
            date_x +
            " (Voucher dapat diklaim maksimal sampai tanggal hangus setelah voucher diterima)</span></div>" +
            (obj.type == "bensin"
              ? '<div class="min-beli"><span>Pembelian ' +
                obj.type +
                " min " +
                obj.min_purchase +
                " Anda akan mendapatkan potongan senilai " +
                obj.amount +
                "</span></div>"
              : '<div class="min-beli"><span> Anda akan mendapatkan potongan senilai ' +
                obj.amount +
                "</span></div>") +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
        }
      } //end for data_fl

      $("#voucher-user").html(html_voucher_text);
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
        "Koneksi offline. Silahkan hubungi Call Center : Kode #DB-001",
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

// function clickScanVoucher(param) {
//     window.localStorage.setItem('voucher', $(param).data('id'));
//     pages('scan-voucher');
// }

function clickPakaiVoucher(param) {
  window.localStorage.removeItem("voucher");
  window.localStorage.setItem("voucher", $(param).data("id"));
  // pages('pakai-voucher');
  pages("scan-voucher");
}
