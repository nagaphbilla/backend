const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
var cors = require('cors');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// app.post("/codeforces", async (req, res) => {
var d = new Date();
console.log(d.getTime())
var data = []
var error = 0
const hello = async () => {
    // const url = req.body.url
    const drag = async () => {
      const url = "https://codeforces.com/profile/nagaphbilla"
    // await axios.get(url)
    // .then(info => {
    //   const $ = cheerio.load(info.data)
    //   // console.log(cheerio.text($('.info')));
    //   // console.log($('.info > ul > li > span').html())
    //   const score = $('.info > ul > li > span').html()
    //   console.log(score);
    //   // res.status(200).send($('.info > ul > li > span').html())
    //   data.push({'url' : url, 'score' : score})
    //   // res.status(200).json(cheerio.html($('.info')))    
    //   // res.status(200).send(parse('.info', html).text())
    // })
    // .catch(function(err) {
    //   // res.status(501).send(err)
    //   console.log(err)
    //   error = 1
    // })
    // fetch(url)
    // .then(res => res.json())
    // .then(data => console.log(data))
    // try {
      const res = await axios.get(url)
      const format = res.data
      const $ = cheerio.load(format)
      const score = $('.info > ul > li > span').html()
      data.push({'url' : url, 'score' : score})
    // } catch (error) {
    //   console.log(error)
    //   error = 1
    // }
    }
  // for(var i=0;i<5;i++) {
  // axios.get(url)
  // .then(info => {
  //   const $ = cheerio.load(info.data)
  //   // console.log(cheerio.text($('.info')));
  //   // console.log($('.info > ul > li > span').html())
  //   const score = $('.info > ul > li > span').html()
  //   console.log(score);
  //   // res.status(200).send($('.info > ul > li > span').html())
  //   data.push({'url' : url, 'score' : score})
  //   // res.status(200).json(cheerio.html($('.info')))    
  //   // res.status(200).send(parse('.info', html).text())
  // })
  // .catch(function(err) {
  //   // res.status(501).send(err)
  //   console.log(err)
  // })
  for(var i=0;i<100;i++) {
    await drag()
  }
// }
  // try {
  //   res.status(200).json(data)
  // } catch (error) {
  //   res.status(501).json(error)
  // }
  // })
  console.log(data)
  d = new Date()
  console.log(d.getTime())
  return data
}
app.use("/request", async (req, res) => {
  try {
    hello().then(data => res.status(200).json(data))
  } catch (error) {
    res.status(501).json(error)
  }
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
