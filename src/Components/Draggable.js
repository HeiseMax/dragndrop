import React, { useState, useMemo, useCallback, useEffect } from "react";

let POSITION = { x: 300, y: 300 };

const Draggable = ({ children }) => {
  const [state, setState] = useState({
    isDraging: false,
    origin: POSITION,
    translation: POSITION,
  });

  const handleMouseDown = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDraging: true,
      origin: { x: origin.x, y: origin.y },
    }));
  }, []);

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const translation = {
        x: clientX,
        y: clientY,
      };

      setState((state) => ({
        ...state,
        translation,
      }));
    },
    [state.origin]
  );

  const handleMouseUp = useCallback(({ clientX, clientY }) => {
    setState((state) => ({
      ...state,
      isDraging: false,
    }),
    console.log("up"),
    POSITION = {x: clientX , y: clientY });
  }, []);

  useEffect(() => {
    if (state.isDraging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      setState((state) => ({ ...state, translation: POSITION }));
    }
  }, [state.isDraging, handleMouseMove, handleMouseUp]);

  const styles = useMemo(
    () => ({
      cursor: state.isDraging ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate(${state.translation.x}px, ${state.translation.y}px)`,
      transition: state.isDraging ? "none" : "transform 500ms",
      zIndex: state.isDraging ? 2 : 1,
      position: state.isDraging ? "absolute" : "relativ",
    }),
    [state.isDraging, state.translation]
  );

  return (
    <div style={styles} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

export default Draggable;
