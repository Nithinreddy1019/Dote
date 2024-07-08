"use client"

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import "@blocknote/mantine/style.css";


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

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        
    })

    return (
        <div>
            <BlockNoteView 
                editor={editor}
                theme={resolvedTheme === "dark" ? "dark" : "light"}
            />
        </div>
    )
}