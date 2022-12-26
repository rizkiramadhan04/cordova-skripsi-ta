
var firstCon = firstConnection();

if (firstCon == "online") {

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "GET",
    url: conn + "/get-data-pencatatan-by-guru",
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
        var result_list = "";
        
        if (results.length == 3) {
          
          result_list += '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[0].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[0].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[0].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[0].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Hasil <b/><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[0].hasil+'</strong></p>'+
                '</div>'+
             '</div>'+
         '</a>'+
         '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[1].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[1].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[1].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[1].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Hasil </b><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[1].hasil+'</strong></p>'+
                '</div>'+
             '</div>'+
         '</a>'+
         '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[2].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[2].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[2].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[2].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Nilai </b><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[2].hasil+'</strong></p>'+
               ' </div>'+
             '</div>'+
         '</a>';
  
        } else if (results.length == 2) {
  
          result_list += '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[0].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[0].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[0].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[0].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Hasil </b><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[0].hasil+'</strong></p>'+
                '</div>'+
             '</div>'+
         '</a>'+
         '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[1].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[1].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[1].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[1].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Hasil </b><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[1].hasil+'</strong></p>'+
                '</div>'+
             '</div>'+
         '</a>';
  
        } else if (results.length == 1) {
  
          result_list += '<a href="javascript:void(0)">'+
             '<div class="row detail item mb-2 p-0">'+
              '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                    '<strong>Mengaji</strong>'+
                    '<p>Nama Murid : <strong>'+results[0].nama_murid+'</strong><br/></p>'+
                    '<p>Kitab : <strong>'+results[0].jenis_kitab+'</strong><br/></p>'+
                    '<p>Nama Guru : <strong>'+results[0].nama_guru+'</strong><br/></p>'+
                    '<p>Tanggal : <strong>'+results[0].tanggal+'</strong><br/></p>'+
                '</div>'+
                '<div class="col-3 text-center">'+
                    '<p><b> Hasil </b><br/></p>'+
                    '<p><strong style="font-size:.8rem;">'+results[0].hasil+'</strong></p>'+
                '</div>'+
             '</div>'+
         '</a>';
        }
  
        $("#pageMengajiContainer").html(result_list);
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

} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
