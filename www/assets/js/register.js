var firstCon = firstConnection();
var latitude = window.localStorage.getItem("latitude");
var longitude = window.localStorage.getItem("longitude");
var version_number = window.localStorage.getItem("versionDevice");
var uuid_devices = window.localStorage.getItem("device_uuid");
var dropdown_tgl_lahir;
var dropdown_bln_lahir;
var dropdown_thn_lahir;
var modalTNC = new bootstrap.Modal(document.getElementById("modalTNC"), {});
var pop_up_geoloc = window.localStorage.getItem("pop_up_geoloc");

$(document).ready(function () {
  // console.log("latitude : ", latitude);
  // console.log("longitude : ", longitude);

  if (player_id == "undefined") {
    OneSignalInit();
  }

  //register device to OneSignal
  deviceUserRegister();
  //register device to OneSignal

  if (
    latitude == null ||
    (latitude == 0 && longitude == null) ||
    longitude == 0
  ) {
    if (pop_up_geoloc) {
      if (pop_up_geoloc == 0) {
        function onConfirm(buttonIndex) {
          // console.log(buttonIndex);
          if (buttonIndex == 1) {
            window.localStorage.setItem("pop_up_geoloc", 1);
            document.addEventListener(getLocation());
          }
        }

        navigator.notification.confirm(
          "Pastikan lokasi anda menyala & izinkan akses lokasi anda!, sebelum melakukan Register. Silahkan hubungi Call Center Kode : #LOC-001", // message
          onConfirm, // callback to invoke with index of button pressed
          TITLE_ALERT, // title
          ["Oke"] // buttonLabels
        );
      } else {
        document.addEventListener(getLocation());
      }
    } else {
      function onConfirm(buttonIndex) {
        // console.log(buttonIndex);
        if (buttonIndex == 1) {
          window.localStorage.setItem("pop_up_geoloc", 1);
          document.addEventListener(getLocation());
        }
      }

      navigator.notification.confirm(
        "Pastikan lokasi anda menyala & izinkan akses lokasi anda!, sebelum melakukan Login. Silahkan hubungi Call Center Kode : #LOC-001", // message
        onConfirm, // callback to invoke with index of button pressed
        TITLE_ALERT, // title
        ["Oke"] // buttonLabels
      );
    }
  }

  $(".select2-basic").select2();

  for (let i = 1; i <= 31; i++) {
    dropdown_tgl_lahir +=
      '<option value="' +
      i.toString().padStart(2, "0") +
      '">' +
      i.toString().padStart(2, "0") +
      "</option>";
  }

  var month = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  for (let i = 1; i <= 12; i++) {
    dropdown_bln_lahir +=
      '<option value="' +
      i.toString().padStart(2, "0") +
      '">' +
      month[i] +
      "</option>";
  }

  for (let i = 2010; i >= 1940; i--) {
    dropdown_thn_lahir += '<option value="' + i + '">' + i + "</option>";
  }

  $("#formRegisterTglLahir").append(dropdown_tgl_lahir);
  $("#formRegisterBlnLahir").append(dropdown_bln_lahir);
  $("#formRegisterThnLahir").append(dropdown_thn_lahir);

  $("#formRegisterKota").prop("disabled", true);

  $(".select2-basic").select2();
  $("#formRegisterProvinsi").on("change", function () {
    // console.log($("#formRegisterProvinsi").val());

    if ($("#formRegisterProvinsi").val() != "") {
      $("#formRegisterKota").prop("disabled", false);
    } else {
      $("#formRegisterKota").prop("disabled", true);
      $("#formRegisterKota").html('<option value="">-- Pilih Kota --</option>');
    }

    var parent_id = $("#formRegisterProvinsi").val();
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
          var jml_option = $("#formRegisterKota option").length;

          if (jml_option > 1) {
            $("#formRegisterKota").html(option_list).trigger("change");
          } else {
            $("#formRegisterKota").append(option_list).trigger("change");
          }
        }
      );
    });
  });

  $(".select2-basic").select2();
  // $("#formRegisterProvinsi").on("change", function () {
  //   // console.log($("#formRegisterProvinsi").val());

  //   if ($("#formRegisterProvinsi").val() != "") {
  //     $("#formRegisterKota").prop("disabled", false);
  //   } else {
  //     $("#formRegisterKota").prop("disabled", true);
  //     $("#formRegisterKota").html('<option value="">-- Pilih Kota --</option>');
  //   }

  //   var data = {
  //     parent_id: $("#formRegisterProvinsi").val(),
  //   };

  //   // console.log("parent_id : " + data.parent_id);

  //   // $(".select2-basic").select2();
  //   // $("#wrapper-fo rm-kota").show();
  //   $.ajax({
  //     type: "POST",
  //     url: conn + "/kota",
  //     dataType: "json",
  //     data: data,
  //     timeout: timeout,
  //   })
  //     .done(function (values) {
  //       console.log(values);
  //       if (values.status == "failed" || values.status == "errors") {
  //         navigator.notification.alert(
  //           values.message,
  //           alertDismissed,
  //           TITLE_ALERT,
  //           "Ok"
  //         );
  //       } else if (values.status == "success") {
  //         // console.log(values);
  //         var list_kota = values.data;
  //         var option_list = "";
  //         for (var i = 0; i < list_kota.length; i++) {
  //           option_list +=
  //             "<option value='" +
  //             list_kota[i].id +
  //             "'>" +
  //             list_kota[i].name +
  //             "</option> \n";
  //         }

  //         // console.log(option_list);
  //         var jml_option = $("#formRegisterKota option").length;

  //         if (jml_option > 1) {
  //           $("#formRegisterKota").html(option_list).trigger("change");
  //         } else {
  //           $("#formRegisterKota").append(option_list).trigger("change");
  //         }
  //       }
  //     })
  //     .fail(function (jqXHR, textStatus, errorThrown) {
  //       console.log(jqXHR);
  //       console.log(textStatus);
  //       console.log(errorThrown);
  //       SpinnerDialog.hide();
  //       if (jqXHR.readyState == 0) {
  //         console.log(
  //           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
  //         );
  //         navigator.notification.alert(
  //           "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
  //           alertDismissed,
  //           TITLE_ALERT,
  //           "Ok"
  //         );
  //       } else {
  //         if (textStatus == "timeout") {
  //           navigator.notification.alert(
  //             "Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
  //             alertDismissed,
  //             TITLE_ALERT,
  //             "Ok"
  //           );
  //         }
  //       }
  //     });
  // });

  // $(".select2-basic").select2();
  // $("#formRegisterKota").on("select2:select", function (e) {
  //   var data = e.params.data;
  //   // console.log(data.id);

  //   $.ajax({
  //     type: "GET",
  //     url: conn + "/kota",
  //     dataType: "json",
  //     timeout: timeout,
  //   })
  //     .done(function (values) {
  //       console.log(values);
  //       if (values.status == "failed" || values.status == "errors") {
  //         navigator.notification.alert(
  //           values.message,
  //           alertDismissed,
  //           TITLE_ALERT,
  //           "Ok"
  //         );
  //       } else if (values.status == "success") {
  //         console.log(values);
  //         var list_kota = values.data;
  //         var option_list = "";
  //         for (var i = 0; i < list_kota.length; i++) {
  //           option_list +=
  //             "<option value='" +
  //             list_kota[i].id +
  //             "'>" +
  //             list_kota[i].name +
  //             "</option> \n";
  //         }

  //         console.log(option_list);
  //         var jml_option = $("#formRegisterKota option").length;

  //         if (jml_option > 1) {
  //           $("#formRegisterKota").html(option_list).trigger("change");
  //         } else {
  //           $("#formRegisterKota").append(option_list).trigger("change");
  //         }
  //       }
  //     })
  //     .fail(function (jqXHR, textStatus, errorThrown) {
  //       console.log(jqXHR);
  //       console.log(textStatus);
  //       console.log(errorThrown);
  //       SpinnerDialog.hide();
  //       if (jqXHR.readyState == 0) {
  //         console.log(
  //           "Network error (i.e. connection refused, access denied due to CORS, etc.)"
  //         );
  //         navigator.notification.alert(
  //           "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
  //           alertDismissed,
  //           TITLE_ALERT,
  //           "Ok"
  //         );
  //       } else {
  //         if (textStatus == "timeout") {
  //           navigator.notification.alert(
  //             "Request Time Out - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #OFF-001",
  //             alertDismissed,
  //             TITLE_ALERT,
  //             "Ok"
  //           );
  //         }
  //       }
  //     });
  // });

  $("#btn-confirm").click(function () {
    submitRegister();
  });
});

function submitRegister() {
  event.preventDefault();

  if (firstCon == "online") {
    SpinnerDialog.show(null, "Mengirim data ...");
    data = {
      name: $("#formRegisterName").val(),
      email: $("#formRegisterEmail").val(),
      no_hp: $("#formRegisterNoHp").val(),
      ktp: $("#formRegisterKTP").val(),
      year: $("#formRegisterThnLahir").val(),
      month: $("#formRegisterBlnLahir").val(),
      date: $("#formRegisterTglLahir").val(),
      // provinsi: $("#formRegisterProvinsi").val(),
      latitude: latitude,
      longitude: longitude,
      register_type: "app",
      password: $("#formRegisterPassword").val(),
      password_confirmation: $("#formRegisterPasswordConfirmation").val(),
      uuid_devices: uuid_devices,
      city: $("#formRegisterKota").val(),
      province_id: $("#formRegisterProvinsi").val(),
      city_id: $("#formRegisterKota").val(),
      // syarat_ketentuan = $('#formRegisterSyaratKetentuan').val()
    };

    console.log(data);

    $.ajax({
      type: "POST",
      url: conn + "/register",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        console.log(values);
        SpinnerDialog.hide();
        if (values.status == "failed" || values.status == "errors") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
          $(".modal-register-apps").modal("hide");
          SpinnerDialog.hide();
        } else if (values.status == "success") {
          $(".modal-register-apps").modal("hide");
          if (values.province_id == 11) {
            navigator.notification.alert(
              "Selamat Anda telah berhasil terdaftar, silahkan masukan kode OTP, dan Login untuk mendapatkan Voucher!",
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          } else if (values.city_id == 23) {
            navigator.notification.alert(
              "Selamat Anda telah berhasil terdaftar, silahkan masukan kode OTP, dan Login untuk mendapatkan Voucher!",
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          } else {
            navigator.notification.alert(
              "Selamat Anda telah berhasil terdaftar, silahkan masukan kode OTP untuk mengaktifkan akun Anda!",
              alertDismissed,
              TITLE_ALERT,
              "Ok"
            );
          }
          // console.log(values.data.user.id);
          // console.log(values.data.user.email);
          window.localStorage.setItem(
            "register_user_id_sess",
            values.data.user.id
          );
          window.localStorage.setItem(
            "register_email_sess",
            values.data.user.email
          );

          pages("otp-register");
          // pages("login");
        }
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
}

function showTNC() {
  modalTNC.show();
}

function konfirmasiTNC(a) {
  let agree = a;
  if (agree == "1") {
    $("#formRegisterSyaratKetentuan").prop("checked", true);
    modalTNC.hide();
  } else {
    $("#formRegisterSyaratKetentuan").prop("checked", false);
    modalTNC.hide();
  }
}

// show hide password
$(document).ready(function () {
  $("#showPassword").click(function () {
    if ($("#showPassword").is(":checked")) {
      $("#formRegisterPassword").attr("type", "text");
      $("#formRegisterPasswordConfirmation").attr("type", "text");
    } else {
      $("#formRegisterPassword").attr("type", "password");
      $("#formRegisterPasswordConfirmation").attr("type", "password");
    }
  });
});

// function popupKonfirmasi() {
//   if ($("#formRegisterName").val() == "") {
//     navigator.notification.alert(
//       "Nama tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterKTP").val() == "") {
//     navigator.notification.alert(
//       "Nomor KTP tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterEmail").val() == "") {
//     navigator.notification.alert(
//       "Email tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterNoHp").val() == "") {
//     navigator.notification.alert(
//       "No HP tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterProvinsi").val() == "") {
//     navigator.notification.alert(
//       "Provinsi tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterKota").val() == "") {
//     navigator.notification.alert(
//       "Kota tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterPassword").val() == "") {
//     navigator.notification.alert(
//       "Password tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if ($("#formRegisterPasswordConfirmation").val() == "") {
//     navigator.notification.alert(
//       "Konfirmasi Password tidak boleh kosong",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if (!$("#formRegisterSyaratKetentuan").is(":checked")) {
//     navigator.notification.alert(
//       "Mohon checklis Syarat & Ketentuan",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else if (!$("#formRegisterConfirmData").is(":checked")) {
//     navigator.notification.alert(
//       "Mohon checklis jika data anda sudah BENAR",
//       alertDismissed,
//       TITLE_ALERT,
//       "Ok"
//     );
//   } else {
//     $(".modal-register-apps").modal("show");
//     $("#icon-close-register").click(function () {
//       $(".modal-register-apps").modal("hide");
//     });
//   }
// }
