$(document).ready(function () {
  // checkIsLoggedIn().done(function (values) {
  //   if (values.status_login == false) {
  //     pages("login");
  //   }
  // });
});

var firstCon = firstConnection();

  function scan() {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      },
      function (error) {
          alert("Scanning failed: " + error);
      }
   );
      // {
          // preferFrontCamera : true, // iOS and Android
          // showFlipCameraButton : true, // iOS and Android
          // showTorchButton : true, // iOS and Android
          // torchOn: true, // Android, launch with the torch switched on (if available)
          // saveHistory: true, // Android, save scan history (default false)
          // prompt : "Place a barcode inside the scan area", // Android
          // resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          // orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          // disableAnimations : true, // iOS
          // disableSuccessBeep: false // iOS and Android
      // }

  //  pages('presensi');
  }

// function clickDetailstruk(param) {
//   data = {
//     id_receipt: $(param).data("id"),
//   };

//   $.ajax({
//     beforeSend: function (xhr) {
//       xhr.setRequestHeader(
//         "Authorization",
//         "Bearer " + window.localStorage.getItem("access_token")
//       );
//       xhr.setRequestHeader("Accept", "application/json");
//     },

//     url: conn + "/detail-receipt",
//     type: "POST",
//     dataType: "json",
//     data: data,
//     timeout: timeout,
//   })
//     .done(function (values) {
//       // console.log(values);
//       $("#img-struk").attr(
//         "src",
//         server_url + "/storage/receipt/" + values.image
//       );
//     })
//     .fail(function (jqXHR, textStatus, errorThrown) {
//       console.log(jqXHR);
//       console.log(textStatus);
//       console.log(errorThrown);
//       if (jqXHR.readyState == 0) {
//         console.log(
//           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
//         );
//         navigator.notification.alert(
//           "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001 ",
//           alertDismissed,
//           TITLE_ALERT,
//           "Ok"
//         );
//       } else {
//         SpinnerDialog.hide();
//         if (textStatus == "timeout") {
//           navigator.notification.alert(
//             "Koneksi Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
//             alertDismissed,
//             TITLE_ALERT,
//             "Ok"
//           );
//         }
//       }
//     });

//   $(".modal-detail-struk").modal("show");
//   $(".icon-close").click(() => {
//     $(".modal-detail-struk").modal("hide");
//   });
// }

var firstCon = firstConnection();
var status_presensi = window.localStorage.getItem('status_presensi');

if(status_presensi == 0)
{
    $("#img-ceklis-all").css('display','none');
    $("#img-ceklis-izin").css('display','none');
    $("#img-ceklis-presensi").css('display','inline');
    // console.log('presensi active');
}
else if(status_presensi == 1)
{
    $("#img-ceklis-all").css('display','none');
    $("#img-ceklis-izin").css('display','inline');
    $("#img-ceklis-presensi").css('display','none');
}
else
{
    $("#img-ceklis-all").css('display','inline');
    $("#img-ceklis-izin").css('display','none');
    $("#img-ceklis-presensi").css('display','none');
}

data = {
  status_presensi: window.localStorage.getItem('status_presensi')
}

$.ajax({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + window.localStorage.getItem("access_token")
    );
    xhr.setRequestHeader("Accept", "application/json");
  },
  type: "GET",
  url: conn + "/get-data-presensi",
  dataType: "json",
  timeout: timeout,
  // data: data,
})
  .done(function (values) {
    console.log(values);
    var results = values.data;
  
    SpinnerDialog.hide();
    if (values.status == "failed") {
      navigator.notification.alert(
        values.message,
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else if (values.status == "success") {
      //   //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
      console.log(results);
      var result_list = "";
      
      if (results.length == 3) {
        
        result_list += '<a href="javascript:void(0)">'+
           '<div class="row detail item mb-2 p-0">'+
            '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
              '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                  '<strong>Presensi</strong>'+
                  '<p>Nama  : <strong>'+results[0].nama+'</strong><br/></p>'+
                  '<p>Waktu : <strong>'+results[0].waktu_masuk+'</strong><br/></p>'+
                  '<p>Tanggal : <strong>'+(results[0].tanggal_masuk != null ? results[0].tanggal_masuk : results[0].tanggal_izin)+'</strong><br/></p>'+
                  '<p>Izin : <strong>'+(results[0].izin != null ? results[0].alasan_izin : '-')+'</strong><br/></p>'+
                  '</div>'+
              '<div class="col-3 text-center">'+
                  '<p><b> Status <b/><br/></p>'+
                  '<p><strong style="font-size:.8rem;">'+(results[0].status_masuk != null ? results[0].status_masuk : '-')+'</strong></p>'+
              '</div>'+
           '</div>'+
       '</a>'+
       '<a href="javascript:void(0)">'+
           '<div class="row detail item mb-2 p-0">'+
            '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
              '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                  '<strong>Presensi</strong>'+
                  '<p>Nama  : <strong>'+results[1].nama+'</strong><br/></p>'+
                  '<p>Waktu : <strong>'+results[1].waktu_masuk+'</strong><br/></p>'+
                  '<p>Tanggal : <strong>'+(results[1].tanggal_masuk != null ? results[1].tanggal_masuk : results[1].tanggal_izin)+'</strong><br/></p>'+
                  '<p>Izin : <strong>'+(results[1].izin != null ? results[1].alasan_izin : '-')+'</strong><br/></p>'+
                  '</div>'+
              '<div class="col-3 text-center">'+
                  '<p><b> Status <b/><br/></p>'+
                  '<p><strong style="font-size:.8rem;">'+(results[0].status_masuk != null ? results[1].status_masuk : '-')+'</strong></p>'+
              '</div>'+
           '</div>'+
       '</a>'+
       '<a href="javascript:void(0)">'+
           '<div class="row detail item mb-2 p-0">'+
            '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
              '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                  '<strong>Presensi</strong>'+
                  '<p>Nama  : <strong>'+results[2].nama+'</strong><br/></p>'+
                  '<p>Waktu : <strong>'+results[2].waktu_masuk+'</strong><br/></p>'+
                  '<p>Tanggal : <strong>'+(results[2].tanggal_masuk != null ? results[2].tanggal_masuk : results[2].tanggal_izin)+'</strong><br/></p>'+
                  '<p>Izin : <strong>'+(results[2].izin != null ? results[2].alasan_izin : '-')+'</strong><br/></p>'+
                  '</div>'+
              '<div class="col-3 text-center">'+
                  '<p><b> Status <b/><br/></p>'+
                  '<p><strong style="font-size:.8rem;">'+(results[2].status_masuk != null ? results[2].status_masuk : '-')+'</strong></p>'+
              '</div>'+
           '</div>'+
       '</a>';

      } else if (results.length == 2) {

        result_list += '<a href="javascript:void(0)">'+
        '<div class="row detail item mb-2 p-0">'+
         '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
           '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
               '<strong>Presensi</strong>'+
               '<p>Nama  : <strong>'+results[0].nama+'</strong><br/></p>'+
               '<p>Waktu : <strong>'+results[0].waktu_masuk+'</strong><br/></p>'+
               '<p>Tanggal : <strong>'+(results[0].tanggal_masuk != null ? results[0].tanggal_masuk : results[0].tanggal_izin)+'</strong><br/></p>'+
               '<p>Izin : <strong>'+(results[0].izin != null ? results[0].alasan_izin : '-')+'</strong><br/></p>'+
               '</div>'+
           '<div class="col-3 text-center">'+
               '<p><b> Status <b/><br/></p>'+
               '<p><strong style="font-size:.8rem;">'+(results[0].status_masuk != null ? results[0].status_masuk : '-')+'</strong></p>'+
           '</div>'+
        '</div>'+
    '</a>'+
    '<a href="javascript:void(0)">'+
      '<div class="row detail item mb-2 p-0">'+
      '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
        '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
            '<strong>Presensi</strong>'+
            '<p>Nama  : <strong>'+results[1].nama+'</strong><br/></p>'+
            '<p>Waktu : <strong>'+results[1].waktu_masuk+'</strong><br/></p>'+
            '<p>Tanggal : <strong>'+(results[1].tanggal_masuk != null ? results[1].tanggal_masuk : results[1].tanggal_izin)+'</strong><br/></p>'+
            '<p>Izin : <strong>'+(results[1].izin != null ? results[1].alasan_izin : '-')+'</strong><br/></p>'+
            '</div>'+
        '<div class="col-3 text-center">'+
            '<p><b> Status <b/><br/></p>'+
            '<p><strong style="font-size:.8rem;">'+(results[1].status_masuk != null ? results[1].status_masuk : '-')+'</strong></p>'+
        '</div>'+
      '</div>'+
    '</a>';

      } else if (results.length == 1) {

        result_list += '<a href="javascript:void(0)">'+
        '<div class="row detail item mb-2 p-0">'+
         '<div class="col-3"><img src="assets/img/icon-presensi.png" alt="img" class="image-block imaged w76"></div>'+
           '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
               '<strong>Presensi</strong>'+
               '<p>Nama  : <strong>'+results[0].nama+'</strong><br/></p>'+
               '<p>Waktu : <strong>'+results[0].waktu_masuk+'</strong><br/></p>'+
               '<p>Tanggal : <strong>'+(results[0].tanggal_masuk != null ? results[0].tanggal_masuk : results[0].tanggal_izin)+'</strong><br/></p>'+
               '<p>Izin : <strong>'+(results[0].izin != null ? results[0].alasan_izin : '-')+'</strong><br/></p>'+
               '</div>'+
           '<div class="col-3 text-center">'+
               '<p><b> Status <b/><br/></p>'+
               '<p><strong style="font-size:.8rem;">'+(results[0].status_masuk != null ? results[0].status_masuk : '-')+'</strong></p>'+
           '</div>'+
        '</div>'+
    '</a>';
      }

      $("#presensiContainer").html(result_list);
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
