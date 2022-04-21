import { Upload, Toast } from "@douyinfe/semi-ui";
import { OnChangeProps } from "@douyinfe/semi-ui/lib/es/upload";
import { readFile } from "@/utils";
import useLangCfgParse from "./useLangCfgParse";
import LangCfgContext from "@/components/langCfgProvider/context";
import { useContext } from "react";

const LangCfgUpload = () => {
  const { langCfg } = useContext(LangCfgContext);

  const { parse } = useLangCfgParse();

  async function handleChange({ fileList }: OnChangeProps) {
    if (fileList.length > 0) {
      const file = fileList[0].fileInstance;
      if (file) {
        try {
          const text = await readFile(file);
          parse(text);
        } catch (error) {
          Toast.error(`parse fail: ${error}`);
        }
      }
    }
  }

  return (
    <div>
      <Upload
        accept="application/json"
        action=""
        draggable={true}
        limit={1}
        dragMainText={"点击上传配置文件或拖拽配置文件到这里"}
        dragSubText="支持*.json文件"
        uploadTrigger="custom"
        onChange={handleChange}
      ></Upload>
      {langCfg && (
        <p>{`检测到 ${Object.keys(langCfg).length} 种可选语言 : ${Object.keys(
          langCfg
        ).join(", ")}`}</p>
      )}
    </div>
  );
};

export default LangCfgUpload;
