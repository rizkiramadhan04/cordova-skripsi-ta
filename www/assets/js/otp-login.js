var firstCon = firstConnection();
var version_number = window.localStorage.getItem("versionDevice");

function submitOTPLogin() {
  event.preventDefault();

  if (firstCon == "online") {
    data = {
      otp: $("#input_otp_login").val(),
      type: $("#otp_type").val(),
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
      url: conn + "/otp/check",
      dataType: "json",
      timeout: timeout,
      data: data,
    })
      .done(function (values) {
        //console.log(values);
        if (values.status == "errors") {
          navigator.notification.alert(
            values.message,
            alertDismissed,
            TITLE_ALERT,
            "Ok"
          );
        } else if (values.status == "success") {
          window.localStorage.setItem("otp_login", "1");
          pages("dashboard");
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
    navigator.notification.alert(
      "Koneksi offline - Cek koneksi internet Anda. Silahkan hubungi Call Center : Kode #DB-001",
      alertDismissed,
      TITLE_ALERT,
      "Ok"
    );
  }
}

$(document).ready(function () {
  $("input:text:visible:first").focus();
  // $('.digit-group').find('input').each(function() {
  //     $(this).attr('maxlength', 1);
  //     $(this).on('keyup', function(e) {
  //         var parent = $($(this).parent());

  //         if (e.keyCode === 8 || e.keyCode === 37) {
  //             var prev = parent.find('input#' + $(this).data('previous'));

  //             if (prev.length) {
  //                 $(prev).select();
  //             }
  //         } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
  //             var next = parent.find('input#' + $(this).data('next'));
  //             var digit_1, digit_2, digit_3, digit_4, digit_5, digit_6, otp;

  //             if (next.length) {
  //                 $(next).select();
  //             } else {
  //                 if (parent.data('autosubmit')) {
  //                     parent.submit();
  //                 }

  //                 digit_1 = $('#digit-1').val();
  //                 digit_2 = $('#digit-2').val();
  //                 digit_3 = $('#digit-3').val();
  //                 digit_4 = $('#digit-4').val();
  //                 digit_5 = $('#digit-5').val();
  //                 digit_6 = $('#digit-6').val();

  //                 otp = digit_1 + digit_2 + digit_3 + digit_4 + digit_5 + digit_6;
  //                 $('#otp').val(otp);
  //             }
  //         }
  //     });
  // });
});
