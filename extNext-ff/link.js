var keyword = $("#keyword");
var urlInput = $("#urlInput");
var val = $("#val");
var iszero = $("#iz");

function findnumber(link = String, path) {
  link = link.split("");
  var posp = link.indexOf(path) + 1;
  var link = link.slice(posp);

  isStop = (elm) =>
    elm == path ? elm == path : elm == "/" ? elm == "/" : elm == "";

  var rr = link.findIndex(isStop);
  link.length = rr;
  return link.join("");
}

function findpath(url, keyword) {
  path = url.indexOf(keyword) - 1;
  return url[path];
}

browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
  var url = tabs[0].url;
  var keyword_umum = ["eps", "halaman", "episode", "chapter", "chap"];

  //  memasukan url
  urlInput.val(url);
  // apakah keyword cocok dengan data
  keyword_umum.forEach((key) => {
    if (url.includes(key)) {
      keyword.val(key);
    }
  });
  // mengecek apakah char adalah number
  var path = findpath(url, keyword.val());
  var linkmentah = url.split(keyword.val()); //memisahkan url menjadi array

  val.val(findnumber(linkmentah[1], path));

  function update(args) {
    var valmod = Number(val.val());
    args == true ? valmod++ : valmod--;
    valmod = valmod.toString();
    // jika panjang value >1 dan is zero check maka tambahkan angka 0 jika tidak tidak usah
    valmod =
      valmod.length == 1 && iszero.prop("checked") ? "0" + valmod : valmod;

    linkmentah[1] = linkmentah[1].replace(val.val(), valmod); //replace  value di url [1] dengan kata kunci
    val.val(valmod);
    var urlfix = linkmentah.join(keyword.val());
    // update halaman
    url = urlfix;
    browser.tabs.update(tabs[0].id, { url: urlfix });
  }

  // menambah event click
  var btnprev = $("#prev");
  var btnnext = $("#next");
  btnnext.on("click", () => {
    update(true);
  });
  btnprev.on("click", () => {
    update(false);
  });
});
