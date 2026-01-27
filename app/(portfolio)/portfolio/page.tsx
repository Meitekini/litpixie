import Portfolio from '@/components/shared/portfolio'
import React from 'react'
import { sampleImages } from "@/types";

export default function Page() {
  return (
    <div>
      <Portfolio gallery={sampleImages} />

    </div>
  )
}
