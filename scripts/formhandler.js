(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data)
            .then(function() {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function(fn, remoteDS) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress, remoteDS)) {
                event.target.setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address or is already used!';
                event.target.setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addInputHandler2 = function(fn) {
        var orderDecaf, orderValue;
        //var orderValue = document.getElementById('strengthLevel').value;
        this.$formElement.on('input', '[name="coffee"]', function(event) {
            orderDecaf = event.target.value;
            if (fn(orderDecaf, orderValue)) {
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity('Decaf cannot be over 20 caffeine rating!');
            }
        });

        this.$formElement.on('input', '[name="strength"]', function(event) {
            orderValue = event.target.value;
            if (fn(orderDecaf, orderValue)) {
                event.target.setCustomValidity('');
            } else {
                event.target.setCustomValidity('Decaf cannot be over 20 caffeine rating!');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;
})(window);
