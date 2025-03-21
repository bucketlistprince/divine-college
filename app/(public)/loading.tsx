import { Loading } from "@/components/ui/loading"

export default function PublicLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <Loading size="lg" />
    </div>
  )
}
