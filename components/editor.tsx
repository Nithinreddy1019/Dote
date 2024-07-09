"use client"

import {
    Block,
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { 
    BlockNoteView,
    darkDefaultTheme,
    Theme
} from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/mantine/style.css";
import { useCallback, useEffect, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";


interface EditorProps {
    onChange: (value: string) => void,
    initialContent?: string,
    editable?: boolean
}

const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {

    const { resolvedTheme } = useTheme();
    const { edgestore } = useEdgeStore();

    const [blocks, setBlocks] = useState<Block[]>([]);

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file
        });

        return response.url;
    };


    if(initialContent && JSON.parse(initialContent as string).length === 0) {
        initialContent = undefined;
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload
    });

    const newDarkTheme = {
        colors: {
            editor: {
                background: "#0C0A09"
            }
        }
    } satisfies Theme;

    const hanldeDocumentChange = () => {
        const newBlocks = editor.document;
        setBlocks(newBlocks);
        onChange(JSON.stringify(newBlocks));
    }

    return (
        <div>
            <BlockNoteView 
                editor={editor}
                editable={editable}
                theme={resolvedTheme === "dark" ? newDarkTheme : "light"}
                onChange={hanldeDocumentChange}
            />
        </div>
    )
};


export default Editor;