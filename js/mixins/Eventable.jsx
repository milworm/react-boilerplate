import React from "react";

export default {
    on: function(event, callback) {
        document.addEventListener(event, callback);
    },

    un: function(event, callback) {
        document.removeEventListener(event, callback);
    },

    fire: function(event) {
        var event = document.createEvent("Event");

        event.initEvent(event, true, true);
        document.dispatchEvent(event);
    }
};