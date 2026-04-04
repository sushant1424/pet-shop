import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../../lib/api';

import HeroBannerForm from '../cms/HeroBannerForm';
import PromoBannerForm from '../cms/PromoBannerForm';
import AnnouncementForm from '../cms/AnnouncementForm';

/**
 * CmsTab Component
 * Handles the management of homepage content, seasonal promos, and global site alerts.
 */
export default function CmsTab() {
  const [loading, setLoading] = useState(true);
  const [hero, setHero] = useState({
    headline: 'Your Pet Deserves the Best',
    subtext: 'From premium food to fun toys — everything your pet needs.',
    ctaLabel: 'Shop Now',
    badge: 'Get 50% Off',
  });

  const [promo, setPromo] = useState({
    enabled: true,
    message: 'Free shipping on all orders above Rs 500!',
    bgColor: '#bf6f3a',
  });

  const [announcement, setAnnouncement] = useState({
    enabled: false,
    message: 'We are temporarily closed on public holidays.',
    type: 'info',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.cms_hero) setHero(res.data.cms_hero);
        if (res.data.cms_promo) setPromo(res.data.cms_promo);
        if (res.data.cms_announcement) setAnnouncement(res.data.cms_announcement);
      } catch (err) {
        console.error('CMS settings fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveHero = async (e) => { 
    e.preventDefault(); 
    try { await api.put('/settings/cms_hero', hero); toast.success('Hero saved!'); } 
    catch { toast.error('Error saving hero content'); }
  };
  const handleSavePromo = async (e) => { 
    e.preventDefault(); 
    try { await api.put('/settings/cms_promo', promo); toast.success('Promo saved!'); } 
    catch { toast.error('Error saving promo banner'); }
  };
  const handleSaveAnnouncement = async (e) => { 
    e.preventDefault(); 
    try { await api.put('/settings/cms_announcement', announcement); toast.success('Announcement saved!'); }
    catch { toast.error('Error saving alert message'); }
  };

  if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>;

  return (
    <div className="animate-in fade-in duration-300 max-w-6xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <HeroBannerForm hero={hero} setHero={setHero} onSubmit={handleSaveHero} />
        <div className="space-y-6">
          <PromoBannerForm promo={promo} setPromo={setPromo} onSubmit={handleSavePromo} />
          <AnnouncementForm announcement={announcement} setAnnouncement={setAnnouncement} onSubmit={handleSaveAnnouncement} />
        </div>
      </div>
    </div>
  );
}
