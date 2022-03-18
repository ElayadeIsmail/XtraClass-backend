import { Prisma } from '@prisma/client';

export const subjectsData: Prisma.SubjectCreateInput[] = [
  {
    name: 'Math',
  },
  {
    name: 'Physique',
  },
  {
    name: 'SVT',
  },
  {
    name: 'Arabic',
  },
  {
    name: 'Francais',
  },
  {
    name: 'Anglais',
  },
  {
    name: 'Philosophie',
  },
  {
    name: 'Islamique',
  },
  {
    name: 'Sociologie',
  },
];

export const specializationData: Prisma.SpecializationCreateInput[] = [
  { name: 'Literature' },
  { name: 'Science' },
  { name: 'Economie' },
];

export const gradesData: Prisma.GradeCreateInput[] = [
  {
    name: 'Primaire',
    levels: {
      createMany: {
        data: [
          { name: 'Première année' },
          { name: 'Deuxième année' },
          { name: 'Troisième année' },
          { name: 'Quatrième année' },
          { name: 'Cinquième année' },
          { name: 'Sixième année' },
        ],
      },
    },
  },
  {
    name: 'Secondaire',
    levels: {
      createMany: {
        data: [
          { name: 'Première année' },
          { name: 'Deuxième année' },
          { name: 'Troisième année' },
        ],
      },
    },
  },
  {
    name: 'Lycee',
    levels: {
      createMany: {
        data: [
          { name: 'Cinquième année' },
          { name: 'Sixième année' },
          { name: 'Bac' },
        ],
      },
    },
  },
];

export const coursesData: Prisma.CourseCreateInput[] = [
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 10,
      },
    },
    name: 'Math For First Hight School year',
    price: 199.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Math',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 11,
      },
    },
    name: 'Math For Second Hight School year',
    price: 249.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Math',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 12,
      },
    },
    name: 'Math For Bac',
    price: 299.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Math',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 10,
      },
    },
    name: 'SVT For First Hight School year',
    price: 199.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'SVT',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 11,
      },
    },
    name: 'SVT For Second Hight School year',
    price: 249.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'SVT',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 12,
      },
    },
    name: 'SVT For Bac',
    price: 299.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'SVT',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 10,
      },
    },
    name: 'Physique For First Hight School year',
    price: 199.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Physique',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 11,
      },
    },
    name: 'Physique For Second Hight School year',
    price: 249.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Physique',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 12,
      },
    },
    name: 'Physique For Bac',
    price: 299.99,
    specialization: {
      connect: {
        name: 'Science',
      },
    },
    subject: {
      connect: {
        name: 'Physique',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 10,
      },
    },
    name: 'Francais For First Hight School year',
    price: 199.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Francais',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 11,
      },
    },
    name: 'Francais For Second Hight School year',
    price: 249.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Francais',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 12,
      },
    },
    name: 'Francais For Bac',
    price: 299.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Francais',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 10,
      },
    },
    name: 'Anglais For First Hight School year',
    price: 199.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Anglais',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 11,
      },
    },
    name: 'Anglais For Second Hight School year',
    price: 249.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Anglais',
      },
    },
  },
  {
    grade: {
      connect: {
        id: 3,
      },
    },
    level: {
      connect: {
        id: 12,
      },
    },
    name: 'Anglais For Bac',
    price: 299.99,
    specialization: {
      connect: {
        name: 'Literature',
      },
    },
    subject: {
      connect: {
        name: 'Anglais',
      },
    },
  },
];
