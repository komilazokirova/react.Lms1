import { BookOpen, GraduationCap, House, Settings, User } from "lucide-react"

export const menus = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <House size={20} />
  },
  {
    id: 2,
    title: "Courses",
    path: "/courses",
    icon: <BookOpen size={20} />,
  },
  {
    id: 3,
    title: "My Learning",
    path: "/my-learning",
    icon: <GraduationCap size={20} />
  },
  {
    id: 4,
    title: "Profile",
    path: "/profile",
    icon: <User size={20} />
  },
  {
    id: 5,
    title: "Settings",
    path: "/settings",
    icon: <Settings size={20} />
  },
]