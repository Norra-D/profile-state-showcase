# Profile Perfection

Build a resilient, production-ready "User Profile Card & Settings Component" in React with Tailwind CSS and Lucide React icons that explicitly demonstrates graceful handling of boundary and edge-case states.



Include interactive controls/toggles at the top to let the user switch between testing all 4 states in real-time:



1. Interactive State Switcher:

   - Provide buttons to switch between: "Normal State", "Loading Skeleton State", "Empty State", "Error State", and "Stress Test (40+ Character Strings)".



2. Component Specifications:

   - Normal State: Shows an avatar, full name, email, role badge, bio, and an editable settings form (display name, email, bio) with a submit button.

   - Loading State: Elegant animated skeleton loaders for avatar, text lines, badges, and input skeletons.

   - Empty State: Clean empty state illustration/icon when profile data is missing/cleared, with a "Create Profile" call-to-action button.

   - Error State: Accessible inline validation errors for invalid email/empty required fields, plus a global banner alert for network/server errors with a "Retry" button.

   - Edge-Case / Stress Test: Handle long strings seamlessly (e.g., a 50-character name like "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff" and a long unbroken URL/email). Use proper CSS containment (`break-words`, `truncate`, responsive flex/grid wrappers) so layouts never overflow or break containers on mobile or desktop.



3. Accessibility & UX Requirements:

   - Full keyboard navigability (visible focus rings).

   - Proper ARIA attributes for form inputs, loading indicators (`aria-busy`), error alerts (`role="alert"`), and accessible names for icon buttons.

   - Modern, polished UI design with dark/light mode support.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/602301f3-62fc-4a7d-9d92-112b48d26555).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
