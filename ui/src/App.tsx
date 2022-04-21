import { useEffect, useState } from "react";
import { Tabs, TabPane } from "@douyinfe/semi-ui";
import LangCfgProvider from "@/components/langCfgProvider";
import LangSelect from "@/components/langSelect";
import { LangCfg, LangCfgMsg, Message, Msg, Report } from "@/types";
import LangCfgUpload from "@/components/langCfgUpload";
import ReportPane from "@/components/reportPane";

function App() {
  const [langCfg, setLangCfg] = useState<LangCfg>({});

  useEffect(() => {
    if (window.parent) {
      let message: LangCfgMsg = {
        type: Message.LangCfg,
        payload: langCfg,
      };
      window.parent.postMessage({ pluginMessage: message }, "*");
    }
  }, [langCfg]);

  const [report, setReport] = useState<Report>({
    matchedStrs: [],
    unMatchedStrs: [],
    dest: "",
    origin: "",
  });

  useEffect(() => {
    function handler(event: any) {
      const data: Msg = event.data.pluginMessage;
      switch (data.type) {
        case Message.Report: {
          setReport(data.payload);
          break;
        }
      }
    }
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [setReport]);

  return (
    <div className="App">
      <LangCfgProvider value={{ langCfg, setLangCfg }}>
        <Tabs type="line" tabPaneMotion={false} className="m-4">
          <TabPane tab="上传配置" itemKey="upload">
            <LangCfgUpload />
          </TabPane>
          <TabPane tab="语言转换" itemKey="transform">
            <LangSelect />
          </TabPane>
          <TabPane tab="转换报告" itemKey="report">
            <ReportPane report={report}></ReportPane>
          </TabPane>
        </Tabs>
      </LangCfgProvider>
    </div>
  );
}

export default App;
