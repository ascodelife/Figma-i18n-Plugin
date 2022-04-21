import { LangCfg } from "@/types";
import React from "react";

export interface ContextValue {
  langCfg: LangCfg;
  setLangCfg: (langCfg: LangCfg) => void;
}

const LangCfgContext = React.createContext<ContextValue>({
  langCfg: {},
  setLangCfg: () => {},
});

export default LangCfgContext;
