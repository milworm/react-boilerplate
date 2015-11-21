import React from "react";
import ReactDom from "react-dom";
import Layout from "./layout.jsx";
import Translations from "../config/translations";

var translations = cj.portal.translations;

for(var language in translations)
    for(var key in translations[language])
        Translations[language][key] = translations[language][key];

ReactDom.render(<Layout />, document.getElementById("root"));