/**
 * Test Game Theory Implementation
 * 
 * This script tests the game theory implementation by creating a simple game,
 * finding Nash equilibria, and evaluating decision trees.
 */

import { createPayoffMatrix, StrategyProfile } from '../types/gameTheory/payoffMatrix';
import { createDecisionNode, createDecisionTree } from '../types/gameTheory/decisionTree';
import { createUtilityFunction, linearNormalizer } from '../types/gameTheory/utilityFunction';
import { 
  calculatePayoffMatrix, 
  findNashEquilibria, 
  isStrictNashEquilibrium,
  evaluateDecisionTree,
  calculateUtility
} from '../lib/gameTheory';
import { getPayoffMatrixService } from '../services/gameTheory/payoffMatrixService';
import { getNashEquilibriumFinder } from '../services/gameTheory/nashEquilibriumFinder';

// Initialize services with mock block data
const blockData = { nonce: 12345, confirmations: 1000 };
getPayoffMatrixService().initialize(blockData);
getNashEquilibriumFinder().initialize(blockData);

// Test 1: Create a simple Prisoner's Dilemma game
console.log('Test 1: Creating Prisoner\'s Dilemma game...');
const prisonersDilemma = createPayoffMatrix(
  ['prisoner1', 'prisoner2'],
  {
    'prisoner1': ['cooperate', 'defect'],
    'prisoner2': ['cooperate', 'defect']
  },
  {
    'prisoner1': {
      'cooperate': {
        'cooperate': -1, // Both cooperate: 1 year each
        'defect': -3     // prisoner1 cooperates, prisoner2 defects: 3 years for prisoner1
      },
      'defect': {
        'cooperate': 0,  // prisoner1 defects, prisoner2 cooperates: 0 years for prisoner1
        'defect': -2     // Both defect: 2 years each
      }
    },
    'prisoner2': {
      'cooperate': {
        'cooperate': -1, // Both cooperate: 1 year each
        'defect': 0      // prisoner1 defects, prisoner2 cooperates: 0 years for prisoner1
      },
      'defect': {
        'cooperate': -3, // prisoner1 cooperates, prisoner2 defects: 3 years for prisoner1
        'defect': -2     // Both defect: 2 years each
      }
    }
  }
);

console.log('Prisoner\'s Dilemma game created:');
console.log(JSON.stringify(prisonersDilemma, null, 2));

// Test 2: Find Nash equilibria in Prisoner's Dilemma
console.log('\nTest 2: Finding Nash equilibria in Prisoner\'s Dilemma...');
const equilibria = findNashEquilibria(prisonersDilemma);
console.log(`Found ${equilibria.length} Nash equilibria:`);
equilibria.forEach((eq, i) => {
  console.log(`Equilibrium ${i + 1}:`);
  console.log(`  Profile: ${JSON.stringify(eq.profile)}`);
  console.log(`  Payoffs: ${JSON.stringify(eq.payoffs)}`);
  console.log(`  Is Pure: ${eq.isPure}`);
  console.log(`  Is Strict: ${eq.isStrict}`);
});

// Test 3: Create a decision tree
console.log('\nTest 3: Creating and evaluating a decision tree...');
const decisionTree = createDecisionTree(
  createDecisionNode('root', 'Initial decision', {
    payoff: 0,
    children: [
      createDecisionNode('cooperate', 'Cooperate', {
        condition: (state) => state.trustLevel > 0.5,
        payoff: 5,
        children: [
          createDecisionNode('cooperate-again', 'Cooperate again', {
            condition: (state) => state.opponentCooperated,
            payoff: 10
          }),
          createDecisionNode('defect-after-cooperation', 'Defect after cooperation', {
            condition: (state) => !state.opponentCooperated,
            payoff: -5
          })
        ]
      }),
      createDecisionNode('defect', 'Defect', {
        condition: (state) => state.trustLevel <= 0.5,
        payoff: 3,
        children: [
          createDecisionNode('cooperate-after-defection', 'Cooperate after defection', {
            condition: (state) => state.opponentCooperated,
            payoff: 0
          }),
          createDecisionNode('defect-again', 'Defect again', {
            condition: (state) => !state.opponentCooperated,
            payoff: -2
          })
        ]
      })
    ]
  })
);

// Evaluate the decision tree with different states
const highTrustState = { trustLevel: 0.8, opponentCooperated: true };
const lowTrustState = { trustLevel: 0.3, opponentCooperated: false };

const highTrustPath = evaluateDecisionTree(decisionTree, highTrustState);
const lowTrustPath = evaluateDecisionTree(decisionTree, lowTrustState);

console.log('Decision tree evaluation with high trust:');
console.log(`  Path: ${highTrustPath.nodes.map(n => n.decision).join(' -> ')}`);
console.log(`  Total Payoff: ${highTrustPath.totalPayoff}`);

console.log('Decision tree evaluation with low trust:');
console.log(`  Path: ${lowTrustPath.nodes.map(n => n.decision).join(' -> ')}`);
console.log(`  Total Payoff: ${lowTrustPath.totalPayoff}`);

// Test 4: Create and use a utility function
console.log('\nTest 4: Creating and using a utility function...');
const utilityFunction = createUtilityFunction(
  {
    'health': 0.5,
    'energy': 0.3,
    'position': 0.2
  },
  {
    'health': linearNormalizer(0, 100),
    'energy': linearNormalizer(0, 100),
    'position': linearNormalizer(-1, 1)
  }
);

const goodState = { health: 80, energy: 70, position: 0.5 };
const badState = { health: 20, energy: 30, position: -0.8 };

console.log('Utility calculation for good state:');
console.log(`  Factors: ${JSON.stringify(goodState)}`);
console.log(`  Utility: ${utilityFunction.calculate(goodState)}`);

console.log('Utility calculation for bad state:');
console.log(`  Factors: ${JSON.stringify(badState)}`);
console.log(`  Utility: ${utilityFunction.calculate(badState)}`);

// Test 5: Use the PayoffMatrixService
console.log('\nTest 5: Using the PayoffMatrixService...');
const payoffMatrixService = getPayoffMatrixService();
const creatureMatrix = payoffMatrixService.createStandardCreatureMatrix(
  'creature1',
  'creature2',
  'ATTACK',
  'DEFENSE'
);

console.log('Standard creature matrix created:');
console.log(`  Players: ${creatureMatrix.players.join(', ')}`);
console.log(`  Strategies for creature1: ${creatureMatrix.strategies['creature1'].join(', ')}`);
console.log(`  Strategies for creature2: ${creatureMatrix.strategies['creature2'].join(', ')}`);
console.log('  Sample payoffs:');
const strategy1 = creatureMatrix.strategies['creature1'][0];
const strategy2 = creatureMatrix.strategies['creature2'][0];
console.log(`    creature1 (${strategy1}) vs creature2 (${strategy2}): ${creatureMatrix.payoffs['creature1'][strategy1][strategy2]}`);

// Test 6: Use the NashEquilibriumFinder
console.log('\nTest 6: Using the NashEquilibriumFinder...');
const nashFinder = getNashEquilibriumFinder();
const foundEquilibria = nashFinder.findNashEquilibria(creatureMatrix);
const bestEquilibrium = nashFinder.findBestNashEquilibrium(creatureMatrix, 'creature1');
const paretoOptimalEquilibria = nashFinder.findParetoOptimalNashEquilibria(creatureMatrix);

console.log(`Found ${foundEquilibria.length} Nash equilibria`);
if (bestEquilibrium) {
  console.log('Best Nash equilibrium for creature1:');
  console.log(`  Profile: ${JSON.stringify(bestEquilibrium.profile)}`);
  console.log(`  Payoffs: ${JSON.stringify(bestEquilibrium.payoffs)}`);
}
console.log(`Found ${paretoOptimalEquilibria.length} Pareto optimal Nash equilibria`);

console.log('\nAll tests completed successfully!');
