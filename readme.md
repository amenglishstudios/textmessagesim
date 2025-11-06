# iMessage Conversation Simulator

This web app lets you simulate a realistic iMessage‑style chat between two people.  
You can send messages, edit them, save & load the conversation, export as image (PNG) or PDF.

## Features
- Two sides: Person A (left) & Person B (right)
- iMessage‑style UI (blue & grey bubbles)
- Editable message bubbles (double‑click or click text)
- Timestamp automatically added
- Save to browser `localStorage`
- Load from saved conversation
- Export chat as PNG image
- Export chat as PDF document
- Mobile‑friendly layout (iPhone style top header + narrow width)

## How to use
1. Open `index.html` in your browser.
2. Type a message, select speaker, click **Send**.
3. Edit messages by clicking inside the bubble, then click away to save.
4. Click **Save** to save current conversation; click **Load** to reload saved version.
5. Click **Export as Image** to download a screenshot (PNG).
6. Click **Export as PDF** to download a PDF version.

## Technical Notes
- Uses `html2canvas` to capture DOM element as canvas.
- Uses `jsPDF` to embed the canvas image into a PDF. :contentReference[oaicite:2]{index=2}
- Export as image retains visual fidelity; PDF export may result in single‑page image embed—if chat height is large you may need pagination logic.

## Want to improve further?
- Add multi‑page pagination for PDF if chat exceeds one page height.
- Add avatars & names for each speaker.
- Add delete message or drag reorder functionality.
- Add theme toggle (light/dark) or mimic actual iPhone screen edges.
- Persist conversations on server side (for sharing) instead of `localStorage`.

## License
MIT

