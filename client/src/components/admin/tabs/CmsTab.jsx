import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import api from '../../../lib/api';

import HeroBannerForm    from '../cms/HeroBannerForm';
import PromoBannerForm   from '../cms/PromoBannerForm';
import AnnouncementForm  from '../cms/AnnouncementForm';

/**
 * CmsTab — Manage homepage hero, promotional banner, and global site alert.
 * Settings are persisted in the app_settings PostgreSQL table via /api/settings.
 */
export default function CmsTab() {
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState('');   // tracks which section is saving

  const [hero, setHero] = useState({
    headline: 'Your Pet Deserves the Best',
    subtext:  'From premium food to fun toys — everything your pet needs.',
    ctaLabel: 'Shop Now',
    badge:    'Get 50% Off',
  });

  const [promo, setPromo] = useState({
    enabled:  true,
    message:  'Free shipping on all orders above Rs 500!',
    bgColor:  '#bf6f3a',
  });

  const [announcement, setAnnouncement] = useState({
    enabled: false,
    message: 'We are temporarily closed on public holidays.',
    type:    'info',
  });

  /* ── Fetch on mount ── */
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        if (res.data.cms_hero)         setHero(res.data.cms_hero);
        if (res.data.cms_promo)        setPromo(res.data.cms_promo);
        if (res.data.cms_announcement) setAnnouncement(res.data.cms_announcement);
      } catch (err) {
        // Non-critical — defaults are shown instead
        console.error('CMS fetch error:', err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  /* ── Save helpers ── */
  const saveSection = async (key, data, label) => {
    setSaving(key);
    try {
      await api.put(`/settings/${key}`, data);
      toast.success(`${label} saved!`);
    } catch (err) {
      // Log the real server error so it's visible in the browser console
      const serverMsg = err?.response?.data?.error || err.message;
      console.error(`CMS save error [${key}]:`, serverMsg);
      toast.error(`Error saving ${label} — ${serverMsg}`);
    } finally {
      setSaving('');
    }
  };

  const handleSaveHero         = (e) => { e.preventDefault(); saveSection('cms_hero',         hero,         'Hero'); };
  const handleSavePromo        = (e) => { e.preventDefault(); saveSection('cms_promo',        promo,        'Promo'); };
  const handleSaveAnnouncement = (e) => { e.preventDefault(); saveSection('cms_announcement', announcement, 'Announcement'); };

  if (loading) return (
    <div className="p-8 flex justify-center">
      <Loader2 className="animate-spin text-slate-400" />
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300 max-w-6xl">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        <HeroBannerForm
          hero={hero}
          setHero={setHero}
          onSubmit={handleSaveHero}
          saving={saving === 'cms_hero'}
        />
        <div className="space-y-6">
          <PromoBannerForm
            promo={promo}
            setPromo={setPromo}
            onSubmit={handleSavePromo}
            saving={saving === 'cms_promo'}
          />
          <AnnouncementForm
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            onSubmit={handleSaveAnnouncement}
            saving={saving === 'cms_announcement'}
          />
        </div>
      </div>
    </div>
  );
}
