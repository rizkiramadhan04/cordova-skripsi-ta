// $(document).ready(function () {
//   checkIsLoggedIn().done(function (values) {
//     if (values.status_login == false) {
//       pages("login");
//     }
//   });
// });

$.ajax({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + window.localStorage.getItem("access_token")
    );
    xhr.setRequestHeader("Accept", "application/json");
  },
  type: "POST",
  url: conn + "/get-data",
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
      // console.log('profil js started');
      let data_profile = "";
      let no_member = "";
      if (values.no_member == null) {
        no_member = "";
      } else {
        no_member = values.no_member;
      }
      // assets/img/sample/avatar/icon-user.png

      if (values.file_photo == null) {
        var foto = "assets/img/sample/avatar/icon-user.png";
      } else {
        var foto = values.file_photo;
      }

      // console.log("foto :" + foto);
      $("#foto-user").attr("src", foto);
      $("#real_foto_foto_user").attr("src", foto);
      // $("#sidebarPanelFoto").attr("src", foto);
      $("#profil_member_kode_member").text(no_member);
      $("#modalMemberName").text(values.nama);
      $("#modalMemberId").text(no_member);

      data_profile += '<div class="table-responsive"><table class="table">';
      data_profile += "<tr>";
      data_profile += '<th scope="row">Nama</th>';
      data_profile +=
        '<td class="text-end text-primary">' + values.nama + "</td>";
      data_profile += "</tr>";
      data_profile += "<tr>";
      data_profile += '<th scope="row">Nomer Telepon</th>';
      data_profile +=
        '<td class="text-end text-primary">' + values.no_hp + "</td>";
      data_profile += "</tr>";
      data_profile += "<tr>";
      data_profile += '<th scope="row">Tanggal lahir</th>';
      data_profile +=
        '<td class="text-end text-primary">' + values.tanggal_lahir + "</td>";
      data_profile += "</tr>";
      data_profile += "<tr>";
      data_profile += '<th scope="row">Email</th>';
      data_profile +=
        '<td class="text-end text-primary">' + values.email + "</td>";
      data_profile += "</tr>";
      data_profile += "<tr>";
      data_profile += '<th scope="row">Alamat</th>';
      data_profile +=
        '<td class="text-end text-primary">' + values.alamat + "</td>";
      data_profile += "</tr>";
      data_profile += "<tr>";
      data_profile +=
        '<td colspan="2 pt-2 pb-2"><button type="submit" onClick="logout()"class="btn btn-primary btn-block btn-lg"><i class="material-icons">exit_to_app</i> Logout</button>';
      data_profile += "</td>";
      data_profile += "</tr>";
      data_profile += "</table></div>";

      $("#container_profile").append(data_profile);
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
        "Koneksi offline - Cek koneksi internet Anda.",
        alertDismissed,
        TITLE_ALERT,
        "Ok"
      );
    } else {
      SpinnerDialog.hide();
      if (textStatus == "timeout") {
        navigator.notification.alert(
          "Request Time Out - Cek koneksi internet Anda.",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
      }
    }
  });

function showDetailMember() {
  $("#memberCardModal").modal("show");
}

function closeMemberCardModal() {
  $("#memberCardModal").modal("hide");
}
