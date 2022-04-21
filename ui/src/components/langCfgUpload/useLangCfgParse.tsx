import { LangCfg } from "@/types";
import { useContext } from "react";
import LangCfgContext from "@/components/langCfgProvider/context";

const useLangCfgParse = () => {
  const { setLangCfg } = useContext(LangCfgContext);

  function parse(text: string) {
    let cfg: LangCfg;
    try {
      cfg = JSON.parse(text);
    } catch (error) {
      throw error;
    }
    setLangCfg(cfg);
  }

  return { parse };
};

export default useLangCfgParse;
