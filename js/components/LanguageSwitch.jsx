import React from "react";
import Eventable from "../mixins/Eventable.jsx!";

export default React.createClass({
    mixins: [Eventable],
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

        var event = document.createEvent("Event");
        event.initEvent("language-change", true, true);

        document.dispatchEvent(event);
    }
});