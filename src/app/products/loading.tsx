import { Card, CardContent, CardHeader } from "_/components/ui/card"
import { Skeleton } from "_/components/ui/skeleton"

export default function SkeletonCard() {
  return (
   <div className="flex flex-row gap-6 py-5 px-4">
     <Card className="w-full max-w-lg">
        <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
    
    </Card>





<div className="flex w-full max-w-xs flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-full" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>









   </div>










  )
}
