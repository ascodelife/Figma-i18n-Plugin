import { Select, Button } from "@douyinfe/semi-ui";
import { useContext, useEffect, useMemo, useState } from "react";
import LangCfgContext from "@/components/langCfgProvider/context";
import { OptionProps } from "@douyinfe/semi-ui/lib/es/select";
import { Message, TransformMsg } from "@/types";

const LangSelect = () => {
  const [origin, setOrigin] = useState<string>("");
  const [dest, setDest] = useState<string>("");

  const { langCfg } = useContext(LangCfgContext);

  const optionList: OptionProps[] = useMemo(
    () => Object.keys(langCfg).map((key) => ({ label: key, value: key })),
    [langCfg]
  );

  useEffect(() => {
    if (optionList.length > 0) {
      setOrigin(optionList[0].value as string);
      setDest(optionList[0].value as string);
    }
    if (optionList.length > 1) {
      setDest(optionList[1].value as string);
    }
  }, [optionList]);

  function transform() {
    if (window.parent) {
      let message: TransformMsg = {
        type: Message.Transform,
        payload: { origin, dest },
      };
      window.parent.postMessage({ pluginMessage: message }, "*");
    }
  }

  return (
    <div>
      <div className="flex justify-around items-end my-4">
        <div>
          <p className="text-left">当前语言</p>
          <Select
            className="w-50"
            optionList={optionList}
            value={origin}
            onChange={(value) => setOrigin(value as string)}
          ></Select>
        </div>
        <Button theme="borderless" type="primary" onClick={transform}>
          转换 &gt;&gt;
        </Button>
        <div>
          <p className="text-left">目标语言</p>
          <Select
            className="w-50"
            optionList={optionList}
            value={dest}
            onChange={(value) => setDest(value as string)}
          ></Select>
        </div>
      </div>
    </div>
  );
};

export default LangSelect;
