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
