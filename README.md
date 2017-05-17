# sketch-react

[https://zjuasmn.github.io/sketch-react](https://zjuasmn.github.io/sketch-react/)

Project is still in beta, help and advise are welcome.

The goal of this project is trying to reduce the gap  between UI design and front-end development \(for now, just html\).  A lot of time of front-end development is spent in matching the given UI design instead of implementing application logic. There are  collaboration tools like [Zeplin ](https://www.zeplin.io/) to help marking the design, but programmer still needs to measure and copy css for each element assemble them and copy icons and other assets one by one.

Here, we take a step further by generate html from .sketch file\(v43+\). So you can copy a group of element as html code and paste it in online or local text editor. Just a copy and paste from design to working code. Enjoy it.

![](/assets/demo.gif)

# ![](/assets/screenshot.jpg)Roadmap

* export to React code
* autoprefix css
* reduce export code size
  * svg code optimization
  * class style generate from symbol, share style
* optimize position css
  * detect row or column pattern of  elements
  * detect padding
  * detect corner element
* minor edit
  * visible & lock
  * ...

# Limitation

Due to the limitation of html, it cannot be 100% math the original design,  like background blur, multiple borders, multiple fills, masking, image color adjust and so on.

**General**

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| Position | Support | top, left |
| Size | Support | width, height |
| rotation, flip | Support | transform |
| Opacity | Support | opacity |
| Blending | Support | mix-blend-mode |
| Lock | No |  |
| Hide | Support | display:none |

**Text**\(rendered as &lt;span/&gt;\)

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| Typeface | Limit\(no fallback\) | font-family |
| Weight | Support | font-weight |
| Color | Limit\(only solid color\) | color |
| Size | Support | font-size |
| Alignment | Support | text-align |
| Width | Limit | \(Auto\)width:auto\(Fixed\)width:?px |
| Spacing-Character | No | letter-spacing |
| Spacing-Line | Limit | line-height |
| Spacing-Paragraph | No |  |
| Fills | No |  |
| Borders | No |  |
| Shadows | No |  |
| Blur | No |  |

**Symbol**

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| Size | Limit\(only support same size as symbol master\) |  |
| Overrides | no |  |

**Image** \(render as &lt;img/&gt;\)

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| Color Adjust | no |  |

**Group**\(&lt;div/&gt;\)

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| mask | limit\(only when the mask is the most bottom layer and it is simple shape and all sibling layer don't ignore the mask\) | overflow:hidden |

**Shape**

Simple Shape\(&lt;div/&gt;\)

A shape is considered as simple when it is a rectangle or Oval with its points unedited.

Complex Shape\(&lt;svg/&gt;\)

complex shape needed to be flatten before render.

| Feature | Support | Related CSS Attributes |
| :--- | :--- | :--- |
| fill | limit\(only one fill with solid color\) | fill |
| borders | limit\(only one border with solid color\) | stroke,stroke-width |
| shadows & innerShadows | no |  |
| blur | no |  |
| bool operation | no |  |



