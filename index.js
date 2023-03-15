const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
var cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// app.post("/codeforces", async (req, res) => {
  // var data = []
  // var error = 0
//   const hello = async () => {
//   var d = new Date();
//   console.log(d.getTime())
//     // const url = req.body.url
//     const drag = async () => {
//       const url = "https://codechef.com/users/nagaphbilla"
//     // await axios.get(url)
//     // .then(info => {
//     //   const $ = cheerio.load(info.data)
//     //   // console.log(cheerio.text($('.info')));
//     //   // console.log($('.info > ul > li > span').html())
//     //   const score = $('.info > ul > li > span').html()
//     //   console.log(score);
//     //   // res.status(200).send($('.info > ul > li > span').html())
//     //   data.push({'url' : url, 'score' : score})
//     //   // res.status(200).json(cheerio.html($('.info')))    
//     //   // res.status(200).send(parse('.info', html).text())
//     // })
//     // .catch(function(err) {
//     //   // res.status(501).send(err)
//     //   console.log(err)
//     //   error = 1
//     // })
//     // fetch(url)
//     // .then(res => res.json())
//     // .then(data => console.log(data))
//     // try {
//       // const res = await axios.get(url)
//       // const format = res.data
//       // const $ = cheerio.load(format)
//       // const score = $('.rating-number').html()
//       // data.push(score)
//     // } catch (error) {
//     //   console.log(error)
//     //   error = 1
//     // }
//     }
//   // for(var i=0;i<5;i++) {
//   // axios.get(url)
//   // .then(info => {
//   //   const $ = cheerio.load(info.data)
//   //   // console.log(cheerio.text($('.info')));
//   //   // console.log($('.info > ul > li > span').html())
//   //   const score = $('.info > ul > li > span').html()
//   //   console.log(score);
//   //   // res.status(200).send($('.info > ul > li > span').html())
//   //   data.push({'url' : url, 'score' : score})
//   //   // res.status(200).json(cheerio.html($('.info')))    
//   //   // res.status(200).send(parse('.info', html).text())
//   // })
//   // .catch(function(err) {
//   //   // res.status(501).send(err)
//   //   console.log(err)
//   // })
//   for(var i=0;i<100;i++) {
//     await drag()
//   }
// // }
//   // try {
//   //   res.status(200).json(data)
//   // } catch (error) {
//   //   res.status(501).json(error)
//   // }
//   // })
//   console.log(data)
//   d = new Date()
//   console.log(d.getTime())
//   return data
// }
const URL = "https://codechef.com/users/nagaphbilla"
const puppeteer = require("puppeteer")

const getData = async () => {
  var d = new Date();
  console.log(d.toLocaleTimeString())
  var ratings = []
  const brower = await puppeteer.launch({
    headless : true,
    defaultViewport : null,
  })
  const page = await brower.newPage()
  await page.setRequestInterception(true)

  page.on('request', (req) => {
    if(req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
      req.abort();
    }
    else {
      req.continue();
    }
  })

  const getInfo = async () => {
    await page.goto(URL, {
      waitUntil : "domcontentloaded"
    })
    var data = await page.evaluate(() => {
      const info = document.querySelector(".rating-number").innerHTML
      return info
    })
    
    ratings.push(data)
    console.log(ratings)
  }

  const load = async () => {
    for(var i=0;i<10;i++) {
      await getInfo()
    }
  }

  await load()

  await brower.close()

  var d = new Date();
  console.log(d.toLocaleTimeString())
  return ratings

}

app.post("/getData", (req, res) => {
  try {
    getData()
    .then(ratings => {
      if(ratings.length < 1) {
        return res.status(402).json({ err : "Error"})
      }
      res.status(200).send(`${ratings}`)
    })
  }
  catch(err) {
    console.log(err);
  }

})



app.post("/", async (req, res) => {
  try {
    res.status(200).send("Server Running")
  } catch (error) {
    res.status(501).json(error)
  }
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
