import React from "react";

export default {
    on: function(event, callback) {
        if(typeof document == "undefined")
            return ;

        document.addEventListener(event, callback);
    },

    un: function(event, callback) {
        if(typeof document == "undefined")
            return ;

        document.removeEventListener(event, callback);
    },

    fire: function(name) {
        if(typeof document == "undefined")
            return ;

        var event = document.createEvent("Event");

        event.initEvent(name, true, true);
        document.dispatchEvent(event);
    }
}