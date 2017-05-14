import {expect} from 'chai'
import {Color, Border, Shadow, InnerShadow, Gradient, Fill, Style, TextStyle,ShapePath} from '../models'
import {parse} from '../utils'


describe('Color', () => {
  it('works', () => {
    let json = {
      "_class": "color",
      "alpha": 0.89,
      "blue": 0.592,
      "green": 0,
      "red": 1
    };
    let color = parse(json);
    expect(color).to.be.an.instanceof(Color);
    expect(`${color}`).to.equal('rgba(255,0,151,0.89)');
  })
});
describe('border', () => {
  it('works', () => {
    let json = {
      "_class": "border",
      "isEnabled": true,
      "color": {
        "_class": "color",
        "alpha": 1,
        "blue": 0.592,
        "green": 0.592,
        "red": 0.592
      },
      "fillType": 0,
      "position": 1,
      "thickness": 1
    };
    
    let border = parse(json);
    expect(border).to.be.an.instanceof(Border);
    expect(`${border}`).to.equal('1px solid rgba(151,151,151,1)');
  })
});
describe('shadow and innetShadow', () => {
  it('works', () => {
    let json = {
      "_class": "shadow",
      "isEnabled": true,
      "blurRadius": 4,
      "color": {
        "_class": "color",
        "alpha": 0.5,
        "blue": 0,
        "green": 0,
        "red": 0
      },
      "contextSettings": {
        "_class": "graphicsContextSettings",
        "blendMode": 0,
        "opacity": 1
      },
      "offsetX": 0,
      "offsetY": 2,
      "spread": 0
    };
    let shadow = parse(json);
    expect(shadow).to.be.an.instanceof(Shadow);
    expect(`${shadow}`).to.equal('0px 2px 4px 0px rgba(0,0,0,0.5)');
  });
  it('works innerShadow', () => {
    let json = {
      "_class": "innerShadow",
      "isEnabled": true,
      "blurRadius": 4,
      "color": {
        "_class": "color",
        "alpha": 0.5,
        "blue": 0,
        "green": 0,
        "red": 0
      },
      "contextSettings": {
        "_class": "graphicsContextSettings",
        "blendMode": 0,
        "opacity": 1
      },
      "offsetX": 0,
      "offsetY": 2,
      "spread": 0
    };
    let innerShadow = parse(json);
    expect(innerShadow).to.be.an.instanceof(InnerShadow);
    expect(`${innerShadow}`).to.equal('inset 0px 2px 4px 0px rgba(0,0,0,0.5)');
  });
  it('works for array of shadow', () => {
    let json = [
      {
        "_class": "shadow",
        "isEnabled": true,
        "blurRadius": 4,
        "color": {
          "_class": "color",
          "alpha": 0.5,
          "blue": 0,
          "green": 0,
          "red": 0
        },
        "contextSettings": {
          "_class": "graphicsContextSettings",
          "blendMode": 0,
          "opacity": 1
        },
        "offsetX": 0,
        "offsetY": 2,
        "spread": 0
      },
      {
        "_class": "innerShadow",
        "isEnabled": true,
        "blurRadius": 4,
        "color": {
          "_class": "color",
          "alpha": 0.5,
          "blue": 0,
          "green": 0,
          "red": 0
        },
        "contextSettings": {
          "_class": "graphicsContextSettings",
          "blendMode": 0,
          "opacity": 1
        },
        "offsetX": 0,
        "offsetY": 2,
        "spread": 0
      },
    ];
    let shadows = parse(json);
    expect(shadows.map(shadow => shadow.toString()).join(',')).to.equal('0px 2px 4px 0px rgba(0,0,0,0.5),inset 0px 2px 4px 0px rgba(0,0,0,0.5)');
  })
})
describe(`gradient`, () => {
  it('works linear-gradient', () => {
    let json = {
      "_class": "gradient",
      "elipseLength": 0,
      "from": "{0.5, 0}",
      "gradientType": 0,
      "shouldSmoothenOpacity": false,
      "stops": [
        {
          "_class": "gradientStop",
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 1,
            "green": 1,
            "red": 1
          },
          "position": 0
        },
        {
          "_class": "gradientStop",
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0,
            "green": 0,
            "red": 0
          },
          "position": 1
        }
      ],
      "to": "{0.85485408251402162, 0.64973154574674941}"
    };
    let gradient = parse(json);
    expect(gradient).to.be.an.instanceof(Gradient);
    expect(`${gradient}`).to.equal('linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)');
  })
});
describe('fill', () => {
  it('works', () => {
    let json = {
      "_class": "fill",
      "isEnabled": true,
      "color": {
        "_class": "color",
        "alpha": 1,
        "blue": 0.847,
        "green": 0.847,
        "red": 0.847
      },
      "fillType": 0,
    };
    let fill = parse(json);
    expect(fill).to.be.an.instanceof(Fill);
    expect(`${fill}`).to.equal('linear-gradient(0deg, rgba(216,216,216,1),rgba(216,216,216,1))');
  });
  it('works', () => {
    let json = {
      "_class": "fill",
      "isEnabled": true,
      "color": {
        "_class": "color",
        "alpha": 1,
        "blue": 0.847,
        "green": 0.847,
        "red": 0.847
      },
      "fillType": 1,
      "gradient": {
        "_class": "gradient",
        "elipseLength": 0,
        "from": "{0.5, 0}",
        "gradientType": 0,
        "shouldSmoothenOpacity": false,
        "stops": [
          {
            "_class": "gradientStop",
            "color": {
              "_class": "color",
              "alpha": 1,
              "blue": 1,
              "green": 1,
              "red": 1
            },
            "position": 0
          },
          {
            "_class": "gradientStop",
            "color": {
              "_class": "color",
              "alpha": 1,
              "blue": 0,
              "green": 0,
              "red": 0
            },
            "position": 1
          }
        ],
        "to": "{0.85485408251402162, 0.64973154574674941}"
      },
    };
    let fill = parse(json);
    expect(fill).to.be.an.instanceof(Fill);
    expect(`${fill}`).to.equal('linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%)');
  })
});
describe('Style', () => {
  it('works', () => {
    let json = {
      "_class": "style",
      "borders": [
        {
          "_class": "border",
          "isEnabled": true,
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0.592,
            "green": 0.592,
            "red": 0.592
          },
          "fillType": 0,
          "position": 1,
          "thickness": 1
        }
      ],
      isVisible:true,
      "endDecorationType": 0,
      "fills": [
        {
          "_class": "fill",
          "isEnabled": true,
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0.847,
            "green": 0.847,
            "red": 0.847
          },
          "fillType": 1,
          "gradient": {
            "_class": "gradient",
            "elipseLength": 0,
            "from": "{0.5, 0}",
            "gradientType": 0,
            "shouldSmoothenOpacity": false,
            "stops": [
              {
                "_class": "gradientStop",
                "color": {
                  "_class": "color",
                  "alpha": 1,
                  "blue": 1,
                  "green": 1,
                  "red": 1
                },
                "position": 0
              },
              {
                "_class": "gradientStop",
                "color": {
                  "_class": "color",
                  "alpha": 1,
                  "blue": 0,
                  "green": 0,
                  "red": 0
                },
                "position": 1
              }
            ],
            "to": "{0.85485408251402162, 0.64973154574674941}"
          },
          "noiseIndex": 0,
          "noiseIntensity": 0,
          "patternFillType": 0,
          "patternTileScale": 1
        },
        {
          "_class": "fill",
          "isEnabled": true,
          "color": {
            "_class": "color",
            "alpha": 1,
            "blue": 0.847,
            "green": 0.847,
            "red": 0.847
          },
          "fillType": 1,
          "gradient": {
            "_class": "gradient",
            "elipseLength": 0,
            "from": "{0.5, 0}",
            "gradientType": 0,
            "shouldSmoothenOpacity": false,
            "stops": [
              {
                "_class": "gradientStop",
                "color": {
                  "_class": "color",
                  "alpha": 0.5,
                  "blue": 0.3258815412299212,
                  "green": 0.3258815412299212,
                  "red": 0.5080516581632653
                },
                "position": 0
              },
              {
                "_class": "gradientStop",
                "color": {
                  "_class": "color",
                  "alpha": 0.5,
                  "blue": 0,
                  "green": 0,
                  "red": 0
                },
                "position": 1
              }
            ],
            "to": "{0.5, 1}"
          },
          "noiseIndex": 0,
          "noiseIntensity": 0,
          "patternFillType": 1,
          "patternTileScale": 1
        }
      ],
      "miterLimit": 10,
      "startDecorationType": 0,
      "innerShadows": [
        {
          "_class": "innerShadow",
          "isEnabled": true,
          "blurRadius": 3,
          "color": {
            "_class": "color",
            "alpha": 0.5,
            "blue": 0,
            "green": 0,
            "red": 0
          },
          "contextSettings": {
            "_class": "graphicsContextSettings",
            "blendMode": 0,
            "opacity": 1
          },
          "offsetX": 0,
          "offsetY": 1,
          "spread": 0
        }
      ],
      "shadows": [
        {
          "_class": "shadow",
          "isEnabled": true,
          "blurRadius": 4,
          "color": {
            "_class": "color",
            "alpha": 0.5,
            "blue": 0,
            "green": 0,
            "red": 0
          },
          "contextSettings": {
            "_class": "graphicsContextSettings",
            "blendMode": 0,
            "opacity": 1
          },
          "offsetX": 0,
          "offsetY": 2,
          "spread": 0
        }
      ],
    };
    let style = parse(json);
    expect(style).to.be.an.instanceof(Style);
    expect(style.toStyle()).to.eql({
      "background": "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,1) 100%), linear-gradient(0deg, rgba(130,83,83,0.5) 0%, rgba(0,0,0,0.5) 100%)",
      "border": "1px solid rgba(151,151,151,1)",
      "boxShadow": "0px 2px 4px 0px rgba(0,0,0,0.5), inset 0px 1px 3px 0px rgba(0,0,0,0.5)",
      "boxSizing": "border-box",
      "pointerEvent": "auto",
    });
  })
});
describe('TextStyle', () => {
  it('works', () => {
    let json = {
      "_class": "textStyle",
      "encodedAttributes": {
        "NSKern": 1,
        "MSAttributedStringTextTransformAttribute": 1,
        "NSColor": {
          "_archive": "YnBsaXN0MDDUAQIDBAUGHyBYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKUHCBEVHFUkbnVsbNQJCgsMDQ4PEFVOU1JHQlxOU0NvbG9yU3BhY2VfEBJOU0N1c3RvbUNvbG9yU3BhY2VWJGNsYXNzTxAsMC42Mzc2NDg4MDk1IDAuMjAxNTQyMjEwNyAwLjIwMTU0MjIxMDcgMC42NQAQAYACgATSEgwTFFROU0lEEAGAA9IWFxgZWiRjbGFzc25hbWVYJGNsYXNzZXNcTlNDb2xvclNwYWNlohobXE5TQ29sb3JTcGFjZVhOU09iamVjdNIWFx0eV05TQ29sb3KiHRtfEA9OU0tleWVkQXJjaGl2ZXLRISJUcm9vdIABAAgAEQAaACMALQAyADcAPQBDAEwAUgBfAHQAewCqAKwArgCwALUAugC8AL4AwwDOANcA5ADnAPQA\/QECAQoBDQEfASIBJwAAAAAAAAIBAAAAAAAAACMAAAAAAAAAAAAAAAAAAAEp"
        },
        "NSStrikethrough": 0,
        "MSAttributedStringFontAttribute": {
          "_archive": "YnBsaXN0MDDUAQIDBAUGJidYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKkHCA0XGBkaGyJVJG51bGzSCQoLDFYkY2xhc3NfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4AIgALTDg8JEBMWV05TLmtleXNaTlMub2JqZWN0c6IREoADgASiFBWABYAGgAdfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNAOAAAAAAAAFdBcmlhbE1U0hwdHh9aJGNsYXNzbmFtZVgkY2xhc3Nlc18QE05TTXV0YWJsZURpY3Rpb25hcnmjHiAhXE5TRGljdGlvbmFyeVhOU09iamVjdNIcHSMkXxAQTlNGb250RGVzY3JpcHRvcqIlIV8QEE5TRm9udERlc2NyaXB0b3JfEA9OU0tleWVkQXJjaGl2ZXLRKClUcm9vdIABAAgAEQAaACMALQAyADcAQQBHAEwAUwBwAHIAdAB7AIMAjgCRAJMAlQCYAJoAnACeALQAygDTANsA4ADrAPQBCgEOARsBJAEpATwBPwFSAWQBZwFsAAAAAAAAAgEAAAAAAAAAKgAAAAAAAAAAAAAAAAAAAW4="
        },
        "NSUnderline": 1,
        "NSParagraphStyle": {
          "_archive": "YnBsaXN0MDDUAQIDBAUGb3BYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoK8QGAcIGisvNTc6PUBDRklMT1JVWFteYmZna1UkbnVsbNkJCgsMDQ4PEBESExQVFhcVGBlWJGNsYXNzWk5TVGFiU3RvcHNcTlNUZXh0QmxvY2tzXxAPTlNNYXhMaW5lSGVpZ2h0XxASTlNQYXJhZ3JhcGhTcGFjaW5nW05TVGV4dExpc3RzXxAPTlNNaW5MaW5lSGVpZ2h0XE5TSGVhZEluZGVudFtOU0FsaWdubWVudIAXgAKAEiNAAAAAAAAAACNACAAAAAAAAIATI0BCAAAAAAAAEAHSGwkcKlpOUy5vYmplY3RzrR0eHyAhIiMkJSYnKCmAA4AFgAaAB4AIgAmACoALgAyADYAOgA+AEIAR0gksLS5aTlNMb2NhdGlvboAEI0AmAAAAAAAA0jAxMjNaJGNsYXNzbmFtZVgkY2xhc3Nlc1lOU1RleHRUYWKiMjRYTlNPYmplY3TSCSwtGIAE0gksLTmABCNATFMzQAAAANIJLC08gAQjQFVAAAAAAADSCSwtP4AEI0BcVmZgAAAA0gksLUKABCNAYbZmYAAAANIJLC1FgAQjQGVBmaAAAADSCSwtSIAEI0BozMzAAAAA0gksLUuABCNAbFgAAAAAANIJLC1OgAQjQG\/jM0AAAADSCSwtUYAEI0BxtzNAAAAA0gksLVSABCNAc3zMwAAAANIJLC1XgAQjQHVCZmAAAADSMDFZWldOU0FycmF5olk00hsJXCqggBHSGwlfKqFggBSAEdIJY2RlXk5TTWFya2VyRm9ybWF0gBaAFVp7ZGVjaW1hbH0u0jAxaGlaTlNUZXh0TGlzdKJqNFpOU1RleHRMaXN00jAxbG1fEBdOU011dGFibGVQYXJhZ3JhcGhTdHlsZaNsbjRfEBBOU1BhcmFncmFwaFN0eWxlXxAPTlNLZXllZEFyY2hpdmVy0XFyVHJvb3SAAQAIABEAGgAjAC0AMgA3AFIAWABrAHIAfQCKAJwAsQC9AM8A3ADoAOoA7ADuAPcBAAECAQsBDQESAR0BKwEtAS8BMQEzATUBNwE5ATsBPQE\/AUEBQwFFAUcBTAFXAVkBYgFnAXIBewGFAYgBkQGWAZgBnQGfAagBrQGvAbgBvQG\/AcgBzQHPAdgB3QHfAegB7QHvAfgB\/QH\/AggCDQIPAhgCHQIfAigCLQIvAjgCPQI\/AkgCTQJVAlgCXQJeAmACZQJnAmkCawJwAn8CgQKDAo4CkwKeAqECrAKxAssCzwLiAvQC9wL8AAAAAAAAAgEAAAAAAAAAcwAAAAAAAAAAAAAAAAAAAv4="
        }
      }
    };
    let textStyle = parse(json);
    expect(textStyle).to.be.an.instanceof(TextStyle);
    
  });
});

describe('ShapePath', () => {
  it('works', () => {
    let json =
      {
        "_class": "shapePath",
        "do_objectID": "4E573388-DCD7-42A3-9138-17E043BAAE00",
        "exportOptions": {
          "_class": "exportOptions",
          "exportFormats": [],
          "includedLayerIds": [],
          "layerOptions": 0,
          "shouldTrim": false
        },
        "frame": {
          "_class": "rect",
          "constrainProportions": false,
          "height": 10,
          "width": 10,
          "x": 0,
          "y": 0
        },
        "isFlippedHorizontal": false,
        "isFlippedVertical": false,
        "isLocked": false,
        "isVisible": true,
        "layerListExpandedType": 0,
        "name": "Path",
        "nameIsFixed": false,
        "resizingType": 0,
        "rotation": 0,
        "shouldBreakMaskChain": false,
        "booleanOperation": -1,
        "edited": true,
        "path": {
          "_class": "path",
          "isClosed": true,
          "points": [
            {
              "_class": "curvePoint",
              "cornerRadius": 1,
              "curveFrom": "{0.80000000000000004, 0.20000000000000001}",
              "curveMode": 1,
              "curveTo": "{0.80000000000000004, 0.20000000000000001}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{0.80000000000000004, 0.20000000000000001}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{1, 0.20000000000000001}",
              "curveMode": 1,
              "curveTo": "{1, 0.20000000000000001}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{1, 0.20000000000000001}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{1, 1}",
              "curveMode": 1,
              "curveTo": "{1, 1}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{1, 1}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{0.20000000000000001, 1}",
              "curveMode": 1,
              "curveTo": "{0.20000000000000001, 1}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{0.20000000000000001, 1}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{0.10000000000000005, 0.70000000000000007}",
              "curveMode": 2,
              "curveTo": "{0.29999999999999999, 0.90000000000000002}",
              "hasCurveFrom": true,
              "hasCurveTo": true,
              "point": "{0.20000000000000001, 0.80000000000000004}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{0, 0.80000000000000004}",
              "curveMode": 1,
              "curveTo": "{0, 0.80000000000000004}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{0, 0.80000000000000004}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{0, 0}",
              "curveMode": 1,
              "curveTo": "{0, 0}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{0, 0}"
            },
            {
              "_class": "curvePoint",
              "cornerRadius": 0,
              "curveFrom": "{0.80000000000000004, 0}",
              "curveMode": 1,
              "curveTo": "{0.80000000000000004, 0}",
              "hasCurveFrom": false,
              "hasCurveTo": false,
              "point": "{0.80000000000000004, 0}"
            }
          ]
        }
      };
    let shapePath = parse(json);
    expect(shapePath).to.be.an.instanceof(ShapePath);
    console.log(shapePath.toD());
  })
});