$(document).ready(function () {
    checkIsLoggedIn().done(function (values) {
      if (values.status_login == false) {
        pages("login");
      }
    });
  });
  
  var firstCon = firstConnection();
  
  if (firstCon == "online") {
    window.localStorage.removeItem("province_id");
  
  
    $.ajax({
      type: "POST",
      url: conn + "/get-nearest-site",
      data: {
        latitude: window.localStorage.getItem("latitude"),
        longitude: window.localStorage.getItem("longitude"),
      },
      dataType: "json",
      timeout: timeout,
      // data: data,
    })
      .done(function (values) {
        console.log(values);
        var results = values.results;
        SpinnerDialog.hide();
        if (values.status == "failed") {
          //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
        } else if (values.status == "success") {
          //navigator.notification.alert(values.message, alertDismissed, TITLE_ALERT, 'Ok');
          var result_list = "";
          for (var i = 0; i < 5; i++) {
            //,\"' +results[i].site_name + '\"
            result_list +=
              '<a href="javascript:void(0)" onClick="openMap(' +
              results[i].latitude +
              "," +
              results[i].longitude +
              ')" class="">';
            result_list += '<div class="row detail item mb-2 p-0">';
            result_list +=
              '<div class="col-3"><img src="assets/img/site-icon-120.png" alt="img" class="image-block imaged w76"></div>';
            result_list +=
              '<div style="line-height:1.2rem;" class="col-6 pt-1 pb-1">';
            result_list += "<strong>" + results[i].site_name + "</strong>";
            result_list +=
              "<p>Kode Outlet : <strong>" +
              results[i].site_code +
              "</strong><br/>";
            result_list += results[i].address_1 + "</p>";
            result_list += "</div>";
            result_list += '<div class="col-3 text-center">';
            result_list +=
              '<img src="assets/img/sample/site/icon-site.png" alt="img" class="image-block" style="width: 20px;">';
            result_list +=
              '<strong style="font-size:.8rem;display:block;">' +
              results[i].distance +
              " KM</strong>";
            result_list += "</div>";
            result_list += "</div>";
            result_list += "</a>";
          }
  
          $(".pageListContainerHafalan").html(result_list);
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
  