import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import Button from "./Button"; // Adjust path as needed

export default function TrailerDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <Button
            label={
              <>
                <Play className="w-5 h-5 mr-2 inline-block" />
                Watch Trailer
              </>
            }
            action={() => setIsOpen(true)}
            className="group !bg-[#4BE41A] border-none"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
        <div className="relative aspect-video w-full">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video iframe */}
          <iframe
            src="https://www.youtube.com/embed/PkZtVBNkmso"
            title="Movie Trailer"
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
