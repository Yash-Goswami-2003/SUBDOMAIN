'use client'

import { Extension } from '@tiptap/core'
import { PluginKey } from '@tiptap/pm/state'
import Suggestion from '@tiptap/suggestion'

export const SlashCommandPluginKey = new PluginKey('slashCommand')

const createSlashCommandExtension = () => {
    const commandItems = [
        { title: 'Heading 1', icon: 'H1', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 1 }).run() },
        { title: 'Heading 2', icon: 'H2', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 2 }).run() },
        { title: 'Heading 3', icon: 'H3', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleHeading({ level: 3 }).run() },
        { title: 'Bullet List', icon: '•', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBulletList().run() },
        { title: 'Numbered List', icon: '1.', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleOrderedList().run() },
        { title: 'Task List', icon: '☑', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleTaskList().run() },
        { title: 'Quote', icon: '"', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleBlockquote().run() },
        { title: 'Code Block', icon: '</>', command: (editor, range) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run() },
        { title: 'Divider', icon: '—', command: (editor, range) => editor.chain().focus().deleteRange(range).setHorizontalRule().run() },
        { title: 'Image', icon: '🖼', command: (editor, range) => {
            editor.chain().focus().deleteRange(range).run()
            const url = window.prompt('Enter image URL:')
            if (url) editor.chain().focus().setImage({ src: url }).run()
        }},
        { title: 'Link', icon: '🔗', command: (editor, range) => {
            const url = window.prompt('Enter URL:')
            if (url) editor.chain().focus().deleteRange(range).setLink({ href: url }).run()
        }},
    ]

    return Extension.create({
        name: 'slashCommand',
        addOptions() {
            return {
                suggestion: {
                    char: '/',
                    pluginKey: SlashCommandPluginKey,
                    startOfLine: false,
                    allowSpaces: true,
                    command: ({ editor, range, props }) => {
                        props.command(editor, range)
                    },
                    items: ({ query }) => {
                        const q = query.toLowerCase()
                        return commandItems.filter(item =>
                            item.title.toLowerCase().includes(q)
                        )
                    },
                    render: () => {
                        let popup = null
                        let selectedIndex = 0
                        let lastProps = null

                        return {
                            onStart: (props) => {
                                lastProps = props
                                selectedIndex = 0
                                popup = document.createElement('div')
                                popup.className = 'slash-command-menu'
                                document.body.appendChild(popup)
                                updatePopup(popup, props, selectedIndex)
                                positionPopup(popup, props)
                            },
                            onUpdate: (props) => {
                                lastProps = props
                                selectedIndex = 0
                                if (popup) {
                                    updatePopup(popup, props, selectedIndex)
                                    positionPopup(popup, props)
                                }
                            },
                            onKeyDown: (keyProps) => {
                                if (!lastProps?.items.length) return false
                                if (keyProps.event.key === 'ArrowDown') {
                                    selectedIndex = (selectedIndex + 1) % lastProps.items.length
                                    updatePopup(popup, lastProps, selectedIndex)
                                    return true
                                }
                                if (keyProps.event.key === 'ArrowUp') {
                                    selectedIndex = (selectedIndex - 1 + lastProps.items.length) % lastProps.items.length
                                    updatePopup(popup, lastProps, selectedIndex)
                                    return true
                                }
                                if (keyProps.event.key === 'Enter') {
                                    lastProps.command(lastProps.items[selectedIndex])
                                    return true
                                }
                                if (keyProps.event.key === 'Escape') return true
                                return false
                            },
                            onExit: () => {
                                if (popup?.parentNode) popup.parentNode.removeChild(popup)
                                popup = null
                                lastProps = null
                            }
                        }
                    }
                }
            }
        },
        addProseMirrorPlugins() {
            return [
                Suggestion({
                    editor: this.editor,
                    ...this.options.suggestion
                })
            ]
        }
    })
}

function positionPopup(popup, props) {
    if (!props.clientRect) return
    const rect = props.clientRect()
    if (!rect) return
    popup.style.position = 'fixed'
    popup.style.left = `${rect.left}px`
    popup.style.top = `${rect.bottom + 4}px`
    popup.style.zIndex = '9999'
}

function updatePopup(popup, props, selectedIndex) {
    popup.innerHTML = ''
    if (!props.items.length) {
        popup.innerHTML = '<div class="slash-command-empty">No results</div>'
        return
    }
    props.items.forEach((item, i) => {
        const el = document.createElement('button')
        el.type = 'button'
        el.className = `slash-command-item ${i === selectedIndex ? 'selected' : ''}`
        el.innerHTML = `
            <span class="slash-command-icon">${item.icon}</span>
            <span class="slash-command-title">${item.title}</span>
        `
        el.addEventListener('click', () => props.command(item))
        el.addEventListener('mouseenter', () => {
            popup.querySelectorAll('.slash-command-item').forEach((e, idx) => {
                e.classList.toggle('selected', idx === i)
            })
        })
        popup.appendChild(el)
    })
}

export const SlashCommand = createSlashCommandExtension()
