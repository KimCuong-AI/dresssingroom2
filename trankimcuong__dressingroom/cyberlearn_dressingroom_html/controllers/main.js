import { CallDaTa } from '../callData/callData.js'
import { ListChosen } from '../models/ListChosen.js';
import { ChoseItem } from '../models/ChoseItem.js'
let listChosen = new ListChosen();
// // let choseItem = new ChoseItem();
let callData = new CallDaTa();

let navPillContent = "";
let tabPaneContent = "";
let createTHML = () => {
  callData.getListData()
    .then((result) => {
      // result.data[0].navPills.map((item) => {
      result.data[0].navPills.map((item) => {

        let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
        let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";
        navPillContent += getElmTabPills(item, activeClass);
        tabPaneContent += `
                <div class="tab-pane container ${fadeClass} ${activeClass} " id="${item.tabName}">
                <div class="container">
                  <div class="row">
                  ${renderTabPane(item.tabName, result.data[0].tabPanes)}
                  </div>
                  </div>
                </div> 
                `;

      })
      document.querySelector(".nav-pills").innerHTML = navPillContent;
      document.querySelector(".tab-content").innerHTML = tabPaneContent;
    })
    .catch((error) => {
      console.log(error)
    })



}
createTHML();
let getElmTabPills = (nav, activeClass) => {
  return `<li class="nav-item">
          <a
            class="nav-link btn-default ${activeClass}"
            data-toggle="pill"
            href="#${nav.tabName}"
          >
            ${nav.showName}
          </a>
        </li>`;
}


let renderTabPane = (tabName, arrTabPanes) => {
  var temArr = null;
  var eleItem = null;
  switch (tabName) {
    case "tabTopClothes":
      temArr = getTypeArr("topclothes", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabBotClothes":
      temArr = getTypeArr("botclothes", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabShoes":
      temArr = getTypeArr("shoes", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabHandBags":
      temArr = getTypeArr("handbags", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabNecklaces":
      temArr = getTypeArr("necklaces", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabHairStyle":
      temArr = getTypeArr("hairstyle", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    case "tabBackground":
      temArr = getTypeArr("background", arrTabPanes);
      eleItem = getElmItem(temArr);
      break;
    default:
      break;
  }
  return eleItem;
}
let getTypeArr = (tabType, data) => {
  let tempArr = [];
  data.map((item) => {
    if (item.type === tabType) {
      tempArr = [...tempArr, item]
    }
  })
  return tempArr;
}

let getElmItem = (tempArr) => {
  let elmItem = "";
  tempArr.map((item) => {
    elmItem += `<div class="col-md-3">
        <div class="card text-center">
          <img src="${item.imgSrc_jpg}" />
          <h4>
            <b>${item.name}</b>
          </h4>
          <button onclick="tryon('${item.id}','${item.type}','${item.name}','${item.desc}','${item.imgSrc_jpg}','${item.imgSrc_png}')" class="changStyle">Thử đồ</button>
    
        </div>
      </div>

        `
  })
  return elmItem;

}


const tryon = (id, type, name, desc, imgsrc_jpg, imgSrc_png) => {
  let choseItem = new ChoseItem(id, type, name, desc, imgsrc_jpg, imgSrc_png);
  let index = findIndex(choseItem.type);
  if (index !== -1) {
    listChosen.arr[index] = choseItem;
  }
  else {
    listChosen.addItem(choseItem);
  }
  renderContain(listChosen.arr)
  // console.log(tabPaneContent);

  // console.log(choseItem);
  // console.log(index)

}
window.tryon = tryon;
let findIndex = (type) => {
  let index = -1;
  listChosen.arr.forEach((item, i) => {
    if (item.type === type) {
      index = i;
    }
  });
  console.log(index)
  return index;
}


let renderContain = (chosenItems) => {
  chosenItems.forEach((item) => {
    if (item.type === "topclothes") {
      renderBikiniTop(item.imgSrc_png);
    }
    if (item.type === "botclothes") {
      renderBikiniBottom(item.imgSrc_png);
    }
    if (item.type === "shoes") {
      renderFeet(item.imgSrc_png);
    }
    if (item.type === "handbags") {
      renderHandbags(item.imgSrc_png);
    }
    if (item.type === "necklaces") {
      renderNecklace(item.imgSrc_png);
    }
    if (item.type === "hairstyle") {
      renderHairstyle(item.imgSrc_png);
    }
    if (item.type === "background") {
      renderBackground(item.imgSrc_png);
    }
  })
}



let renderBikiniTop = (img) => {
  let bikinitop = document.querySelector(".bikinitop");
  bikinitop.style.width = "500px";
  bikinitop.style.height = "500px";
  bikinitop.style.background = `url(${img})`;
  bikinitop.style.position = "absolute";
  bikinitop.style.top = "-9%";
  bikinitop.style.left = "-5%";
  bikinitop.style.zIndex = "3";
  bikinitop.style.transform = "scale(0.5)";
}

let renderBikiniBottom = (img) => {
  let bikinibottom = document.querySelector(".bikinibottom");
  bikinibottom.style.width = "500px";
  bikinibottom.style.height = "1000px";
  bikinibottom.style.background = `url(${img})`;
  bikinibottom.style.position = "absolute";
  bikinibottom.style.top = "-30%";
  bikinibottom.style.left = "-5%";
  bikinibottom.style.zIndex = "2";
  bikinibottom.style.transform = "scale(0.5)";

}

let renderFeet = (img) => {
  let feet = document.querySelector(".feet");
  feet.style.width = "500px";
  feet.style.height = "1000px";
  feet.style.background = `url(${img})`;
  feet.style.position = "absolute";
  feet.style.bottom = "-37%";
  feet.style.right = "-3.5%";
  feet.style.zIndex = "1";
  feet.style.transform = "scale(0.5)";

}


let renderHandbags = (img) => {
  let handbag = document.querySelector(".handbag");
  handbag.style.width = "500px";
  handbag.style.height = "1000px";
  handbag.style.background = `url(${img})`;
  handbag.style.position = "absolute";
  handbag.style.bottom = "-40%";
  handbag.style.right = "-3.5%";
  handbag.style.transform = "scale(0.5)";
  handbag.style.zIndex = "4"


}

let renderNecklace = (img) => {
  let necklace = document.querySelector(".necklace");
  necklace.style.width = "500px";
  necklace.style.height = "1000px";
  necklace.style.background = `url(${img})`;
  necklace.style.position = "absolute";
  necklace.style.bottom = "-40%";
  necklace.style.right = "-3.5%";
  necklace.style.transform = "scale(0.5)";
  necklace.style.zIndex = "4"
}



let renderHairstyle = (img) => {
  let hairstyle = document.querySelector(".hairstyle");
  hairstyle.style.width = "1000px";
  hairstyle.style.height = "1000px";
  hairstyle.style.background = `url(${img})`;
  hairstyle.style.position = "absolute";
  hairstyle.style.bottom = "-75%";
  hairstyle.style.right = "-57%";
  hairstyle.style.transform = "scale(0.15)";
  hairstyle.style.zIndex = "7"
}
let renderBackground = (img) => {
  let background = document.querySelector(".background");
  background.style.backgroundImage = `url(${img})`;

}

