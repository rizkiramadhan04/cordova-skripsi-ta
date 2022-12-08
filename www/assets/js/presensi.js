$(document).ready(function () {
  checkIsLoggedIn().done(function (values) {
    if (values.status_login == false) {
      pages("login");
    }
  });
});

var firstCon = firstConnection();
var type_presensi = window.localStorage.getItem("status_presensi");

if (type_presensi == "1") {
  $("#img-ceklis-all").css("display", "none");
  $("#img-ceklis-telat").css("display", "none");
  $("#img-ceklis-tepat").css("display", "inline");
  // console.log('silver active');
} else if (type_presensi == "0") {
  $("#img-ceklis-all").css("display", "none");
  $("#img-ceklis-telat").css("display", "inline");
  $("#img-ceklis-tepat").css("display", "none");
} else {
  $("#img-ceklis-all").css("display", "inline");
  $("#img-ceklis-telat").css("display", "none");
  $("#img-ceklis-tepat").css("display", "none");
}

data = {
  status_presensi: window.localStorage.getItem("status_presensi"),
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
  url: conn + "/list-receipt",
  dataType: "json",
  data: data,
  timeout: timeout,
})
  .done(function (values) {
    console.log(values);

    var count_presensi = values.total_struk;
    if (count_presensi > 0) {
      $("#jml_presensi").append("(" + count_presensi + ")");
    } else {
      $("#jml_presensi").append("(0)");
    }

    var data = values.receipt;
    var status = "";
    var list_receipt_html = "";

    if (values.status == "failed" || values.status == "errors") {
      navigator.notification.alert(
        "Mohon untuk login dahulu!",
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else if (values.status == "success") {
      console.log(values);

      var no_struk = 1;
      var ribbon = "";
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];

        // console.log(obj);

        // if (obj.status_receipt == 1 && obj.status_voucher == 1) {
        //   // var type = "voucher";
        //   // modalGetVoucher(type);
        // }

        if (obj.status_receipt == 0) {
          status =
            '<span class="voucher-code-scan" style="color: #ff4e4e"> (Invalid)</span>';
          ribbon =
            '<span class="ribbon"><img src="assets/img/VOUCHER-RIBBON_1.png" style="width: 85px; z-index: 99; position: absolute; display:none;"></span>';
        } else {
          // console.log(obj);
          status =
            '<span class="voucher-code-scan" style="color: #00aca8"> (Tervalidasi)</span>';
          if (obj.status_voucher == 1) {
            ribbon =
              '<span class="ribbon"><img src="assets/img/VOUCHER-RIBBON_1.png" style="width: 85px; z-index: 99; position: absolute; display:block;"></span>';
          } else {
            ribbon =
              '<span class="ribbon"><img src="assets/img/VOUCHER-RIBBON_1.png" style="width: 85px; z-index: 99; position: absolute; display:none;"></span>';
          }
        }

        list_receipt_html +=
          '<div class="card mt-3" id="list-data">' +
          ribbon +
          '<div class="card-body" style="">' +
          '<div class="row">' +
          (obj.status_receipt == 1
            ? '<div class="card-image col-4" style="text-align: center; background: #00aca8;">'
            : '<div class="card-image col-4" style="text-align: center; background: #fa9191;">') +
          '<img style="margin-top: 4px;" src="assets/img/struk.png"alt="image">' +
          "</div>" +
          '<div class="card-detail col-8">' +
          '<div class="card-status">' +
          '<div class="col-12">' +
          (obj.status_receipt == 1
            ? '<span class="d-none">' + no_struk++ + "</span>"
            : '<span class="d-none"></span>') +
          "<table>" +
          "<tbody>" +
          "<tr>" +
          "<td>No Nota</td>" +
          "<td> : </td>" +
          "<td><strong>" +
          obj.no_nota +
          status +
          "</strong></td>" +
          "</tr>" +
          "<tr>" +
          "<td>Site Code</td>" +
          "<td> : </td>" +
          "<td><strong>" +
          obj.site_no +
          "</strong></td>" +
          "</tr>" +
          "<tr>" +
          "<td>Tgl Transaksi</td>" +
          "<td> : </td>" +
          "<td>" +
          obj.purchase_date +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Amount</td>" +
          "<td> : </td>" +
          "<td>Rp. " +
          obj.amount +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Upload Via</td>" +
          "<td> : </td>" +
          "<td>" +
          (obj.type == "backend" ? "CS" : "Apps") +
          "</td>" +
          "</tr>" +
          "</tbody>" +
          "</table>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="card-keterangan">' +
          '<div class="expired">' +
          "<ul>" +
          "<li>Tanggal unggah : " +
          obj.created_at +
          "</li>" +
          "<li>Struk pembelian valid merupakan struk pembelian bensin di Mobil Indostation min Rp. 25.000 untuk mendapatkan voucher pembelian bensin di unggahan valid ke 1, 3, 6.</li>" +
          "</ul>" +
          "</div>" +
          "</div>" +
          '<a data-id="' +
          obj.id +
          '" href="javascript:void(0)" class="text-muted" onclick="clickDetailstruk(this)">' +
          '<div class="btn btn-outline-secondary w-100 py-2">Lihat Detail</div>' +
          "</a>" +
          "</div>" +
          "</div>";
      }
    }

    $("#list-kupon").html(list_receipt_html);
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
          "Koneksi Time Out - Cek koneksi internet Anda",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }
    }
  });

function clickDetailstruk(param) {
  data = {
    id_receipt: $(param).data("id"),
  };

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },

    url: conn + "/detail-receipt",
    type: "POST",
    dataType: "json",
    data: data,
    timeout: timeout,
  })
    .done(function (values) {
      // console.log(values);
      $("#img-struk").attr(
        "src",
        server_url + "/storage/receipt/" + values.image
      );
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
          "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001 ",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      } else {
        SpinnerDialog.hide();
        if (textStatus == "timeout") {
          navigator.notification.alert(
            "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });

  $(".modal-detail-struk").modal("show");
  $(".icon-close").click(() => {
    $(".modal-detail-struk").modal("hide");
  });
}

// var firstCon = firstConnection();
// var typeK = window.localStorage.getItem('kupon_type');

// if(typeK == "silver")
// {
//     $("#img-ceklis-all").css('display','none');
//     $("#img-ceklis-gold").css('display','none');
//     $("#img-ceklis-silver").css('display','inline');
//     // console.log('silver active');
// }
// else if(typeK == "gold")
// {
//     $("#img-ceklis-all").css('display','none');
//     $("#img-ceklis-gold").css('display','inline');
//     $("#img-ceklis-silver").css('display','none');
// }
// else
// {
//     $("#img-ceklis-all").css('display','inline');
//     $("#img-ceklis-gold").css('display','none');
//     $("#img-ceklis-silver").css('display','none');
// }

// data = {
//     kupon_type: window.localStorage.getItem('kupon_type')
// }
// $.ajax({
//     beforeSend: function(xhr) {
//         xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('access_token'));
//     },
//     type: "POST",
//     url: conn + '/list-kupon',
//     dataType: 'json',
//     timeout: timeout,
//     data:data
// }).done(function(values) {
//     //console.log(values);
//     if ((values.status == 'errors') || (values.status == 'failed')) {
//         navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
//     } else if (values.status == 'success') {
//     	var count_kupon = values.count;
//       	$("#jml-kupon").html('('+count_kupon+')');

//         $("#count_awal_kupon").val(values.total_awal);
//         $("#count_kupon").val(values.count);

//       	var data_fl = values.list_kupon;
//       	for (var i = 0; i < data_fl.length; i++) {
//       		var obj = data_fl[i];

//       		var kupon_img = '';
//       		if(obj.coupon_type == 'silver')
//       		{
//       			kupon_img = 'silver.png';
//       		}
//       		else
//       		{
//       			kupon_img = 'gold.png';
//       		}

//       		$("#list-kupon").append('<div class="card">'+
//                 '<div class="card-body">'+
//                     '<div class="card-image">'+
//                         '<img src="assets/img/sample/kupon/'+kupon_img+'" class="" alt="image">'+
//                     '</div>'+
//                     '<div class="card-detail">'+
//                         '<div class="row card-status">'+
//                             '<div class="col-8">'+
//                                 '<table>'+
//                                     '<tbody>'+
//                                        '<tr>'+
//                                             '<td>Kode Kupon</td>'+
//                                             '<td>:</td>'+
//                                             '<td>'+obj.coupon_prefix+'</td>'+
//                                         '</tr>'+
//                                         '<tr>'+
//                                             '<td>Status</td>'+
//                                             '<td>:</td>'+
//                                             '<td style="color:#5cd3df;">Tersedia</td>'+
//                                         '</tr>'+
//                                     '</tbody>'+
//                                 '</table>'+
//                             '</div>'+
//                             '<div class="col-4" style="text-align: center;">'+
//                                 '<a data-id="' + obj.id + '" href="javascript:;" class="btn-pindai btn-detail-kupon"  onClick="clickDetailkupon(this)">Detail Kupon</a>'+
//                             '</div>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//             '</div>');
//       	}
//     }
//     SpinnerDialog.hide();
// }).fail(function(jqXHR, textStatus, errorThrown) {
//     console.log(jqXHR);
//     console.log(textStatus);
//     console.log(errorThrown);
//     if (jqXHR.readyState == 0) {
//         console.log('Network error (i.e. connection refused, access denied due to CORS, etc.)');
//         navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001', alertDismissed, TITLE_ALERT, 'Ok');

//     } else {
//         SpinnerDialog.hide();
//         if (textStatus == 'timeout') {
//             navigator.notification.alert('Koneksi Time Out - Cek koneksi internet Anda', alertDismissed, TITLE_ALERT, 'Ok');
//         }
//     }
// });

// function clickDetailkupon(param)
// {
//     window.localStorage.removeItem('id_kupon');
//     window.localStorage.setItem('id_kupon', $(param).data('id'));
//     pages('detail-kupon');
// }

// $( ".load-more-kupon" ).click(function() {
//   console.log('load more started');
//   var count_awl = $( "#count_awal_kupon" ).val();
//   var count_total = $( "#count_awal_kupon" ).val();
//   // var suc = parseInt(count)+8 ;
//   // console.log('id_skrg :'+suc);
//   // $( "#count_awal" ).val(suc);
//     data = {
//         kupon_type: window.localStorage.getItem('kupon_type'),
//         offset: count_awl
//     }
//     $.ajax({
//         beforeSend: function(xhr) {
//             xhr.setRequestHeader('Authorization', 'Bearer ' + window.localStorage.getItem('access_token'));
//         },
//         type: "POST",
//         url: conn + '/kupon-loadmore',
//         dataType: 'json',
//         timeout: timeout,
//         data: data
//     }).done(function(values) {
//         //console.log(values);
//         SpinnerDialog.hide();
//         if (values.status == 'errors') {
//             //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
//         } else if (values.status == 'failed') {
//             //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
//         } else if (values.status == 'success') {
//             //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
//             // $("#div-src-produk").hide();
//             var total_plus = values.total_plus;
//             var new_count_awl = parseInt(count_awl) + parseInt(total_plus);
//             console.log(total_plus);
//             console.log(new_count_awl);

//             $("#count_awal_kupon").val(new_count_awl);

//             // $("#count_produk").val(values.total);

//             var data_fl = values.list_kupon;

//             for (var i = 0; i < data_fl.length; i++) {
//                 var obj = data_fl[i];
//                 // console.log(obj.title);
//                 // console.log(data_fl.length);

//                 var kupon_img = '';
//                 if(obj.coupon_type == 'silver')
//                 {
//                     kupon_img = 'silver.png';
//                 }
//                 else
//                 {
//                     kupon_img = 'gold.png';
//                 }

//                $("#list-kupon").append('<div class="card">'+
//                 '<div class="card-body">'+
//                     '<div class="card-image">'+
//                         '<img src="assets/img/sample/kupon/'+kupon_img+'" class="" alt="image">'+
//                     '</div>'+
//                     '<div class="card-detail">'+
//                         '<div class="row card-status">'+
//                             '<div class="col-8">'+
//                                 '<table>'+
//                                     '<tbody>'+
//                                        '<tr>'+
//                                             '<td>Kode Kupon</td>'+
//                                             '<td>:</td>'+
//                                             '<td>'+obj.coupon_prefix+'</td>'+
//                                         '</tr>'+
//                                         '<tr>'+
//                                             '<td>Status</td>'+
//                                             '<td>:</td>'+
//                                             '<td style="color:#5cd3df;">Tersedia</td>'+
//                                         '</tr>'+
//                                     '</tbody>'+
//                                 '</table>'+
//                             '</div>'+
//                             '<div class="col-4" style="text-align: center;">'+
//                                 '<a data-id="' + obj.id + '" href="javascript:;" class="btn-pindai btn-detail-kupon"  onClick="(thclickDetailkuponis)">Detail Kupon</a>'+
//                             '</div>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//             '</div>');
//             }

//         } else {
//             navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
//         }
//         //loading('close');
//     }).fail(function(jqXHR, textStatus, errorThrown) {
//         console.log(jqXHR);
//         console.log(textStatus);
//         console.log(errorThrown);
//         SpinnerDialog.hide();
//         if (jqXHR.readyState == 0) {
//             console.log('Network error (i.e. connection refused, access denied due to CORS, etc.)');
//             navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001', alertDismissed, TITLE_ALERT, 'Ok');
//         } else {
//             if (textStatus == 'timeout') {
//                 navigator.notification.alert('Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001', alertDismissed, TITLE_ALERT, 'Ok');
//             }
//         }
//     });
// });
