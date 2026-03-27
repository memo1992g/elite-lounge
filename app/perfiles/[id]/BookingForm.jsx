'use client';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { trackWhatsAppClick } from '@/app/lib/analytics';

export default function BookingForm({ item }) {
  console.log("🧾 BookingForm recibió item:", item);
  console.log("💰 Precio recibido:", item?.price);
  const CURRENCY = 'USD $';
  const RATE_PER_HOUR = item?.price ?? 60; // ✅ usa el precio del perfil
  const TIME_SLOTS = [
    '18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30',
    '22:00','22:30','23:00','23:30','00:00','00:30','01:00','01:30','02:00'
  ];
  const DURATION_OPTIONS = Array.from({ length: 10 }, (_, i) => (i + 1) * 0.5);

  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState('');
  const [hours, setHours] = React.useState('1');
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [note, setNote] = React.useState('');

  const isValid = date && time && parseFloat(hours) > 0;

  const labelFromHours = (h) => {
    const whole = Math.floor(h);
    const half = Math.abs(h - whole) > 0.001;
    if (h === 0.5) return '30 min';
    if (!half) return `${whole} ${whole === 1 ? 'hora' : 'horas'}`;
    return `${whole} h 30 min`;
  };

  const total = parseFloat(hours) * RATE_PER_HOUR;

  const buildMessage = () =>
`Hola ${item.name}, quiero reservar:
• Fecha: ${date ? date.toLocaleDateString('es-SV') : ''}
• Hora: ${time}
• Duración: ${labelFromHours(parseFloat(hours))}
• Precio estimado: ${CURRENCY}${total.toFixed(2)}
${name ? '• Nombre: ' + name + '\n' : ''}${phone ? '• Tel: ' + phone + '\n' : ''}${note ? '• Nota: ' + note + '\n' : ''}— Confirmación sujeta a disponibilidad. Zona: San Salvador (UTC-6).`;

  const waHref =
    'https://wa.me/' +
    ("+50375569960"|| "").replace(/\D/g, '') +
    (isValid ? '?text=' + encodeURIComponent(buildMessage()) : '');

  return (
    <div className="mt-8 rounded-2xl border border-white/10 p-4">
      <h4 className="text-lg font-semibold mb-1">Agendar por horas</h4>
      {/* 👇 mostramos la tarifa por hora */}
      <p className="text-sm text-zinc-400 mb-3">
        Tarifa: <span className="text-amber-300 font-semibold">{CURRENCY}{RATE_PER_HOUR.toFixed(2)} / hora</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Fecha con calendario */}
        <label className="text-sm text-zinc-300 w-full">
          Fecha
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            placeholderText="Selecciona una fecha"
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            calendarClassName="bg-zinc-900 text-white rounded-xl border border-white/10 p-2"
            wrapperClassName="w-full"
          />
        </label>

        {/* Hora */}
        <label className="text-sm text-zinc-300">
          Hora
          <select
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          >
            <option value="">Selecciona</option>
            {TIME_SLOTS.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </label>

        {/* Duración */}
        <label className="text-sm text-zinc-300">
          Duración
          <select
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
            value={hours}
            onChange={(e)=>setHours(e.target.value)}
          >
            {DURATION_OPTIONS.map(h => (
              <option key={h} value={h}>{labelFromHours(h)}</option>
            ))}
          </select>
        </label>

        {/* Precio */}
        <div className="text-sm text-zinc-300">
          <span className="block">Precio estimado</span>
          <div className="mt-1 rounded-xl bg-black/30 border border-white/10 px-3 py-2">
            <p className="font-medium">
              {CURRENCY}{total.toFixed(2)}
              <span className="text-xs text-zinc-400">
                {' '}({labelFromHours(parseFloat(hours))} × {CURRENCY}{RATE_PER_HOUR.toFixed(2)}/hora)
              </span>
            </p>
          </div>
        </div>

        {/* Nombre */}
        <label className="text-sm text-zinc-300">
          Nombre (opcional)
          <input
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
            placeholder="Tu nombre"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </label>

        {/* Teléfono */}
        <label className="text-sm text-zinc-300">
          Teléfono (opcional)
          <input
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
            placeholder="+503 ..."
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
        </label>

        {/* Nota */}
        <label className="text-sm text-zinc-300 sm:col-span-2">
          Nota (opcional)
          <textarea
            className="mt-1 block w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm"
            rows={2}
            placeholder="Requerimientos especiales, salón, etc."
            value={note}
            onChange={(e)=>setNote(e.target.value)}
          />
        </label>
      </div>

      {/* Botón */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={isValid ? waHref : undefined}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (!isValid) return;
            trackWhatsAppClick({
              source: 'profile_booking_form',
              phone: item?.wa ?? '+50375569960',
              label: 'Confirmar por WhatsApp',
            });
          }}
          className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium shadow transition border border-white/10 ${isValid ? 'bg-white text-black hover:shadow-md' : 'bg-white/10 text-zinc-400 cursor-not-allowed'}`}
        >
          {isValid ? 'Confirmar por WhatsApp' : 'Completa fecha y hora'}
        </a>
        <p className="text-xs text-zinc-500">
          Zona horaria: América/El_Salvador (UTC−06:00). Reservas sujetas a confirmación.
        </p>
      </div>
    </div>
  );
}
