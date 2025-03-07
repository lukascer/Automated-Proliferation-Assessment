import React, { useEffect, useRef, useState } from 'react';
import { Circle, Group, Image, Layer, Line, Stage, Transformer } from 'react-konva';
import exampleImage from './../assets/6246_23_A_Ki67.png';

const ImageEditor = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);
  const [img, setImg] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 600 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Update stage dimensions based on container size
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setStageDimensions({ width, height: 600 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Load the image
  useEffect(() => {
    const imageObj = new window.Image();
    imageObj.src = exampleImage;
    imageObj.onload = () => {
      setImg(imageObj);
    };
  }, []);

  // Compute initial zoom and center the image once image and stage dimensions are loaded
  useEffect(() => {
    if (img && stageDimensions.width && stageDimensions.height) {
      const initialScale = Math.min(stageDimensions.width / img.width, stageDimensions.height / img.height);
      setZoom(initialScale);
      // Calculate position to center the image in the stage's unscaled coordinate space
      const x = (stageDimensions.width / initialScale - img.width) / 2;
      const y = (stageDimensions.height / initialScale - img.height) / 2;
      setImagePosition({ x, y });
    }
  }, [img, stageDimensions]);

  // Attach transformer to the image
  useEffect(() => {
    if (transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [img]);

  // Add a point to the polygon if clicking on the stage (not on the image)
  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      setPolygonPoints([...polygonPoints, point]);
    }
  };

  // Clipping function based on polygon points
  const clipFunction = (ctx) => {
    if (polygonPoints.length > 0) {
      ctx.beginPath();
      ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
      for (let i = 1; i < polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
      }
      ctx.closePath();
    }
  };

  // Export the stage as an image (hiding the transformer during export)
  const handleCrop = () => {
    if (stageRef.current) {
      transformerRef.current.hide();
      transformerRef.current.getLayer().batchDraw();

      const dataURL = stageRef.current.toDataURL({ pixelRatio: 3 });
      window.open(dataURL);

      transformerRef.current.show();
      transformerRef.current.getLayer().batchDraw();
    }
  };

  // Handle zoom slider change
  const handleZoomChange = (e) => {
    const newZoom = parseFloat(e.target.value);
    setZoom(newZoom);
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Zoom: </label>
        <input type="range" min="0.1" max="2" step="0.01" value={zoom} onChange={handleZoomChange} />
        <span>{zoom}</span>
      </div>
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        ref={stageRef}
        scaleX={zoom}
        scaleY={zoom}
        onClick={handleStageClick}
        style={{ border: '1px solid grey' }}
      >
        <Layer>
          {/* Group applies clipping if polygonPoints exist */}
          <Group clipFunc={polygonPoints.length > 0 ? clipFunction : undefined}>
            <Image image={img} x={imagePosition.x} y={imagePosition.y} draggable ref={imageRef} />
          </Group>
          {/* Transformer for resizing/moving the image */}
          <Transformer ref={transformerRef} />
          {/* Visualization of the slicing polygon */}
          {polygonPoints.length > 0 && (
            <Line points={polygonPoints.flatMap((p) => [p.x, p.y])} stroke="red" strokeWidth={2} closed={false} />
          )}
          {polygonPoints.map((point, index) => (
            <Circle key={index} x={point.x} y={point.y} radius={4} fill="blue" />
          ))}
        </Layer>
      </Stage>
      <button onClick={handleCrop} style={{ marginTop: '10px' }}>
        Crop Image
      </button>
    </div>
  );
};

export default ImageEditor;
