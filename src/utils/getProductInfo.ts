import axios from "axios";
import cheerio from "cheerio";

export async function getProductInfo(url: string) {
  const cdnBaseUrl = "https://cdn.dsmcdn.com";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const data = $("body > script:nth-child(2)").html();
    let tmp = data
      ?.split("window.__PRODUCT_DETAIL_APP_INITIAL_STATE__=")[1]
      .split(";window.TYPageName=")[0]
      .split('"images":')[1]
      .split(',"isSellable"')[0];

    const title = $("h1").text();
    const price = $(".product-price-container .prc-dsc").text();
    const imgData = eval(tmp).map((item: any) => cdnBaseUrl + item);
    return { title, price, imgData };
  } catch (error) {
    console.log(error);
  }
}
