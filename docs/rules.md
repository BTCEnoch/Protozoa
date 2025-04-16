# Bitcoin Protozoa - Project Rules

## Bitcoin Integration Rules
1. **API Endpoint Usage**
   - Must use only two endpoints:
     - `/r/blockinfo/${blockNumber}` for block header
     - `/content/${inscriptionID}` for content
   - Must use relative paths (no `ordinals.com` prefix)

2. **Block Data Usage**
   - Must extract only two fields from block header:
     - `nonce`: Exclusive source for RNG seed
     - `confirmations`: Exclusive trigger for evolution milestones
   - Must fetch block header only once per block number change
   - Block height is not stored

3. **Deterministic Generation Rules**
   - All random operations must use RNG system seeded by block nonce
   - Must maintain consistent creature generation across all instances
   - Must use stream-based RNG for consistent sequential results
   - Particle distribution must be deterministic based on nonce

4. **Service Implementation Rules**
   - All services must follow singleton pattern
   - Services requiring randomness must be initialized with nonce
   - Evolution services must be initialized with confirmations
   - Services can't import from other services outside their domain
   - Cross-domain communication must use events or explicit dependencies

5. **Worker Implementation Rules**
   - Must use transferable objects for efficient data transfer
   - Must implement worker pool management
   - Must process particles in smaller groups to prevent system freezing
   - Must keep code chunks under 200 lines

6. **Type System Rules**
   - `core.ts` must not import from other type files
   - Domain-specific type files must primarily import from `core.ts`
   - Limited cross-imports between domain-specific type files
   - Nested type directories can't import from each other

7. **Particle System Rules**
   - Must maintain exactly 500 particles per creature
   - Must distribute particles across five role groups (CORE, CONTROL, MOVEMENT, DEFENSE, ATTACK)
   - Must use instanced rendering for performance
   - Must implement spatial partitioning for proximity checks

8. **Evolution Rules**
   - Must only trigger mutations based on confirmation milestones:
     - 10k confirmations: 1% chance
     - 50k confirmations: 5% chance
     - 100k confirmations: 10% chance
     - 250k confirmations: 25% chance
     - 500k confirmations: 50% chance
     - 1M confirmations: 100% chance
   - Must maintain deterministic evolution paths
   - Must apply game theory principles to evolution decisions
   - Must preserve creature identity through mutations

9. **Performance Rules**
   - Must use web workers for compute-intensive tasks
   - Must implement chunking and batching for particle updates
   - Must use Barnes-Hut algorithm for large-scale simulations
   - Must run physics at lower frequency than rendering
   - Must implement interpolation for smooth visuals

10. **Documentation Rules**
    - Must wrap code snippets in `<augment_code_snippet>` tags
    - Must include full file paths when referencing files
    - Must wrap code elements in backticks
    - Must use proper mode attributes ("EXCERPT" or "EDIT")

11. **Game Theory Implementation Rules**
    - Must use payoff matrices for battle calculations
    - Must implement Nash equilibrium finder for strategic decisions
    - Must maintain deterministic battle outcomes
    - Must integrate with behavior system

12. **Testing Rules**
    - Must implement comprehensive unit tests for core systems
    - Must test all Bitcoin integration points
    - Must verify deterministic generation across instances
    - Must validate evolution paths