import { LangCfg, Message, Msg, TransformMsg, ReportMsg } from "./types";

const INIT_WIDTH = 600;
const INIT_HEIGHT = 300;

let langCfg: LangCfg = {};

figma.showUI(__html__, { width: INIT_WIDTH, height: INIT_HEIGHT });

figma.ui.onmessage = (message: Msg) => {
  const type = message.type;
  switch (type) {
    case Message.LangCfg: {
      langCfg = message.payload;
      break;
    }
    case Message.Transform: {
      (async () => {
        const nodes = findTextNodes();
        const { matchedNodes, matchedStrs, unMatchedStrs } = match(
          message.payload,
          nodes
        );
        await replace(matchedNodes);
        sendReport({ matchedStrs, unMatchedStrs, transform: message.payload });
      })();
      break;
    }
  }
};

function findTextNodes() {
  const nodes = figma.root.findAllWithCriteria({
    types: ["TEXT"],
  });
  return nodes;
}

function match(
  transform: TransformMsg["payload"],
  nodes: ReturnType<typeof findTextNodes>
) {
  const { origin, dest } = transform;
  const matchedStrs: string[] = [];
  const unMatchedStrs: string[] = [];

  const matchedNodes = nodes
    .map((node) => {
      const id = Object.keys(langCfg[origin]).find(
        (id) => langCfg[origin][id] === node.characters.trim()
      );
      if (id && langCfg[dest][id]) {
        matchedStrs.push(node.characters.trim());
      } else {
        unMatchedStrs.push(node.characters.trim());
      }
      return {
        node,
        newChars: id && langCfg[dest][id],
      };
    })
    .filter(({ newChars }) => newChars);

  return {
    matchedNodes,
    matchedStrs,
    unMatchedStrs,
  };
}

async function replace(matchedNodes: ReturnType<typeof match>["matchedNodes"]) {
  return Promise.all(
    matchedNodes.map(async ({ node, newChars }) => {
      const { family, style } = node.fontName as FontName;
      await figma.loadFontAsync({ family, style });
      node.characters = newChars!;
    })
  );
}

function sendReport(
  results: { transform: TransformMsg["payload"] } & Pick<
    ReturnType<typeof match>,
    "matchedStrs" | "unMatchedStrs"
  >
) {
  const { matchedStrs, unMatchedStrs, transform } = results;
  const message: ReportMsg = {
    type: Message.Report,
    payload: {
      matchedStrs,
      unMatchedStrs,
      ...transform,
    },
  };
  figma.ui.postMessage(message);
}

// figma.closePlugin();
