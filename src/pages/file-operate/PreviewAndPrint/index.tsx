import JSZip from "jszip";
import { useRef, useState } from "react";
import { WorkSheet, read, utils as xlsxUtils } from "xlsx";
import { HotTable, HotTableProps } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import { Button } from "antd";
import ReactToPrint from "react-to-print";

// register Handsontable's modules
registerAllModules();

export const ExampleComponent = ({ data }: { data: HotTableProps["data"] }) => {
  // const data = [
  //   ["", "Tesla", "Nissan", "Toyota", "Honda", "Mazda", "Ford"],
  //   ["2017", 10, 11, 12, 13, 15, 16],
  //   ["2018", 10, 11, 12, 13, 15, 16],
  //   ["2019", 10, 11, 12, 13, 15, 16],
  //   ["2020", 10, 11, 12, 13, 15, 16],
  //   ["2021", 10, 11, 12, 13, 15, 16],
  // ];
  const componentRef = useRef<any>();
  console.log("ref1", componentRef);
  const handlePrint = () => {
    // console.log("ref1.current", ref1.current.print);
    // componentRef.current.print();
    // ref1.current.hotElementRef.print();
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => <Button>打印</Button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef} id="pdfViewId">
        <HotTable
          data={data}
          startRows={5}
          startCols={5}
          height="auto"
          width="auto"
          colHeaders={true}
          minSpareRows={1}
          licenseKey="non-commercial-and-evaluation"
        />
      </div>
    </div>
  );
};

/**
 * 文件预览和打印
 */
const PreviewAndPrint = () => {
  const [htmlStr, setHtmlStr] = useState<string>("");
  const [tableData, setTableData] = useState<any[][]>([]);

  const handleFilesChange = (event) => {
    console.log("event.target", event.target.files);

    var zipFile = event.target.files[0];

    // 处理zip文件
    JSZip.loadAsync(zipFile).then(function (parseRes) {
      console.log("res", parseRes);
      const files = parseRes.files;
      console.log("Object.keys(files)", Object.keys(files));

      // 获取zip文件中的所有文件
      Object.keys(files).forEach((filename) => {
        console.log("file", filename);
        if (filename.endsWith(".xls") || filename.endsWith(".xlsx")) {
          console.log("--", files[filename]);
          files[filename].async("arraybuffer").then((blobData) => {
            console.log("blobData", blobData);

            // 读取文件数据
            var workbook = read(blobData, { type: "buffer" });
            console.log("workbook", workbook);

            console.log("workbook.Sheets", workbook.Sheets);

            // var container = document.getElementById("tavolo");
            const htmlStr = xlsxUtils.sheet_to_html(workbook.Sheets["Sheet1"], {
              editable: true,
            });
            setHtmlStr(htmlStr);
            console.log("htmlStr", htmlStr);

            // 其他数据格式
            const jsonData = xlsxUtils.sheet_to_json(workbook.Sheets["Sheet1"]);
            // const difData = xlsxUtils.sheet_to_dif(workbook.Sheets["Sheet1"]);
            // const ethData = xlsxUtils.sheet_to_eth(workbook.Sheets["Sheet1"]);
            const formuData = xlsxUtils.sheet_to_formulae(
              workbook.Sheets["Sheet1"]
            );
            // const slkData = xlsxUtils.sheet_to_slk(workbook.Sheets["Sheet1"]);

            console.log("jsonData", jsonData);
            // console.log("difData", difData);
            // console.log("ethData", ethData);
            console.log("formuData", formuData);
            // console.log("slkData", slkData);

            const getSheetArrayData = (sheet: WorkSheet) => {
              const csvData = xlsxUtils.sheet_to_csv(sheet);
              console.log("csvData", csvData);
              // 换行符和逗号分隔
              return csvData.split("\n").map((str) => str.split(","));
            };

            const arrayData = getSheetArrayData(workbook.Sheets["Sheet1"]);
            setTableData(arrayData);
            console.log("arrayData", arrayData);
          });
        }
      });
    });
  };

  return (
    <div>
      <h2>文件预览和打印</h2>
      <input
        type="file"
        id="fileInput"
        accept=".zip"
        onChange={handleFilesChange}
      />
      <div dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
      <ExampleComponent data={tableData} />
    </div>
  );
};

export default PreviewAndPrint;
