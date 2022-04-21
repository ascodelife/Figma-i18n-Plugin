// {
//   "cn": {
//     "uid-111": "你好"
//   },
//   "en": {
//     "uid-111": "hello"
//   }
// }
export type LangCfg = Record<string, Record<string, string>>;

export enum Message {
  LangCfg,
  Transform,
  Report,
}

export interface LangCfgMsg {
  type: Message.LangCfg;
  payload: LangCfg;
}

export interface TransformMsg {
  type: Message.Transform;
  payload: {
    origin: keyof LangCfg;
    dest: keyof LangCfg;
  };
}

export type Report = {
  unMatchedStrs: string[];
  matchedStrs: string[];
} & TransformMsg["payload"];

export interface ReportMsg {
  type: Message.Report;
  payload: Report;
}

export type Msg = LangCfgMsg | TransformMsg | ReportMsg;
