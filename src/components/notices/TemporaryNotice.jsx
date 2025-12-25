import Modal from '../ui/Modal'
import { TEMPORARY_NOTICE_TEXT } from '../../utils/constants'

export default function TemporaryNotice({ isOpen, onClose, ownerEmail = null }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Page Under Review" size="sm">
      <div className="space-y-4">
        <p className="text-gray-700">{TEMPORARY_NOTICE_TEXT}</p>
        {ownerEmail && (
          <p className="text-sm text-gray-600">
            Contact admin:{' '}
            <a href={`mailto:burhan@kashpages.in`} className="text-primary hover:underline">
              burhan@kashpages.in
            </a>
          </p>
        )}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          Understood
        </button>
      </div>
    </Modal>
  )
}
