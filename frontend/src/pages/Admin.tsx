import React, { useState } from 'react';
import { useData, Achievement, GalleryImage, Sport, Event, TeamMember, Registration } from '@/context/DataContext';
import { Trash2, Plus, GripVertical, Save, X, Edit2, Search, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServerStatus } from '@/components/ServerStatus';

export default function Admin() {
    const {
        achievements, addAchievement, updateAchievement, deleteAchievement,
        galleryImages, addGalleryImage, deleteGalleryImage,
        sports, addSport, updateSport, deleteSport,
        events, addEvent, updateEvent, deleteEvent,
        teamMembers, addTeamMember, updateTeamMember, deleteTeamMember,
        registrations, deleteRegistration
    } = useData();

    const [activeTab, setActiveTab] = useState<'achievements' | 'gallery' | 'sports' | 'events' | 'team' | 'registrations'>('achievements');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-slate-900 font-sans">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        ← Back to Site
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Server Status */}
                <div className="mb-8">
                    <ServerStatus />
                </div>

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-200 p-1 rounded-lg mb-8 w-fit overflow-x-auto">
                    {(['achievements', 'gallery', 'sports', 'events', 'team', 'registrations'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize whitespace-nowrap ${activeTab === tab
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50'
                                }`}
                        >
                            {tab === 'team' ? 'Team Members' : tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    {activeTab === 'achievements' && (
                        <AchievementsManager
                            achievements={achievements}
                            onAdd={addAchievement}
                            onUpdate={updateAchievement}
                            onDelete={deleteAchievement}
                        />
                    )}
                    {activeTab === 'gallery' && (
                        <GalleryManager
                            galleryImages={galleryImages}
                            onAdd={addGalleryImage}
                            onDelete={deleteGalleryImage}
                        />
                    )}
                    {activeTab === 'sports' && (
                        <SportsManager
                            sports={sports}
                            onAdd={addSport}
                            onUpdate={updateSport}
                            onDelete={deleteSport}
                        />
                    )}
                    {activeTab === 'events' && (
                        <EventsManager
                            events={events}
                            onAdd={addEvent}
                            onUpdate={updateEvent}
                            onDelete={deleteEvent}
                        />
                    )}
                    {activeTab === 'team' && (
                        <TeamManager
                            teamMembers={teamMembers}
                            onAdd={addTeamMember}
                            onUpdate={updateTeamMember}
                            onDelete={deleteTeamMember}
                        />
                    )}
                    {activeTab === 'registrations' && (
                        <RegistrationsManager
                            registrations={registrations}
                            onDelete={deleteRegistration}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

// --- Sub-components ---

function AchievementsManager({
    achievements, onAdd, onUpdate, onDelete
}: {
    achievements: Achievement[],
    onAdd: (a: Omit<Achievement, 'id'>) => void,
    onUpdate: (id: string, a: Partial<Achievement>) => void,
    onDelete: (id: string) => void
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
        iconName: 'Trophy',
        title: '',
        count: '',
        subtitle: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            onUpdate(editingId, formData);
            setEditingId(null);
        } else {
            onAdd(formData);
        }
        setFormData({ iconName: 'Trophy', title: '', count: '', subtitle: '' });
        setIsAdding(false);
    };

    const startEdit = (item: Achievement) => {
        setFormData({
            iconName: item.iconName,
            title: item.title,
            count: item.count,
            subtitle: item.subtitle
        });
        setEditingId(item.id);
        setIsAdding(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Achievements</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Achievement
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input
                                required
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. State Champions"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Count</label>
                            <input
                                required
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.count}
                                onChange={e => setFormData({ ...formData, count: e.target.value })}
                                placeholder="e.g. 12"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
                            <input
                                required
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.subtitle}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                placeholder="e.g. Championships Won"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Icon</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.iconName}
                                onChange={e => setFormData({ ...formData, iconName: e.target.value })}
                            >
                                <option value="Trophy">Trophy</option>
                                <option value="Medal">Medal</option>
                                <option value="Award">Award</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => { setIsAdding(false); setEditingId(null); }}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {editingId ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {achievements.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.count} • {item.subtitle}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-blue-600">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GalleryManager({
    galleryImages, onAdd, onDelete
}: {
    galleryImages: GalleryImage[],
    onAdd: (a: Omit<GalleryImage, 'id'>) => void,
    onDelete: (id: string) => void
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ src: '', alt: '' });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = formData.src;

        if (selectedFile) {
            setIsUploading(true);
            try {
                const uploadData = new FormData();
                uploadData.append('image', selectedFile);
                uploadData.append('description', formData.alt);
                uploadData.append('category', 'gallery');

                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/images`, {
                    method: 'POST',
                    body: uploadData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                imageUrl = data.secureUrl || data.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image. Please try again.');
                setIsUploading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        if (imageUrl) {
            onAdd({ src: imageUrl, alt: formData.alt });
            setFormData({ src: '', alt: '' });
            setSelectedFile(null);
            setIsAdding(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Gallery</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Photo
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Image (Recommended)</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-3 py-2 border rounded-md bg-white"
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        setSelectedFile(e.target.files[0]);
                                        // Clear URL if file is selected to avoid confusion
                                        setFormData(prev => ({ ...prev, src: '' }));
                                    }
                                }}
                            />
                            <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</p>
                        </div>

                        <div className="md:col-span-2 relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-300" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-50 px-2 text-slate-500">Or use URL</span>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.src}
                                onChange={e => {
                                    setFormData({ ...formData, src: e.target.value });
                                    setSelectedFile(null); // Clear file if URL is typed
                                }}
                                placeholder="https://example.com/image.jpg"
                                disabled={!!selectedFile}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Alt Text)</label>
                            <input
                                required
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.alt}
                                onChange={e => setFormData({ ...formData, alt: e.target.value })}
                                placeholder="Team playing football"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdding(false);
                                setSelectedFile(null);
                                setFormData({ src: '', alt: '' });
                            }}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading || (!formData.src && !selectedFile)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isUploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Add'
                            )}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galleryImages.map((item) => (
                    <div key={item.id} className="group relative aspect-video bg-slate-100 rounded-lg overflow-hidden border">
                        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <button
                                onClick={() => onDelete(item.id)}
                                className="p-2 bg-white/10 hover:bg-red-600 text-white rounded-full transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                            {item.alt}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SportsManager({
    sports, onAdd, onUpdate, onDelete
}: {
    sports: Sport[],
    onAdd: (s: Omit<Sport, 'id'>) => void,
    onUpdate: (id: string, s: Partial<Sport>) => void,
    onDelete: (id: string) => void
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const initialFormState: Omit<Sport, 'id'> = {
        name: '',
        image: '',
        schedule: '',
        venue: '',
        captain: '',
        coach: '',
        rating: 5.0,
        members: 0,
        featured: false,
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            onUpdate(editingId, formData);
            setEditingId(null);
        } else {
            onAdd(formData);
        }
        setFormData(initialFormState);
        setIsAdding(false);
    };

    const startEdit = (item: Sport) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = item;
        setFormData(rest);
        setEditingId(item.id);
        setIsAdding(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Sports Programs</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Sport
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Fields */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Sport Name</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Schedule</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.schedule} onChange={e => setFormData({ ...formData, schedule: e.target.value })} placeholder="Mon, Wed - 5 PM" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Coach</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.coach} onChange={e => setFormData({ ...formData, coach: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Captain</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.captain} onChange={e => setFormData({ ...formData, captain: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                            <input type="number" step="0.1" required className="w-full px-3 py-2 border rounded-md" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Members Count</label>
                            <input type="number" required className="w-full px-3 py-2 border rounded-md" value={formData.members} onChange={e => setFormData({ ...formData, members: parseInt(e.target.value) })} />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <input
                                type="checkbox"
                                id="featured"
                                className="w-4 h-4"
                                checked={formData.featured}
                                onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                            />
                            <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured Sport</label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialFormState); }}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {editingId ? 'Update Sport' : 'Add Sport'}
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {sports.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:bg-slate-50">
                        <div className="w-24 h-24 shrink-0 bg-slate-200 rounded-md overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg">{item.name} {item.featured && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full ml-2">Featured</span>}</h3>
                                    <div className="text-sm text-slate-500 mt-1 grid grid-cols-2 gap-x-8 gap-y-1">
                                        <p>Coach: {item.coach}</p>
                                        <p>Venue: {item.venue}</p>
                                        <p>Schedule: {item.schedule}</p>
                                        <p>Members: {item.members}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-blue-600">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => onDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function EventsManager({
    events, onAdd, onUpdate, onDelete
}: {
    events: Event[],
    onAdd: (e: Omit<Event, 'id'>) => void,
    onUpdate: (id: string, e: Partial<Event>) => void,
    onDelete: (id: string) => void
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const initialFormState: Omit<Event, 'id'> = {
        title: '',
        date: '',
        time: '',
        venue: '',
        type: 'Event',
        status: 'Registration Open',
    };
    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            onUpdate(editingId, formData);
            setEditingId(null);
        } else {
            onAdd(formData);
        }
        setFormData(initialFormState);
        setIsAdding(false);
    };

    const startEdit = (item: Event) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = item;
        setFormData(rest);
        setEditingId(item.id);
        setIsAdding(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Events & Tournaments</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Event
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} placeholder="Jan 25, 2026" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.time} onChange={e => setFormData({ ...formData, time: e.target.value })} placeholder="9:00 AM" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Venue</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.venue} onChange={e => setFormData({ ...formData, venue: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                            <select className="w-full px-3 py-2 border rounded-md" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                <option value="Tournament">Tournament</option>
                                <option value="Event">Event</option>
                                <option value="Match">Match</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                            <select className="w-full px-3 py-2 border rounded-md" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as any })}>
                                <option value="Registration Open">Registration Open</option>
                                <option value="Coming Soon">Coming Soon</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialFormState); }} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{editingId ? 'Update Event' : 'Add Event'}</button>
                    </div>
                </form>
            )}

            <div className="grid gap-4">
                {events.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.date} • {item.time} • {item.venue}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'Registration Open' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                                {item.status}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-blue-600">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TeamManager({
    teamMembers, onAdd, onUpdate, onDelete
}: {
    teamMembers: TeamMember[],
    onAdd: (m: Omit<TeamMember, 'id'>) => void,
    onUpdate: (id: string, m: Partial<TeamMember>) => void,
    onDelete: (id: string) => void
}) {
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const initialFormState: Omit<TeamMember, 'id'> = {
        name: '',
        role: '',
        description: '',
        image: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = formData.image;

        if (selectedFile) {
            setIsUploading(true);
            try {
                const uploadData = new FormData();
                uploadData.append('image', selectedFile);
                uploadData.append('description', `${formData.name} - ${formData.role}`);
                uploadData.append('category', 'team');

                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                const response = await fetch(`${apiUrl}/images`, {
                    method: 'POST',
                    body: uploadData,
                });

                if (!response.ok) {
                    throw new Error('Upload failed');
                }

                const data = await response.json();
                imageUrl = data.secureUrl || data.url;
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Failed to upload image. Please try again.');
                setIsUploading(false);
                return;
            } finally {
                setIsUploading(false);
            }
        }

        const finalData = { ...formData, image: imageUrl };

        if (editingId) {
            onUpdate(editingId, finalData);
            setEditingId(null);
        } else {
            onAdd(finalData);
        }
        setFormData(initialFormState);
        setSelectedFile(null);
        setIsAdding(false);
    };

    const startEdit = (item: TeamMember) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = item;
        setFormData(rest);
        setEditingId(item.id);
        setIsAdding(true);
        setSelectedFile(null);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Team Members</h2>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> Add Member
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} placeholder="e.g. Captain" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="e.g. 3rd Year, CS" />
                        </div>

                        <div className="md:col-span-2 border-t pt-4 mt-2">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Photo (Recommended)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full px-3 py-2 border rounded-md bg-white"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setSelectedFile(e.target.files[0]);
                                                // Clear text input to avoid confusion, or leave it as preview if you implemented preview logic
                                                // setFormData(prev => ({ ...prev, image: '' })); 
                                            }
                                        }}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Supports JPG, PNG, WEBP</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Or use Image URL / Initials</label>
                                    <input
                                        required={!selectedFile}
                                        className="w-full px-3 py-2 border rounded-md"
                                        value={formData.image}
                                        onChange={e => {
                                            setFormData({ ...formData, image: e.target.value });
                                            setSelectedFile(null);
                                        }}
                                        placeholder="JD or https://..."
                                        disabled={!!selectedFile}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialFormState); setSelectedFile(null); }} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md">Cancel</button>
                        <button
                            type="submit"
                            disabled={isUploading || (!formData.image && !selectedFile)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isUploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                                    {editingId ? 'Updating...' : 'Uploading...'}
                                </>
                            ) : (
                                editingId ? 'Update Member' : 'Add Member'
                            )}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamMembers.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-slate-50">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 overflow-hidden">
                            {item.image.length <= 3 ? item.image : <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{item.name}</h3>
                            <p className="text-sm text-slate-500 truncate">{item.role}</p>
                        </div>
                        <div className="flex gap-1">
                            <button onClick={() => startEdit(item)} className="p-2 text-slate-400 hover:text-blue-600">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => onDelete(item.id)} className="p-2 text-slate-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RegistrationsManager({
    registrations, onDelete
}: {
    registrations: Registration[],
    onDelete: (id: string) => void
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSports, setExpandedSports] = useState<Set<string>>(new Set());

    // Get unique sports from registrations
    const sportNames = Array.from(new Set(registrations.map(r => r.sport))).sort();

    // Filter registrations by search query
    const filteredRegistrations = registrations.filter(r => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            r.name.toLowerCase().includes(q) ||
            r.registerNumber.toLowerCase().includes(q) ||
            r.department.toLowerCase().includes(q) ||
            r.year.toLowerCase().includes(q) ||
            r.sport.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.phone.includes(q)
        );
    });

    // Group filtered registrations by sport
    const groupedBySport: Record<string, Registration[]> = {};
    filteredRegistrations.forEach(r => {
        if (!groupedBySport[r.sport]) groupedBySport[r.sport] = [];
        groupedBySport[r.sport].push(r);
    });

    const toggleSport = (sport: string) => {
        setExpandedSports(prev => {
            const next = new Set(prev);
            if (next.has(sport)) {
                next.delete(sport);
            } else {
                next.add(sport);
            }
            return next;
        });
    };

    const expandAll = () => {
        setExpandedSports(new Set(Object.keys(groupedBySport)));
    };

    const collapseAll = () => {
        setExpandedSports(new Set());
    };

    const sportColors: Record<string, string> = {
        'Cricket': 'border-green-500 bg-green-50',
        'Football': 'border-blue-500 bg-blue-50',
        'Basketball': 'border-orange-500 bg-orange-50',
        'Badminton': 'border-purple-500 bg-purple-50',
        'Volleyball': 'border-red-500 bg-red-50',
        'Table Tennis': 'border-teal-500 bg-teal-50',
    };

    const sportBadgeColors: Record<string, string> = {
        'Cricket': 'bg-green-100 text-green-700',
        'Football': 'bg-blue-100 text-blue-700',
        'Basketball': 'bg-orange-100 text-orange-700',
        'Badminton': 'bg-purple-100 text-purple-700',
        'Volleyball': 'bg-red-100 text-red-700',
        'Table Tennis': 'bg-teal-100 text-teal-700',
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold">Registered Students</h2>
                    <p className="text-sm text-slate-500 mt-1">
                        {registrations.length} total registrations across {sportNames.length} sports
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={expandAll}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Expand All
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                        onClick={collapseAll}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Collapse All
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search by name, register number, department, sport..."
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Filtered results info */}
            {searchQuery && (
                <p className="text-sm text-slate-500 mb-4">
                    Showing {filteredRegistrations.length} result{filteredRegistrations.length !== 1 ? 's' : ''} for "{searchQuery}"
                </p>
            )}

            {/* Sports Groups */}
            {Object.keys(groupedBySport).length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">No registrations found</p>
                    <p className="text-sm mt-1">
                        {searchQuery ? 'Try a different search term' : 'Students will appear here after registration'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(groupedBySport)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([sport, students]) => {
                            const isExpanded = expandedSports.has(sport);
                            const colorClass = sportColors[sport] || 'border-slate-400 bg-slate-50';
                            const badgeColor = sportBadgeColors[sport] || 'bg-slate-100 text-slate-700';

                            return (
                                <div key={sport} className={`border-l-4 rounded-lg border ${colorClass} overflow-hidden`}>
                                    {/* Sport Header — clickable to expand/collapse */}
                                    <button
                                        onClick={() => toggleSport(sport)}
                                        className="w-full flex items-center justify-between p-4 hover:bg-white/50 transition-colors text-left"
                                    >
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-lg text-slate-800">{sport}</h3>
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColor}`}>
                                                {students.length} student{students.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-slate-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-slate-400" />
                                        )}
                                    </button>

                                    {/* Students Table */}
                                    {isExpanded && (
                                        <div className="bg-white border-t">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                                                            <th className="px-4 py-3 font-medium">Name</th>
                                                            <th className="px-4 py-3 font-medium">Reg. Number</th>
                                                            <th className="px-4 py-3 font-medium">Department</th>
                                                            <th className="px-4 py-3 font-medium">Year</th>
                                                            <th className="px-4 py-3 font-medium">Email</th>
                                                            <th className="px-4 py-3 font-medium">Phone</th>
                                                            <th className="px-4 py-3 font-medium">Registered</th>
                                                            <th className="px-4 py-3 font-medium w-12"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-slate-100">
                                                        {students
                                                            .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
                                                            .map(student => (
                                                                <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                                                                    <td className="px-4 py-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                                                                                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                                            </div>
                                                                            <span className="font-medium text-slate-800">{student.name}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{student.registerNumber}</td>
                                                                    <td className="px-4 py-3 text-slate-600">{student.department}</td>
                                                                    <td className="px-4 py-3 text-slate-600">{student.year}</td>
                                                                    <td className="px-4 py-3 text-slate-600 text-xs">{student.email}</td>
                                                                    <td className="px-4 py-3 text-slate-600 text-xs font-mono">{student.phone}</td>
                                                                    <td className="px-4 py-3 text-slate-500 text-xs">
                                                                        {new Date(student.registeredAt).toLocaleDateString('en-IN', {
                                                                            day: 'numeric',
                                                                            month: 'short',
                                                                            year: 'numeric',
                                                                        })}
                                                                    </td>
                                                                    <td className="px-4 py-3">
                                                                        <button
                                                                            onClick={() => onDelete(student.id)}
                                                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                                            title="Remove registration"
                                                                        >
                                                                            <Trash2 className="w-3.5 h-3.5" />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    }
                </div>
            )}
        </div>
    );
}
