# DOM Explorer — Task Manager

A Task Manager built with plain HTML, CSS, and JavaScript. No frameworks, no build
tools, no dependencies — everything is done with the browser's own DOM APIs.

## Getting started

Open `index.html` directly in a browser, or serve the folder locally:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure and markup |
| `style.css` | Dark/light theming and layout |
| `script.js` | Application logic |

## What it does

- **Add, edit, complete, and delete tasks** — each task card is built at runtime with
  `createElement()` and `createTextNode()`, and assembled with `append()`.
- **Custom attributes on every task** — `data-id`, `data-status`, and `data-category`
  are set with `setAttribute()` and read back through `getAttribute()` and `.dataset`.
- **Live attribute vs. property demo** — shows how `input.value` (always current)
  diverges from `input.getAttribute("value")` (frozen at the last explicit
  `setAttribute()` call), with a button to sync the two back together.
- **Dark / light theme toggle** — driven by `classList`, `.dataset`, and
  `setAttribute()`, with the active theme stored in `data-theme` and remembered
  across reloads.
- **Event delegation** — a single click listener on the task list handles add,
  edit, complete, and delete for every card, including ones created after page load.
- **Event propagation demo** — a Grandparent → Parent → Child Button structure with
  a toggle to compare bubbling order (child outward) against capturing order
  (grandparent inward), logged live to both the console and the page.
- **Rendering pipeline diagram** — a visual walkthrough of how the browser turns
  this page's own markup into pixels: HTML → Parsing → Tokenization → DOM Tree,
  CSS → CSSOM Tree, and DOM + CSSOM → Render Tree.
- **Search, filter, and counters** — instantly narrow the list by keyword or
  category, with live pending/completed counts.
- **Clear all tasks** and **local storage persistence** for both tasks and theme.

## Concepts behind the build

**Parsing & tokenization.** Before the browser knows what an element even is, it
reads `index.html` as a raw stream of bytes, decodes it into characters, and breaks
that stream into tokens — start tags, end tags, attributes, and text — one at a
time.

**DOM Tree.** Those tokens are turned into node objects and nested according to how
tags were opened and closed. This is the tree every task card in the app is built
into and removed from.

**CSSOM Tree.** `style.css` goes through the same parse-then-tokenize process, but
produces a tree of computed styles instead — one node per selector, with cascade,
specificity, and inheritance already resolved.

**Render Tree.** The DOM Tree and CSSOM Tree are merged: only elements that will
actually be painted survive, each carrying its final style. From there the browser
works out layout and paints pixels to the screen.

**Bubbling vs. capturing.** A click on the child button first travels *inward* from
the document root to the target (capturing), then back *outward* from the target to
the root (bubbling). Most listeners run in the bubble phase by default; passing
`true` as the third argument to `addEventListener()` switches a listener to the
capture phase instead.

**Event delegation.** Rather than attaching a listener to every task card, one
listener sits on the parent list and uses `event.target.closest()` to work out
which card — and which button inside it — was actually clicked. It keeps memory
usage flat regardless of how many tasks exist, and it automatically covers tasks
that don't exist yet.

## Attributes vs. properties

- `input.value` is a **property** on the live JS object — it always reflects
  whatever is currently in the field, including anything just typed.
- `input.getAttribute("value")` reads the **HTML attribute** — the value baked
  into the markup, which only changes when `setAttribute()` is called explicitly.

Task cards apply the same idea with `data-id`, `data-status`, and `data-category`:
real attributes, readable either through `getAttribute()`/`setAttribute()` or the
more convenient `.dataset` object.
