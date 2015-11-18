import React from "react";
import LanguageSwitch from "./components/LanguageSwitch.jsx!";
import Translatable from "./mixins/Translatable.jsx!";
import Content from "./views/Content.jsx!";

export default React.createClass({
    mixins: [Translatable],
    render: function() {
        return (
            <div className="layout">
                <LanguageSwitch />
                <Content />
            </div>
        );
    }
});