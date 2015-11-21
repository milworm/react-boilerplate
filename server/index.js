require('babel-core/register')({
    presets: ['es2015', 'react']
});

var koa = require('koa'),
    router = require('koa-router')(),
    locale = require('koa-locale'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Layout = React.createFactory(require('../js/layout.jsx').default),
    views = require('co-views'),
    app = koa(),
    render;

locale(app);
render = views('views', {
    ext: 'ejs'
});

function renderReactStaticMarkup(config) {
    var content = ReactDOMServer.renderToString(Layout());

    return render('layout', {
        config: config,
        content: content
    });
}

function getPortalLoginConfig(portal) {
    return function(callback) {
        var data = {
            hostname: portal + ".challengeu.com",
            portal: {
                support: {
                    email: portal + ".support@challengeu.com",
                    phone: "+1 324 233 12 32"
                },
                translations: {
                    en: {
                        "description-title": portal.charAt(0).toUpperCase() + portal.substring(1) + " Education Portal",
                        "description-text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textthe 1500s."
                    },
                    fr: {
                        "description-title": portal.charAt(0).toUpperCase() + portal.substring(1) + " Portail de l'éducation",
                        "description-text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textthe 1500s."
                    }
                }
            }
        };

        setTimeout(function() {
            callback(null, data);
        }, 500);
    }
}

router.get('/tesla/login', function *(next) {
    // @TODO portal should be received from domain-name.
    var language = this.getLocaleFromCookie(),
        config;

    language = ["en", "fr"].indexOf(language) > -1 ? language : "fr";

    config = yield getPortalLoginConfig('tesla');
    config.language = language;

    global.cj = config;
    this.body = yield renderReactStaticMarkup(config);

    yield next;
});

router.get('/cn/login', function *(next) {
    // @TODO portal should be received from domain-name.
    var language = this.getLocaleFromCookie(),
        config;

    language = ["en", "fr"].indexOf(language) > -1 ? language : "fr";

    config = yield getPortalLoginConfig('cn');
    config.language = language;

    global.cj = config;
    this.body = yield renderReactStaticMarkup(config);

    yield next;
});

app.use(router.routes());
app.listen(4000);
console.log("running on 4000");