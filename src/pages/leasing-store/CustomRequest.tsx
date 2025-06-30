import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../components/ui/Container';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, FileText } from 'lucide-react';
import { categories } from '../../components/leasing-store/filters/categories';

export function CustomRequest() {
  const [formData, setFormData] = useState({
    requestType: 'leasing',
    leasingCode: '',
    equipmentType: '',
    description: '',
    budget: '',
    timeline: '',
    specifications: '',
    deliveryAddress: '',
    message: '',
  });

  const [filePreviews, setFilePreviews] = useState<{ url: string; isPdf: boolean; name: string }[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach((file) => {
        const isPdf = file.type === 'application/pdf';
        const reader = new FileReader();
        const preview = { url: '', isPdf, name: file.name };
        reader.onload = () => {
          preview.url = reader.result as string;
          setFilePreviews((prev) => [...prev, preview]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleFileDelete = (fileName: string) => {
    setFilePreviews((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleBrowseFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.requestType === 'leasing' && (!formData.leasingCode || !/^WL-\w{8}$/.test(formData.leasingCode))) {
      alert('Veuillez saisir un code de leasing valide (WL-XXXXXXXX).');
      return;
    }
    console.log('Custom request submitted:', formData);
    console.log('Uploaded files:', filePreviews);
    // TODO: Implement submission logic
  };

  return (
    <PageContainer>
      <div className="bg-white">
        <Container className="py-16 flex justify-center">
          <div className="w-full max-w-2xl">
            <Link
              to="/leasing-store"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la boutique
            </Link>

            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Demande personnalisée
              </h1>
              <p className="mt-4 text-gray-600">
                Décrivez vos besoins et nous vous aiderons à trouver la meilleure solution.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de demande
                    </label>
                    <select
                      value={formData.requestType}
                      onChange={e => setFormData({ ...formData, requestType: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    >
                      <option value="leasing">Leasing</option>
                      <option value="location">Location simple</option>
                      <option value="achat">Achat échelonné</option>
                    </select>
                  </div>

                  {/* Code de leasing et message Wanzo si leasing */}
                  {formData.requestType === 'leasing' && (
                    <>
                      <div className="mb-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm rounded">
                        Vous devez avoir un <b>compte Wanzo actif</b> pour passer une commande de leasing.<br />
                        Le <b>code de leasing</b> est généré dans l’app mobile ou l’app Financement PME.<br />
                        Exemple de code : <span className="font-mono">WL-XXXXXXXX</span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Code de leasing <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.leasingCode}
                          onChange={e => setFormData({ ...formData, leasingCode: e.target.value.toUpperCase() })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary font-mono"
                          placeholder="WL-XXXXXXXX"
                          required={formData.requestType === 'leasing'}
                          maxLength={11}
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type d'équipement
                    </label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      required
                    >
                      <option value="">Sélectionnez un type</option>
                      {Object.entries(categories).map(([catKey, cat]) => (
                        <optgroup key={catKey} label={cat.name}>
                          {cat.subcategories.map((sub) => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description détaillée
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Décrivez l'équipement dont vous avez besoin..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Budget estimé
                      </label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        placeholder="En dollars ($)"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Délai souhaité
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                        required
                      >
                        <option value="">Sélectionnez un délai</option>
                        <option value="urgent">Urgent (&lt; 1 mois)</option>
                        <option value="1-3">1-3 mois</option>
                        <option value="3-6">3-6 mois</option>
                        <option value="6+">6+ mois</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Spécifications techniques (optionnel)
                    </label>
                    <textarea
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      placeholder="Caractéristiques techniques spécifiques..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ajouter des images ou des fiches techniques (optionnel)
                    </label>
                    <div
                      className={`mt-1 flex flex-col items-center justify-center w-full h-32 border-2 ${
                        isDragActive ? 'border-primary' : 'border-dashed border-gray-300'
                      } rounded-md bg-gray-50`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <p className="text-sm text-gray-500">Glissez et déposez vos fichiers ici</p>
                      <p className="text-sm text-gray-500">ou</p>
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-primary underline"
                      >
                        Parcourir
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*,application/pdf"
                        multiple
                        className="hidden"
                        onChange={handleBrowseFiles}
                      />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {filePreviews.map((file, index) => (
                        <div key={index} className="relative group">
                          {file.isPdf ? (
                            <div className="flex items-center justify-center h-20 w-20 bg-gray-100 border rounded-md">
                              <FileText className="h-8 w-8 text-gray-500" />
                            </div>
                          ) : (
                            <img
                              src={file.url}
                              alt={`Prévisualisation ${index + 1}`}
                              className="h-20 w-20 object-cover rounded-md border"
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => handleFileDelete(file.name)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-lg font-medium text-gray-900">
                      Informations de livraison
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Adresse de livraison <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.deliveryAddress}
                          onChange={e => setFormData({ ...formData, deliveryAddress: e.target.value })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                          placeholder="Adresse complète de livraison"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Message (optionnel)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Envoyer la demande
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </PageContainer>
  );
}