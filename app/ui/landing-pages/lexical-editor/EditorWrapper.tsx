import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext";
import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { TableContext } from "./plugins/TablePlugin";
import { EditorState } from "lexical";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import "./index.css";

import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("@/app/ui/landing-pages/lexical-editor/Editor"),
  {
    ssr: false,
  }
);

function onError(error: Error): void {
  console.error(error);
}

type Props = {
  onChange: (editorState: EditorState) => void;
  editorStateJSON: string;
};

export default function EditorWrapper({ onChange, editorStateJSON }: Props) {
  const initialConfig = {
    namespace: "MyEditor",
    editorState: editorStateJSON || null,
    nodes: [...PlaygroundNodes],
    theme: PlaygroundEditorTheme,
    onError,
  };

  console.log(editorStateJSON);
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <Editor onChange={onChange} />
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
}
