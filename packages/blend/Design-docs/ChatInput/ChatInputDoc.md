# ChatInputV2 Component Documentation

## Requirements

Deliver a **chat composer** (Inputs V2) that supports:

- **Value API**: Single string via **`value`** and **`onChange(value: string)`** (not a raw DOM `ChangeEvent`). The field is a **`PrimitiveTextarea`** with **`resize="none"`**, **`rows={1}`**, and **auto-height** clamped by **`textareaMaxHeight`** (prop) or the token **`input.maxHeight`** (`resolveChatInputV2TextareaMaxHeightPx`, `applyChatInputV2TextareaAutoHeight` in `utils.ts`).
- **Submit vs newline**: **`onEnter`** runs when the user presses **Enter** without **Shift** (`preventDefault` on that keydown). **Shift+Enter** keeps default behavior so a newline can be inserted.
- **Attachments**: Optional **`attachedFiles`** rendered as **`ChatInputTagV2`** chips inside **`ChatInputV2AttachmentRow`** (measurement-based inline chips + **“+ N more”** opening **`AttachmentDropdownV2`** for overflow). New files come from a **hidden** `<input type="file" multiple />` (`PrimitiveInput`); **`onAttachFiles(files: File[])`** receives **new** files only. **`onFileRemove(fileId)`** runs when the user dismisses a chip (X). **`onFileClick(file)`** runs when the user activates the **chip label** (preview / open detail) — same callback for inline chips and overflow dropdown rows. Duplicates (same **name + size** as an existing attachment) are filtered in **`handleChatInputV2FileInputChange`** via **`filterDuplicateFiles`** (shared with legacy ChatInput); duplicates trigger **`notifyChatInputV2DuplicateFiles`** (**`addSnackbarV2`**).
- **Slots**: **`slot1`** — block above the input row (e.g. context). **`slot2`** — icon/content for the **primary** trailing **`ButtonV2`**; **`onSlot2Click`** fires on click.
- **Top queries**: Optional **`topQueries`**; the list sits under the input and expands when the textarea is **focused** (`InputStateV2.FOCUS`). Container uses **`aria-hidden`** when collapsed. **`onTopQuerySelect(query)`** runs when a row is chosen; **`topQueriesMaxHeight`** caps the panel height.
- **States**: **Disabled** maps to native **`disabled`** on the textarea and **`aria-disabled`**. Attach and secondary buttons respect **`disabled`**.
- **Responsive shell**: Below the **`lg`** breakpoint (**`BREAKPOINTS.lg`**, 1024px), **`MobileChatInputV2`** is rendered with **`CHAT_INPUTV2_MOBILE`** tokens; at **`lg`** and up, the desktop layout uses **`CHAT_INPUTV2`** tokens.
- **Accessibility**: Hidden file input **`aria-label="Attach files"`**; visible attach **`ButtonV2`** also **`aria-label="Attach files"`**; secondary icon **`ButtonV2`** **`aria-label="Secondary action"`**. Attachment row is a **`role="region"`** with a count-based **`aria-label`**. Native textarea attributes (e.g. **`aria-label`**) are supported via **`...textareaRest`** on **`PrimitiveTextarea`** after explicit props (stable **`id`**, **`name="chat-input"`**, etc.).
- **Ref**: **`forwardRef<HTMLDivElement>`** — the ref is attached to the **outer desktop container** (`Block`); on **mobile**, **`MobileChatInputV2`** receives the ref on its root.
- **Theme**: Responsive tokens via **`useResponsiveTokens('CHAT_INPUTV2')`** (desktop) and **`useComponentToken('CHAT_INPUTV2_MOBILE')`** (mobile).

## Anatomy (desktop, `lg` and up)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  [Optional: ChatInputV2AttachmentRow — ChatInputTagV2 chips, overflow] │
├─────────────────────────────────────────────────────────────────────────┤
│  [Optional: slot1 — full width]                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌ hidden <input type="file" aria-label="Attach files" />              │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ PrimitiveTextarea (id, name="chat-input", auto-grow)             │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ [ButtonV2 attach]              [ButtonV2 primary + slot2]         │  │
│  ├───────────────────────────────────────────────────────────────────┤  │
│  │ [Optional: Top Queries — header + rows, aria-hidden when closed]   │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

_(Optional: add `ChatInputAnatomy.png` beside this doc when a diagram is available.)_

## Props & Types

Declared in **`ChatInputV2.types.ts`**. HTML attributes come from **`Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, …>`** (see below).

```typescript
type AttachedFile = {
    id: string
    name: string
    type: 'image' | 'pdf' | 'csv' | 'text' | 'other'
    size?: number
    url?: string
    preview?: string
}

type TopQuery = {
    id: string
    text: string
}

type ChatInputV2Props = {
    value?: string
    topQueries?: TopQuery[]
    onTopQuerySelect?: (query: TopQuery) => void
    placeholder?: string
    onChange: (value: string) => void
    slot1?: ReactNode
    slot2?: ReactNode
    onSlot2Click?: () => void
    topQueriesMaxHeight?: number
    textareaMaxHeight?: number
    disabled?: boolean
    attachedFiles?: AttachedFile[]
    onAttachFiles?: (files: File[]) => void
    onFileRemove?: (fileId: string) => void
    onFileClick?: (file: AttachedFile) => void
    onEnter?: () => void
} & Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size' | 'style' | 'className' | 'onFocus' | 'onBlur' | 'cols' | 'onChange'
>
```

**Notable points**

- **`onChange`** is the string value, not a `ChangeEvent`.
- **`onAttachFiles`** / **`onFileRemove`** / **`onFileClick`** — parent owns **`attachedFiles`**. Removals and chip-label actions never go through **`onAttachFiles`**; use **`onFileRemove`** and **`onFileClick`** respectively.
- **`MobileChatInputV2Props`** includes **`onFileClick`**, **`onFileRemove`**, and **`handleAttachClick`** for the mobile attachment flow. The type also lists **`overflowMenuProps?: Partial<MenuProps>`** for forward compatibility with menu customization.
- **`className`**, **`style`**, **`onFocus`**, **`onBlur`**, **`cols`** are omitted from the public type; other textarea attributes (including **`aria-label`**, **`id`**, **`name`** where allowed) are merged via **`...textareaRest`** in the implementation, with component-controlled props taking precedence where set explicitly.

## Token type (desktop)

Tokens are **responsive** (**`sm`**, **`lg`**). **`ChatInputV2TokensType`** is defined in **`ChatInputV2.tokens.ts`** — roughly:

- **`container`**: outer **`backgroundColor`**, **`border`**, **`borderRadius`**, padding, **`gap`**, **`attachedFilesContainer`** (chip row + overflow menu), **`inputContainer`** (outline/boxShadow by **`InputStateV2`**, inner input typography/spacing, **`slotContainer`**, **`topQueriesContainer`** with header + item hover styles).

Resolution: **`getChatInputV2LightTokens` / `getChatInputV2DarkTokens`** keyed by theme.

## Logic module (`utils.ts`)

| Export                                          | Purpose                                                         |
| ----------------------------------------------- | --------------------------------------------------------------- |
| `resolveChatInputV2TextareaMaxHeightPx`         | Prop vs token **`maxHeight`** → number (px)                     |
| `applyChatInputV2TextareaAutoHeight`            | Sync textarea **`style.height`** to **`scrollHeight`**, capped  |
| `handleChatInputV2FileInputChange`              | File input **`change`** → dedupe, snackbar, **`onAttachFiles`** |
| `notifyChatInputV2DuplicateFiles`               | **`addSnackbarV2`** when duplicates are skipped                 |
| `assignForwardedRef`                            | Merge forwarded ref with internal container ref                 |
| `computeAttachmentRowCutoff` / overflow helpers | Chip row measurement and “+ N more”                             |
| `truncateFileNameForTag`                        | Short label text on **`ChatInputTagV2`** chips                  |

Shared with legacy ChatInput: **`filterDuplicateFiles`** (`components/ChatInput/utils.ts`).

## Implementation Notes

### 1. Desktop vs mobile

**Decision**: **`useBreakpoints()`**; if **`innerWidth < BREAKPOINTS.lg`**, render **`MobileChatInputV2`** (paperclip **`PrimitiveButton`**, textarea, absolutely positioned **`slot2`**). Otherwise render the desktop **`Block`** tree.

**Rationale**: Distinct layout and token sets (**`CHAT_INPUTV2`** vs **`CHAT_INPUTV2_MOBILE`**).

### 2. Ref target

**Decision**: Desktop — ref on the **outer** **`Block`**. Mobile — ref on **`MobileChatInputV2`** root **`Block`**.

### 3. Top queries visibility

**Decision**: **`showTopQueries = inputState === InputStateV2.FOCUS`**. Wrapper **`maxHeight`**, **`opacity`**, **`pointerEvents`**, and **`aria-hidden`** follow **`showTopQueries`**.

### 4. File input **`accept`**

**Decision**: **`accept="image/*,.pdf,.csv,.txt,.doc,.docx"`** on the hidden input. Desktop wires **`onChange`** on that input to **`handleChatInputV2FileInputChange`**. Mobile uses **`handleAttachClick`** to **`click()`** the same hidden input from **`ChatInputV2`** (fragment next to **`MobileChatInputV2`**).

### 5. Chip interactions

**Decision**: Each chip is **`ChatInputTagV2`**: label **`Block`** → **`onFileClick`**, dismiss **`Block`** with **`XIcon`** → **`onFileRemove`**. **`AttachmentDropdownV2`** repeats the same handlers for overflow files.

## Testing & Storybook

- **Unit tests**: `packages/blend/__tests__/components/ChatInputV2/ChatInputV2.test.tsx`
- **Accessibility (axe + behaviors)**: `packages/blend/__tests__/components/ChatInputV2/ChatInputV2.accessibility.test.tsx`
- **Storybook**: `apps/storybook/stories/components/ChatInputV2/ChatInputV2.stories.tsx` under **Components → Inputs → ChatInputV2**

## Related

- **Legacy `ChatInput`** (non-V2): `components/ChatInput` — different API and UI; prefer **`ChatInputV2`** for new work in the Inputs V2 system.
- **Primitives / building blocks**: **`PrimitiveTextarea`**, **`PrimitiveInput`**, **`PrimitiveButton`** (mobile attach), **`Block`**, **`ButtonV2`**, **`Text`**, **`TooltipV2`**
- **Attachment UI**: **`ChatInputTagV2`**, **`AttachmentDropdownV2`**, **`ChatInputV2AttachmentRow`**
