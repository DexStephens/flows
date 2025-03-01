function circleClick(event) {
  const board = document.getElementById("board");
  const boardRect = board.getBoundingClientRect();

  const svg = document.getElementById("svgCanvas");
  const svgRect = svg.getBoundingClientRect();

  const parentRect = event.target.parentElement.getBoundingClientRect();
  const rect = event.target.getBoundingClientRect();

  const classList = Array.from(event.target.classList);

  const circleTop = rect.top + Math.floor(rect.height / 2) - svgRect.top;
  const circleLeft = rect.left + Math.floor(rect.width / 2) - svgRect.left;

  const lineTop = classList.find(
    (clazz) => clazz === "top" || clazz === "bottom"
  )
    ? calculateNew(classList.includes("bottom"), circleTop, 100)
    : circleTop;

  const lineLeft = classList.find(
    (clazz) => clazz === "left" || clazz === "right"
  )
    ? calculateNew(classList.includes("right"), circleLeft, 100)
    : circleLeft;

  if (lineTop + 100 > svgRect.height || lineLeft + 100 > svgRect.width) {
    resizeSvgCanvas();
  } else if (
    (classList.includes("top") && lineTop - 100 < 0) ||
    (classList.includes("left") && lineLeft - 100 < 0)
  ) {
    return;
  }

  drawLine(circleLeft, circleTop, lineLeft, lineTop);

  const squareTop =
    (classList.find((clazz) => clazz === "top" || clazz === "bottom")
      ? calculateNew(classList.includes("bottom"), parentRect.top, 200)
      : parentRect.top) - svgRect.top;
  const squareLeft =
    (classList.find((clazz) => clazz === "left" || clazz === "right")
      ? calculateNew(classList.includes("right"), parentRect.left, 200)
      : parentRect.left) - svgRect.left;

  event.target.parentElement.parentElement.appendChild(
    addSquare(squareTop, squareLeft)
  );
}

function calculateNew(positive, current, amount) {
  return current + amount * (positive ? 1 : -1);
}

function addSquare(top, left) {
  const ogBox = document.getElementById("box-1").cloneNode(true);
  ogBox.id = Date.now();

  ogBox.style.top = `${top}px`;
  ogBox.style.left = `${left}px`;

  return ogBox;
}

function drawLine(x1, y1, x2, y2) {
  const svg = document.getElementById("svgCanvas");

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);

  line.setAttribute("stroke", "black");
  line.setAttribute("stroke-width", "2");

  svg.appendChild(line);
}

function setupSvgCanvas() {
  const board = document.getElementById("board");
  const svg = document.getElementById("svgCanvas");

  const boardWidth = board.offsetWidth;
  const boardHeight = board.offsetHeight;

  svg.setAttribute("width", boardWidth);
  svg.setAttribute("height", boardHeight);
}

function resizeSvgCanvas() {
  const svg = document.getElementById("svgCanvas");

  svg.setAttribute("width", svg.width.baseVal.value + 500);
  svg.setAttribute("height", svg.height.baseVal.value + 500);
}

export function startup() {
  setupSvgCanvas();
  const main = document.getElementById("board");

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("circle")) {
      circleClick(event);
    }
  });
}

// ✔ Making objects draggable
// ✔ Drawing connections with SVG or Canvas
// ✔ Tracking positions & updating dynamically
// ✔ Saving data as a graph (nodes + edges)
// ✔ Using JavaScript event listeners to handle movement
