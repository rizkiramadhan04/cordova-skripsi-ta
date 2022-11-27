var firstCon = firstConnection();
var store_name = window.localStorage.getItem("store_name");
var store_email = window.localStorage.getItem("email");
var store_no_hp = window.localStorage.getItem("no_hp");
store_name = store_name.capitalize();
window.localStorage.removeItem("id_edit_frontliner");

$(document).ready(function () {
  $(".store-name").text(store_name);
  $(".store-email").text(store_email);
  $(".store-no-hp").text(store_no_hp);
});

function clickEditProfile(param) {
  window.localStorage.removeItem("id_edit_frontliner");
  //console.log($(param).data('id'));
  window.localStorage.setItem("id_edit_frontliner", $(param).data("id"));
  pages("frontliner-edit");
}

if (firstCon == "online") {
  SpinnerDialog.show(null, "Mengirim data ...");
  data = {
    store_id: window.localStorage.getItem("store_id"),
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
    url: conn + "/frontliner/list",
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
        var data_fl = values.data;
        for (var i = 0; i < data_fl.length; i++) {
          var obj = data_fl[i];
          console.log(obj.name);
          $("#list-frontliner").append(
            '<li class="list-group-item"><div class="row"><div class="col-9">' +
              '<a href="#" class="media">' +
              '<div class="w-auto h-100">' +
              '<figure class="avatar avatar-40"><img src="assets/img/user1.png" alt=""> </figure>' +
              "</div>" +
              '<div class="media-body">' +
              "<h5>" +
              obj.name +
              "</h5>" +
              "<p>" +
              obj.email +
              "</p>" +
              "<p>" +
              obj.no_hp +
              "</p>" +
              "</div>" +
              "</a></div>" +
              '<div class="col-3 text-center"><a data-id="' +
              obj.id +
              '" href="javascript:;" onClick="clickEditProfile(this)"><i class="material-icons">mode_edit</i> Edit</a></div>' +
              "</div></li>"
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
