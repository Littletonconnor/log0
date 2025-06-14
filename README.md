# Log0

Your Personal AI powered Log Book

## TODO

Misc

- Edit Resource

Sidebar

- Creating new document
- Exporting

Docs

- Offset within textarea gets lost once progress is saved
- Toggle Zen mode
- Toggle AI mode
- Find and replace

Resources

- Setup page

Tour

- Setup tour

Marketing Page

- Build landing page
- Custom 404 page

Development

- Use database as storage instead of JSON files.
- Explore using livestore.
- Write seed script to write to documents.json with a bunch of data.

1. Text manipulation.

```js
// Examples of functions you could add:
const duplicateLine = () => {
  const lines = input.split("\n");
  const currentLine = getCurrentLineNumber();
  lines.splice(currentLine, 0, lines[currentLine]);
  setInput(lines.join("\n"));
};

const moveLineUp = () => {
  if (currentLine > 0) {
    const lines = input.split("\n");
    [lines[currentLine - 1], lines[currentLine]] = [
      lines[currentLine],
      lines[currentLine - 1],
    ];
    setInput(lines.join("\n"));
  }
};
```

2.Undo/Redo History

```js

   const [history, setHistory] = useState<string[]>([]);
   const [historyIndex, setHistoryIndex] = useState(-1);

   const addToHistory = (content: string) => {
     setHistory(prev => [...prev.slice(0, historyIndex + 1), content]);
     setHistoryIndex(prev => prev + 1);
   };
```
