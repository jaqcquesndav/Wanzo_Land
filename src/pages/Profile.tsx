import { useState, useRef } from 'react';
import { UserCircle } from 'lucide-react';

// Simule la récupération du profil utilisateur depuis localStorage
function getUserProfile() {
  const stored = localStorage.getItem('auth0_user');
  return stored ? JSON.parse(stored) : {};
}

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(() => getUserProfile());
  const [photo, setPhoto] = useState(profile.picture || '');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Champs du profil (optionnels)
  const [fields, setFields] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    role: (profile.roles && profile.roles[0]) || profile['https://ksuit.app/roles']?.[0] || '',
    address: profile.address || '',
    idNumber: profile.idNumber || '',
    idStatus: profile.idStatus || '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        if (ev.target && typeof ev.target.result === 'string') setPhoto(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSave() {
    setProfile({ ...profile, ...fields, picture: photo });
    setEditMode(false);
    // Ici, on pourrait aussi sauvegarder dans localStorage ou via API
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 mt-8 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {photo ? (
            <img src={photo} alt="Profil" className="w-28 h-28 rounded-full object-cover border-2 border-primary" />
          ) : (
            <UserCircle className="w-28 h-28 text-gray-300" />
          )}
          {editMode && (
            <button
              className="absolute bottom-2 right-2 bg-primary text-white rounded-full p-2 shadow hover:bg-primary-dark"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Changer la photo"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 7a5 5 0 100 10 5 5 0 000-10zm-7 5a7 7 0 1114 0 7 7 0 01-14 0zm7-9a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm8 8a1 1 0 110 2h-2a1 1 0 110-2h2zm-8 8a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-8-8a1 1 0 110 2H3a1 1 0 110-2h2z"/></svg>
              <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handlePhotoChange} />
            </button>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Profil utilisateur</h2>
      </div>
      <form className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom complet</label>
          {editMode ? (
            <input name="name" value={fields.name} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.name || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
          {editMode ? (
            <input name="email" value={fields.email} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.email || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          {editMode ? (
            <input name="phone" value={fields.phone} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.phone || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fonction (Rôle)</label>
          {editMode ? (
            <input name="role" value={fields.role} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.role || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Adresse</label>
          {editMode ? (
            <input name="address" value={fields.address} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.address || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">N° Pièce d'identité</label>
          {editMode ? (
            <input name="idNumber" value={fields.idNumber} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.idNumber || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Statut Pièce d'identité</label>
          {editMode ? (
            <input name="idStatus" value={fields.idStatus} onChange={handleChange} className="mt-1 w-full rounded border-gray-300 focus:border-primary" />
          ) : (
            <div className="mt-1 text-gray-900">{fields.idStatus || <span className="text-gray-400">Non renseigné</span>}</div>
          )}
        </div>
      </form>
      <div className="mt-8 flex justify-end gap-4">
        {editMode ? (
          <>
            <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={() => setEditMode(false)}>Annuler</button>
            <button type="button" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark" onClick={handleSave}>Enregistrer</button>
          </>
        ) : (
          <button type="button" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark" onClick={() => setEditMode(true)}>Modifier le profil</button>
        )}
      </div>
    </div>
  );
}
