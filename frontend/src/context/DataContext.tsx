import React, { createContext, useContext, useState, useEffect } from 'react';

// Import images for initial state
import cricketImg from "@/assets/sports/cricket.jpg";
import footballImg from "@/assets/sports/football.jpg";
import basketballImg from "@/assets/sports/basketball.jpg";
import badmintonImg from "@/assets/sports/badminton.jpg";
import volleyballImg from "@/assets/sports/volleyball.jpg";
import tabletennisImg from "@/assets/sports/tabletennis.jpg";

export type Achievement = {
    id: string;
    iconName: string; // 'Trophy', 'Medal', 'Award'
    title: string;
    count: string;
    subtitle: string;
};

export type GalleryImage = {
    id: string;
    src: string;
    alt: string;
};

export type Sport = {
    id: string;
    name: string;
    image: string;
    schedule: string;
    venue: string;
    captain: string;
    coach: string;
    rating: number;
    members: number;
    featured: boolean;
};

export type Event = {
    id: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    type: string;
    status: "Registration Open" | "Coming Soon" | "Closed";
};

export type TeamMember = {
    id: string;
    name: string;
    role: string;
    description: string;
    image: string; // Initials or Image URL
};

export type Registration = {
    id: string;
    name: string;
    registerNumber: string;
    department: string;
    year: string;
    sport: string;
    email: string;
    phone: string;
    registeredAt: string;
};

type DataContextType = {
    achievements: Achievement[];
    galleryImages: GalleryImage[];
    sports: Sport[];
    events: Event[];
    teamMembers: TeamMember[];
    registrations: Registration[];
    addAchievement: (achievement: Omit<Achievement, "id">) => void;
    updateAchievement: (id: string, achievement: Partial<Achievement>) => void;
    deleteAchievement: (id: string) => void;
    addGalleryImage: (image: Omit<GalleryImage, "id">) => void;
    deleteGalleryImage: (id: string) => void;
    addSport: (sport: Omit<Sport, "id">) => void;
    updateSport: (id: string, sport: Partial<Sport>) => void;
    deleteSport: (id: string) => void;
    addEvent: (event: Omit<Event, "id">) => void;
    updateEvent: (id: string, event: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
    addTeamMember: (member: Omit<TeamMember, "id">) => void;
    updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
    deleteTeamMember: (id: string) => void;
    addRegistration: (registration: Omit<Registration, "id" | "registeredAt">) => void;
    deleteRegistration: (id: string) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialAchievements: Achievement[] = [
    { id: '1', iconName: 'Trophy', title: "State Champions", count: "12", subtitle: "Championships Won" },
    { id: '2', iconName: 'Medal', title: "National Level", count: "25+", subtitle: "Players Selected" },
    { id: '3', iconName: 'Award', title: "Best Sports Club", count: "5x", subtitle: "University Award" },
];

const initialGalleryImages: GalleryImage[] = [
    { id: '1', src: cricketImg, alt: "Cricket team in action" },
    { id: '2', src: footballImg, alt: "Football match highlights" },
    { id: '3', src: basketballImg, alt: "Basketball tournament" },
    { id: '4', src: badmintonImg, alt: "Badminton championship" },
    { id: '5', src: volleyballImg, alt: "Volleyball team victory" },
    { id: '6', src: tabletennisImg, alt: "Table tennis competition" },
];

const initialSports: Sport[] = [
    {
        id: '1',
        name: "Cricket",
        image: cricketImg,
        schedule: "Mon, Wed, Fri - 4:00 PM",
        venue: "Main Cricket Ground",
        captain: "Rahul Verma",
        coach: "Mr. Suresh Raina",
        rating: 4.9,
        members: 45,
        featured: true,
    },
    {
        id: '2',
        name: "Football",
        image: footballImg,
        schedule: "Tue, Thu, Sat - 5:00 PM",
        venue: "Football Stadium",
        captain: "Arjun Menon",
        coach: "Mr. Bhaichung Bhutia",
        rating: 4.8,
        members: 38,
        featured: false,
    },
    {
        id: '3',
        name: "Basketball",
        image: basketballImg,
        schedule: "Mon, Wed, Fri - 6:00 PM",
        venue: "Indoor Sports Complex",
        captain: "Sneha Reddy",
        coach: "Mr. Satnam Singh",
        rating: 4.7,
        members: 32,
        featured: true,
    },
    {
        id: '4',
        name: "Badminton",
        image: badmintonImg,
        schedule: "Tue, Thu - 4:30 PM",
        venue: "Badminton Hall",
        captain: "Aditya Kumar",
        coach: "Ms. P.V. Sindhu",
        rating: 4.9,
        members: 28,
        featured: false,
    },
    {
        id: '5',
        name: "Volleyball",
        image: volleyballImg,
        schedule: "Mon, Wed, Sat - 5:30 PM",
        venue: "Volleyball Court",
        captain: "Deepika Nair",
        coach: "Mr. Jimmy George",
        rating: 4.6,
        members: 35,
        featured: false,
    },
    {
        id: '6',
        name: "Table Tennis",
        image: tabletennisImg,
        schedule: "Daily - 3:00 PM",
        venue: "TT Room, Sports Block",
        captain: "Karan Malhotra",
        coach: "Ms. Manika Batra",
        rating: 4.8,
        members: 42,
        featured: true,
    },
];

const initialEvents: Event[] = [
    {
        id: '1',
        title: "Inter-College Cricket Championship",
        date: "Jan 25-28, 2026",
        time: "9:00 AM onwards",
        venue: "University Cricket Stadium",
        type: "Tournament",
        status: "Registration Open",
    },
    {
        id: '2',
        title: "Annual Sports Day",
        date: "Feb 15, 2026",
        time: "8:00 AM - 6:00 PM",
        venue: "Main Sports Complex",
        type: "Event",
        status: "Coming Soon",
    },
    {
        id: '3',
        title: "Basketball League Finals",
        date: "Feb 22, 2026",
        time: "4:00 PM",
        venue: "Indoor Stadium",
        type: "Match",
        status: "Registration Open",
    },
    {
        id: '4',
        title: "Badminton Open Tournament",
        date: "Mar 5-7, 2026",
        time: "10:00 AM onwards",
        venue: "Badminton Arena",
        type: "Tournament",
        status: "Registration Open",
    },
];

const initialTeamMembers: TeamMember[] = [
    {
        id: '1',
        name: "Dr. Rajesh Kumar",
        role: "Faculty Coordinator",
        description: "20+ years in sports administration",
        image: "RK",
    },
    {
        id: '2',
        name: "Prof. Anita Sharma",
        role: "Sports Director",
        description: "Former national athlete",
        image: "AS",
    },
    {
        id: '3',
        name: "Vikram Singh",
        role: "Club President",
        description: "4th Year, Computer Science",
        image: "VS",
    },
    {
        id: '4',
        name: "Priya Patel",
        role: "Sports Secretary",
        description: "3rd Year, Commerce",
        image: "PP",
    },
    {
        id: '5',
        name: "Rahul Verma",
        role: "Cricket Captain",
        description: "State level player",
        image: "RV",
    },
    {
        id: '6',
        name: "Sneha Reddy",
        role: "Basketball Captain",
        description: "University topper",
        image: "SR",
    },
    {
        id: '7',
        name: "Arjun Menon",
        role: "Football Captain",
        description: "All-rounder athlete",
        image: "AM",
    },
    {
        id: '8',
        name: "Deepika Nair",
        role: "Volleyball Captain",
        description: "National camp trainee",
        image: "DN",
    },
];

const initialRegistrations: Registration[] = [
    { id: 'r1', name: 'Aarav Sharma', registerNumber: '2024CS001', department: 'Computer Science', year: '2nd Year', sport: 'Cricket', email: 'aarav@college.edu', phone: '9876543210', registeredAt: '2026-01-10T10:30:00' },
    { id: 'r2', name: 'Ishaan Patel', registerNumber: '2024EC015', department: 'Electronics', year: '1st Year', sport: 'Cricket', email: 'ishaan@college.edu', phone: '9876543211', registeredAt: '2026-01-11T14:00:00' },
    { id: 'r3', name: 'Meera Nair', registerNumber: '2023ME008', department: 'Mechanical', year: '3rd Year', sport: 'Football', email: 'meera@college.edu', phone: '9876543212', registeredAt: '2026-01-12T09:15:00' },
    { id: 'r4', name: 'Rohan Gupta', registerNumber: '2024CS022', department: 'Computer Science', year: '2nd Year', sport: 'Basketball', email: 'rohan@college.edu', phone: '9876543213', registeredAt: '2026-01-13T11:00:00' },
    { id: 'r5', name: 'Ananya Singh', registerNumber: '2023EE005', department: 'Electrical', year: '3rd Year', sport: 'Badminton', email: 'ananya@college.edu', phone: '9876543214', registeredAt: '2026-01-14T16:30:00' },
    { id: 'r6', name: 'Kabir Reddy', registerNumber: '2025CI003', department: 'Civil', year: '1st Year', sport: 'Volleyball', email: 'kabir@college.edu', phone: '9876543215', registeredAt: '2026-01-15T08:45:00' },
    { id: 'r7', name: 'Diya Iyer', registerNumber: '2024SC010', department: 'Science', year: '2nd Year', sport: 'Table Tennis', email: 'diya@college.edu', phone: '9876543216', registeredAt: '2026-01-16T13:20:00' },
    { id: 'r8', name: 'Vivaan Joshi', registerNumber: '2023CS030', department: 'Computer Science', year: '3rd Year', sport: 'Cricket', email: 'vivaan@college.edu', phone: '9876543217', registeredAt: '2026-01-17T10:00:00' },
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Load from local storage if available, else use initial
    const [achievements, setAchievements] = useState<Achievement[]>(() => {
        const saved = localStorage.getItem('achievements');
        return saved ? JSON.parse(saved) : initialAchievements;
    });

    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
        const saved = localStorage.getItem('galleryImages');
        return saved ? JSON.parse(saved) : initialGalleryImages;
    });

    const [sports, setSports] = useState<Sport[]>(() => {
        const saved = localStorage.getItem('sports');
        return saved ? JSON.parse(saved) : initialSports;
    });

    const [events, setEvents] = useState<Event[]>(() => {
        const saved = localStorage.getItem('events');
        return saved ? JSON.parse(saved) : initialEvents;
    });

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
        const saved = localStorage.getItem('teamMembers');
        return saved ? JSON.parse(saved) : initialTeamMembers;
    });

    const [registrations, setRegistrations] = useState<Registration[]>(() => {
        const saved = localStorage.getItem('registrations');
        return saved ? JSON.parse(saved) : initialRegistrations;
    });

    // Effects to save to local storage
    useEffect(() => {
        localStorage.setItem('achievements', JSON.stringify(achievements));
    }, [achievements]);

    useEffect(() => {
        localStorage.setItem('galleryImages', JSON.stringify(galleryImages));
    }, [galleryImages]);

    useEffect(() => {
        localStorage.setItem('sports', JSON.stringify(sports));
    }, [sports]);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    }, [teamMembers]);

    useEffect(() => {
        localStorage.setItem('registrations', JSON.stringify(registrations));
    }, [registrations]);

    const addAchievement = (achievement: Omit<Achievement, "id">) => {
        setAchievements([...achievements, { ...achievement, id: crypto.randomUUID() }]);
    };

    const updateAchievement = (id: string, updated: Partial<Achievement>) => {
        setAchievements(achievements.map(a => a.id === id ? { ...a, ...updated } : a));
    };

    const deleteAchievement = (id: string) => {
        setAchievements(achievements.filter(a => a.id !== id));
    };

    const addGalleryImage = (image: Omit<GalleryImage, "id">) => {
        setGalleryImages([...galleryImages, { ...image, id: crypto.randomUUID() }]);
    };

    const deleteGalleryImage = (id: string) => {
        setGalleryImages(galleryImages.filter(img => img.id !== id));
    };

    const addSport = (sport: Omit<Sport, "id">) => {
        setSports([...sports, { ...sport, id: crypto.randomUUID() }]);
    };

    const updateSport = (id: string, updated: Partial<Sport>) => {
        setSports(sports.map(s => s.id === id ? { ...s, ...updated } : s));
    };

    const deleteSport = (id: string) => {
        setSports(sports.filter(s => s.id !== id));
    };

    const addEvent = (event: Omit<Event, "id">) => {
        setEvents([...events, { ...event, id: crypto.randomUUID() }]);
    };

    const updateEvent = (id: string, updated: Partial<Event>) => {
        setEvents(events.map(e => e.id === id ? { ...e, ...updated } : e));
    };

    const deleteEvent = (id: string) => {
        setEvents(events.filter(e => e.id !== id));
    };

    const addTeamMember = (member: Omit<TeamMember, "id">) => {
        setTeamMembers([...teamMembers, { ...member, id: crypto.randomUUID() }]);
    };

    const updateTeamMember = (id: string, updated: Partial<TeamMember>) => {
        setTeamMembers(teamMembers.map(m => m.id === id ? { ...m, ...updated } : m));
    };

    const deleteTeamMember = (id: string) => {
        setTeamMembers(teamMembers.filter(m => m.id !== id));
    };

    const addRegistration = (registration: Omit<Registration, "id" | "registeredAt">) => {
        setRegistrations([...registrations, { ...registration, id: crypto.randomUUID(), registeredAt: new Date().toISOString() }]);
    };

    const deleteRegistration = (id: string) => {
        setRegistrations(registrations.filter(r => r.id !== id));
    };

    return (
        <DataContext.Provider value={{
            achievements,
            galleryImages,
            sports,
            events,
            teamMembers,
            registrations,
            addAchievement,
            updateAchievement,
            deleteAchievement,
            addGalleryImage,
            deleteGalleryImage,
            addSport,
            updateSport,
            deleteSport,
            addEvent,
            updateEvent,
            deleteEvent,
            addTeamMember,
            updateTeamMember,
            deleteTeamMember,
            addRegistration,
            deleteRegistration,
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
