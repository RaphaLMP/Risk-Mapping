import { Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function ConfirmPopup({
  position,   // { lat, lng } | null
  value,      // string
  onChange,   // (v: string) => void
  onConfirm,  // () => void
  onCancel,   // () => void
  onClose,    // () => void
  options = ["Tempestade", "Alagamento", "Enchente", "Incêndio"],
}) {
  if (!position) return null;

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // Desabilita propagação de clique e scroll do conteúdo do popup para o mapa
      L.DomEvent.disableClickPropagation(contentRef.current);
      L.DomEvent.disableScrollPropagation(contentRef.current);
    }
  }, []);

  const handleConfirm = (e) => {
    e.stopPropagation(); // NÃO dá preventDefault
    onConfirm?.();
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    onCancel?.();
  };

  return (
    <Popup
      position={position}
      closeOnClick={false}
      closeButton={true}
      eventHandlers={{
        // Quando fecha pelo "X"
        remove: () => onClose?.(),
      }}
    >
      <div ref={contentRef} className="min-w-[220px]">
        <p className="font-semibold mb-2">Selecione o tipo antes de criar o pin:</p>

        <label className="block mb-3">
          <span className="text-sm">Tipo</span>
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="block w-full border rounded mt-1 px-2 py-1"
            // Sem onMouseDown / onMouseUp / preventDefault
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <div className="flex gap-2">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 text-white rounded px-3 py-1"
          >
            Confirmar
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white rounded px-3 py-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Popup>
  );
}