(function () {
  var shapes = [
    ["square", "116px", "#1563c5", "3%", "3%", ""],
    ["triangle", "88px", "#e40303", "18%", "7%", ""],
    ["square", "42px", "#078d3f", "31%", "7%", ""],
    ["triangle", "132px", "#ffc20f", "41%", "8%", "180deg"],
    ["square", "94px", "#e40303", "54%", "5%", ""],
    ["triangle", "164px", "#078d3f", "69%", "2%", ""],
    ["square", "128px", "#ffc20f", "88%", "4%", ""],
    ["triangle", "126px", "#078d3f", "7%", "25%", "90deg"],
    ["square", "78px", "#ffc20f", "21%", "30%", ""],
    ["triangle", "102px", "#1563c5", "32%", "30%", ""],
    ["square", "132px", "#e40303", "44%", "26%", ""],
    ["triangle", "68px", "#ffc20f", "62%", "32%", "-90deg"],
    ["square", "94px", "#1563c5", "74%", "31%", ""],
    ["triangle", "126px", "#e40303", "91%", "30%", "180deg"],
    ["square", "64px", "#e40303", "4%", "58%", ""],
    ["triangle", "132px", "#ffc20f", "16%", "51%", ""],
    ["square", "118px", "#1563c5", "30%", "57%", ""],
    ["triangle", "72px", "#078d3f", "47%", "58%", "90deg"],
    ["square", "150px", "#ffc20f", "56%", "55%", ""],
    ["triangle", "92px", "#e40303", "73%", "56%", "-90deg"],
    ["square", "86px", "#078d3f", "87%", "58%", ""],
    ["triangle", "158px", "#1563c5", "6%", "84%", "180deg"],
    ["square", "86px", "#e40303", "23%", "86%", ""],
    ["triangle", "92px", "#078d3f", "36%", "86%", ""],
    ["square", "138px", "#ffc20f", "48%", "82%", ""],
    ["triangle", "78px", "#e40303", "65%", "87%", "-90deg"],
    ["square", "112px", "#1563c5", "78%", "84%", ""],
    ["triangle", "112px", "#ffc20f", "92%", "85%", ""],
  ];

  var field = document.createElement("div");
  field.className = "shape-field";
  field.setAttribute("aria-hidden", "true");

  shapes.forEach(function (shape) {
    var item = document.createElement("span");
    item.className = "shape " + shape[0];
    item.style.setProperty("--s", shape[1]);
    item.style.setProperty("--c", shape[2]);
    item.style.left = shape[3];
    item.style.top = shape[4];
    if (shape[5]) {
      item.style.setProperty("--r", shape[5]);
    }
    field.appendChild(item);
  });

  document.body.insertBefore(field, document.body.firstChild);

  var ticking = false;
  function moveBackground() {
    var offset = Math.min(window.scrollY * 0.16, 180);
    field.style.transform = "translate3d(0, -" + offset + "px, 0)";
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(moveBackground);
        ticking = true;
      }
    },
    { passive: true },
  );
})();
