import React from 'react'
import ReactDOM from 'react-dom'
import Document from '../../src'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onSelectFile = (e) => {
    if (e.target.files.length) {
      this.setState({file: e.target.files[0]})
    }
  };
  
  render() {
    let {file} = this.state;
    if (file) {
      return <div style={{height: '100%'}}>
        <div style={{height: 32}}>
          <input type="file" value={file.filename} onChange={this.onSelectFile} accept=".sketch"/>
        </div>
        <Document blob={file} style={{height: `calc(100% - 32px)`}}/>
      </div>
    } else {
      return <div><input type="file" onChange={this.onSelectFile} accept=".sketch"/></div>
    }
  }
}

ReactDOM.render(<App />, document.getElementById('root'));