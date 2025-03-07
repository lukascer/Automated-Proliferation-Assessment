import CropIcon from '@mui/icons-material/Crop';
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
  const [isCropping, setIsCropping] = useState(false);

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
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Load the image
  useEffect(() => {
    const imageObj = new window.Image();
    imageObj.src = exampleImage;
    imageObj.onload = () => {
      setImg(imageObj);
    };
  }, []);

  // Compute initial zoom and center the image on load
  useEffect(() => {
    if (img && stageDimensions.width && stageDimensions.height) {
      const initialScale = Math.min(stageDimensions.width / img.width, stageDimensions.height / img.height);
      setZoom(initialScale);
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

  // When cropping mode is active, record polygon points on stage clicks
  const handleStageClick = (e) => {
    if (!isCropping) return;
    if (e.target === e.target.getStage()) {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      setPolygonPoints((prev) => [...prev, point]);
    }
  };

  // Handle zoom slider change
  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  // Handle mouse wheel zoom
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const stage = stageRef.current;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    const scaleBy = 1.05;
    const direction = e.evt.deltaY > 0 ? -1 : 1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setZoom(newScale);
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  // Compute bounding box from polygon points, clamp to image boundaries, and crop
  const performCrop = () => {
    if (polygonPoints.length === 0) {
      alert('No crop area defined!');
      return;
    }
    // Compute bounding box of drawn polygon (in stage coordinates)
    const xs = polygonPoints.map((p) => p.x);
    const ys = polygonPoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    // Image boundaries in stage coordinates
    const imageLeft = imagePosition.x;
    const imageTop = imagePosition.y;
    const imageRight = imagePosition.x + img.width;
    const imageBottom = imagePosition.y + img.height;

    // Clamp the crop region so it doesn't exceed the image boundaries
    const clampedMinX = Math.max(minX, imageLeft);
    const clampedMinY = Math.max(minY, imageTop);
    const clampedMaxX = Math.min(maxX, imageRight);
    const clampedMaxY = Math.min(maxY, imageBottom);
    const cropWidth = clampedMaxX - clampedMinX;
    const cropHeight = clampedMaxY - clampedMinY;

    console.log({
      minX,
      minY,
      maxX,
      maxY,
      clampedMinX,
      clampedMinY,
      clampedMaxX,
      clampedMaxY,
      cropWidth,
      cropHeight,
    });

    if (cropWidth <= 0 || cropHeight <= 0) {
      alert('Invalid crop area!');
      return;
    }

    // Hide transformer handles before cropping
    if (transformerRef.current) {
      transformerRef.current.hide();
      transformerRef.current.getLayer().batchDraw();
    }

    // Crop using stage.toDataURL with the clamped region (coordinates in stage space)
    const dataURL = stageRef.current.toDataURL({
      x: clampedMinX,
      y: clampedMinY,
      width: cropWidth,
      height: cropHeight,
      pixelRatio: 3,
    });
    window.open(dataURL);

    if (transformerRef.current) {
      transformerRef.current.show();
      transformerRef.current.getLayer().batchDraw();
    }
  };

  // Toggle cropping mode:
  // • If not in cropping mode, clear any existing polygon points and enable mode.
  // • If in cropping mode, perform the crop and exit cropping mode.
  const toggleCropping = () => {
    if (!isCropping) {
      setPolygonPoints([]);
      setIsCropping(true);
    } else {
      performCrop();
      setIsCropping(false);
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Zoom: </label>
        <input type="range" min="0.1" max="5" step="0.01" value={zoom} onChange={handleZoomChange} />
        <span>{zoom.toFixed(2)}</span>
      </div>
      <Stage
        width={stageDimensions.width}
        height={stageDimensions.height}
        ref={stageRef}
        scaleX={zoom}
        scaleY={zoom}
        onClick={handleStageClick}
        onWheel={handleWheel}
        style={{ border: '1px solid grey' }}
      >
        <Layer>
          {/* The image is drawn with an offset (imagePosition) */}
          <Group>
            <Image image={img} x={imagePosition.x} y={imagePosition.y} draggable ref={imageRef} />
          </Group>
          <Transformer ref={transformerRef} />
          {/* Visualize the drawn crop polygon */}
          {polygonPoints.length > 0 && (
            <Line points={polygonPoints.flatMap((p) => [p.x, p.y])} stroke="red" strokeWidth={2} closed={false} />
          )}
          {polygonPoints.map((point, index) => (
            <Circle key={index} x={point.x} y={point.y} radius={4} fill="blue" />
          ))}
        </Layer>
      </Stage>
      {/* MUI Crop Icon Button to toggle cropping mode */}
      <button
        onClick={toggleCropping}
        style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        <CropIcon style={{ marginRight: '5px' }} />
        {isCropping ? 'Apply Crop' : 'Start Cropping'}
      </button>
    </div>
  );
};

export default ImageEditor;
