import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function EmptyState() {
  return (
    <div className="flex p-5 items-center flex-col mt-10 border-2 border-dashed py-24">
      <h2>You Dont Have Any Short Video Created</h2>
      <Link href={"/dashboard/create-new"}>
        <Button>Create New Short Video</Button>
      </Link>
    </div>
  );
}

export default EmptyState;
