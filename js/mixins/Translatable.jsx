import React from "react";

export default {
    componentWillMount: function() {
        document.addEventListener("language-change", this.onLanguageChange);
    },

    componentWillUnmount: function() {
        document.removeEventListener("language-change", this.onLanguageChange);
    },

    onLanguageChange: function() {
        this.setState({});
    },

    t: function(key) {
        return window.translations[window.cj.language][key];
    }
};