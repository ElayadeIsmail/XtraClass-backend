import { Prisma } from '@prisma/client';

export const gradesData: Prisma.GradeCreateInput[] = [
  {
    name: 'First',
    levels: {
      createMany: {
        data: [
          {
            name: 'First',
          },
          {
            name: 'Second',
          },
          {
            name: 'third',
          },
          {
            name: 'fourth',
          },
          {
            name: 'fifth',
          },
          {
            name: 'sixth',
          },
        ],
      },
    },
  },
  {
    name: 'Second',
    levels: {
      createMany: {
        data: [
          {
            name: 'First',
          },
          {
            name: 'Second',
          },
          {
            name: 'third',
          },
        ],
      },
    },
  },
  {
    name: 'third',
    levels: {
      createMany: {
        data: [
          {
            name: 'First',
          },
          {
            name: 'Second',
          },
          {
            name: 'third',
          },
        ],
      },
    },
  },
];
