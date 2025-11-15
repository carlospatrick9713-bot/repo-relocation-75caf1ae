import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, ZoomIn, ZoomOut, X } from "lucide-react";
import { useState } from "react";
import mapImage from "@/assets/rio-pois-map.png";

export function ZoomableMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.3, 0.5));
  const resetZoom = () => setZoom(1);

  return (
    <>
      <Card className="relative overflow-hidden group cursor-pointer" onClick={() => setIsFullscreen(true)}>
        <div className="relative">
          <img 
            src={mapImage} 
            alt="Mapa turístico do Rio de Janeiro"
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="lg" variant="secondary">
              <Maximize2 className="mr-2 h-5 w-5" />
              Ver em tela cheia
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 overflow-hidden">
          <div className="relative w-full h-[95vh] bg-background flex flex-col">
            {/* Controls */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                onClick={handleZoomIn}
                className="shadow-lg"
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={handleZoomOut}
                className="shadow-lg"
              >
                <ZoomOut className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={resetZoom}
                className="shadow-lg"
              >
                1:1
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setIsFullscreen(false)}
                className="shadow-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Zoomable Image */}
            <div className="flex-1 overflow-auto">
              <div className="min-w-full min-h-full flex items-center justify-center p-8">
                <img
                  src={mapImage}
                  alt="Mapa turístico do Rio de Janeiro"
                  className="transition-transform duration-200"
                  style={{ 
                    transform: `scale(${zoom})`,
                    transformOrigin: 'center center'
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
