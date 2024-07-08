"use client"

import {
    Block,
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";


interface EditorProps {
    onChange: (value: string) => void,
    initialContent?: string,
    editable?: boolean
}

export const Editor = ({
    onChange,
    initialContent,
    editable
}: EditorProps) => {

    const { resolvedTheme } = useTheme();

    const [blocks, setBlocks] = useState<Block[]>([])

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
    })




    const hanldeDocumentChange = () => {
        const newBlocks = editor.document;
        setBlocks(newBlocks);
        onChange(JSON.stringify(blocks, null, 2));
    };

    return (
        <div>
            <BlockNoteView 
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
                onChange={hanldeDocumentChange}
            />
        </div>
    )
}