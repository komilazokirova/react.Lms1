import {
  Users,
  BookOpen,
  GraduationCap,
  Layers3,
} from "lucide-react";

export const stats = [
  {
    id: 1,
    title: "Students",
    value: 120,
    description: "+12 this month",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Courses",
    value: 8,
    description: "2 Active",
    icon: BookOpen,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    title: "Mentors",
    value: 12,
    description: "All Active",
    icon: GraduationCap,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 4,
    title: "Groups",
    value: 15,
    description: "3 New",
    icon: Layers3,
    color: "bg-orange-100 text-orange-600",
  },
];