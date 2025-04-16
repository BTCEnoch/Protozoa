/**
 * Decision Tree Service
 *
 * This service provides functionality for creating and evaluating decision trees.
 */

import { BlockData } from '../../types/bitcoin/bitcoin';
import {
  DecisionTree,
  DecisionNode,
  DecisionPath,
  createDecisionNode,
  createDecisionTree
} from '../../types/gameTheory/decisionTree';
import { evaluateDecisionTree } from '../../lib/gameTheory';
import { Role } from '../../types/core';

/**
 * Singleton instance
 */
let instance: DecisionTreeService | null = null;

/**
 * Decision Tree Service class
 */
export class DecisionTreeService {
  private blockData: BlockData | null = null;
  private cachedTrees: Map<string, DecisionTree> = new Map();

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {}

  /**
   * Get the singleton instance
   */
  static getInstance(): DecisionTreeService {
    if (!instance) {
      instance = new DecisionTreeService();
    }
    return instance;
  }

  /**
   * Initialize the service with block data
   * @param blockData Bitcoin block data
   */
  initialize(blockData: BlockData): void {
    this.blockData = blockData;
    this.cachedTrees.clear();
  }

  /**
   * Create a decision tree for a strategic decision
   * @param id Tree identifier
   * @param role The role making the decision
   * @param options Tree creation options
   * @returns A decision tree
   */
  createDecisionTree(
    id: string,
    role: Role,
    options?: {
      maxDepth?: number;
      payoffMultiplier?: number;
    }
  ): DecisionTree {
    const treeKey = `${id}_${role}`;
    
    if (this.cachedTrees.has(treeKey)) {
      return this.cachedTrees.get(treeKey)!;
    }
    
    const maxDepth = options?.maxDepth || 3;
    const payoffMultiplier = options?.payoffMultiplier || 1.0;
    
    // Create a root node for the decision tree
    const rootNode = this.createRootNode(role);
    
    // Build the decision tree based on the role
    const tree = createDecisionTree(this.buildDecisionTree(rootNode, role, 1, maxDepth, payoffMultiplier));
    
    // Cache the tree
    this.cachedTrees.set(treeKey, tree);
    
    return tree;
  }

  /**
   * Evaluate a decision tree
   * @param tree The decision tree
   * @param state The current state
   * @returns The optimal path through the tree
   */
  evaluateDecisionTree(tree: DecisionTree, state: any): DecisionPath {
    return evaluateDecisionTree(tree, state);
  }

  /**
   * Find the optimal path through a decision tree
   * @param tree The decision tree
   * @param state The current state
   * @returns The optimal path through the tree
   */
  findOptimalPath(tree: DecisionTree, state: any): DecisionPath {
    return this.evaluateDecisionTree(tree, state);
  }

  /**
   * Create a root node for a decision tree
   * @param role The role
   * @returns A root decision node
   */
  private createRootNode(role: Role): DecisionNode {
    return createDecisionNode('root', `${role} Initial Decision`, {
      payoff: 0,
      children: []
    });
  }

  /**
   * Build a decision tree recursively
   * @param node The current node
   * @param role The role
   * @param depth The current depth
   * @param maxDepth The maximum depth
   * @param payoffMultiplier The payoff multiplier
   * @returns The built decision tree
   */
  private buildDecisionTree(
    node: DecisionNode,
    role: Role,
    depth: number,
    maxDepth: number,
    payoffMultiplier: number
  ): DecisionNode {
    // If we've reached the maximum depth, return the node as a leaf
    if (depth >= maxDepth) {
      return node;
    }
    
    // Create child nodes based on the role
    const children: DecisionNode[] = this.createChildNodes(role, depth, payoffMultiplier);
    
    // Recursively build the tree for each child
    const builtChildren = children.map(child => 
      this.buildDecisionTree(child, role, depth + 1, maxDepth, payoffMultiplier)
    );
    
    // Add the built children to the node
    node.children = builtChildren;
    
    return node;
  }

  /**
   * Create child nodes for a decision tree
   * @param role The role
   * @param depth The current depth
   * @param payoffMultiplier The payoff multiplier
   * @returns An array of child nodes
   */
  private createChildNodes(role: Role, depth: number, payoffMultiplier: number): DecisionNode[] {
    // Define role-specific decision options
    const roleDecisions: Record<Role, string[]> = {
      [Role.ATTACK]: ['Aggressive', 'Tactical', 'Opportunistic'],
      [Role.DEFENSE]: ['Protective', 'Counter', 'Evasive'],
      [Role.CONTROL]: ['Commanding', 'Disruptive', 'Supportive'],
      [Role.MOVEMENT]: ['Swift', 'Flanking', 'Unpredictable'],
      [Role.CORE]: ['Balanced', 'Adaptive', 'Resilient']
    };
    
    // Define role-specific conditions
    const roleConditions: Record<Role, ((state: any) => boolean)[]> = {
      [Role.ATTACK]: [
        state => state.enemyHealth < 50,
        state => state.ownHealth > 70,
        state => state.enemyCount > 1
      ],
      [Role.DEFENSE]: [
        state => state.ownHealth < 50,
        state => state.underAttack === true,
        state => state.alliesNearby === true
      ],
      [Role.CONTROL]: [
        state => state.controlPoints > 0,
        state => state.alliesNearby === true,
        state => state.enemyDisrupted === false
      ],
      [Role.MOVEMENT]: [
        state => state.obstaclesNearby === true,
        state => state.enemyNearby === true,
        state => state.alliesScattered === true
      ],
      [Role.CORE]: [
        state => state.energyLevel < 50,
        state => state.alliesHealth < 70,
        state => state.formationIntegrity < 80
      ]
    };
    
    // Define role-specific payoffs
    const rolePayoffs: Record<Role, number[]> = {
      [Role.ATTACK]: [10, 8, 6],
      [Role.DEFENSE]: [8, 10, 6],
      [Role.CONTROL]: [6, 8, 10],
      [Role.MOVEMENT]: [10, 6, 8],
      [Role.CORE]: [8, 10, 6]
    };
    
    // Create a child node for each decision option
    return roleDecisions[role].map((decision, index) => {
      return createDecisionNode(
        `${role}_${decision}_${depth}`,
        decision,
        {
          condition: roleConditions[role][index],
          payoff: rolePayoffs[role][index] * payoffMultiplier * (1 + (depth * 0.1)),
          children: []
        }
      );
    });
  }
}

/**
 * Get the decision tree service instance
 * @returns The decision tree service instance
 */
export function getDecisionTreeService(): DecisionTreeService {
  return DecisionTreeService.getInstance();
}

