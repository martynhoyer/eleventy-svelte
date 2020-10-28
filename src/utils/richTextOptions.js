import React from "react";
import { INLINES } from "@contentful/rich-text-types";

const richTextOptions = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: function assetHyperlink(node, children) {
      const locale = "en-US";
      const { nodeType, data } = node;
      const url = data.target.fields.file[locale].url;
      switch (nodeType) {
        case "asset-hyperlink":
          return (
            <a href={url} download>
              {children}
            </a>
          );
        default:
          console.warn(nodeType + " not set");
      }
    },
  },
};

export default richTextOptions;
