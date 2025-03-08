import CropIcon from '@mui/icons-material/Crop';
import React, { useEffect, useRef, useState } from 'react';
import { Circle, Group, Image, Layer, Line, Stage, Transformer } from 'react-konva';
import exampleImage from './../assets/6246_23_A_Ki67.png';

const ImageEditor = () => {
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const groupRef = useRef(null);
  const imageRef = useRef(null);
  const transformerRef = useRef(null);

  const [img, setImg] = useState(null);
  // Crop polygon points stored in the group's local coordinate system.
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 600 });
  // imagePosition holds the group's absolute position (initial centering).
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isCropping, setIsCropping] = useState(false);

  // Update stage dimensions based on container size.
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

  // Load the image.
  useEffect(() => {
    const imageObj = new window.Image();
    imageObj.src = exampleImage;
    imageObj.onload = () => {
      setImg(imageObj);
    };
  }, []);

  // Compute initial zoom and center the image on load.
  useEffect(() => {
    if (img && stageDimensions.width && stageDimensions.height) {
      const initialScale = Math.min(stageDimensions.width / img.width, stageDimensions.height / img.height);
      setZoom(initialScale);
      // Center the image by computing the group's position in stage coordinates.
      const x = (stageDimensions.width / initialScale - img.width) / 2;
      const y = (stageDimensions.height / initialScale - img.height) / 2;
      setImagePosition({ x, y });
    }
  }, [img, stageDimensions]);

  // Attach transformer to the image.
  useEffect(() => {
    if (transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [img]);

  // When cropping mode is active, record polygon points in the Group’s local coordinate system.
  const handleStageClick = (e) => {
    if (!isCropping) return;
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    // Use the group's absolute transform to convert the pointer from stage coordinates to local coordinates.
    const transform = groupRef.current.getAbsoluteTransform().copy();
    transform.invert();
    const relativePoint = transform.point(pointer);
    setPolygonPoints((prev) => [...prev, relativePoint]);
  };

  // Handle zoom slider change.
  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  // Handle mouse wheel zoom.
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

  // Compute bounding box from polygon points (local coordinates), clamp it to image boundaries,
  // then convert that bounding box to stage coordinates using the group's absolute transform.
  const performCrop = () => {
    if (polygonPoints.length === 0) {
      alert('No crop area defined!');
      return;
    }
    const xs = polygonPoints.map((p) => p.x);
    const ys = polygonPoints.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    // Clamp to image boundaries (local coordinates).
    const clampedMinX = Math.max(minX, 0);
    const clampedMinY = Math.max(minY, 0);
    const clampedMaxX = Math.min(maxX, img.width);
    const clampedMaxY = Math.min(maxY, img.height);
    const cropWidth = clampedMaxX - clampedMinX;
    const cropHeight = clampedMaxY - clampedMinY;

    if (cropWidth <= 0 || cropHeight <= 0) {
      alert('Invalid crop area!');
      return;
    }

    // Convert the top-left corner from local (group) coordinates to stage coordinates.
    const groupTransform = groupRef.current.getAbsoluteTransform();
    const topLeft = groupTransform.point({ x: clampedMinX, y: clampedMinY });

    console.log({
      local: { minX, minY, maxX, maxY, cropWidth, cropHeight },
      clamped: { clampedMinX, clampedMinY, clampedMaxX, clampedMaxY },
      absolute: topLeft,
    });

    // Hide transformer handles before cropping.
    if (transformerRef.current) {
      transformerRef.current.hide();
      transformerRef.current.getLayer().batchDraw();
    }

    const dataURL = stageRef.current.toDataURL({
      x: topLeft.x,
      y: topLeft.y,
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
          {/* The image and crop polygon are inside a draggable Group. */}
          <Group
            ref={groupRef}
            x={imagePosition.x}
            y={imagePosition.y}
            draggable
            onDragEnd={(e) => {
              setImagePosition(e.target.position());
            }}
          >
            <Image image={img} x={0} y={0} ref={imageRef} />
            {/* Draw the crop polygon inside the group */}
            {polygonPoints.length > 0 && (
              <Line points={polygonPoints.flatMap((p) => [p.x, p.y])} stroke="red" strokeWidth={2} closed={false} />
            )}
            {polygonPoints.map((point, index) => (
              <Circle key={index} x={point.x} y={point.y} radius={4} fill="blue" />
            ))}
          </Group>
          <Transformer ref={transformerRef} />
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
