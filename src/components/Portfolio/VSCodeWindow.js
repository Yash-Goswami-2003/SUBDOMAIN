'use client'

import { useEffect, useState, useRef } from 'react'
import Editor from '@monaco-editor/react'

export default function VSCodeWindow({ data }) {
    const [isVisible, setIsVisible] = useState(false)
    const [mounted, setMounted] = useState(false)
    const editorRef = useRef(null)

    useEffect(() => {
        setMounted(true)
        const timer = setTimeout(() => setIsVisible(true), 300)
        return () => clearTimeout(timer)
    }, [])

    const jsonContent = JSON.stringify({
        name: data?.name || "Yash Goswami",
        role: "Full Stack Developer",
        location: "India",
        skills: ["React", "Next.js", "Node.js", "AI"],
    }, null, 2)

    // Calculate height based on content lines
    const lineCount = jsonContent.split('\n').length
    const editorHeight = (lineCount * 20) + 16

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor

        // Define a minimal dark theme matching the portfolio
        monaco.editor.defineTheme('minimal-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'string.key.json', foreground: 'A5D6FF' },
                { token: 'string.value.json', foreground: 'A5D6FF' },
                { token: 'number', foreground: 'FFFFFF' },
                { token: 'keyword.json', foreground: 'FFFFFF' },
                { token: 'delimiter', foreground: '666666' },
            ],
            colors: {
                'editor.background': '#0a0a0a',
                'editor.foreground': '#e5e5e5',
                'editorLineNumber.foreground': '#404040',
                'editorLineNumber.activeForeground': '#666666',
                'editor.lineHighlightBackground': '#0a0a0a',
                'editor.selectionBackground': '#ffffff22',
                'editorCursor.foreground': '#ffffff',
            }
        })
        monaco.editor.setTheme('minimal-dark')

        // Disable all keyboard shortcuts
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => { })
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => { })
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => { })
        editor.addCommand(monaco.KeyCode.F1, () => { })
        editor.addCommand(monaco.KeyCode.F3, () => { })
    }

    if (!mounted) return null

    return (
        <div className={`code-window ${isVisible ? 'visible' : ''}`}>
            {/* Minimal Window Header */}
            <div className="window-header">
                <div className="window-controls">
                    <span className="control"></span>
                    <span className="control"></span>
                    <span className="control"></span>
                </div>
                <div className="window-title">
                    developer.json
                </div>
                <div className="window-spacer"></div>
            </div>

            {/* Monaco Editor */}
            <div className="editor-wrapper">
                <Editor
                    height={`${editorHeight}px`}
                    defaultLanguage="json"
                    value={jsonContent}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 13,
                        fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace",
                        fontLigatures: true,
                        lineNumbers: 'on',
                        glyphMargin: false,
                        folding: false,
                        lineDecorationsWidth: 12,
                        lineNumbersMinChars: 2,
                        renderLineHighlight: 'none',
                        overviewRulerBorder: false,
                        overviewRulerLanes: 0,
                        hideCursorInOverviewRuler: true,
                        scrollbar: {
                            vertical: 'hidden',
                            horizontal: 'hidden',
                            handleMouseWheel: false,
                        },
                        padding: { top: 16, bottom: 16 },
                        automaticLayout: true,
                        wordWrap: 'on',
                        contextmenu: false,
                        domReadOnly: true,
                        cursorStyle: 'underline-thin',
                        cursorBlinking: 'solid',
                        cursorWidth: 0,
                        renderWhitespace: 'none',
                        matchBrackets: 'never',
                        occurrencesHighlight: 'off',
                        selectionHighlight: false,
                        find: {
                            addExtraSpaceOnTop: false,
                            autoFindInSelection: 'never',
                            seedSearchStringFromSelection: 'never',
                        },
                        links: false,
                        quickSuggestions: false,
                        parameterHints: { enabled: false },
                        suggestOnTriggerCharacters: false,
                        acceptSuggestionOnEnter: 'off',
                        tabCompletion: 'off',
                        wordBasedSuggestions: 'off',
                    }}
                />
            </div>

            <style jsx>{`
        .code-window {
          background: #0a0a0a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #222222;
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
          max-width: 420px;
        }

        .code-window.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* Minimal Window Header */
        .window-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: #111111;
          border-bottom: 1px solid #222222;
        }

        .window-controls {
          display: flex;
          gap: 6px;
        }

        .control {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #333333;
          transition: background 0.2s;
        }

        .code-window:hover .control:nth-child(1) {
          background: #ff5f57;
        }

        .code-window:hover .control:nth-child(2) {
          background: #febc2e;
        }

        .code-window:hover .control:nth-child(3) {
          background: #28c840;
        }

        .window-title {
          flex: 1;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          letter-spacing: -0.01em;
        }

        .window-spacer {
          width: 46px;
        }

        .editor-wrapper {
          background: #0a0a0a;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .code-window {
            max-width: 380px;
          }
        }

        @media (max-width: 768px) {
          .code-window {
            max-width: 100%;
            transform: translateY(20px);
          }

          .code-window.visible {
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    )
}
