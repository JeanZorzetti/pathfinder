import { useState, useRef } from "react";
import { Camera, Upload, X, Check, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { haptics } from "@/utils/haptics";
import { toast } from "sonner";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel?: () => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
}

export const CameraCapture = ({
  onCapture,
  onCancel,
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
}: CameraCaptureProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        haptics.success();
      }
    } catch (error) {
      console.error("Failed to access camera:", error);
      toast.error("Não foi possível acessar a câmera");
      haptics.error();
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Toggle between front and back camera
  const toggleCamera = async () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    haptics.light();
    setTimeout(startCamera, 100);
  };

  // Capture photo from camera
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        // Create file from blob
        const file = new File([blob], `photo-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        // Check file size
        if (file.size > maxSizeMB * 1024 * 1024) {
          toast.error(`Imagem muito grande (máx ${maxSizeMB}MB)`);
          haptics.error();
          return;
        }

        setCapturedFile(file);
        setPreview(URL.createObjectURL(file));
        stopCamera();
        haptics.impact();
      },
      "image/jpeg",
      0.9
    );
  };

  // Handle file input change (for upload button)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      toast.error("Formato de imagem não suportado");
      haptics.error();
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Imagem muito grande (máx ${maxSizeMB}MB)`);
      haptics.error();
      return;
    }

    setCapturedFile(file);
    setPreview(URL.createObjectURL(file));
    haptics.success();
  };

  // Confirm and upload
  const handleConfirm = () => {
    if (!capturedFile) return;
    haptics.success();
    onCapture(capturedFile);
  };

  // Reset state
  const handleReset = () => {
    setPreview(null);
    setCapturedFile(null);
    haptics.light();
  };

  // Cancel and close
  const handleCancel = () => {
    stopCamera();
    handleReset();
    haptics.light();
    onCancel?.();
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative bg-black aspect-[4/3] flex items-center justify-center">
        {/* Preview Mode */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        )}

        {/* Camera Mode */}
        {cameraActive && !preview && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Controls Overlay */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleCamera}
                className="bg-white/90 hover:bg-white"
              >
                <RotateCw className="w-5 h-5" />
              </Button>

              <Button
                size="lg"
                onClick={capturePhoto}
                className="w-16 h-16 rounded-full bg-white hover:bg-gray-100"
              >
                <div className="w-14 h-14 rounded-full border-4 border-gray-800" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={stopCamera}
                className="bg-white/90 hover:bg-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </>
        )}

        {/* Initial State (No camera, no preview) */}
        {!cameraActive && !preview && (
          <div className="text-center text-white p-8">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-6">Tire uma foto ou envie uma imagem</p>

            <div className="flex flex-col gap-3">
              <Button
                onClick={startCamera}
                className="bg-white text-black hover:bg-gray-100"
              >
                <Camera className="w-5 h-5 mr-2" />
                Abrir Câmera
              </Button>

              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Upload className="w-5 h-5 mr-2" />
                Escolher Arquivo
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats.join(",")}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* Action Buttons (when preview is shown) */}
      {preview && (
        <div className="p-4 flex items-center justify-between gap-3 bg-white dark:bg-gray-800">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-2" />
            Refazer
          </Button>

          <Button
            onClick={handleConfirm}
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-2" />
            Confirmar
          </Button>
        </div>
      )}

      {/* Cancel Button (always visible at bottom) */}
      {(cameraActive || preview) && (
        <div className="p-4 border-t dark:border-gray-700">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="w-full"
          >
            Cancelar
          </Button>
        </div>
      )}
    </Card>
  );
};
