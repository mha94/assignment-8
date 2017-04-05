(function(window) {
    'use strict';
    var App = window.App || {};
    var response;
    var responseValue;

    function foo(serverResponse) {
        response = serverResponse;
    }

    var Validation = {
        isCompanyEmail: function(email, remoteDS) {
            remoteDS.getEmail(email, foo);
            console.log('response: ', response);
            //console.log(bool);
            if (response) {
                responseValue = false;
            } else {
                responseValue = true;
            }
            console.log('responsevalue: ', responseValue);
            return /.+@bignerdranch\.com$/.test(email) && responseValue;
        },

        decaf: function(decaf, value) {
            var orderDecaf = decaf || '';
            //console.log(orderDecaf, value);
            if (orderDecaf.indexOf('decaf') !== -1 && value > 20) {
                //console.log('false');
                return false;
            } else {
                //console.log('true');
                return true;
            }
        },
    };

    App.Validation = Validation;
    window.App = App;
})(window);
