"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { SkeletonCard } from "@/components/skeleton-card";
import { getImageUrl } from "@/lib/utils";
import { formatDistance } from "date-fns";


export default function Dashboard() {

    const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);
    const sortedThumbnails = [...(thumbnails ?? [])].reverse();

    return (
        <div className="pt-12">
        <h1 className="text-center text-4xl font-bold mb-12">
          Your Thumbnail Tests
        </h1>
  
        {thumbnails === undefined && (
        <div className="animate-pulse mb-12 mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}
  
      
  
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sortedThumbnails?.map((thumbnail) => {
            return (
              <Card key={thumbnail._id}>
                <CardHeader>
                  <Image
                    src={getImageUrl(thumbnail.aImage)}
                    width="600"
                    height="600"
                    alt="thumbnail image"
                  />
                </CardHeader>
                <CardContent>
                  <p>{thumbnail.title}</p>
                  <p>
                    {formatDistance(
                      new Date(thumbnail._creationTime),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                  <p>votes: {thumbnail.aVotes + thumbnail.bVotes}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href={`/thumbnails/${thumbnail._id}`}>
                      View Results
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    )
}