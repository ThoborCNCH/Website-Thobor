export default class Placeholder {
  static makeimg(img) {
    if (img) return img;
    return require("../../img/echipa.jpeg");
  }
  static makenumber(num) {
    return num.toLocaleString("en-US");
  }
  static getdate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;  
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  }
  static getdateadmin() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;  
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  }

  static roundit(num, how) {
    if (!how) return Math.round(num * 100) / 100;
    else return Math.round(num * how) / how;
  }
}
