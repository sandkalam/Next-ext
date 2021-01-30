///////////////////////////////////////////////
// btn
var prev = document.getElementById("prev");
var next = document.getElementById("next");
// input
var inpTITLE = document.getElementById("judul");
var inpURL = document.getElementById("url");
var inpSEAS = document.getElementById("seas");
var inpCHAP = document.getElementById("chap");
var inpZERO = document.getElementById("usezero");
// other
var labelChap = document.getElementById("labelChap");
var url;
var chapter;
var keywords;
var ganti;
///////////////////////////////////////

var arr_chap = ["chapter", "chap", "episode", "eps"];
var arr_season = ["season", "seas"];

chrome.tabs.query({ active: true }, (tabs) => {
  inpTITLE.value = tabs[0].title;
  inpURL.value = tabs[0].url;

  // url
  url = inpURL.value;
  labelChap.innerText = getKeyword(url, arr_chap);
  inpCHAP.value = getchap(url);
  chapter = inpCHAP.value;

  // click
  prev.addEventListener("click", () => {
    ganti = false;
    lanjut(ganti);
  });
  next.addEventListener("click", () => {
    ganti = true;
    lanjut(ganti);
  });
});

function getKeyword(url, arr_keyword) {
  var c;
  arr_keyword.forEach((key) => {
    if (url.includes(key)) {
      c = key;
    }
  });
  return c;
}
function getPath(url, keyword) {
  var pt;
  pt = url.search(keyword) - 1;
  return url[pt];
}
function getKeyValue(url, keyword, path) {
  var split1 = url.split(keyword);
  var split2 = split1[1].split(path);

  split2 = split2[1];
  if (split1.length > 2) {
    path = split1[2][0];
    split2 = split1[2].split(path).join("");
  }

  return split2;
}
function getchap(url) {
  var chap = getKeyValue(
    url,
    getKeyword(url, arr_chap),
    getPath(url, getKeyword(url, arr_chap))
  );
  if (chap.search("%2F") >= 1) {
    chap = chap.split("%2F").join("");
  }
  return chap;
}

function lanjut(ganti) {
  var temp = inpURL.value;
  var cp = getchap(temp);
  var cpm = cp;
  ganti ? ++cpm : --cpm;
  inpZERO.checked ? "0" + cpm : cpm;
  cp = cpm;

  // replace tampilan
  inpURL.value = inpURL.value.replace(getchap(temp), cp);
  inpTITLE.value = inpTITLE.value.replace(getchap(temp), cp);
  inpCHAP.value = inpCHAP.value.replace(getchap(temp), cp);

  chrome.tabs.update({ url: inpURL.value });
}
