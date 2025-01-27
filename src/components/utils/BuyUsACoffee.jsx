import React from "react";
import BuyMeACoffee from "../../images/buymeacoffee.svg"
import HelpUsOut from "../../images/helpUs.svg"
import "../utils/styles/_buyUsACoffee.scss"

const close = () => {
  document.querySelector(".buy-us-a-coffee").style.display = 'none';
}

function BuyUsACoffee() {
  return (
    <div className="buy-us-a-coffee">
      <img src={HelpUsOut} alt="" id="help-us-out"/>
      <a href="https://www.buymeacoffee.com/thobor" target="0">
        <img src={BuyMeACoffee} alt="Buy Me A Coffee" height={50} />
      </a>
      <button id="close" title="Close :(" onClick={close}>X</button>
    </div>
  );
}

export default BuyUsACoffee;
