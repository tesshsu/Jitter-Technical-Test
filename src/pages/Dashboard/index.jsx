import React from "react";
import { DashboardContainer } from "./styled.js";
import { fabric } from "fabric";
import Button from "../../Components/Button/index.jsx";
import { Input } from "../../Components/Input/index";
import { Href } from "../../Components/Href/index.js";

export function Dashboard() {
  // Hooks
  const canvas_ref = React.useRef(null);
  // states
  const [VIEW_WIDTH, SET_VIEW_WIDTH] = React.useState(0);
  const [VIEW_HEIGHT, SET_VIEW_HEIGHT] = React.useState(0);
  const [CANVAS, SET_CANVAS] = React.useState();
  const [DURATION, SET_DURATION] = React.useState(1);
  const [ARR_RECTANGLE, SET_ARR_RECTANGLE] = React.useState([]);
  const [DOWNLOAD_JSON, SET_DOWNLOAD_JSON] = React.useState();
  const [IMPORT_JSON, SET_IMPORT_JSON] = React.useState();
  // Effect
  React.useEffect(() => {
    initFabricCanvas();
  }, []);
  // create blob link
  React.useEffect(() => {
    handleDownloadJSON();
  }, [ARR_RECTANGLE]);
  React.useEffect(() => {
    // ARR_RECTANGLE.forEach(state =>{
    //   createRectangles(state)
    // })
  }, [IMPORT_JSON]);

  // Handle Functions =====================================================
  // initFabricCanvas
  function initFabricCanvas() {
    const canvasEl = canvas_ref.current;
    let parent = canvasEl.parentNode;

    let { clientWidth, clientHeight } = parent;
    canvasEl.width = clientWidth;
    canvasEl.height = clientHeight;
    SET_VIEW_WIDTH(clientWidth);
    SET_VIEW_HEIGHT(clientHeight);
    //
    // const canvasEl = canvas_ref.current;

    const canvas = new fabric.Canvas(canvasEl, {
      width: clientWidth,
      height: clientHeight,
    });
    canvas.renderAll();
    SET_CANVAS(canvas);
  }
  // radomizer values =====================================================
  // getPositionRadom
  function getPositionRadom() {
    // config
    let obj = {
      w: Math.random() * VIEW_WIDTH,
      h: Math.random() * VIEW_HEIGHT,
    };
    return obj;
  }
  // getRandomSize
  function getRandomSize() {
    let randBetween = Math.floor(Math.random() * (200 + 1) + 80);
    return randBetween;
  }
  // getRandomColor
  function getRandomColor() {
    let symbols, tagColor;
    symbols = "0123456789ABCDEF";
    tagColor = "#";
    for (let i = 0; i < 6; i++) {
      tagColor = tagColor + symbols[Math.floor(Math.random() * 16)];
    }
    return tagColor;
  }
  // getRandomAngle
  function getRandomAngle() {
    let randomAngle = Math.random() * 360 + 1;
    return randomAngle;
  }
  // Create shapes ========================================================
  // createRandomRectangle
  function createRandomRectangle() {
    const randSize = getRandomSize();
    const randAng = getRandomAngle();

    let rect = new fabric.Rect({
      fill: getRandomColor(), // random color
      width: randSize * 1.5, // * 1.5
      height: randSize,
      centeredRotation: true,
      objectCaching: false,
      originX: "center",
      originY: "center",
      angle: randAng,
    });
    // configs
    const rectWidth = rect.width;
    const rectHeight = rect.height;
    let randPosition = getPositionRadom();
    // get random position
    let posi_w =
      randPosition.w + rectWidth > VIEW_WIDTH
        ? randPosition.w - rectWidth
        : randPosition.w;
    let posi_h =
      randPosition.h + rectHeight > VIEW_HEIGHT
        ? randPosition.h - rectHeight
        : randPosition.h;
    // set position
    rect.left = posi_w;
    rect.top = posi_h;
    //
    CANVAS.add(rect);
    CANVAS.renderAll();
    rect.on("selected", () => {
      rect.fill = getRandomColor();
      rect.objectCaching = false;
      CANVAS.renderAll();
    });

    // saveState
    let stateRect = rect.saveState();
    SET_ARR_RECTANGLE([...ARR_RECTANGLE, stateRect]); // save state
  }
  // exec this func for each state save in 'ARR_RECTANGLE'
  function createRectangleAnimation(state) {
    let rect = new fabric.Rect({
      fill: state.fill,
      width: state.width,
      height: state.height,
      left: state.left,
      top: state.top,
      centeredRotation: true,
      objectCaching: false,
      originX: "center",
      originY: "center",
      angle: state.angle,
    });
    CANVAS.add(rect);
    CANVAS.renderAll();
    rect.on("selected", () => {
      rect.fill = getRandomColor();
      rect.objectCaching = false;
      CANVAS.renderAll();
    });
    rect.animate("angle", 360, {
      onChange: CANVAS.renderAll.bind(CANVAS),
      duration: DURATION * 1000, // set duration state,
      easing: fabric.util.ease.easeInExpo,
      onComplete: () => {
        rect.objectCaching = false;
        rect.angle = state.angle;
        CANVAS.renderAll();
      },
    });
  }
  // createRectangles
  function createRectangles(state){
    let rect = new fabric.Rect({
      fill: state.fill,
      width: state.width,
      height: state.height,
      left: state.left,
      top: state.top,
      centeredRotation: true,
      objectCaching: false,
      originX: "center",
      originY: "center",
      angle: state.angle,
    });
    CANVAS.add(rect);
    CANVAS.renderAll();
    rect.on("selected", () => {
      rect.fill = getRandomColor();
      rect.objectCaching = false;
      CANVAS.renderAll();
    });
  }
  // handlePlayAnimation
  function handlePlayAnimation() {
    CANVAS.clear();
    ARR_RECTANGLE.forEach((state) => {
      createRectangleAnimation(state);
    });
  }
  // handleDownloadJSON
  async function handleDownloadJSON() {
    let arr_toJson = ARR_RECTANGLE.map((obj) => {
      let rect = new fabric.Rect({
        fill: obj.fill,
        width: obj.width,
        height: obj.height,
        left: obj.left,
        top: obj.top,
        centeredRotation: true,
        objectCaching: false,
        originX: "center",
        originY: "center",
        angle: obj.angle,
      });
      let toJson = rect.toJSON();
      return toJson;
    });
    let jsonStringfy = JSON.stringify(arr_toJson);
    let blob = new Blob([jsonStringfy], { type: "application/json" });
    let href = URL.createObjectURL(blob);
    SET_DOWNLOAD_JSON(href);
    // console.log(href);
    // return href
  }
  // handleImportJSON
  async function handleImportJSON(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const result = JSON.parse(reader.result);
      SET_IMPORT_JSON({ fileName: file.name, fileContent: result });
      // SET_ARR_RECTANGLE(result);
      result.forEach( state => createRectangles(state) )
    };
    reader.onerror = () => {
      console.log("Import file", reader.error);
    };
  }

  return (
    <DashboardContainer painelColor="#cca">
      <div className="wrapCanvas">
        <canvas ref={canvas_ref}></canvas>
      </div>
      <div className="painelControl">
        <div className="wrapPainel">
          <Button
            title={"Create rectangle"}
            onCLick={createRandomRectangle}
            bg={"#333"}
            fontColor={"#fff"}
          />
          <Input
            type="number"
            placeholder="Duration"
            onChange={(e) => {
              SET_DURATION(e.currentTarget.value);
            }}
          />
          <Button
            title={"Play animation"}
            onCLick={handlePlayAnimation}
            bg={"#333"}
            fontColor={"#fff"}
          />
          <Href
            bg={"#099"}
            fontColor={"#fff"}
            href={DOWNLOAD_JSON}
            download="paths.json"
          >
            Download JSON Project
          </Href>
          <label>Import JSON file</label>
          <Input
            type={"file"}
            placeholder="Import JSON file"
            onChange={handleImportJSON}
          />
        </div>
      </div>
    </DashboardContainer>
  );
}
