// const { exec } = require('child_process');
// // 执行命令检查是否安装了 Node.js
// exec('node -v', (error: Error | null, stdout: string, stderr: string) => {
//   if (error) {
//     console.error('Node.js 未安装');
//   } else {
//     console.log('Node.js 已安装');
//     console.log('版本号:', stdout);
//   }
// });

import os from "os";
// const os = require('os')
// console.log(os.hostname())
// 获取计算机的网络接口信息
export function getMacAddress(): string {
  const nets = os.networkInterfaces!;
  if (nets) {
    // console.log('网络接口信息:', nets);
    for (const name of Object.keys(nets ?? {})) {
      for (const net of nets[name] ?? []) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === "IPv4" && !net.internal) {
          console.log(net.mac);
          var mac: string = net.mac;
          return mac;
        }
      }
    }
  }
  return "";
}
