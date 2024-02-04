// function getLocalNetworkInterfaces() {
//     return new Promise((resolve, reject) => {
//       if (window.RTCPeerConnection) {
//         const pc = new RTCPeerConnection({ iceServers: [] });
//         pc.createDataChannel('');
//         pc.createOffer()
//           .then(offer => pc.setLocalDescription(offer))
//           .then(() => {
//             pc.onicecandidate = (event) => {
//               if (event.candidate) {
//                 const addressRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
//                 const ipAddress = addressRegex.exec(event.candidate.candidate)[1];
//                 resolve(ipAddress);
//                 pc.onicecandidate = null;
//                 pc.close();
//               }
//             };
//           })
//           .catch(reject);
//       } else {
//         reject(new Error('RTCPeerConnection is not supported'));
//       }
//     });
//   }

// export function getMacAddress(): string {
//   // 调用函数获取本地网络接口信息
//   getLocalNetworkInterfaces()
//   return "";
// }

import os from "os";
// 获取计算机的网络接口信息
export async function getMacAddress(): Promise<string> {
  const nets = os.networkInterfaces()!; // :NodeJS.Dict<os.NetworkInterfaceInfo[]>
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
