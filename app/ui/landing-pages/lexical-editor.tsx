"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";

const theme = {};

function onError(error: Error): void {
  console.error(error);
}

type Props = {
  onChange: (editorState: EditorState) => void;
  editorStateJSON: string;
};

export default function Editor({ onChange, editorStateJSON }: Props) {
  const initialConfig = {
    namespace: "MyEditor",
    editorState: editorStateJSON,
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="rounded-md border-2 border-black p-3 h-[500px]" />
        }
        placeholder={
          <div className="absolute top-3 left-4">Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={onChange} />
    </LexicalComposer>
  );
}
