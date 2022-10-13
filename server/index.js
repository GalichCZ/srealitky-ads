const express = require("express");
const cors = require("cors");
const axios = require("axios");
const controller = require("./controller/ads.controller");

const PORT = 4444;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", controller.getAdds);
app.get("/pages", controller.getPages);

const items500 = [];

async function parse() {
  for (let i = 1; i < 26; i++) {
    axios
      .get(
        `https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=${i}`
      )
      .then((data) =>
        data.data._embedded.estates.forEach((el) => {
          let obj = {};
          obj.title = el.name;
          obj.img = el._links.image_middle2[0].href;
          obj.url = `https://www.sreality.cz/detail/prodej/byt/${el.name.substring(
            12,
            15
          )}/${el.seo.locality}/${el.hash_id}`;
          obj.locality = el.locality;
          items500.push(obj);
        })
      );
  }
}
// setTimeout(() => {
//   items500.forEach((el) => {
//     controller.addAd(el.title, el.img, el.url, el.locality);
//   });
// }, 2000);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("server started");
    });
  } catch (error) {
    console.log(error);
  }
};

// parse();
start();
