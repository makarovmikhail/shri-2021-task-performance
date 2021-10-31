function getBrowser(userAgent) {
  var sBrowser,
    sUsrAg = userAgent;
  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
  } else if (sUsrAg.indexOf("Opera") > -1) {
    sBrowser = "Opera";
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge";
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
  } else {
    sBrowser = "unknown";
  }
  return sBrowser;
}
