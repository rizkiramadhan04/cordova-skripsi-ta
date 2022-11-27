$(document).ready(function () {
  $("#uploadFotoUser").submit(function (e) {
    e.preventDefault();
  });

  // get kota

  // get kota jika tidak ubah provinsi

  var parent_id = window.localStorage.getItem("province_id");
  // console.log("parent_id : " + parent_id);

  myDB.transaction(function (transaction) {
    transaction.executeSql(
      "SELECT * FROM city_local WHERE parent_id = " + parent_id,
      [],
      function (tx, result) {
        // console.log("Data City : " + result.rows);
        var data_city = result.rows;
        var option_list = "";

        for (var i = 0; i < data_city.length; i++) {
          var city_name = data_city[i];

          option_list +=
            "<option value='" +
            city_name.id +
            "'>" +
            city_name.name +
            "</option> \n";

          // console.log("data city :" + city_name.parent_id);
        }

        // console.log(option_list);
        var jml_option = $("#formUpdateKota option").length;

        if (jml_option > 1) {
          $("#formUpdateKota").html(option_list).trigger("change");
        } else {
          $("#formUpdateKota").append(option_list).trigger("change");
        }
      }
    );
  });

  //end get kota jika tidak merubah provinsi

  // get kota jika merubah provinsi

  $("#formUpdateProvinsi").on("change", function () {
    // console.log($("#formUpdateProvinsi").val());

    if ($("#formUpdateProvinsi").val() != "") {
      $("#formUpdateKota").prop("disabled", false);
    } else {
      $("#formUpdateKota").prop("disabled", true);
      $("#formUpdateKota").html('<option value="">-- Pilih Kota --</option>');
    }

    var parent_id = $("#formUpdateProvinsi").val();
    // console.log("parent_id : " + parent_id);

    myDB.transaction(function (transaction) {
      transaction.executeSql(
        "SELECT * FROM city_local WHERE parent_id = " + parent_id,
        [],
        function (tx, result) {
          // console.log("Data City : " + result.rows);
          var data_city = result.rows;
          var option_list = "";

          for (var i = 0; i < data_city.length; i++) {
            var city_name = data_city[i];

            option_list +=
              "<option value='" +
              city_name.id +
              "'>" +
              city_name.name +
              "</option> \n";

            // console.log("data city :" + city_name.parent_id);
          }

          // console.log(option_list);
          var jml_option = $("#formUpdateKota option").length;

          if (jml_option > 1) {
            $("#formUpdateKota").html(option_list).trigger("change");
          } else {
            $("#formUpdateKota").append(option_list).trigger("change");
          }
        }
      );
    });
  });

  //end get kota jika merubah provinsi

  // get kota
});

function updateData() {
  event.preventDefault();
  // navigator.notification.alert('simpan foto user', alertDismissed, TITLE_ALERT, 'Ok');
  SpinnerDialog.show(null, "Simpan data ...");
  // var foto= $('#foto_text_foto_user').val();
  var name = $("#formUpdateName").val();
  var email = $("#formUpdateEmail").val();
  var hp = $("#formUpdateNoHp").val();
  var ktp = $("#formUpdateKTP").val();
  var dob = $("#formUpdateDob").val();
  var provinsi = $("#formUpdateProvinsi").val();
  var city_id = $("#formUpdateKota").val();

  data = {
    name: name,
    email: email,
    no_hp: hp,
    ktp: ktp,
    dob: dob,
    province_id: provinsi,
    city_id: city_id,
  };

  console.log(data);

  $.ajax({
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + window.localStorage.getItem("access_token")
      );
      xhr.setRequestHeader("Accept", "application/json");
    },
    type: "POST",
    url: conn + "/update-data-profile",
    dataType: "json",
    timeout: timeout,
    data: data,
  })
    .done(function (values) {
      // console.log(values);
      if (values.status == "success") {
        navigator.notification.alert(
          "Data berhasil diupdate",
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        SpinnerDialog.hide();

        pages("profil");
      } else {
        navigator.notification.alert(
          values.message,
          alertDismissed,
          TITLE_ALERT,
          "Ok"
        );
        SpinnerDialog.hide();
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
            "Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        }
      }
    });
}
