const express = require("express")
const fs = require('fs')
const path = require('path')
const app = express.Router()


/**
 * GET product list
 * 
 * @return product list | empty.
 */


function make_resp(res, file_name) {
  const content = fs.readFileSync(path.join("data", file_name))
  res.removeHeader("x-powered-by")
  res.json(JSON.parse(content))
  return res
}


app.get("/customer_satellites", async (req, res) => {
  res = make_resp(res, "customers.json")
});

app.get("/launchers", async (req, res) => {
  res = make_resp(res, "launchers.json")
});

app.get("/spacecrafts", async (req, res) => {
  res = make_resp(res, "spacecrafts.json")
});

app.get("/centers", async (req, res) => {
  res = make_resp(res, "centres.json")
});

module.exports = app;
