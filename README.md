```bash
dc exec nextjs yarn add prisma --save-dev

dc exec nextjs npx prisma init --datasource-provider mysql

# migration
dc exec nextjs npx prisma migrate dev --name init

# orm generate
dc exec nextjs npx prisma generate
```