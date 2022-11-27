const app = new Vue({
    el: '#app',
    data: {
        ready: false
    },
    methods: {
        init: function () {
            this.ready = true;
        },
        showDialog: function () {
            navigator.notification.alert(
                'Vue and Cordova is like peanut butter and chocolate!', null, 'Vue+Cordova', 'Done'
            );
        }
    }
})

document.addEventListener('deviceready', app.init);