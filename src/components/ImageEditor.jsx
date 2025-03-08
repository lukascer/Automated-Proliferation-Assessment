import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CropIcon from '@mui/icons-material/Crop';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Circle, Group, Image, Layer, Line, Stage, Transformer } from 'react-konva';
import DetailPreview from './DetailPreview';
import EvaluatingForm from './EvaluatingForm';
import ImageUpload from './ImageUpload';
import MeasurementsTable from './MeasurementsTable';
import { useSidebar } from './SidebarContext';

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
  // imagePosition holds the group's absolute position.
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isCropping, setIsCropping] = useState(false);

  const [croppedImage, setCroppedImage] = useState(null);

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
  // useEffect(() => {
  //   const imageObj = new window.Image();
  //   imageObj.src = exampleImage;
  //   imageObj.onload = () => {
  //     setImg(imageObj);
  //   };
  // }, []);

  const handleImageUpload = (newImgSrc) => {
    console.log('handleImageUpload: ', newImgSrc);

    // const formData = new FormData();
    // formData.append('image', newImgSrc);

    const imageUrl = URL.createObjectURL(newImgSrc);
    const imageObj = new window.Image();
    imageObj.src = imageUrl;
    imageObj.onload = () => {
      console.log('imageObj: ', imageObj);
      setImg(imageObj);

      // Revoke the object URL to free up memory once done
      URL.revokeObjectURL(imageUrl);
    };
  };

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

  // When cropping mode is active, record polygon points in the Group’s local coordinates.
  const handleStageClick = (e) => {
    if (!isCropping) return;
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    // Convert the pointer from stage coordinates to the group's local coordinates.
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

  const dataURLToBlob = (dataURL) => {
    const parts = dataURL.split(',');
    const mime = parts[0].match(/:(.*?);/)[1];
    const bstr = atob(parts[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Compute bounding box from polygon points (local coordinates), create a clipping mask on an offscreen canvas, and crop.
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
    const cropWidth = maxX - minX;
    const cropHeight = maxY - minY;

    if (cropWidth <= 0 || cropHeight <= 0) {
      alert('Invalid crop area!');
      return;
    }

    // Create an offscreen canvas.
    const canvas = document.createElement('canvas');
    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');

    // Create a clipping path using the crop polygon (adjusting for the bounding box offset).
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x - minX, polygonPoints[0].y - minY);
    for (let i = 1; i < polygonPoints.length; i++) {
      ctx.lineTo(polygonPoints[i].x - minX, polygonPoints[i].y - minY);
    }
    ctx.closePath();
    ctx.clip();

    // Draw the image onto the canvas; offset by -minX and -minY.
    ctx.drawImage(img, -minX, -minY);

    const dataURL = canvas.toDataURL('image/png');
    // Convert the dataURL to a Blob and then create a Blob URL.
    const blob = dataURLToBlob(dataURL);
    const blobUrl = URL.createObjectURL(blob);
    // window.open(blobUrl);

    setCroppedImage(blobUrl);
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

  const { setOpenSidebar } = useSidebar();

  return (
    <Box>
      <Box ref={containerRef} sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', gap: '20px', alignContent: 'center', alignItems: 'center' }}>
          <Button onClick={() => setOpenSidebar((prev) => !prev)}>Toggle Sidebar</Button>
          <Box sx={{ marginBottom: '10px' }}>
            <label>Zoom: </label>
            <input type="range" min="0.1" max="5" step="0.01" value={zoom} onChange={handleZoomChange} />
            <span>{zoom.toFixed(2)}</span>
          </Box>

          {/* MUI Crop Icon Button to toggle cropping mode */}
          <button
            onClick={toggleCropping}
            style={{
              marginBottom: '13px',
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

          <Box sx={{ mb: '5px' }}>
            <PlaceIcon fontSize="large" sx={{ mb: '2px' }} />
            <AttachEmailIcon fontSize="large" sx={{ ml: 1.2 }} />
            <CloudDownloadIcon fontSize="large" sx={{ mb: '1px', ml: 2 }} />
          </Box>
        </Box>

        {!img ? (
          <ImageUpload
            onImageUpload={handleImageUpload}
            sx={{
              width: stageDimensions.width,
              height: stageDimensions.height,
            }}
          />
        ) : (
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
              {/* The Group for the image and crop polygon is draggable.
              Its onDragEnd updates imagePosition, and all crop points are stored relative to it. */}
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
                {polygonPoints.length > 0 && (
                  <>
                    {/* Filled polygon with red color and 0.3 opacity */}
                    <Line points={polygonPoints.flatMap((p) => [p.x, p.y])} fill="red" closed={true} opacity={0.3} />
                    {/* Stroke for the polygon */}
                    <Line
                      points={polygonPoints.flatMap((p) => [p.x, p.y])}
                      stroke="red"
                      strokeWidth={2}
                      closed={true}
                    />
                  </>
                )}
                {polygonPoints.map((point, index) => (
                  <Circle key={index} x={point.x} y={point.y} radius={4} fill="blue" />
                ))}
              </Group>
              <Transformer ref={transformerRef} />
            </Layer>
          </Stage>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          maxWidth: '100%',
          width: '100%',
          height: '200px',
          margin: '10px 0',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ border: '1px solid grey', borderRight: 'none', width: '50%' }}>
          {croppedImage && <DetailPreview image={croppedImage} sx={{ width: '100%', height: '100%' }} />}
        </Box>
        <Box sx={{ border: '1px solid grey', width: '50%' }}>
          {croppedImage && (
            <DetailPreview
              image={croppedImage}
              highlightArea={{
                x: '150px',
                y: '30px',
                width: '50px',
                height: '30px',
              }}
              sx={{
                marginLeft: '50px',
                width: '100%',
                height: '100%',
              }}
            />
          )}
        </Box>
      </Box>

      {croppedImage ? (
        <>
          <Box component="h2" textAlign="center">
            Cells details
          </Box>
          <MeasurementsTable />
          <EvaluatingForm />
        </>
      ) : null}
    </Box>
  );
};

export default ImageEditor;
