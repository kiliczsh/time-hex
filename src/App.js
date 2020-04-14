import React from "react";
import logo from "./logo.svg";
import "./App.css";


class App extends React.Component {
  constructor() {
    super();
    var curr = new Date();
    var hexTime= "" + curr.getHours() + curr.getMinutes() + curr.getSeconds()
    this.state = {
      hex: hexTime,
      isLoading: true,
      mounted: false
    };
  }

  componentDidMount() {
    
    setInterval( () => {
      var cur = new Date();
      var hh = "" + cur.getHours();
      var mm = "" + cur.getMinutes();
      var ss = "" + cur.getSeconds();
      if (hh.length < 2) {
        hh = "0" + hh;
      }
      if (mm.length < 2) {
        mm = "0" + mm;
      }
      if (ss.length < 2) {
        ss = "0" + ss;
      }
      var checkBefore = "" + hh + mm + ss;
      if(checkBefore.length<6){
        checkBefore = "0"+checkBefore;
      }
      this.setState({
        mounted: true,
        hex: checkBefore
      })
    },1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var colorString= "";
    if(this.state.hex.length === 6){
       colorString = "#" + parseInt(this.state.hex);
    }else{
       colorString = "#0" + parseInt(this.state.hex);
    }
    
   
    console.log("colorString: " + colorString);
    const styles = {
      backgroundColor: colorString,
      fontSize: 30,
    };

    return (
      <div style={styles} className="App">
        <header className="App-header">
          {" "}
          <img src={logo} className="App-logo" alt="logo" />
          
          <p id="timeHex">#{this.state.hex}</p>
        </header>
      </div>
    );
  }
}

export default App;
