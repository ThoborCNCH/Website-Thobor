import React, { Fragment, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import "./style.scss";
import Editor from "@monaco-editor/react";
import { FaRegHandPaper, FaEraser, FaEyeDropper } from "react-icons/fa";
import { MdModeEditOutline, MdScreenShare } from "react-icons/md";
import { GoXCircle } from "react-icons/go";
import {
  BsFillMicFill,
  BsFillCameraVideoFill,
  BsTelephoneFill,
  BsCodeSlash,
  BsFillMicMuteFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { BiSolidChalkboard } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { GrUndo } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";

const MyVideo = styled.video`
  height: 100%;
  width: 100%;
  left: 50%;
  position: relative;
  transform: translateX(-50%) scaleX(-100%);
  background: rgb(45, 38, 34);
  pointer-events: none;
  max-height: 300px;
`;

const ShareScreenVideo = styled.canvas`
  width: calc(100% - 20px);
  display: none;
  top: 50%;
  transform: translateY(-50%);
  position: relative;
  padding: 10px;
  pointer-events: none;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <MyVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

var ctx;
var canvas;
var lastEvent = "";

const Room = (props) => {
  let navigate = useNavigate();
  let isDrawing = useRef(false);
  const [localStream, setLocalStream] = useState(null);
  let timeout;
  const v = useRef("");
  const [peers, setPeers] = useState([]);
  const editTool = useRef(false);
  const sizeTool = useRef(false);
  const socketRef = useRef();
  const userVideo = useRef();
  const screenTrack = useRef();
  const peersRef = useRef([]);
  const { roomID } = useParams();
  const editorRef = useRef(null);
  const isWriting = useRef(true);
  const colorRef = useRef("#000");
  const sizeRef = useRef(5);
  const isCamera = useRef(false);
  const isAudio = useRef(false);
  const handTool = useRef(false);
  const undoStack = useRef(0);
  const scale = useRef(1);
  const interval = useRef(null);
  const senders = useRef(null);
  let draw;

  // list of all strokes drawn
  const drawings = useRef([]);
  const sizeLine = useRef([]);
  const colorLine = useRef([]);

  let dublicatedVideo = "";
  const otherIsSharing = useRef(false);

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_SOCKET_URL, {
      query: `room=${roomID}`,
    });
    draw = drawOnCanvas_v2();
    navigator.mediaDevices
      // .getDisplayMedia({ video: true })
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        setLocalStream(stream);

        userVideo.current.srcObject = stream;
        socketRef.current.emit("join room", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(
              userID,
              socketRef.current.id,
              userVideo.current.srcObject
            );
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push({
              peerID: userID,
              peer,
            });
          });
          setPeers(peers);
        });

        socketRef.current.on("user left", (id)=>{
          console.log(`a user (${id}) left`);
        })

        socketRef.current.on("user joined", (payload) => {
          console.log("asdasdasd", payload);
          const k = peersRef.current.map((u) => u.peerID);
          if (!k.includes(payload.callerID)) {
            const peer = addPeer(
              payload.signal,
              payload.callerID,
              userVideo.current.srcObject
            );
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            const peerObj = {
              peer,
              peerID: payload.callerID,
            };

            setPeers((users) => [...users, peerObj]);
          } else console.log("peer log: " + k);
        });

        socketRef.current.on("currentRoomEvent", (payload) => {
          if (payload.id === socketRef.current.id) {
            var event = payload.event;
            console.log(event);
            if (event !== "" && event !== undefined) {
              changeLayoutProgramatically(event);
            }
          }
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socketRef.current.on("peer editor write", (params) => {
          isWriting.current = false;

          var id = params[3];
          if (id !== socketRef.current.id) {
            var code = params[0];
            editorRef.current.setPosition({
              column: params[1],
              lineNumber: params[2],
            });
            if (code === "delete-key")
              editorRef.current.trigger("", "deleteLeft");
            else editorRef.current.trigger("keyboard", "type", { text: code });
          }
          isWriting.current = true;
        });

        socketRef.current.on("user left", (id) => {
          const peerObj = peersRef.current.find((p) => p.peerID === id);
          if (peerObj) {
            peerObj.peer.destroy();
          }
          const peers = peersRef.current.filter((p) => p.peerID !== id);
          peersRef.current = peers;
          setPeers(peers);
        });

        socketRef.current.on("open share screen server", (id) => {
          console.log(id, socketRef.current.id);
          if (id !== socketRef.current.id) {
            console.log("Asd");
            changeLayoutProgramatically("present");
          }
        });

        // canvasShareReceiver.width = image.width;
        // canvasShareReceiver.height = image.height;

        socketRef.current.on("send data share screen server", (payload) => {
          if (payload.id !== socketRef.current.id) {
            var canvasShareReceiver = document.getElementById("shareScreen");
            var ctxShareReceiver = canvasShareReceiver.getContext("2d");

            var l = document.querySelectorAll(".layout-main")[0];
            var root = document.querySelector(".extention");
            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });
            root.childNodes[1].style.display = "block";

            l.classList.remove("isNotPresenting");
            l.classList.add("isPresenting");

            document.querySelectorAll(".control")[2].style.display = "none";
            document.querySelectorAll(".control")[3].style.display = "none";
            document.querySelectorAll(".control")[4].style.display = "none";
            document.querySelectorAll(".control")[5].style.display = "none";

            var image = new Image();
            image.src = payload.data;

            image.onload = function () {
              ctxShareReceiver.drawImage(image, 0, 0); //, canvasShareReceiver.width, canvasShareReceiver.height);
            };
            image.src = payload.data;
          }
        });

        // socketRef.current.on("stop data share screen", (payload) => {
        //   if (payload.id !== socketRef.current.id) {
        //     // changeLayoutProgramatically();
        //     {
        //       changeLayout();
        //       console.log("11111");
        //     }
        //   }
        // });

        socketRef.current.on("close screen share server", (id) => {
          if (id !== socketRef.current.id) {
            // changeLayoutProgramatically();
            // console.log("2222");
            var l = document.querySelectorAll(".layout-main")[0];
            var root = document.querySelector(".extention");
            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });

            l.classList.remove("isPresenting");
            l.classList.add("isNotPresenting");

            document.querySelectorAll(".control")[2].style.display = "block";
            document.querySelectorAll(".control")[3].style.display = "block";
            document.querySelectorAll(".control")[4].style.display = "block";
            document.querySelectorAll(".control")[5].style.display = "none";

            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });
            // root.childNodes[1].style.display = "block";
          }
        });

        socketRef.current.on("delete whiteboard", (id) => {
          if (id !== socketRef.current.id) {
            deleteCanvasProgramatically();
            drawings.current = [];
            colorLine.current = [];
            sizeLine.current = [];
          }
        });

        socketRef.current.on("open whiteboard server", (id) => {
          if (id !== socketRef.current.id){
            console.log("asd");
            // changeLayoutProgramatically("whiteboard");
            var l = document.querySelectorAll(".layout-main")[0];
          var root = document.querySelector(".extention");
          root.childNodes.forEach((div) => {
            div.style.display = "none";
          });

          l.classList.remove("isNotPresenting");
          l.classList.add("isPresenting");

          document.querySelectorAll(".control")[2].style.display = "none";
          document.querySelectorAll(".control")[3].style.display = "none";
          document.querySelectorAll(".control")[4].style.display = "none";
          document.querySelectorAll(".control")[5].style.display = "none";

          root.childNodes[0].style.display = "block";
        }
        });

        socketRef.current.on("close whiteboard server", (id) => {
          if (id !== socketRef.current.id) {
            var l = document.querySelectorAll(".layout-main")[0];
            var root = document.querySelector(".extention");
            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });

            l.classList.remove("isPresenting");
            l.classList.add("isNotPresenting");

            document.querySelectorAll(".control")[2].style.display = "block";
            document.querySelectorAll(".control")[3].style.display = "block";
            document.querySelectorAll(".control")[4].style.display = "block";
            document.querySelectorAll(".control")[5].style.display = "none";

            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });
          };
        });

        socketRef.current.on("open editor server", (id) => {
          if (id !== socketRef.current.id){
          var l = document.querySelectorAll(".layout-main")[0];
          var root = document.querySelector(".extention");
          root.childNodes.forEach((div) => {
            div.style.display = "none";
          });

          l.classList.remove("isNotPresenting");
          l.classList.add("isPresenting");

          document.querySelectorAll(".control")[2].style.display = "none";
          document.querySelectorAll(".control")[3].style.display = "none";
          document.querySelectorAll(".control")[4].style.display = "none";
          document.querySelectorAll(".control")[5].style.display = "none";

          root.childNodes[2].style.display = "block";}
        });

        socketRef.current.on("close editor server", (id) => {
          if (id !== socketRef.current.id) {
            var l = document.querySelectorAll(".layout-main")[0];
            var root = document.querySelector(".extention");
            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });

            l.classList.remove("isPresenting");
            l.classList.add("isNotPresenting");

            document.querySelectorAll(".control")[2].style.display = "block";
            document.querySelectorAll(".control")[3].style.display = "block";
            document.querySelectorAll(".control")[4].style.display = "block";
            document.querySelectorAll(".control")[5].style.display = "none";

            root.childNodes.forEach((div) => {
              div.style.display = "none";
            });
          }
        });
      })
      .catch(function (err) {
        let error = "";
        if (
          err.name === "NotFoundError" ||
          err.name === "DevicesNotFoundError"
        ) {
          //required track is missing
          error = "notfound";
        } else if (
          err.name === "NotReadableError" ||
          err.name === "TrackStartError"
        ) {
          //webcam or mic are already in use
          error = "inuse";
        } else if (
          err.name === "OverconstrainedError" ||
          err.name === "ConstraintNotSatisfiedError"
        ) {
          //constraints can not be satisfied by avb. devices
          error = "avbdev";
        } else if (
          err.name === "NotAllowedError" ||
          err.name === "PermissionDeniedError"
        ) {
          //permission denied in browser
          error = "denied";
        } else if (err.name === "TypeError" || err.name === "TypeError") {
          //empty constraints object
          error = "nocamera";
        }
        navigate(`/error/${error}`);
        console.log(err.name + ": " + err.message);
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "turn:206.81.29.100:3478",
            username: "cosmin",
            credential: "123456",
          },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function drawOnCanvas() {
    canvas = document.querySelector("#board");
    ctx = canvas.getContext("2d");

    canvas.width = 2000;
    canvas.height = 2000;

    var mouse = { x: 0, y: 0 };
    var last_mouse = { x: 0, y: 0 };

    /* Mouse Capturing Work */
    canvas.addEventListener(
      "mousemove",
      function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
      },
      false
    );

    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000000";

    canvas.addEventListener(
      "mousedown",
      function (e) {
        if (editTool.current === true)
          canvas.addEventListener("mousemove", onPaint, false);
      },
      false
    );

    canvas.addEventListener(
      "mouseup",
      function () {
        canvas.removeEventListener("mousemove", onPaint, false);
      },
      false
    );

    var onPaint = function () {
      ctx.beginPath();
      ctx.moveTo(last_mouse.x, last_mouse.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.closePath();
      ctx.stroke();

      if (timeout !== undefined) clearTimeout(timeout);
      timeout = setTimeout(function () {
        var base64ImageData = canvas.toDataURL("image/png");
        socketRef.current.emit("write whiteboard", {
          data: base64ImageData,
          roomID: roomID,
        });
      }, 1000);
    };
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
      config: {
        iceServers: [
          {
            urls: "turn:206.81.29.100:3478",
            username: "cosmin",
            credential: "123456",
          },
        ],
      },
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  const screenSharingStreamRef = useRef(null);

  async function shareScreen() {
    var mediaStream;

    // screenTrack.current.srcObject = mediaStream;
    if (otherIsSharing.current === false) {
      mediaStream = await navigator.mediaDevices.getDisplayMedia({
        mediaSource: "screen",
      });
      screenSharingStreamRef.current = mediaStream;

      const track = mediaStream.getVideoTracks()[0];
      socketRef.current.emit("open share screen");

      interval.current = setInterval(async function () {
        const imageCapture = new ImageCapture(track);

        const bitmap = await imageCapture.grabFrame();
        const canvasShare = document.getElementById("shareScreen");
        const context = canvasShare.getContext("2d");
        context.drawImage(bitmap, 0, 0); //, bitmap.width, bitmap.height);
        const image = canvasShare.toDataURL("image/webp");

        socketRef.current.emit("send data share screen", image);
      }, 200);

      mediaStream.oninactive = () => {
        socketRef.current.emit("close share screen");
        clearInterval(interval.current);
        stopScreenSharing();
        changeLayoutProgramatically();
      };
    }
  }

  const stopShare = () => {
    socketRef.current.emit("close share screen");
    clearInterval(interval.current);
    console.log("ssss");
    changeLayoutProgramatically();
    console.log("after====ssss");
  };

  const stopScreenSharing = () => {
    socketRef.current.emit("close share screen");
    changeLayoutProgramatically();
    if (screenSharingStreamRef.current) {
      const tracks = screenSharingStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop());

      screenSharingStreamRef.current = null;
    }
  };

  function changeColor(color) {
    colorRef.current = color;
    var k = document.querySelector(".colorRange");
    k.style.borderRight = "5px solid " + colorRef.current;
  }

  function changeSize(size) {
    sizeRef.current = size;
  }

  function deleteCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings.current = [];
    colorLine.current = [];
    sizeLine.current = [];
    socketRef.current.emit("clear whiteboard", roomID);
  }

  function deleteCanvasProgramatically() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawings.current = [];
    colorLine.current = [];
    sizeLine.current = [];
  }

  function handleEditorChange(value, event) {
    if (isWriting.current === false) return;
    isWriting.current = true;
    // console.log(event);
    v.current = event.changes[0].text;
    // add coordonates where the thing is pasting
    var x = event.changes[0].range.endColumn;
    var y = event.changes[0].range.endLineNumber;

    if (v.current === "") v.current = "delete-key";
    if (v.current.startsWith("\n"))
      v.current = event.changes[0].text.replaceAll(" ", "");

    socketRef.current.emit("me editor write", [v.current, x, y]);
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorValidation(markers) {
    // markers.forEach(marker => console.log("onValidate:", marker.message));
  }

  async function changeLayout(event) {
    var l = document.querySelectorAll(".layout-main")[0];
    var root = document.querySelector(".extention");
    root.childNodes.forEach((div) => {
      div.style.display = "none";
    });

    if (l.classList.contains("isNotPresenting")) {
      if (event === "whiteboard") {
        socketRef.current.emit("open whiteboard", roomID);
        root.childNodes[0].style.display = "block";
      } else if (event === "editor") {
        console.log("asd");
        root.childNodes[2].style.display = "block";
        document.querySelector("#okk").style.display = "flex";
        socketRef.current.emit("open editor", roomID);
      } else if (event === "present") {
        if (!("ImageCapture" in window)) {
          alert("Safari nu suporta screen share");
          return;
        }

        root.childNodes[1].style.display = "block";
        shareScreen();
      }

      l.classList.remove("isNotPresenting");
      l.classList.add("isPresenting");

      document.querySelectorAll(".control")[2].style.display = "none";
      document.querySelectorAll(".control")[3].style.display = "none";
      document.querySelectorAll(".control")[4].style.display = "none";
      document.querySelectorAll(".control")[5].style.display = "block";

      lastEvent = event;
    } else {
      l.classList.remove("isPresenting");
      l.classList.add("isNotPresenting");

      document.querySelectorAll(".control")[2].style.display = "block";
      document.querySelectorAll(".control")[3].style.display = "block";
      document.querySelectorAll(".control")[4].style.display = "block";
      document.querySelectorAll(".control")[5].style.display = "none";

      root.childNodes.forEach((div) => {
        div.style.display = "none";
      });

      if (lastEvent === "whiteboard") {
        socketRef.current.emit("close whiteboard", roomID);
      } else if (lastEvent === "editor") {
        socketRef.current.emit("close editor", roomID);
      } else if (lastEvent === "present") {
        console.log("hello");
        // stopShare();
        // socketRef.current.emit("close share screen", roomID);
        stopScreenSharing();
      }
    }
  }

  async function changeLayoutProgramatically(event) {
    var l = document.querySelectorAll(".layout-main")[0];
    var root = document.querySelector(".extention");
    root.childNodes.forEach((div) => {
      div.style.display = "none";
    });

    if (!l.className.includes("isNotPresenting")) {
      l.classList.remove("isNotPresenting");
      l.classList.add("isPresenting");

      document.querySelectorAll(".control")[2].style.display = "none";
      document.querySelectorAll(".control")[3].style.display = "none";
      document.querySelectorAll(".control")[4].style.display = "none";
      document.querySelectorAll(".control")[5].style.display = "block";

      if (event === "whiteboard") {
        root.childNodes[0].style.display = "block";
      } else if (event === "editor") {
        root.childNodes[2].style.display = "block";
      } else if (event === "present") {
        console.log("asdasdasdadasdasdasdasdad");
        root.childNodes[1].style.display = "block";
      }

      lastEvent = event;
    } else {
      console.log(l.className);
      l.classList.remove("isPresenting");
      l.classList.add("isNotPresenting");

      document.querySelectorAll(".control")[2].style.display = "block";
      document.querySelectorAll(".control")[3].style.display = "block";
      document.querySelectorAll(".control")[4].style.display = "block";
      document.querySelectorAll(".control")[5].style.display = "none";

      root.childNodes.forEach((div) => {
        div.style.display = "none";
      });

      if (lastEvent === "whiteboard") {
      } else if (lastEvent === "editor") {
      } else if (lastEvent === "present") {
        root.childNodes[1].style.display = "block";
      }
    }
  }

  function startEdit() {
    var k = document.querySelector("#editTool");
    var d = document.querySelector("#handTool");

    if (handTool.current === true) {
      handTool.current = false;
      d.classList.remove("selected");
      canvas.style.cursor = "move";
    }

    if (editTool.current === false) {
      editTool.current = true;
      k.classList.add("selected");
      canvas.style.cursor = "crosshair";
    } else {
      editTool.current = false;
      k.classList.remove("selected");
      canvas.style.cursor = "default";
    }
  }

  function pickColor() {
    document.querySelector(".colorPickerWhiteboard").click();
  }

  function openSizer() {
    var k = document.querySelector("#sizeTool");
    var p = document.querySelector(".sizeController");
    if (sizeTool.current === false) {
      sizeTool.current = true;
      k.classList.add("selected");
      p.style.display = "block";
    } else {
      sizeTool.current = false;
      k.classList.remove("selected");
      p.style.display = "none";
    }
  }

  const toggleVideo = () => {
    var on = document.querySelector("#openVideo");
    var off = document.querySelector("#closeVideo");
    var control = document.querySelectorAll(".control")[1];

    if (isCamera.current === false) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = false;
      });
      isCamera.current = true;
      off.style.display = "block";
      on.style.display = "none";
      control.classList.add("close");
    } else {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = true;
      });
      isCamera.current = false;
      off.style.display = "none";
      on.style.display = "block";
      control.classList.remove("close");
    }
  };

  const toggleAudio = () => {
    var on = document.querySelector("#openAudio");
    var off = document.querySelector("#closeAudio");
    var control = document.querySelectorAll(".control")[0];

    if (isAudio.current === false) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = false;
      });
      isAudio.current = true;
      off.style.display = "block";
      on.style.display = "none";
      control.classList.add("close");
    } else {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = true;
      });
      isAudio.current = false;
      off.style.display = "none";
      on.style.display = "block";
      control.classList.remove("close");
    }
  };

  function drawOnCanvas_v2() {
    canvas = document.getElementById("board");
    ctx = canvas.getContext("2d");
    const context = ctx;

    socketRef.current.on("write whiteboard", function (data) {
      var interval = setInterval(function () {
        if (isDrawing.current) return;
        isDrawing.current = true;
        clearInterval(interval);

        drawings.current = data[0];
        colorLine.current = data[1];
        sizeLine.current = data[2];
        redrawCanvas();

        isDrawing.current = false;
      }, 200);
    });

    document.oncontextmenu = function () {
      return false;
    };

    let cursorX;
    let cursorY;
    let prevCursorX;
    let prevCursorY;

    let offsetX = 0;
    let offsetY = 0;

    function toScreenX(xTrue) {
      return (xTrue + offsetX) * scale.current;
    }
    function toScreenY(yTrue) {
      return (yTrue + offsetY) * scale.current;
    }
    function toTrueX(xScreen) {
      return xScreen / scale.current - offsetX;
    }
    function toTrueY(yScreen) {
      return yScreen / scale.current - offsetY;
    }
    function trueHeight() {
      return canvas.clientHeight / scale.current;
    }
    function trueWidth() {
      return canvas.clientWidth / scale.current;
    }

    function redrawCanvas() {
      if (document.body.clientWidth > 550)
        canvas.width = document.body.clientWidth * 0.8;
      else canvas.width = document.body.clientWidth;
      canvas.height = 1000;

      ctx.fillStyle = "#fff";
      console.log(canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drawings.current.length; i++) {
        const line = drawings.current[i];
        const colorScarfas = colorLine.current[i];
        const sizeScarfas = sizeLine.current[i];
        drawLine(
          toScreenX(line.x0),
          toScreenY(line.y0),
          toScreenX(line.x1),
          toScreenY(line.y1),
          colorScarfas,
          sizeScarfas
        );
      }
    }
    redrawCanvas();

    window.addEventListener("resize", (event) => {
      redrawCanvas();
    });

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", onMouseMove, false);
    canvas.addEventListener("wheel", onMouseWheel, false);

    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchend", onTouchEnd);
    canvas.addEventListener("touchcancel", onTouchEnd);
    canvas.addEventListener("touchmove", onTouchMove);

    let leftMouseDown = false;
    let rightMouseDown = false;

    function onMouseDown(event) {
      if (editTool.current === true || handTool.current === true) {
        if (event.button === 0 && handTool.current === false) {
          leftMouseDown = true;
          rightMouseDown = false;
        } else {
          leftMouseDown = false;
          rightMouseDown = true;
        }

        if (event.button === 2) {
          rightMouseDown = true;
          leftMouseDown = false;
        }

        cursorX = event.pageX;
        cursorY = event.pageY;
        prevCursorX = event.pageX;
        prevCursorY = event.pageY;
        undoStack.current = drawings.current.length;
        // drawOnCanvas()
      }
    }

    function onMouseMove(event) {
      cursorX = event.pageX;
      cursorY = event.pageY;
      const scaledX = toTrueX(cursorX);
      const scaledY = toTrueY(cursorY);
      const prevScaledX = toTrueX(prevCursorX);
      const prevScaledY = toTrueY(prevCursorY);

      if (leftMouseDown) {
        drawings.current.push({
          x0: prevScaledX,
          y0: prevScaledY,
          x1: scaledX,
          y1: scaledY,
        });
        sizeLine.current.push(sizeRef.current);
        colorLine.current.push(colorRef.current);

        drawLine(prevCursorX, prevCursorY, cursorX, cursorY, "", "");

        if (timeout !== undefined) clearTimeout(timeout);
        timeout = setTimeout(function () {
          socketRef.current.emit("write whiteboard", {
            drawing: drawings.current,
            color: colorLine.current,
            size: sizeLine.current,
            roomID: roomID,
          });
        }, 1000);
      }

      if (rightMouseDown) {
        offsetX += (cursorX - prevCursorX) / scale.current;
        offsetY += (cursorY - prevCursorY) / scale.current;
        redrawCanvas();
      }

      prevCursorX = cursorX;
      prevCursorY = cursorY;
    }

    function onMouseUp() {
      console.log(undoStack.current);
      undoStack.current = drawings.current.length - undoStack.current;
      console.log(drawings.current.length, undoStack.current);
      console.log("----------------");
      leftMouseDown = false;
      rightMouseDown = false;
    }

    function onMouseWheel(event) {
      const deltaY = event.deltaY;
      const scaleAmount = -deltaY / 500;
      scale.current = scale.current * (1 + scaleAmount);

      var distX = event.pageX / canvas.clientWidth;
      var distY = event.pageY / canvas.clientHeight;

      const unitsZoomedX = trueWidth() * scaleAmount;
      const unitsZoomedY = trueHeight() * scaleAmount;

      const unitsAddLeft = unitsZoomedX * distX;
      const unitsAddTop = unitsZoomedY * distY;

      offsetX -= unitsAddLeft;
      offsetY -= unitsAddTop;

      redrawCanvas();
    }
    function drawLine(x0, y0, x1, y1, colorr, sizee) {
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);

      if (colorr !== "") context.strokeStyle = colorr;
      else context.strokeStyle = colorRef.current;

      if (sizee !== "") context.lineWidth = sizee;
      else context.lineWidth = sizeRef.current;

      context.stroke();
    }

    const prevTouches = [null, null];
    let singleTouch = false;
    let doubleTouch = false;

    function onTouchStart(event) {
      if (editTool.current === true || handTool.current === true) {
        if (event.touches.length === 1 && handTool.current === false) {
          singleTouch = true;
          doubleTouch = false;
        } else {
          leftMouseDown = false;
          rightMouseDown = true;
        }

        if (event.touches.length === 2) {
          singleTouch = false;
          doubleTouch = true;
        }

        prevTouches[0] = event.touches[0];
        prevTouches[1] = event.touches[1];
      }
    }

    function onTouchMove(event) {
      const touch0X = event.touches[0].pageX;
      const touch0Y = event.touches[0].pageY;
      const prevTouch0X = prevTouches[0].pageX;
      const prevTouch0Y = prevTouches[0].pageY;

      const scaledX = toTrueX(touch0X);
      const scaledY = toTrueY(touch0Y);
      const prevScaledX = toTrueX(prevTouch0X);
      const prevScaledY = toTrueY(prevTouch0Y);

      if (singleTouch) {
        drawings.current.push({
          x0: prevScaledX,
          y0: prevScaledY,
          x1: scaledX,
          y1: scaledY,
        });

        sizeLine.current.push(sizeRef.current);
        colorLine.current.push(colorRef.current);
        drawLine(prevTouch0X, prevTouch0Y, touch0X, touch0Y, "", "");

        if (timeout !== undefined) clearTimeout(timeout);
        timeout = setTimeout(function () {
          socketRef.current.emit("write whiteboard", {
            drawing: drawings.current,
            color: colorLine.current,
            size: sizeLine.current,
            roomID: roomID,
          });
        }, 1000);
      }

      if (doubleTouch) {
        const touch1X = event.touches[1].pageX;
        const touch1Y = event.touches[1].pageY;
        const prevTouch1X = prevTouches[1].pageX;
        const prevTouch1Y = prevTouches[1].pageY;

        const midX = (touch0X + touch1X) / 2;
        const midY = (touch0Y + touch1Y) / 2;
        const prevMidX = (prevTouch0X + prevTouch1X) / 2;
        const prevMidY = (prevTouch0Y + prevTouch1Y) / 2;

        const hypot = Math.sqrt(
          Math.pow(touch0X - touch1X, 2) + Math.pow(touch0Y - touch1Y, 2)
        );
        const prevHypot = Math.sqrt(
          Math.pow(prevTouch0X - prevTouch1X, 2) +
            Math.pow(prevTouch0Y - prevTouch1Y, 2)
        );

        var zoomAmount = hypot / prevHypot;
        scale.current = scale.current * zoomAmount;
        const scaleAmount = 1 - zoomAmount;

        const panX = midX - prevMidX;
        const panY = midY - prevMidY;

        offsetX += panX / scale.current;
        offsetY += panY / scale.current;

        var zoomRatioX = midX / canvas.clientWidth;
        var zoomRatioY = midY / canvas.clientHeight;

        const unitsZoomedX = trueWidth() * scaleAmount;
        const unitsZoomedY = trueHeight() * scaleAmount;

        const unitsAddLeft = unitsZoomedX * zoomRatioX;
        const unitsAddTop = unitsZoomedY * zoomRatioY;

        offsetX += unitsAddLeft;
        offsetY += unitsAddTop;

        redrawCanvas();
      }
      prevTouches[0] = event.touches[0];
      prevTouches[1] = event.touches[1];
    }

    function onTouchEnd(event) {
      singleTouch = false;
      doubleTouch = false;
    }
  }

  const undo = () => {
    var k = undoStack.current;
    while (k > 0) {
      drawings.current.pop();
      colorLine.current.pop();
      sizeLine.current.pop();
      k--;
    }
    socketRef.current.emit("write whiteboard", {
      drawing: drawings.current,
      color: colorLine.current,
      size: sizeLine.current,
      roomID: roomID,
    });
  };

  const panHand = () => {
    var k = document.querySelector("#editTool");
    var d = document.querySelector("#handTool");
    if (editTool.current === true) {
      editTool.current = false;
      k.classList.remove("selected");
      canvas.style.cursor = "crosshair";
    }
    if (handTool.current === false) {
      handTool.current = true;
      d.classList.add("selected");
      canvas.style.cursor = "move";
    } else {
      handTool.current = false;
      d.classList.remove("selected");
      canvas.style.cursor = "default";
    }
  };

  const selectLanguage = (lang) => {
    editorRef.current.updateOptions({
      language: lang,
    });
  };

  return (
    <Fragment>
      <div className="layout-main isNotPresenting">
        <div className="extention">
          <div className="sketch" id="sketch">
            <div className="tools">
              <div id="editTool" className="tool" onClick={startEdit}>
                <MdModeEditOutline />
              </div>
              <div
                id="colorTool"
                className="tool colorRange"
                onClick={pickColor}
              >
                <FaEyeDropper />
                <input
                  className="colorPickerWhiteboard"
                  type="color"
                  value={"#000000"}
                  onChange={(e) => changeColor(e.target.value)}
                />
              </div>
              <div id="sizeTool" className="tool" onClick={openSizer}>
                <GoXCircle />
                <div className="sizeController">
                  <span style={{ marginRight: "5px" }}> 5pt </span>
                  <input
                    type="range"
                    id="size"
                    name="brushSize"
                    step="5"
                    min="5"
                    max="30"
                    onChange={(e) => changeSize(e.target.value)}
                  />
                  <span style={{ marginLeft: "5px" }}> 30pt </span>
                </div>
              </div>
              <div id="deleteTool" className="tool" onClick={deleteCanvas}>
                <FaEraser />
              </div>
              <div id="undoTool" className="tool" onClick={undo}>
                <GrUndo />
              </div>
              <div id="handTool" className="tool" onClick={panHand}>
                <FaRegHandPaper />
              </div>
            </div>
            <div className="viewPort">
              <canvas
                className="board"
                width="2000"
                height="2000"
                id="board"
              ></canvas>
            </div>
          </div>
          <ShareScreenVideo id="shareScreen" width="1400" height="900" />
          <div className="viewPort" id="okk">
            <select
              className="select-elem"
              onChange={(e) => selectLanguage(e.target.value)}
            >
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
            <Editor
              className="editor"
              id="codeEditor"
              height="100%"
              width="100%"
              defaultLanguage="c"
              defaultValue=""
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              onValidate={handleEditorValidation}
              options={{
                autoClosingBrackets: true,
                renderWhitespace: true,
                formatOnPaste: true,
                theme: "vs-dark",
                bracketPairColorization: 13,
              }}
            />
          </div>
        </div>
        <div className="videoWrapper">
          <div className="containerVideo">
            <MyVideo muted ref={userVideo} autoPlay playsInline id="myvideo" />
            {peers.map((peer) => {
              if (peers.filter((p) => p.peerID === peer.peerID).length === 1) {
                dublicatedVideo = "";
                return (
                  <Video
                    muted
                    className="peer-video"
                    key={peer.peerID}
                    peer={peer.peer}
                  />
                );
              } else if (
                peers.filter((p) => p.peerID === peer.peerID).length === 2 &&
                dublicatedVideo === ""
              ) {
                dublicatedVideo = "dublicated";
                return (
                  <Video
                    muted
                    className="peer-video"
                    key={peer.peerID}
                    peer={peer.peer}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="bottom_bar">
        <div className="leftPart">
          <div className="control" onClick={toggleAudio}>
            <BsFillMicFill id="openAudio" />
            <BsFillMicMuteFill id="closeAudio" />
          </div>
          <div className="control" onClick={toggleVideo}>
            <BsFillCameraVideoFill id="openVideo" />
            <BsFillCameraVideoOffFill id="closeVideo" />
          </div>
          <div
            className="control"
            onClick={() => {
              changeLayout("present");
            }}
          >
            <MdScreenShare />
          </div>
          <div
            className="control"
            onClick={() => {
              changeLayout("whiteboard");
            }}
          >
            <BiSolidChalkboard />
          </div>
          <div
            className="control"
            onClick={() => {
              changeLayout("editor");
            }}
          >
            <BsCodeSlash />
          </div>
          <div className="control clear" onClick={changeLayout}>
            <IoCloseOutline />
          </div>
          <a className="control close" href={"/admin/meet/end"}>
            <BsTelephoneFill />
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default Room;
