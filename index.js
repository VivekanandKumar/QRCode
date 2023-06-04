// import {QRCodeCanvas} from '@loskir/styled-qr-code-node';
const express = require('express')
const { QRCodeCanvas } = require('@loskir/styled-qr-code-node'); // or CommonJS
let options = {
    "width": 720,
    "height": 720,
    "margin": 0,
    "qrOptions": {
        "typeNumber": "0",
        "mode": "Byte",
        "errorCorrectionLevel": "H"
    },
    "imageOptions": {
        "hideBackgroundDots": false,
        "imageSize": 0.2,
        "margin": 0
    },
    "dotsOptions": {
        "type": "dots",
        "color": "#6a1a4c",
        "gradient": {
            "type": "linear",
            "rotation": 0,
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#e94000"
                },
                {
                    "offset": 1,
                    "color": "#ff5429"
                }
            ]
        }
    },
    "backgroundOptions": {
        "color": "#ffffff",
        "gradient": null
    },
    "dotsOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#6a1a4c",
            "color2": "#6a1a4c",
            "rotation": "0"
        }
    },
    "cornersSquareOptions": {
        "type": "dot",
        "color": "#000000",
        "gradient": {
            "type": "linear",
            "rotation": 0,
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#e94000"
                },
                {
                    "offset": 1,
                    "color": "#ff5429"
                }
            ]
        }
    },
    "cornersSquareOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "cornersDotOptions": {
        "type": "dot",
        "color": "#000000",
        "gradient": {
            "type": "linear",
            "rotation": 0,
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#e94000"
                },
                {
                    "offset": 1,
                    "color": "#ff5429"
                }
            ]
        }
    },
    "cornersDotOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#000000",
            "color2": "#000000",
            "rotation": "0"
        }
    },
    "backgroundOptionsHelper": {
        "colorType": {
            "single": true,
            "gradient": false
        },
        "gradient": {
            "linear": true,
            "radial": false,
            "color1": "#ffffff",
            "color2": "#ffffff",
            "rotation": "0"
        }
    }
}
const app = express()


//"png" | "jpg" | "jpeg" | "pdf" | "svg"
app.use(express.json())
app.post('/', async (req, res) => {
    if (req.body.logo != undefined) {
        options = { ...options, ...{ image: req.body.logo } }
    }
    if (req.body.data != undefined) {
        options = { ...options, ...{ data: JSON.stringify(req.body.data) } }
    }
    const qrCode = new QRCodeCanvas(options);
    try {
        const data = await qrCode.toDataUrl('png');
        if (data) {
            res.send(data);
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, () => {
    console.log('Started');
})

