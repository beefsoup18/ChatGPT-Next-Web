// const { invoke } = require('@tauri-apps/api');
// export async function getMacAddress(): Promise<string> {
//   try {
//     // const macAddresses = await invoke('get_mac_address');
//     // console.log(macAddresses);
//     // return macAddresses;
//   } catch (error) {
//     console.error('Error retrieving MAC address:', error);
//     // return "";
//   }
//   return "";
// }

import os from "os";
// 获取计算机的网络接口信息
export async function getMacAddress(): Promise<string> {
  const nets = os.networkInterfaces(); // :NodeJS.Dict<os.NetworkInterfaceInfo[]>
  console.log(nets);
  if (nets) {
    // console.log('网络接口信息:', nets);
    for (const name of Object.keys(nets ?? {})) {
      console.log(name);
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

// import { exec } from 'child_process';
// export function getMacAddress(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     exec('ipconfig /all', (error, stdout) => {
//       if (error) {
//         reject(error);
//         return;
//       }
//       var sttt = stdout.split("\n");
//       var mac: string = "";
//       var flag = false;
//       for (const line of sttt) {
//         var name = line.substring(0, 16);
//         if (name === "Ethernet adapter") {
//             flag = true;
//         }
//         if (flag) {
//             var key = line.substring(3, 19);
//             if (key === "Physical Address") {
//                 mac = line.substring(39, 56);
//                 // console.log(line);
//                 // console.log(mac);
//                 break;
//             }
//         }
//       };
//       resolve(mac);
//     });
//   });
// }

// import fs from "fs";
// import { LocalStorage } from 'node-localstorage';
// export function saveDataToLocalStorage(key: string, value: string) {
//     // 创建一个本地存储实例
//     const localStoragePath: string = './scratch';
//     const localStorage = new LocalStorage(localStoragePath);
//     if (!fs.existsSync(localStoragePath)) {
//         fs.mkdirSync(localStoragePath);
//     }
//     localStorage.setItem(key, value);
//   }

// export function saveDataToLocalStorage(data: string) {
// // 保存数据到本地存储
//     localStorage.setItem('myData', data);

//     // 从本地存储中获取数据
//     const savedData = localStorage.getItem('myData');
//     console.log(savedData); // 输出 "要保存的数据"
// }

// 发送 POST 请求并解析 JSON 的函数
async function sendPostRequest(
  url: string,
  data: any,
  port: number,
): Promise<any> {
  try {
    // 构建请求 URL
    const requestUrl = `${url}:${port}`;

    // 发送 POST 请求
    const response = await fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // 检查响应状态
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析 JSON 响应
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error sending POST request:", error);
    throw error;
  }
}

//   // 使用示例
//   const data = {
//     key1: 'value1',
//     key2: 'value2',
//   };
//   const url = 'http://example.com'; // 替换为你的 URL
//   const port = 8080; // 替换为你的端口号
//   sendPostRequest(url, data, port)
//     .then((result) => {
//       console.log('Response JSON:', result);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
