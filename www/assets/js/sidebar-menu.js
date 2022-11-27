function showSidebar() {
  $("#sidebarPanel").modal("show");
  var akses_token = window.localStorage.getItem("access_token");

  if (akses_token !== "") {
    $.ajax({
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + window.localStorage.getItem("access_token")
        );
        xhr.setRequestHeader("Accept", "application/json");
      },
      type: "POST",
      url: conn + "/profile",
      dataType: "json",
      timeout: timeout,
    })
      .done(function (values) {
        if (values.status == "success") {
          if (values.file_photo == null) {
            var foto = "assets/img/sample/avatar/icon-user.png";
          } else {
            var foto = values.file_photo;
          }

          $("#sidebarPanelFoto").attr("src", foto);
          $("#nameSidebarPanel").text(values.nama);
          $("#emailSidebarPanel").text(values.email);
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        if (jqXHR.readyState == 0) {
          console.log(
            "Network error (i.e. connection refused, access denied due to CORS, etc.)"
          );
          // navigator.notification.alert('Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001', alertDismissed, TITLE_ALERT, 'Ok');
          $("#nameSidebarPanel").text("Periksa Koneksi");
          $("#emailSidebarPanel").text("Periksa Koneksi");
        } else {
          SpinnerDialog.hide();
          if (textStatus == "timeout") {
            // navigator.notification.alert('Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001', alertDismissed, TITLE_ALERT, 'Ok');
            $("#nameSidebarPanel").text("Periksa Koneksi");
            $("#emailSidebarPanel").text("Periksa Koneksi");
          }
        }
      });
  }
}
