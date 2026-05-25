export interface Lecturer {
  id: string;
  name: string;
  dept: string;
  age: number;
  yearsInCollege: number;
  profession: string;
  totalExperience: number;
  image?: string;
}

export const lecturers: Lecturer[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    dept: "ece",
    age: 42,
    yearsInCollege: 12,
    profession: "Senior Professor",
    totalExperience: 18,
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    dept: "ccp",
    age: 38,
    yearsInCollege: 8,
    profession: "Associate Professor",
    totalExperience: 12,
  },
  {
    id: "3",
    name: "Dr. Robert Smith",
    dept: "adft",
    age: 50,
    yearsInCollege: 20,
    profession: "HOD & Professor",
    totalExperience: 25,
  },
  {
    id: "4",
    name: "Mrs. Emily Davis",
    dept: "pharmacy",
    age: 32,
    yearsInCollege: 5,
    profession: "Assistant Professor",
    totalExperience: 7,
  },
  {
    id: "5",
    name: "Mr. James Wilson",
    dept: "general",
    age: 45,
    yearsInCollege: 15,
    profession: "Professor",
    totalExperience: 20,
  },
  {
    id: "6",
    name: "Mrs. K. Lakshmi",
    dept: "office",
    age: 39,
    yearsInCollege: 10,
    profession: "Senior Administrator",
    totalExperience: 14,
  },
  {
    id: "7",
    name: "Mrs. T. Radha",
    dept: "hostel",
    age: 45,
    yearsInCollege: 8,
    profession: "Hostel Warden",
    totalExperience: 12,
  }
];

export const departments = {
  ece: "Electronics And Communication Engineering",
  ccp: "Commercial And Computer Practice",
  adft: "ADFT",
  pharmacy: "Pharmacy",
  general: "General Section",
  office: "Office administration",
  hostel: "Hostel",
};
