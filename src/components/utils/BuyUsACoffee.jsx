import React from "react";
import BuyMeACoffee from "../../img/buymeacoffee.svg"
import HelpUsOut from "../../img/helpUs.svg"

function BuyUsACoffee() {
  return (
    <div className="buy-us-a-coffee">
      <img src={HelpUsOut} alt="" id="help-us-out"/>
      {
      // <button id="close" title="Close :(" onClick="alert('closed')">X</button>
      }
      <a href="https://www.buymeacoffee.com/thobor" target="0">
        <img src={BuyMeACoffee} alt="Buy Me A Coffee" height={50} />
      </a>
    </div>
  );
}

export default BuyUsACoffee;
