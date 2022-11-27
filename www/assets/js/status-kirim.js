var firstCon;
var status_send = window.localStorage.getItem('status_send_sess');

$(document).ready(function() {
    firstCon = firstConnection();

    if (firstCon == 'offline') {
        $('.dotNetworkIndicator').css('background-color', '#ececec');
    } else {
        $('.dotNetworkIndicator').css('background-color', '#9fc963');
    }

    var bg_kirim_container;
    switch (status_send) {
        case 'e':
            bg_kirim_container = 'assets/img/bg-popup-cek-kirim-error.png';
            break;

        case 's':
            bg_kirim_container = 'assets/img/bg-popup-cek-kirim-success.png';
            break;

        default:
            break;
    } //end switch
    $('#pop-up-container-cek-email-container').css("background-image", "url(" + bg_kirim_container + ")");
});



document.addEventListener("offline", onOfflinePopUpEmail, false);
document.addEventListener("online", onOnlinePopUpEmail, false);

function onOfflinePopUpEmail() {
    $('.dotNetworkIndicator').css('background-color', '#ececec');
}

function onOnlinePopUpEmail() {
    $('.dotNetworkIndicator').css('background-color', '#9fc963');
}

function goToMenu() {
    console.log('goToMenu');
    window.localStorage.removeItem('status_send_sess');
    if (firstCon == 'offline') {
        alert('Setelah kuis selesai dan mendapatkan hadiah, silahkan untuk logout dan login kembali untuk synchronize data');
        console.log('offline');
    } else if (firstCon == 'online') {
        console.log();
    }
    pages('dashboard');
}