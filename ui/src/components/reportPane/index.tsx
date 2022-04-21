import { Report } from "@/types";
import { Tag } from "@douyinfe/semi-ui";
import "@douyinfe/semi-ui/lib/es/collapse";
import { CSSProperties, ReactNode } from "react";

declare module "@douyinfe/semi-ui/lib/es/collapse" {
  interface CollapsePanelProps {
    itemKey: string;
    extra?: ReactNode;
    header?: ReactNode;
    className?: string;
    reCalcKey?: number | string;
    style?: CSSProperties;
    children?: ReactNode;
  }
}

interface ReportPaneProps {
  report: Report;
}
const ReportPane = (props: ReportPaneProps) => {
  const { report } = props;

  return (
    <div className="mx-2">
      {report.origin && report.dest && (
        <p className="text-center font-bold">{`${report.origin} --> ${report.dest}`}</p>
      )}
      <div className="divide-y-2">
        <div className="flex items-center">
          <span className="p-1 font-bold ">匹配成功的字符串</span>
          <Tag color="green" type="solid">
            {report.matchedStrs.length}
          </Tag>
        </div>

        <p>{report.matchedStrs.join(", ")}</p>
      </div>
      <div className="divide-y-2">
        <div className="flex items-center">
          <span className="p-1 font-bold">匹配失败的字符串</span>
          <Tag color="red" type="solid">
            {report.unMatchedStrs.length}
          </Tag>
        </div>

        <p>{report.unMatchedStrs.join(", ")}</p>
      </div>
    </div>
  );
};

export default ReportPane;
