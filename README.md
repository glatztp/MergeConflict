# GitBattle - Merge Conflict Arena

<div align="center">

![GitBattle Banner](https://img.shields.io/badge/GitBattle-Merge%20Conflict%20Arena-blue?style=for-the-badge&logo=github)

**A turn-based combat simulator powered by GitHub developer metrics**

[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=flat-square&logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

[Live Demo](https://merge-conflict-six.vercel.app) | [Documentation](#features) | [Report Bug](https://github.com/glatztp/MergeConflict/issues)

</div>

---

## Overview

**GitBattle** is an interactive web application that gamifies GitHub developer statistics through an automated turn-based combat system. The application fetches real-time data from the GitHub API and transforms user profiles into battle statistics, creating an engaging visualization of developer activity and influence.

### Core Features

- **Real-time Battle System** - Automated turn-based combat with dynamic visual feedback
- **GitHub API Integration** - Live data synchronization with GitHub profiles
- **Persistent User Storage** - Local storage implementation for quick access to frequently compared users
- **Modern Interface Design** - Glassmorphism UI with optimized animations and transitions
- **Audio Feedback System** - Web Audio API integration for enhanced user experience
- **Responsive Layout** - Cross-platform compatibility across desktop and mobile devices

---

## Technical Features

### Combat System

- Automated turn-based combat mechanics with randomized attack sequences
- Critical hit system with 15% probability rate and 1.5x damage multiplier
- Dynamic health visualization with color-coded transitions
- Advanced visual effects including damage indicators, screen shake, and particle systems
- Three distinct attack types (ATK, DEF, CRIT) with unique visual styling and animations

### User Management System

- GitHub username search functionality
- Persistent storage supporting up to 10 saved user profiles
- Automatic profile caching upon battle initialization
- Quick-select interface for Player 1 and Player 2 assignment
- LocalStorage-based persistence layer

### Visual Architecture

- Glassmorphism design pattern with backdrop blur effects
- CSS Grid and Flexbox-based responsive layout system
- Color-coded player differentiation (Player 1: Blue, Player 2: Red)
- Victory modal with celebration animations
- Comprehensive transition and hover effect system
- Type-specific attack visualizations:
  - Attack: Orange/Red gradient scheme
  - Defense: Cyan/Blue gradient scheme
  - Critical: Yellow/Gold gradient scheme

### Statistics Display

- User avatar with level badge and glow effects
- Dynamic HP indicator (Integrity) with color transitions
- Repository and follower count metrics
- Username and display name information

---

## Technology Stack

| Technology         | Implementation Purpose                        |
| ------------------ | --------------------------------------------- |
| **React 19**       | Component-based UI architecture               |
| **TypeScript**     | Static type checking and enhanced IDE support |
| **Vite**           | Development server and build optimization     |
| **Tailwind CSS 4** | Utility-first CSS framework                   |
| **GitHub API**     | Real-time developer data retrieval            |
| **Web Audio API**  | Audio feedback and sound effect management    |

---

## Installation and Setup

### System Requirements

- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x or higher

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/glatztp/MergeConflict.git

# Navigate to project directory
cd MergeConflict

# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will be available at `http://localhost:5173`

### Production Build

```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

---

## Usage Instructions

### Battle Workflow

1. **User Selection** - Enter two valid GitHub usernames in the designated input fields
2. **Battle Initialization** - Click "START BATTLE" to begin data fetching and combat sequence
3. **Automated Combat** - Observe the automated battle sequence with real-time visual feedback
4. **Result Display** - Review winner information in the victory modal
5. **Battle Reset** - Select "NEW BATTLE" to initialize a new combat session

### Advanced Features

- Utilize bookmark functionality to persist user profiles for future battles
- Access Quick Match presets for immediate battle initialization
- Employ arrow navigation for rapid Player 1/Player 2 assignment from saved profiles
- Optimize battle engagement by selecting users with comparable statistics

---

## Battle Algorithm

### Power Calculation System

```typescript
// Player statistics calculation
Level = f(account_age, activity_metrics)
Max HP = repositories + followers + age_bonus
Attack = (repositories × 2) + (followers × 0.5) + level_bonus
```

### Combat Sequence

1. Random player selection for attack turn
2. Random move selection from available move pool
3. Damage calculation: `Damage = Attacker_ATK × Move_Multiplier × Random(0.8, 1.2)`
4. Critical hit evaluation (15% probability, 1.5× damage multiplier)
5. Combat continues until player HP reaches zero

---

## Project Architecture

```
MergeConflict/
├── src/
│   ├── components/
│   │   ├── BattleArena.tsx    # Combat visualization container
│   │   ├── BattleLog.tsx      # Combat event logging system
│   │   ├── BattleView.tsx     # Main battle interface layout
│   │   ├── PlayerCard.tsx     # Player statistics component
│   │   ├── SearchView.tsx     # User search interface
│   │   └── WinnerModal.tsx    # Victory display modal
│   ├── data/
│   │   └── moves.ts           # Combat move definitions
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── audio.ts           # Audio management utilities
│   │   └── github.ts          # GitHub API integration
│   ├── App.tsx                # Root application component
│   ├── main.tsx               # Application entry point
│   └── index.css              # Global styles and animations
├── public/                    # Static assets
├── package.json               # Project dependencies
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration
```

---

## Customization Guide

### Adding Combat Moves

Extend the move pool in `src/data/moves.ts`:

```typescript
export const MOVES: Move[] = [
  {
    name: "Force Push",
    type: "atk",
    dmgMulti: 1.2,
    icon: "publish",
    msg: "Overwrites the opponent's branch!",
  },
  // Additional move configurations
];
```

### Adjusting Combat Timing

Modify turn duration in `src/App.tsx`:

```typescript
const interval = setInterval(() => {
  // Combat logic execution
}, 2500); // Interval duration in milliseconds
```

---

## Contributing

Contributions are welcome and appreciated. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/EnhancedFeature`)
3. Commit changes with descriptive messages (`git commit -m 'Add: Enhanced feature description'`)
4. Push to the feature branch (`git push origin feature/EnhancedFeature`)
5. Submit a Pull Request with detailed description of changes

---

## License

This project is distributed under the MIT License. See [LICENSE](LICENSE) file for complete details.

---

## Credits and Attribution

- GitHub API for developer metrics and profile data
- Material Symbols for iconography
- JetBrains Mono and Inter typefaces
- React and Vite development communities

---

## Support and Contact

For bug reports, feature requests, or general inquiries, please [open an issue](https://github.com/glatztp/MergeConflict/issues) on the GitHub repository.

---

<div align="center">

**Developed by glatztp**

If you find this project useful, please consider starring the repository.

</div>
