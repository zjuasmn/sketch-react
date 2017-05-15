# sketch-react

render sketch\(v43+\) file as react component





General

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| Position | Support | top, left |
| Size | Support | width, height |
| Transform | Support | transform |
| Opacity | Support | opacity |
| Blending | Support | mix-blend-mode |
| Lock | Support | pointer-events:none |
| Hide | Support | display:none |

Text\(rendered as &lt;span/&gt;\)

|  |  |  |
| :--- | :--- | :--- |
| Typeface | Support | font-family |
| Weight |  | font-weight |
| Color |  | color |
| Size |  | font-size |
| Alignment |  | text-align |
| Width |  | \(Auto\)width:auto\(Fixed\)width:?px |
| Spacing-Character |  | letter-spacing |
| Spaciing-Line |  | line-height |
| Spacing-Paragraph |  |  |
| Fills | No |  |
| Borders | No |  |
| Shadows |  | text-shadow |
| Blur | Limit | filter:blur\(?px\) |

Symbol

|  |  |  |
| :--- | :--- | :--- |
| Size | Limit\(only support same size as symbol master\) |  |
| Overrides | no |  |

Image \(render as &lt;img/&gt;\)

|  |  |  |
| :--- | :--- | :--- |
| Color Adjust | no |  |

Group\(&lt;div/&gt;\)

|  |  |  |
| :--- | :--- | :--- |
| mask | limit\(only when the mask is the most bottom layer and it is simple shape and all sibling layer don't ignore the mask\) | overflow:hidden |
|  |  |  |



Shape



Simple Shape\(&lt;div/&gt;\)

A shape is considered as simple when it is a Rectangle or Oval with its points unedited.





Complex Shape\(&lt;svg/&gt;\)

complex shape needed to be flatten before render.

|  |  |  |
| :--- | :--- | :--- |
| fill | limit\(only one fill with solid color\) | fill |
| borders | limit\(only one border with solid color\) | stroke,stroke-width |
| shadows & innerShadows | no |  |
| blur | limit | filter:blur\(?px\) |



