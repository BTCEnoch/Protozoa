## Hooks Architecture

### Current Structure
```
src/
└── hooks/
    ├── useBlockData.ts
    ├── useCreature.ts
    ├── useEvolution.ts
    └── useParticles.ts
```

### Recommended Structure
```
src/
├── features/
│   ├── bitcoin/
│   │   └── hooks/
│   │       └── useBlockData.ts
│   ├── creatures/
│   │   └── hooks/
│   │       ├── useCreature.ts
│   │       └── useEvolution.ts
│   └── particles/
│       └── hooks/
│           └── useParticles.ts
```

### Purpose
- Hooks are React-specific composable logic units
- They handle component-level state management and side effects
- They abstract complex logic away from components

### Domain-Specific vs. Global
- Domain-specific hooks should live with their feature
- Global utility hooks can stay in src/hooks
- Examples:
  - Domain: `useBlockData` (Bitcoin feature)
  - Global: `useDebounce`, `useLocalStorage`

## Additional Worker Opportunities

### 1. Evolution Worker
Purpose: Handle complex evolution calculations
```
evolutionWorker/
├── mutationWorker.ts    # Mutation calculations
├── traitWorker.ts       # Trait combinations
└── fitnessWorker.ts     # Fitness evaluations
```
Benefit: Offload intensive genetic algorithms

### 2. Game Theory Worker
Purpose: Handle complex game theory calculations
```
gameTheoryWorker/
├── equilibriumWorker.ts # Nash equilibrium calculations
├── payoffWorker.ts      # Payoff matrix computations
└── strategyWorker.ts    # Strategy evaluations
```
Benefit: Process complex matrix calculations without blocking

### 3. Formation Worker
Purpose: Handle formation calculations
```
formationWorker/
├── patternWorker.ts     # Pattern matching
├── shapeWorker.ts       # Shape transformations
└── blendWorker.ts       # Formation blending
```
Benefit: Complex geometry calculations in parallel

### 4. Analytics Worker
Purpose: Real-time analytics processing
```
analyticsWorker/
├── metricsWorker.ts     # Performance metrics
├── statsWorker.ts       # Population statistics
└── trendsWorker.ts      # Evolution trends
```
Benefit: Track system metrics without impacting performance

### 5. Optimization Worker
Purpose: Handle system optimizations
```
optimizationWorker/
├── lodWorker.ts         # Level of detail calculations
├── cullingWorker.ts     # Visibility culling
└── batchingWorker.ts    # Draw call optimization
```
Benefit: Improve rendering performance
