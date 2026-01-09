import React, { useState } from 'react';
import { useData, Achievement, GalleryImage, Sport, Event, TeamMember } from '@/context/DataContext';
import { Trash2, Plus, GripVertical, Save, X, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const {
        achievements, addAchievement, updateAchievement, deleteAchievement,
        galleryImages, addGalleryImage, deleteGalleryImage,
        sports, addSport, updateSport, deleteSport,
        events, addEvent, updateEvent, deleteEvent,
        teamMembers, addTeamMember, updateTeamMember, deleteTeamMember
    } = useData();

    const [activeTab, setActiveTab] = useState<'achievements' | 'gallery' | 'sports' | 'events' | 'team'>('achievements');
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
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

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-200 p-1 rounded-lg mb-8 w-fit overflow-x-auto">
                    {(['achievements', 'gallery', 'sports', 'events', 'team'] as const).map((tab) => (
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(formData);
        setFormData({ src: '', alt: '' });
        setIsAdding(false);
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
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                            <input
                                required
                                className="w-full px-3 py-2 border rounded-md"
                                value={formData.src}
                                onChange={e => setFormData({ ...formData, src: e.target.value })}
                                placeholder="https://example.com/image.jpg"
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
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Add
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

    const startEdit = (item: TeamMember) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = item;
        setFormData(rest);
        setEditingId(item.id);
        setIsAdding(true);
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
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image (Initials or URL)</label>
                            <input required className="w-full px-3 py-2 border rounded-md" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="JD or https://..." />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button type="button" onClick={() => { setIsAdding(false); setEditingId(null); setFormData(initialFormState); }} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-md">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{editingId ? 'Update Member' : 'Add Member'}</button>
                    </div>
                </form>
            )}

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamMembers.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-slate-50">
                        <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                            {item.image.length <= 3 ? item.image : <img src={item.image} alt={item.name} className="w-full h-full rounded-full object-cover" />}
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
