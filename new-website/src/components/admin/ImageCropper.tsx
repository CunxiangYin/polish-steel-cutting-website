'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';
import {
  CROP_PRESETS,
  getCroppedImage,
  getCroppedAndResizedImage,
  getMimeType,
  getExtensionFromMime,
  type CropPreset,
} from '@/utils/admin/imageCrop';

interface ImageCropperProps {
  imageSrc: string;
  file: File | null;
  category: string;
  onCropComplete: (croppedBlob: Blob, dimensions: { width: number; height: number }) => void;
  onCancel: () => void;
}

export default function ImageCropper({
  imageSrc,
  file,
  category,
  onCropComplete,
  onCancel,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>(category || 'products');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useRecommendedSize, setUseRecommendedSize] = useState(true);

  const currentPreset = CROP_PRESETS[selectedPreset] || CROP_PRESETS.other;

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;

    setIsProcessing(true);

    try {
      const mimeType = getMimeType(file);
      let blob: Blob;
      let finalWidth: number;
      let finalHeight: number;

      if (useRecommendedSize && currentPreset.recommendedWidth > 0) {
        // Resize to recommended dimensions
        blob = await getCroppedAndResizedImage(
          imageSrc,
          croppedAreaPixels,
          currentPreset.recommendedWidth,
          currentPreset.recommendedHeight,
          mimeType
        );
        finalWidth = currentPreset.recommendedWidth;
        finalHeight = currentPreset.recommendedHeight;
      } else {
        // Keep original crop dimensions
        blob = await getCroppedImage(imageSrc, croppedAreaPixels, mimeType);
        finalWidth = croppedAreaPixels.width;
        finalHeight = croppedAreaPixels.height;
      }

      onCropComplete(blob, { width: finalWidth, height: finalHeight });
    } catch (error) {
      console.error('Crop error:', error);
      alert('裁剪失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePresetChange = (preset: string) => {
    setSelectedPreset(preset);
    // Reset zoom when changing preset
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 transition-opacity"
        onClick={onCancel}
      />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-2xl bg-white shadow-xl rounded-xl z-10 max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">图片裁剪</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cropper Area */}
        <div className="relative bg-gray-900" style={{ height: '400px' }}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={currentPreset.aspect || undefined}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteCallback}
            onZoomChange={setZoom}
            showGrid={true}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
              },
            }}
          />
        </div>

        {/* Controls */}
        <div className="px-6 py-4 space-y-4 bg-gray-50">
          {/* Preset Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">裁剪比例</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CROP_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => handlePresetChange(key)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    selectedPreset === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom Control */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">缩放</label>
              <span className="text-sm text-gray-500">{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Output Size Options */}
          {currentPreset.recommendedWidth > 0 && (
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
              <div>
                <div className="text-sm font-medium text-gray-700">输出尺寸</div>
                <div className="text-xs text-gray-500">
                  {useRecommendedSize
                    ? `${currentPreset.recommendedWidth} x ${currentPreset.recommendedHeight} px (推荐)`
                    : croppedAreaPixels
                    ? `${Math.round(croppedAreaPixels.width)} x ${Math.round(croppedAreaPixels.height)} px (原始)`
                    : '选择区域后显示'}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600">使用推荐尺寸</span>
                <input
                  type="checkbox"
                  checked={useRecommendedSize}
                  onChange={(e) => setUseRecommendedSize(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
            </div>
          )}

          {/* Crop Info */}
          {croppedAreaPixels && (
            <div className="text-xs text-gray-500 text-center">
              选中区域: {Math.round(croppedAreaPixels.width)} x {Math.round(croppedAreaPixels.height)} px
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing || !croppedAreaPixels}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                处理中...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                确认裁剪
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
