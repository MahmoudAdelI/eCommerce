export default function grid(items) {
  return `
        <div class=" grid">
            ${items.join("")}
        </div>
    `;
}
