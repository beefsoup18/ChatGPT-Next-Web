export const OWNER = "Yidadaa";
export const REPO = "ChatGPT-Next-Web";
// export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const REPO_URL = `https://github.com/beefsoup18/${REPO}`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;
export const UPDATE_URL = `${REPO_URL}#keep-updated`;
export const RELEASE_URL = `${REPO_URL}/releases`;
export const FETCH_COMMIT_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits?per_page=1`;
export const FETCH_TAG_URL = `https://api.github.com/repos/${OWNER}/${REPO}/tags?per_page=1`;
export const RUNTIME_CONFIG_DOM = "danger-runtime-config";

export const DEFAULT_CORS_HOST = "https://a.nextweb.fun";
export const DEFAULT_API_HOST = `${DEFAULT_CORS_HOST}/api/proxy`;
// export const OPENAI_BASE_URL = "https://api.openai.com";

export const CYBER_BASE_URL = "https://cyberchat.top";
// export const CYBER_BASE_URL = "http://120.25.76.120:8000";

// export const CYBER_BASE_URL = "http://120.25.76.120:5000";
// export const CYBER_BASE_URL = "http://localhost:5000";
// export const CYBER_BASE_URL = "http://192.168.1.105:5000";
// export const CYBER_BASE_URL = "http://192.168.1.103:5000";
// export const CYBER_BASE_URL = "http://127.0.0.1:5000";
// export const CYBER_BASE_URL = "http://cyberchat.top:5000";

export const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/";

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/auth",
}

export enum ApiPath {
  Cors = "/api/cors",
  OpenAI = "/api/openai",
  Cyber = "/chatbot/api",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
}

export const DEFAULT_SIDEBAR_WIDTH = 300;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const STORAGE_KEY = "chatgpt-next-web";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export enum ServiceProvider {
  OpenAI = "OpenAI",
  Azure = "Azure",
  Google = "Google",
}

export enum ModelProvider {
  GPT = "GPT",
  GeminiPro = "GeminiPro",
  Cyber = "Cyber",
}

// export const OpenaiPath = {
//   ChatPath: "v1/chat/completions",
//   UsagePath: "dashboard/billing/usage",
//   SubsPath: "dashboard/billing/subscription",
//   ListModelPath: "v1/models",
// };

export const CyberPath = {
  ChatPath: "dialog/", // "echo", // "qwen-14b",
  UsagePath: "",
  SubsPath: "",
  ListModelPath: "",
};

// export const Azure = {
//   ExampleEndpoint: "https://{resource-url}/openai/deployments/{deploy-id}",
// };

// export const Google = {
//   ExampleEndpoint: "https://generativelanguage.googleapis.com/",
//   ChatPath: "v1beta/models/gemini-pro:generateContent",

//   // /api/openai/v1/chat/completions
// };

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: {{cutoff}}
Current model: {{model}}
Current time: {{time}}
Latex inline: $x^2$ 
Latex block: $$e=mc^2$$
`;

export const SUMMARIZE_MODEL = "gpt-3.5-turbo";

export const KnowledgeCutOffDate: Record<string, string> = {
  default: "2021-09",
  "gpt-4-1106-preview": "2023-04",
  "gpt-4-vision-preview": "2023-04",
};

export const DEFAULT_MODELS = [
  // {
  //   name: "gpt-4",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-0314",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-0613",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-32k",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-32k-0314",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-32k-0613",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-1106-preview",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-4-vision-preview",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo-0301",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo-0613",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo-1106",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo-16k",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gpt-3.5-turbo-16k-0613",
  //   available: true,
  //   provider: {
  //     id: "openai",
  //     providerName: "OpenAI",
  //     providerType: "openai",
  //   },
  // },
  // {
  //   name: "gemini-pro",
  //   available: true,
  //   provider: {
  //     id: "google",
  //     providerName: "Google",
  //     providerType: "google",
  //   },
  // },
  {
    name: "qwen",
    available: true,
    provider: {
      id: "Alibaba",
      providerName: "Alibaba",
      providerType: "Alibaba",
    },
  },
] as const;

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;

// import { getMacAddress } from "@/app/registry"; //, saveDataToLocalStorage
// import os from "os";
// async function getMacAddress() {
//   console.log(os.networkInterfaces)
//   const nets = os.networkInterfaces!;
//   if (nets) {
//     // console.log('网络接口信息:', nets);
//     for (const name of Object.keys(nets ?? {})) {
//       for (const net of nets[name] ?? []) {
//         // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
//         if (net.family === "IPv4" && !net.internal) {
//             console.log(net.mac)
//           return net.mac;
//         }
//       }
//     }
//   }
// }

// export var localMAC = "";
// async function getMac() {
// getMacAddress().then(mac => {localMAC=mac;});
// }
// getMac();
// export const localMAC = getMacAddress();
// getMacAddress().then((value) => {localMAC=value});
// console.log(localMAC);

// saveDataToLocalStorage("lllllll");
