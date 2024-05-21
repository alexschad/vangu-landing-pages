"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import PlaygroundEditorTheme from "@/app/ui/landing-pages/lexical-editor/themes/PlaygroundEditorTheme";
import PlaygroundNodes from "@/app/ui/landing-pages/lexical-editor//nodes/PlaygroundNodes";
import "./index.css";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@/app/ui/landing-pages/lexical-editor/ReadOnlyEditor"),
  {
    ssr: false,
  }
);
function onError(error: Error): void {
  console.error(error);
}

export default function ReadonlyEditor({ stateJSON }: { stateJSON?: string }) {
  const initialConfig = {
    namespace: "MyEditor",
    editorState: stateJSON || null,
    editable: false,

    nodes: [...PlaygroundNodes],
    theme: PlaygroundEditorTheme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Editor />
    </LexicalComposer>
  );
}
