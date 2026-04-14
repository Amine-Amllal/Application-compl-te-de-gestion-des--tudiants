import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"

import Button from "../ui/Button"

export default function DeleteModal({ isOpen, studentName, onCancel, onConfirm, loading }) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
            initial={{ y: 12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <ExclamationTriangleIcon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Confirmer la suppression</h3>
            <p className="mt-2 text-sm text-slate-600">
              Voulez-vous vraiment supprimer <span className="font-semibold text-slate-900">{studentName}</span> ?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={onCancel}>
                Annuler
              </Button>
              <Button variant="danger" loading={loading} onClick={onConfirm}>
                Supprimer
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
