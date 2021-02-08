import fs from "fs";
import csv from "csv-parser";
import dateFns from "date-fns";

const result = [];
const stream = fs
  .createReadStream("./source/Monefy.Data.2-8-21 (2).csv")
  .pipe(
    csv({
      separator: ";",
      mapHeaders: ({ header, index }) => (header === "converted amount" ? "converted_amount" : header),
      mapValues: ({ value, header }) => {
        if (header === "amount" || header === "converted_amount") {
          return parseFloat(value.replace(",", ""));
        }
        if (header === "date") {
          return new Date(Date.parse(value.split("/").reverse().join("-")));
        }
        return value;
      },
    })
  )
  .on("data", (data) => result.push(data))
  .on("end", () => {
    // console.log(result);
    fs.writeFileSync("./result/result.json", JSON.stringify(result, null, " "));
  });
