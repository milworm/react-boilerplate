import React from "react";
import EventBus from "./EventBus.jsx!";

export default React.createClass({
    mixins: [EventBus],
    render: function() {
        return (
            <div className="languages">
                <div className="language" key="fr" onClick={this.change.bind(this, "fr")}>FR</div>
                <div className="language" key="en" onClick={this.change.bind(this, "en")}>EN</div>
            </div>
        );
    },

    change: function(language) {
        window.cj.language = language;
        localStorage.setItem("language", language);

        EventBus.fire("language-change");
    }
});