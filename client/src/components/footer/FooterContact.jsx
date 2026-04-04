import { Mail, Phone, MapPin } from 'lucide-react';

export default function FooterContact() {
  const CONTACT = [
    { icon: MapPin, text: 'Thamel, Kathmandu, Nepal' },
    { icon: Phone, text: '+977 01-4567890' },
    { icon: Mail, text: 'support@pawmart.com' },
  ];

  return (
    <div>
      <h4 className="text-white font-black text-xs uppercase tracking-widest mb-6">Contact Us</h4>
      <ul className="space-y-4 text-sm font-medium">
        {CONTACT.map(({ icon: Icon, text }, i) => (
          <li key={i} className="flex items-start gap-3">
            <Icon size={16} className="text-[#bf6f3a] mt-0.5 shrink-0" />
            <span className="text-[#a89880] hover:text-white transition-colors">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
