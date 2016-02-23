'use strict';

app.formView = kendo.observable({
    onShow: function() {},
    afterShow: function() {}
});

// START_CUSTOM_CODE_formView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_formView
(function(parent) {
    var formViewModel = kendo.observable({
        fields: {
            group: '',
            formResponse: '',
            password: '',
            username: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('formViewModel', formViewModel);
})(app.formView);

// START_CUSTOM_CODE_formViewModel
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

app.formView.formViewModel.myLogin = function() {

    var that = this;
    $.ajax({
        method: "POST",
        url: 'http://overall.donweb-remoteip.net:27025/auth/local',
        //contentType: 'application/json',
        dataType: 'json',
        data: {
            email: that.formViewModel.fields.username,
            password: that.formViewModel.fields.password,
            deviceUuid: 'e0908060g38bde8e6740011221af335301010333'

        }
    }).then(function(data) {
        console.info('Ajax OK.');
        console.table(data);
        if (typeof data.token != 'undefined' && data.token != null) {
            console.info('Auth OK');
            that.formViewModel.fields.formResponse = 'Login valido'
        } else {
            console.warn('Auth NOT OK.');
            that.formViewModel.fields.formResponse = data.message;
        }
    }, function(error) {
        console.warn('Houston we have a problem... auth NOT ok');
        console.table(error);
        that.formViewModel.fields.formResponse = error.responseText.message;
    });
};
// END_CUSTOM_CODE_formViewModel