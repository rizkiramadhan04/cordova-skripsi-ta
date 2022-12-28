
var firstCon = firstConnection();
var status_user = window.localStorage.getItem('status_user');

if (firstCon == "online") {

  if (status_user == 'Guru') {

    $('#title-page').append('List Mengajar');
    $('#title-section').append('Daftar mengajar anda');

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
          
          for (var i = 0; i < results.length; i++) {

            var data_pct = results[i];
            
            result_list += '<a href="javascript:void(0)">'+
               '<div class="row detail item mb-2 p-0">'+
                '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                  '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                      '<strong>Mengaji</strong>'+
                      '<p>Nama Murid : <strong>'+data_pct.nama_murid+'</strong><br/></p>'+
                      '<p>Kitab : <strong>'+data_pct.jenis_kitab+'</strong><br/></p>'+
                      '<p>Nama Guru : <strong>'+data_pct.nama_guru+'</strong><br/></p>'+
                      '<p>Tanggal : <strong>'+data_pct.tanggal+'</strong><br/></p>'+
                  '</div>'+
                  '<div class="col-3 text-center">'+
                      '<p><b> Hasil <b/><br/></p>'+
                      '<p><strong style="font-size:.8rem;">'+data_pct.hasil+'</strong></p>'+
                  '</div>'+
               '</div>'+
           '</a>';
          }
    
          $("#list-mengaji").html(result_list);
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

    $('#title-page').append('List Mengaji');
    $('#title-section').append('Daftar mengaji anda');

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
          
          for (var i = 0; i < results.length; i++) {
            
            var data_pct = results[i];

            result_list += '<a href="javascript:void(0)">'+
               '<div class="row detail item mb-2 p-0">'+
                '<div class="col-3"><img src="assets/img/icon-cacatan.png" alt="img" class="image-block imaged w76"></div>'+
                  '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">'+
                      '<strong>Mengaji</strong>'+
                      '<p>Nama Murid : <strong>'+data_pct.nama_murid+'</strong><br/></p>'+
                      '<p>Kitab : <strong>'+data_pct.jenis_kitab+'</strong><br/></p>'+
                      '<p>Nama Guru : <strong>'+data_pct.nama_guru+'</strong><br/></p>'+
                      '<p>Tanggal : <strong>'+data_pct.tanggal+'</strong><br/></p>'+
                  '</div>'+
                  '<div class="col-3 text-center">'+
                      '<p><b> Hasil <b/><br/></p>'+
                      '<p><strong style="font-size:.8rem;">'+data_pct.hasil+'</strong></p>'+
                  '</div>'+
               '</div>'+
           '</a>';
    
          }
    
          $("#list-mengaji").html(result_list);

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

  }

} else {
  SpinnerDialog.hide();
  navigator.notification.alert(
    "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
    alertDismissed,
    TITLE_ALERT,
    "Ok"
  );
}
