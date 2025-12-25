import { Phone, MessageCircle, MapPin, Instagram } from 'lucide-react'

export default function ContactBar({ phone, whatsapp, instagram, mapUrl, googleMapsId }) {
  if (!phone && !whatsapp && !instagram && !mapUrl && !googleMapsId) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center gap-2 sm:gap-4 flex-wrap">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <Phone size={18} />
            <span className="hidden sm:inline">Call</span>
          </a>
        )}
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500 transition"
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        )}
        {instagram && (
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
          >
            <Instagram size={18} />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        )}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <MapPin size={18} />
            <span className="hidden sm:inline">Maps</span>
          </a>
        )}
      </div>
    </div>
  )
}
