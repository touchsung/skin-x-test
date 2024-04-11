#!/bin/bash

npm run build
npx prisma migrate deploy
npx prisma generate
npx prisma db seed    
npm run start