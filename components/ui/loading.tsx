"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: {
    width: 40,
    height: 40,
    containerClass: "h-16 w-16"
  },
  md: {
    width: 60,
    height: 60,
    containerClass: "h-24 w-24"
  },
  lg: {
    width: 80,
    height: 80,
    containerClass: "h-32 w-32"
  }
}

export function Loading({ className, size = "md" }: LoadingProps) {
  const { width, height, containerClass } = sizeMap[size]

  return (
    <div className={cn(
      "flex items-center justify-center w-full h-full min-h-[100px]",
      className
    )}>
      <div className={cn(
        "relative flex items-center justify-center",
        containerClass
      )}>
        <Image
          src="/images/logo-black.svg"
          alt="Loading"
          width={width}
          height={height}
          className="animate-pulse dark:invert"
          priority
        />
      </div>
    </div>
  )
}
