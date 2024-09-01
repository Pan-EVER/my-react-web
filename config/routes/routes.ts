module.exports = [
  {
    path: "/",
    // component: "@/modules/Useless",
    // wrappers: [
    //   '@/wrappers/auth',
    // ],
    routes: [
      { name: "首页", path: "/index", component: "@/pages/docs" },
      {
        name: "文件操作",
        path: "/file-operate",
        routes: [
          {
            name: "文件预览和打印",
            path: "/file-operate/preview-and-print",
            component: "@/pages/file-operate/PreviewAndPrint/index.tsx",
          },
        ],
      },
      {
        name: "react的api测试",
        path: "/react-api-test",
        routes: [
          {
            name: "setState的执行机制",
            path: "/react-api-test",
            component: "@/pages/react-api-test/index.tsx",
          },
        ],
      },
      {
        name: "拖动功能",
        path: "/drag-test",
        routes: [
          {
            name: "draggable",
            path: "/drag-test/draggable",
            component: "@/pages/drag-test/draggable/index.tsx",
          },
          {
            name: "beatutiful",
            path: "/drag-test/beatutiful",
            component: "@/pages/drag-test/beatutiful/index.tsx",
          },
          {
            name: "dnd",
            path: "/drag-test/dnd",
            component: "@/pages/drag-test/dnd/index.tsx",
          },
        ],
      },
    ],
  },
];
