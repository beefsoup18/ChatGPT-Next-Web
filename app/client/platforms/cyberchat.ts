import {
  ApiPath,
  DEFAULT_API_HOST,
  DEFAULT_MODELS,
  CyberPath,
  REQUEST_TIMEOUT_MS,
  ServiceProvider,
  CYBER_BASE_URL,
} from "@/app/constant";
import { useAccessStore, useAppConfig, useChatStore } from "@/app/store";

import { ChatOptions, getHeaders, LLMApi, LLMModel, LLMUsage } from "../api";
import Locale from "../../locales";
import {
  EventStreamContentType,
  fetchEventSource,
} from "@fortaine/fetch-event-source";
import { prettyObject } from "@/app/utils/format";
import { getClientConfig } from "@/app/config/client";
// import { makeAzurePath } from "@/app/azure";

// import { localMAC } from "@/app/constant";
import { getMacAddress } from "@/app/registry";

export interface OpenAIListModelResponse {
  object: string;
  data: Array<{
    id: string;
    object: string;
    root: string;
  }>;
}

export class CyberApi implements LLMApi {
  private disableListModels = true;
  private localMAC = "null";

  path(path: string): string {
    getMacAddress()
      .then((localMAC) => {
        this.localMAC = localMAC;
        console.log(this.localMAC);
      })
      .catch((error) => {
        console.error("Error retrieving MAC address:", error);
      });

    const accessStore = useAccessStore.getState();

    const isAzure = accessStore.provider === ServiceProvider.Azure;

    if (isAzure && !accessStore.isValidAzure()) {
      throw Error(
        "incomplete azure config, please check it in your settings page",
      );
    }

    // let baseUrl = isAzure ? accessStore.azureUrl : accessStore.openaiUrl;
    let baseUrl = CYBER_BASE_URL + ApiPath.Cyber;

    if (baseUrl.length === 0) {
      const isApp = !!getClientConfig()?.isApp;
      baseUrl = isApp ? DEFAULT_API_HOST : ApiPath.Cyber;
    }

    console.log(baseUrl);

    if (baseUrl.endsWith("/")) {
      baseUrl = baseUrl.slice(0, baseUrl.length - 1);
    }
    if (!baseUrl.startsWith("http") && !baseUrl.startsWith(ApiPath.Cyber)) {
      baseUrl = "https://" + baseUrl;
    }

    // if (isAzure) {
    //   path = makeAzurePath(path, accessStore.azureApiVersion);
    // }

    return [baseUrl, path].join("/");
  }

  extractMessage(res: any) {
    return res.choices?.at(0)?.message?.content ?? "";
  }

  async chat(options: ChatOptions) {
    const messages = options.messages.map((v) => ({
      role: v.role,
      content: v.content,
    }));

    const message = messages[messages.length - 1]["content"];

    const requestPayload = {
      role: "user",
      text: message,
      mac: this.localMAC,
    };

    console.log("[Request] cyberchat payload: ", requestPayload);

    const shouldStream = !!options.config.stream;
    const controller = new AbortController();
    options.onController?.(controller);

    try {
      const chatPath = this.path(CyberPath.ChatPath);
      const chatPayload = {
        method: "POST",
        body: JSON.stringify(requestPayload),
        signal: controller.signal,
        headers: getHeaders(),
      };
      const res = await fetch(chatPath, chatPayload);
      const resJson = await res.json();
      // const message = this.extractMessage(resJson.text);
      // options.onFinish(this.localMAC);
      options.onFinish(resJson.text);

      // // make a fetch request
      // const requestTimeoutId = setTimeout(
      //   () => controller.abort(),
      //   REQUEST_TIMEOUT_MS,
      // );

      // if (shouldStream) {
      //   let responseText = "";
      //   let remainText = "";
      //   let finished = false;

      //   // animate response to make it looks smooth
      //   function animateResponseText() {
      //     if (finished || controller.signal.aborted) {
      //       responseText += remainText;
      //       console.log("[Response Animation] finished");
      //       return;
      //     }

      //     if (remainText.length > 0) {
      //       const fetchCount = Math.max(1, Math.round(remainText.length / 60));
      //       const fetchText = remainText.slice(0, fetchCount);
      //       responseText += fetchText;
      //       remainText = remainText.slice(fetchCount);
      //       options.onUpdate?.(responseText, fetchText);
      //     }

      //     requestAnimationFrame(animateResponseText);
      //   }

      //   // start animaion
      //   animateResponseText();

      //   const finish = () => {
      //     if (!finished) {
      //       finished = true;
      //       options.onFinish(responseText + remainText);
      //     }
      //   };

      //   controller.signal.onabort = finish;

      //   fetchEventSource(chatPath, {
      //     ...chatPayload,
      //     async onopen(res) {
      //       clearTimeout(requestTimeoutId);
      //       const contentType = res.headers.get("content-type");
      //       console.log(
      //         "[OpenAI] request response content type: ",
      //         contentType,
      //       );

      //       if (contentType?.startsWith("text/plain")) {
      //         responseText = await res.clone().text();
      //         return finish();
      //       }

      //       if (
      //         !res.ok ||
      //         !res.headers
      //           .get("content-type")
      //           ?.startsWith(EventStreamContentType) ||
      //         res.status !== 200
      //       ) {
      //         const responseTexts = [responseText];
      //         let extraInfo = await res.clone().text();
      //         try {
      //           const resJson = await res.clone().json();
      //           extraInfo = prettyObject(resJson);
      //         } catch {}

      //         if (res.status === 401) {
      //           responseTexts.push(Locale.Error.Unauthorized);
      //         }

      //         if (extraInfo) {
      //           responseTexts.push(extraInfo);
      //         }

      //         responseText = responseTexts.join("\n\n");

      //         return finish();
      //       }
      //     },
      //     onmessage(msg) {
      //       if (msg.data === "[DONE]" || finished) {
      //         return finish();
      //       }
      //       const text = msg.data;
      //       try {
      //         const json = JSON.parse(text) as {
      //           choices: Array<{
      //             delta: {
      //               content: string;
      //             };
      //           }>;
      //         };
      //         const delta = json.choices[0]?.delta?.content;
      //         if (delta) {
      //           remainText += delta;
      //         }
      //       } catch (e) {
      //         console.error("[Request] parse error", text);
      //       }
      //     },
      //     onclose() {
      //       finish();
      //     },
      //     onerror(e) {
      //       options.onError?.(e);
      //       throw e;
      //     },
      //     openWhenHidden: true,
      //   });
      // } else {
      //   const res = await fetch(chatPath, chatPayload);
      //   clearTimeout(requestTimeoutId);

      //   const resJson = await res.json();
      //   const message = this.extractMessage(resJson);
      //   options.onFinish(message);
      // }
    } catch (e) {
      console.log("[Request] failed to make a chat request", e);
      options.onError?.(e as Error);
    }
  }

  //   async usage() {
  //     const formatDate = (d: Date) =>
  //       `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
  //         .getDate()
  //         .toString()
  //         .padStart(2, "0")}`;
  //     const ONE_DAY = 1 * 24 * 60 * 60 * 1000;
  //     const now = new Date();
  //     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //     const startDate = formatDate(startOfMonth);
  //     const endDate = formatDate(new Date(Date.now() + ONE_DAY));

  //     const [used, subs] = await Promise.all([
  //       fetch(
  //         this.path(
  //           `${CyberPath.UsagePath}?start_date=${startDate}&end_date=${endDate}`,
  //         ),
  //         {
  //           method: "GET",
  //           headers: getHeaders(),
  //         },
  //       ),
  //       fetch(this.path(CyberPath.SubsPath), {
  //         method: "GET",
  //         headers: getHeaders(),
  //       }),
  //     ]);

  //     if (used.status === 401) {
  //       throw new Error(Locale.Error.Unauthorized);
  //     }

  //     if (!used.ok || !subs.ok) {
  //       throw new Error("Failed to query usage from openai");
  //     }

  //     const response = (await used.json()) as {
  //       total_usage?: number;
  //       error?: {
  //         type: string;
  //         message: string;
  //       };
  //     };

  //     const total = (await subs.json()) as {
  //       hard_limit_usd?: number;
  //     };

  //     if (response.error && response.error.type) {
  //       throw Error(response.error.message);
  //     }

  //     if (response.total_usage) {
  //       response.total_usage = Math.round(response.total_usage) / 100;
  //     }

  //     if (total.hard_limit_usd) {
  //       total.hard_limit_usd = Math.round(total.hard_limit_usd * 100) / 100;
  //     }

  //     return {
  //       used: response.total_usage,
  //       total: total.hard_limit_usd,
  //     } as LLMUsage;
  //   }

  async models(): Promise<LLMModel[]> {
    if (this.disableListModels) {
      return DEFAULT_MODELS.slice();
    }

    const res = await fetch(this.path(CyberPath.ListModelPath), {
      method: "GET",
      headers: {
        ...getHeaders(),
      },
    });

    const resJson = (await res.json()) as OpenAIListModelResponse;
    const chatModels = resJson.data?.filter((m) => m.id.startsWith("gpt-"));
    console.log("[Models]", chatModels);

    if (!chatModels) {
      return [];
    }

    return chatModels.map((m) => ({
      name: m.id,
      available: true,
      provider: {
        id: "cyber",
        providerName: "CyberAI",
        providerType: "cyberai",
      },
    }));
  }
}
export { CyberPath };
