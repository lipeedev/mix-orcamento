interface ItemSelectModalProps {
  onClose: () => void
}

export function ItemSelectModal({ onClose }: ItemSelectModalProps) {

  return (
    <div onClick={() => onClose()} className="flex justify-center backdrop-blur-xs items-center fixed inset-0 bg-zinc-900/50 min-h-screen overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      <h1 onClick={e => e.stopPropagation()}
        className="animate-in transition-all fade-in duration-200 p-4 bg-blue-500">teste</h1>
    </div>
  )
}
