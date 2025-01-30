"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { eq } from "drizzle-orm";

const PlayerDialog = ({ playVideo, videoId }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();

  useEffect(() => {
    setOpenDialog(playVideo);
    videoId && GetVideoData();
  }, [playVideo]);

  const GetVideoData = async() => {
    const result = await db.select().from(VideoData).where(eq(VideoData.id, videoId));

    console.log(result)
    setVideoData(result[0]);
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="bg-white">
        <DialogHeader className="flex bg-white flex-col items-center">
          <DialogTitle className="text-3xl font-bold my-5">
            Your Video is Ready
          </DialogTitle>
          <DialogDescription>
            <Player
              component={RemotionVideo}
              durationInFrames={120}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              inputProps={{
                ...videoData
              }}
            />
            <div className="flex gap-10">
                <Button variant="ghost">Cancel</Button>
                <Button>Export</Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
