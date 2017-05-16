import React from "react";
import classnames from "classnames";
import folderImg from "./folder.png";
import styles from "./Document.styl";
let folder = <img src={folderImg} style={{width: 16, height: 16, marginLeft: 8}}/>;
let symbol = <svg className={classnames(styles['icon'], styles['icon-symbol'])} viewBox="0 0 1024 1024" width="16"
                  height="16">
  <path
    d="M703.232 870.144l145.088 15.872c16.32 1.728 28.16 16.512 26.368 32.896-1.664 15.232-14.592 26.56-29.568 26.56-1.152 0-2.112-0.064-3.264-0.192l-208.704-22.848c-7.872-0.896-15.04-4.8-19.968-11.008-4.992-6.144-7.232-14.016-6.464-21.888l22.848-209.024c1.792-16.384 16.448-28.224 32.832-26.432s28.096 16.576 26.368 32.96l-14.4 131.136c111.744-61.632 187.648-180.48 187.648-317.312 0-200.192-162.112-362.624-362.048-362.624-1.856 0-3.584 0.256-5.44 0.256l0-0.64C480 135.936 468.672 123.584 468.672 108.416c0-14.912 10.944-27.136 25.216-29.312L493.888 78.912c1.024 0 1.984-0.064 2.88-0.128 0.576 0 1.088-0.192 1.664-0.192 0.192 0 0.384 0.064 0.512 0.064 0.384-0.064 0.768-0.064 1.152-0.064 232.384 0 421.504 189.376 421.504 422.208C921.6 659.776 833.28 798.144 703.232 870.144L703.232 870.144zM499.712 945.024l0 0.128c-1.024 0-1.92 0.128-2.88 0.128-0.576 0-1.088 0.192-1.664 0.192-0.192 0-0.32-0.064-0.512-0.064-0.384 0-0.768 0.064-1.152 0.064-232.448 0-421.504-189.44-421.504-422.208 0-158.976 88.384-297.344 218.304-369.28L145.28 138.048C128.96 136.256 117.12 121.536 118.848 105.152c1.664-15.232 14.592-26.56 29.568-26.56 1.088 0 2.176 0.064 3.264 0.192l208.64 22.848C368.256 102.528 375.424 106.496 380.352 112.64c4.992 6.208 7.232 14.08 6.4 21.952L363.904 343.552C362.112 359.936 347.456 371.776 331.072 369.984 314.688 368.128 302.976 353.408 304.768 337.088l14.336-131.2C207.36 267.584 131.52 386.368 131.52 523.2c0 200.256 162.048 362.688 361.984 362.688 1.856 0 3.584-0.32 5.44-0.384l0 0.704c14.656 1.92 25.92 14.336 25.92 29.44C524.864 930.496 513.92 942.72 499.712 945.024L499.712 945.024z"
  />
</svg>;
let bitmap = <svg className={styles['icon']} viewBox="0 0 1024 1024" width="16" height="16">
  <path d="M736 448c53 0 96-43 96-96 0-53-43-96-96-96-53 0-96 43-96 96C640 405 683 448 736 448z"
  />
  <path
    d="M904 128 120 128c-31.2 0-56 25.4-56 56.6l0 654.8c0 31.2 24.8 56.6 56 56.6l784 0c31.2 0 56-25.4 56-56.6L960 184.6C960 153.4 935.2 128 904 128zM697.8 523.4c-6-7-15.2-12.4-25.6-12.4-10.2 0-17.4 4.8-25.6 11.4l-37.4 31.6c-7.8 5.6-14 9.4-23 9.4-8.6 0-16.4-3.2-22-8.2-2-1.8-5.6-5.2-8.6-8.2L448 430.6c-8-9.2-20-15-33.4-15-13.4 0-25.8 6.6-33.6 15.6L128 736.4 128 215.4c2-13.6 12.6-23.4 26.2-23.4l715.4 0c13.8 0 25 10.2 25.8 24l0.6 520.8L697.8 523.4z"
  />
</svg>;
let eye = <svg className={styles['icon']} viewBox="0 0 16 16">
  
  <path
    d="M8.06,2 C3,2 0,8 0,8 C0,8 3,14 8.06,14 C13,14 16,8 16,8 C16,8 13,2 8.06,2 L8.06,2 Z M8,12 C5.8,12 4,10.22 4,8 C4,5.8 5.8,4 8,4 C10.22,4 12,5.8 12,8 C12,10.22 10.22,12 8,12 L8,12 Z M10,8 C10,9.11 9.11,10 8,10 C6.89,10 6,9.11 6,8 C6,6.89 6.89,6 8,6 C9.11,6 10,6.89 10,8 L10,8 Z"/>

</svg>;
let lock = <svg className={styles["icon"]} viewBox="0 0 1024 1024">
  <path
    d="M810.337 502.14v309.009c0 14.427-5.010 26.626-15.027 36.646-10.019 10.019-22.244 15.029-36.648 15.029h-515.172c-14.428 0-26.626-5.010-36.645-15.029s-15.029-22.218-15.029-36.646v-309.009c0-14.402 5.010-26.627 15.029-36.646 10.018-10.019 22.217-15.028 36.645-15.028h16.906v-102.844c0-65.725 23.62-122.231 70.909-169.519 47.264-47.29 103.847-70.935 169.773-70.935 65.9 0 122.405 23.645 169.545 70.935 47.114 47.289 70.684 103.796 70.684 169.519v102.845h17.358c14.403 0 26.626 5.009 36.646 15.029 10.016 10.017 15.026 22.241 15.026 36.644zM363.717 450.467h274.722v-102.844c0-37.873-13.477-70.282-40.402-97.208-26.925-26.926-59.336-40.401-97.209-40.401-37.872 0-70.208 13.475-96.959 40.401-26.775 26.926-40.15 59.336-40.15 97.208l-0.001 102.844z"/>
</svg>;
export default class LayerSelector extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  
  toggleExpand = (model, e) => {
    if (model.layerListExpandedType === 1) {
      model.layerListExpandedType = 0;
    } else {
      model.layerListExpandedType = 1;
    }
    e && e.stopPropagation();
    e && e.preventDefault();
    
    this.forceUpdate();
    return false;
  };
  
  treeview = (model, depth = 0, hasMask) => {
    let {selectedLayer, hoveredLayer, onSelect, onMouseEnter, onMouseLeave} = this.props;
    
    let canExpanded = model.layers && model._class !== 'shapeGroup' && (
        model.layers.length > 0 ||
        model._class === 'artboard'
      );
    let isExpanded = model.layerListExpandedType !== 1;
    
    let layerMaskFlag = [];
    if (canExpanded && isExpanded) {
      let underLyingMask = false;
      for (let layer of model.layers) {
        if (layer.hasClippingMask) {
          underLyingMask = true;
          layerMaskFlag.push(false);
          continue;
        }
        if (layer.shouldBreakMaskChain) {
          underLyingMask = false;
        }
        layerMaskFlag.push(underLyingMask);
      }
      layerMaskFlag.reverse();
    }
    ++this.idx;
    
    return <div key={model.do_objectID}>
      <a className={classnames(styles['treeview-item'], {
        selected: model.do_objectID === selectedLayer
        , [styles['artboard']]: depth === 0,
        even: this.idx % 2 === 0,
        hover: hoveredLayer === model.do_objectID,
        hidden: !model.isVisible
      })}
         style={{paddingLeft: depth * 16,}}
         onClick={() => onSelect(model.do_objectID)}
         onMouseEnter={() => onMouseEnter(model.do_objectID)}
         onMouseLeave={() => onMouseLeave(model.do_objectID)}
      >
        <div className={classnames(styles['icon'], styles['icon-expand'])} style={{
          transform: isExpanded ? undefined : 'rotate(-90deg)',
          visibility: canExpanded ? undefined : 'hidden',
        }} onClick={(e) => this.toggleExpand(model, e)}/>
        {hasMask && <div className={classnames(styles['icon'], styles['icon-mask'])}>↳</div>}
        {model._class === 'group' && folder}
        {model._class === 'text' &&
        <div className={styles['icon']}>Aa</div>}
        {model._class === 'shapeGroup' &&
        <div className={styles['icon']}>S</div>}
        {(model._class === 'symbolInstance' || model._class === 'symbolMaster') && symbol}
        {model._class === 'bitmap' && bitmap}
        <span className={styles['text']}>{model.name}</span>
        {!model.isVisible && eye}
        {model.isVisible && model.isLocked && lock}
      </a>
      { canExpanded && isExpanded &&
      <div>
        {model.layers.slice(0).reverse().map((layer, i) =>
          this.treeview(layer, depth + 1, layerMaskFlag[i])
        )}
      </div>
      }
    </div>
  };
  
  render() {
    let {model, selectedLayer, hoveredLayer, onSelect, onMouseEnter, onMouseLeave, style, ...props} = this.props;
    this.idx = 0;
    return (
      <div style={{
        background: '#ececec',
        fontSize: 12,
        lineHeight: '27px',
        height: '100%',
        ...style
      }} {...props}>
        <div style={{
          paddingLeft: 8,
          color: '#999',
          background: '#F3F3F3',
          boxShadow: `inset 0 -0.5px 0 0 #B8B8B8,inset 0 0.5px 0 0 #B8B8B8`,
        }}>
          {model.name}
        </div>
        <div style={{
          height: `calc(100% - 27px)`,
          overflow: 'auto',
        }}>
          {
            model.layers.map((artboard) =>
              this.treeview(artboard)
            ).reverse()
          }
        </div>
      </div>);
  }
}