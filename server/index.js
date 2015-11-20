require('babel-core/register')({
    presets: ['es2015', 'react']
});

var koa = require('koa'),
    router = require('koa-router')(),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    Layout = React.createFactory(require('../js/layout.jsx').default),
    views = require('co-views'),
    app = koa(),
    render;

render = views('views', {
    ext: 'ejs'
});

function renderReactStaticMarkup(config) {
    global.cj = {
        language: "fr"
    };

    var content = ReactDOMServer.renderToString(Layout());

    return render('layout', {
        config: config,
        content: content
    });
}

function getPortalLoginConfig(callback) {
    var data = {
        hostname: "cn.challengeu.com",
        translations: {
            en: {
                "description-title": "Knowledge Portal",
                "description-text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textthe 1500s.",
                "support": "bla bla bla"
            },

            fr: {
                "description-title": "Knowledge Portal",
                "description-text": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy textthe 1500s.",
                "support": "bla bla bla"
            }
        },
        support: {
            email: "cn.support@challengeu.com",
            phone: "+1 324 233 12 32"
        }
    };

    setTimeout(function() {
        callback(null, data);
    }, 500);
}

router.get('/portal/login', function *(next) {
    // @TODO portal should be received from domain-name.
    var portal = 'cn',
        config,
        html;

    config = yield getPortalLoginConfig;
    html = yield renderReactStaticMarkup(config);

    this.body = html;

    yield next;
});

app.use(router.routes());
app.listen(4000);