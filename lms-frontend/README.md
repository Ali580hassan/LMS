# Ilm LMS — Frontend

React + Vite + Tailwind frontend for the NestJS LMS backend.

## Setup

```bash
npm install
npm run dev
```

Runs on http://localhost:5173. The backend is expected on http://localhost:3000
(see `src/api/client.js` — change `BASE_URL` if yours differs).

## What's wired up

- Register / Login (JWT stored in localStorage, decoded client-side for role/user id)
- Courses list (public)
- Course detail page — shows lessons, and if you're the owning instructor: publish/unpublish, delete, add lesson
- Create course (instructor only, route-guarded)

## One backend change needed

`CoursesService.findOne()` currently only loads the `instructor` relation. For the
lessons list on the course detail page to populate, add `lessons: true`:

```typescript
async findOne(id: number): Promise<Course> {
  const course = await this.courseRepository.findOne({
    where: { id },
    relations: { instructor: true, lessons: true },
  });
  ...
}
```

## Theme

Single consistent design system in `src/components/ui.jsx` (Button, Card, Input,
Textarea, Badge, Alert) — every page reuses these instead of ad-hoc styles, so the
look stays identical across the app. Colors/fonts are tokens in `tailwind.config.js`.
