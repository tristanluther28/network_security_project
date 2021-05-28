recordData();

async function recordData() {
    // device
    const {
        cookieEnabled,
        deviceMemory,
        hardwareConcurrency,
        language,
        languages,
        platform,
        userAgent
    } = navigator;

    const deviceType = getDeviceType();
    const {browser, os} = getDeviceInfo();
    
    // canvas
    const canvas = document.createElement("canvas")
    const webgl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")

    const renderer = webgl.getParameter(webgl.RENDERER);

    const debugInfo = webgl.getExtension("webgl_debug_renderer_info")
    const gpu = webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)

    const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    // connection
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    // location
    const offset = new Date().getTimezoneOffset();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const data = {
        device: {
            cookieEnabled,
            deviceMemory,
            hardwareConcurrency,
            language,
            languages,
            platform,
            userAgent,
            deviceType,
            browser,
            os
        },
        canvas: {
            renderer,
            gpu,
            supportsTouch
        },
        connection,
        location: {
            offset,
            timezone
        }
    }

    console.log(data);
}


// https://dev.to/itsabdessalam/detect-current-device-type-with-javascript-490j
function getDeviceType () {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
};

// https://medium.com/creative-technology-concepts-code/detect-device-browser-and-version-using-javascript-8b511906745
function getDeviceInfo () {    
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init()

    return {
        os: {
            name: e.os.name,
            version: e.os.version
        },
        browser: {
            name: e.browser.name,
            version: e.browser.version
        },
        userAgent: navigator.userAgent,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        vendor: navigator.version
    };
}