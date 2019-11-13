#!/usr/bin/env node

const http = require("http");
const args = require("process").argv;
const join = require("path").join;
const mkdirp = require("mkdirp");
const url = args
  .filter(arg => arg.indexOf("--url") > -1)[0]
  .replace("--url=", "");
let envPath = args.filter(arg => arg.indexOf("--envPath") > -1);
if (envPath.length > 0) {
  envPath = envPath[0].replace("--envPath=", "");
} else {
  envPath = process.cwd();
}
let output = args.filter(arg => arg.indexOf("--output") > -1);
if (output.length > 0) {
  output = output[0].replace("--output=", "");
}
const config =
  envPath.length > 0
    ? require("dotenv").config({ path: envPath })
    : require("dotenv").config();
const apiKey = config.parsed.API_KEY;
const fs = require("fs");

http
  .get(
    "http://wave.webaim.org/api/request?key=" +
      apiKey +
      "&reporttype=4&url=" +
      url,
    resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        if (output.length > 0) {
          mkdirp.sync(output);
        }
        const filename =
          output.length > 0 ? join(output, "WAVE.json") : "WAVE.json";
        fs.writeFileSync(filename, data);
      });
    }
  )
  .on("error", err => {
    console.log("Error: " + err.message);
  });
