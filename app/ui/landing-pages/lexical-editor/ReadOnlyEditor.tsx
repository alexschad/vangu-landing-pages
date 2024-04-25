import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import * as React from "react";

import ContentEditable from "./ui/ContentEditable";

export default function ReadOnlyEditor(): JSX.Element {
  return (
    <>
      <div className={"editor-container"}>
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller">
              <div className="editor">
                <ContentEditable />
              </div>
            </div>
          }
          placeholder={null}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
    </>
  );
}
